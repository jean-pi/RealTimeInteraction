# Arquitectura del Servidor: Decisiones de Diseño y Tradeoffs
## Proyecto: RealTimeInteraction (`@rti/server`)

Este documento formaliza las decisiones técnicas, los fundamentos de sistemas y los compromisos de diseño (*tradeoffs*) adoptados para el servidor en tiempo real. Explica con rigor técnico **por qué se eligió cada tecnología y por qué se descartaron las alternativas populares**.

---

## 1. El Rol del Servidor: Un Demonio Persistente con Estado (*Stateful Daemon*)

A diferencia de los servidores web tradicionales que solo reciben una petición HTTP, consultan una base de datos y se apagan, `@rti/server` opera como un **proceso continuo en memoria RAM (*daemon*)**.

* Mantiene miles de conexiones TCP/WebSocket activas simultáneamente.
* Es la **autoridad soberana de la verdad**: aplica invariantes de negocio (aforo máximo $N \le 10$, prioridad del Anfitrión, roles inmutables).
* Orquesta la presencia en tiempo real con latencias de microsegundos mediante estructuras de datos volátiles nativas.

---

## 2. Matriz de Decisiones Técnicas: ¿Por qué Sí y por qué No?

### A. Modelo de Proceso: Proceso Persistente (Node.js) vs. Serverless (Lambdas / Edge)
* **Decisión:** **Proceso continuo en Node.js (v24 LTS)**.
* **Por qué SÍ:**
  * Las conexiones WebSocket requieren sockets TCP abiertos permanentemente.
  * Los latidos de red (*heartbeats*) ocurren cada 5 segundos y demandan respuestas inmediatas (< 5ms) sin arranques en frío (*cold starts*).
  * La memoria RAM del proceso es compartida entre todas las conexiones de una misma sala, permitiendo controlar el aforo ($N \le 10$) de forma atómica.
* **Por qué NO Serverless:**
  * Las funciones Serverless (AWS Lambda, Vercel Functions) son efímeras y sin estado (*stateless*): nacen, procesan una petición en ~50ms y se destruyen.
  * Para mantener WebSockets en Serverless se requieren brokers de mensajería externos o bases de datos como intermediarios lentos, encareciendo los costos y disparando la latencia.

---

### B. Transporte en Tiempo Real: `ws` (Nativo) vs. Socket.IO
* **Decisión:** **`ws` (Librería estándar de WebSockets para Node.js)**.
* **Por qué SÍ:**
  * Es la implementación más rápida, ligera y fiel a la especificación RFC 6455.
  * Consume menos de 30 KB de RAM por socket conectado.
  * Permite **control absoluto sobre el protocolo a bajo nivel**: inspección de tramas TCP de ping/pong, autenticación directa en la cabecera de actualización (*Upgrade*) y control fino de la máquina de estados de presencia (ventanas de gracia de 10 segundos).
* **Por qué NO Socket.IO:**
  * Socket.IO es una capa de abstracción pesada que introduce su propio protocolo de empaquetado (*framing*), sondeo largo (*long-polling*) obsoleto y mecanismos de reconexión automática que entran en conflicto con nuestra máquina de estados de presencia personalizada.

---

### C. Capa HTTP / REST: Fastify vs. Express.js
* **Decisión:** **Fastify**.
* **Por qué SÍ:**
  * Es el framework HTTP más rápido del ecosistema Node.js (hasta 2x más rápido que Express).
  * Soporte nativo para promesas y sintaxis `async/await` en todos sus ciclos de vida.
  * Diseñado con un sistema de esquemas integrado que compila validaciones de alto rendimiento.
  * Se utiliza exclusivamente para endpoints de sesión y canje de códigos de invitación (6 caracteres).
* **Por qué NO Express.js:**
  * Express está técnicamente estancado; depende de callbacks antiguos y su router introduce sobrecostos innecesarios en el bucle de eventos (*Event Loop*).

---

### D. Persistencia y Almacenamiento: SQLite en Proceso vs. PostgreSQL en Contenedor
* **Decisión:** **SQLite en proceso (vía `node:sqlite` nativo de Node 24 o `better-sqlite3`) + Drizzle ORM**.
* **Por qué SÍ:**
  * **Cero fricción de red:** La base de datos reside en el mismo espacio de memoria del proceso Node.js; las consultas tardan microsegundos en lugar de milisegundos.
  * **Cero dependencias externas en desarrollo:** No requiere instalar Docker, levantar contenedores ni gestionar credenciales remotas en local. El estado persistente vive en un archivo local (`dev.db`).
  * **Concurrencia ACID real:** Con el modo WAL (*Write-Ahead Logging*), SQLite soporta múltiples lectores simultáneos y escrituras ultrarrápidas.
  * **Drizzle ORM:** TypeScript puro con inferencia estricta de tipos, SQL transparente y cero sobrecarga de binarios pesados (a diferencia de Prisma). Permite migrar a PostgreSQL en producción modificando únicamente la cadena de conexión.
* **Por qué NO PostgreSQL desde el inicio:**
  * Añade fricción de red, configuración de puertos y dependencias operativas innecesarias para la fase de diseño y pruebas del Módulo 01.

---

### E. Estado Volátil de Presencia: Memoria RAM Nativa vs. Base de Datos
* **Decisión:** **Estructuras nativas en memoria (`Map<RoomId, RoomState>`)**.
* **Por qué SÍ:**
  * Cada latido (*heartbeat*) ocurre cada 5 segundos por usuario. En una sala con 10 usuarios, esto representa 120 eventos por minuto.
  * Actualizar la marca de tiempo de presencia en memoria RAM (`participant.lastSeen = Date.now()`) toma nanosegundos y no genera I/O de disco.
* **Por qué NO Base de Datos:**
  * Guardar latidos en SQLite o Postgres saturaría innecesariamente el disco con operaciones de escritura efímeras que no aportan valor histórico.

---

### F. Validación de Frontera de Red: Zod (`@rti/contracts`)
* **Decisión:** **Zod como validador canónico en el paquete de contratos compartidos**.
* **Por qué SÍ:**
  * **Principio de Desconfianza de Red (*Defensive Programming*):** Todo mensaje entrante por WebSocket o HTTP es considerado potencialmente malicioso o corrupto hasta que pasa por `Schema.safeParse(data)`.
  * **Fuente Única de Verdad (Inferencia de Tipos):** Escribimos el esquema de validación una sola vez en Zod y TypeScript infiere automáticamente el tipo estático mediante `z.infer<typeof Schema>`.
  * **Sincronización Cliente-Servidor:** Al residir en `@rti/contracts`, tanto `apps/server` como `apps/web` comparten exactamente las mismas reglas de validación sin duplicar código.
* **Por qué NO Validaciones Manuales (`if/else`):**
  * Las validaciones manuales son propensas a errores humanos, no garantizan tipos de TypeScript seguros en tiempo de compilación y se desincronizan fácilmente cuando el modelo de negocio evoluciona.

---

## 3. Organización Física de Bounded Contexts en el Servidor

Siguiendo el estándar de **Monolito Modular**, el código del servidor se organiza por Bounded Contexts independientes dentro de `src/modules/`:

```text
apps/server/src/modules/
│
├── room-presence/             ◄── MÓDULO 01 (El ÚNICO formalmente activo hoy)
│   ├── domain/                (Invariantes de aforo N <= 10, agregado Room, máquinas de estado)
│   ├── use-cases/             (Slices de aplicación: provision-room, heartbeat, kick)
│   ├── infrastructure/        (Gateways de WebSocket y repositorios SQLite)
│   └── public-api.ts          (Frontera pública estricta del módulo)
│
├── whiteboard-engine/         ◄── MÓDULO 02 (Planificado: trazos vectoriales y renderizado)
├── window-manager/            ◄── MÓDULO 03 (Planificado: gestión espacial de contenedores X/Y)
└── workspace-widgets/         ◄── MÓDULO 04 (Planificado: plugins de notas, timer, todo, cámara)
```

> 💡 **Invariante Fundamental:**
> *"Actualmente solo se encuentra formalizado y en desarrollo el **Módulo 01 (room-presence)**. Ningún módulo planificado contiene código hasta que sus especificaciones canónicas e invariantes de negocio sean aprobadas."*
