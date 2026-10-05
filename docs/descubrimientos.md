# Bitácora de Descubrimientos y Fundamentos de Arquitectura de Software

> **Propósito de este documento:**
> Compendio de conocimientos, conceptos arquitectónicos, patrones de diseño y teoría formal de ingeniería de software adquiridos durante el análisis técnico.
> Este espacio es agnóstico a cualquier implementación puntual: recopila principios universales, genealogía histórica, tradeoffs y modelos conceptuales aplicables a sistemas escalables.

---

# Screaming Architecture y Lenguaje Ubicuo (Package-by-Feature)

Organización del código fuente guiada por el dominio del negocio en lugar de la jerarquía técnica de un framework.

---

## 1. Origen Histórico y Genealogía

* **Lenguaje Ubicuo y Bounded Contexts (2003):** Introducido por **Eric Evans** en su libro seminal *"Domain-Driven Design: Tackling Complexity in the Heart of Software"*. Exige que los términos y límites del negocio se reflejen de forma literal en la estructura del código.
* **Screaming Architecture (2011):** Acuñado por **Robert C. Martin ("Uncle Bob")** en su artículo de 2011 (*The Clean Code Blog*) e integrado en el libro *"Clean Architecture"* (2017, Cap. 21). Establece que la estructura de carpetas debe "gritar" qué hace el sistema, no qué framework usa.
* **Package by Component / Feature (2015):** Sistematizado por **Simon Brown** en *"Software Architecture for Developers"* y en el Cap. 34 de *Clean Architecture* ("The Missing Chapter"), contrastando empaquetado por capas técnicas frente a componentes verticales cohesivos.

---

## 2. El Problema vs. El Principio

| Enfoque | Estructura | Consecuencia Técnica |
| :--- | :--- | :--- |
| ❌ **Package-by-Layer** *(Estructura Anémica)* | `src/controllers/`<br>`src/services/`<br>`src/models/`<br>`src/repositories/` | • **Baja cohesión:** Un cambio de negocio exige editar archivos en 4 carpetas distintas.<br>• **Oculta el propósito:** El repositorio grita el patrón técnico, no el negocio.<br>• **Alucinación en IAs:** Obliga al agente a inspeccionar múltiples carpetas para adivinar dónde reside una regla. |
| ✅ **Package-by-Feature** *(Screaming Architecture)* | `src/order-fulfillment/`<br>`src/billing-invoice/`<br>`src/user-identity/` | • **Alta cohesión:** Todo lo relacionado a una capacidad reside en el mismo módulo.<br>• **Trazabilidad 1:1:** Cada requerimiento mapea directamente a un archivo de dominio.<br>• **Eliminación atómica:** Borrar una feature es borrar una sola carpeta; cero código muerto. |

---

## 3. ¿Por qué es Crucial? (Impacto Clave)

1. **Eficiencia Radical de Contexto (Humanos e IAs):** Concentra la atención en un único directorio acotado. La IA o el desarrollador resuelven la tarea sin gastar tokens navegando directorios irrelevantes.
2. **Aislamiento de Regresiones (SRP a Nivel de Paquete):** Cambios en la lógica de cobros quedan estrictamente confinados a su paquete, sin posibilidad de alterar pedidos o identidad.
3. **Autonomía y Despliegue:** Facilita migrar o desacoplar módulos hacia microservicios o librerías independientes en el futuro si la escala lo amerita.

---

## 4. Referencias Externas para Profundizar

* 📄 [Screaming Architecture - The Clean Code Blog (Robert C. Martin, 2011)](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
* 📘 [Domain Language: DDD Reference Summary (Eric Evans)](https://www.domainlanguage.com/ddd/reference/)
* 📄 [Package by Component and Structurizr (Simon Brown)](https://simonbrown.je/)
* 📘 *Clean Architecture: A Craftsman's Guide to Software Structure and Design* (Robert C. Martin, Prentice Hall, 2017 - Capítulos 21 y 34).

---

# El Hexágono no es una Carpeta: Fronteras de Dependencia vs. Burocracia Estructural

La Arquitectura Hexagonal (*Ports & Adapters*) y *Clean Architecture* no son plantillas de carpetas rígidas (`domain/`, `ports/`, `adapters/`). Son **nociones formales sobre la dirección de las dependencias**:
> *El núcleo de la lógica del negocio jamás debe depender de la tecnología externa (frameworks, protocolos de red, APIs de terceros o interfaces de usuario).*

En TypeScript y lenguajes modernos con borrado de tipos, **los Puertos son interfaces que ocupan 0 bytes en el bundle final**. La arquitectura se puede implementar de múltiples maneras pragmáticas sin crear carpetas vacías ni jerarquías artificiales.

---

## Caso Práctico 1: Hexágono Plano en Autenticación (`features/auth/`)

Una sola carpeta que implementa el hexágono completo al 100%:

```
src/features/auth/
│
├── auth.types.ts        ◄── DOMINIO: Entidades e Interfaces de Puertos (0 KB en bundle)
│                             export interface AuthPort { login(c: Credentials): Promise<User>; }
│
├── login.use-case.ts    ◄── CASO DE USO (Inside Hexagon): Orquestación pura e invariantes.
│                             Consume AuthPort; desconoce si la red es REST, GraphQL o Memoria.
│
├── auth-http.adapter.ts ◄── ADAPTADOR SECUNDARIO (Driven): Implementa AuthPort vía fetch/axios.
│
├── LoginForm.tsx        ◄── ADAPTADOR PRIMARIO (Driving): Interfaz visual que dispara el caso de uso.
│
└── index.ts             ◄── FRONTERA PÚBLICA: Exporta exclusivamente LoginForm para el Router.
```

* **Inversión de Dependencias (DIP):** El caso de uso depende del puerto (`AuthPort`), no de `auth-http.adapter.ts`.
* **Cero burocracia:** Exactamente 5 archivos en una sola carpeta plana.


> 💡 **Invariante Fundamental:**
> *"El hexágono se mide por la pureza de sus contratos de interfaz y la dirección unidireccional de sus dependencias, jamás por la cantidad de subcarpetas en el árbol de archivos."*

---

# Rebanadas Verticales (Vertical Slices) y su Simbiosis con Clean & Hexagonal Architecture

Muchos desarrolladores asumen erróneamente que las **Rebanadas Verticales (Vertical Slices)** y **Clean / Hexagonal Architecture** son enfoques rivales. En realidad, son **dos dimensiones geométricas perpendiculares (ortogonales) del mismo sistema**.

---

## 1. La Matriz del Software: Corte Horizontal vs. Corte Vertical

```
                          CORTE VERTICAL (Vertical Slices: por Feature)
                     Feature 1: Auth    Feature 2: Checkout   Feature 3: Presence
                   ┌──────────────────┬─────────────────────┬─────────────────────┐
   Capa Externa    │  LoginForm.tsx   │  CheckoutModal.tsx  │ ParticipantsList.tsx│ ◄── UI (Driving Adapters)
         │         ├──────────────────┼─────────────────────┼─────────────────────┤
   Capa Media      │  LoginUseCase    │  CheckoutUseCase    │ PresenceMachine     │ ◄── Casos de Uso / Puertos
         │         ├──────────────────┼─────────────────────┼─────────────────────┤
   Capa Interna    │  auth-api.adapter│  stripe.adapter     │ websocket.adapter   │ ◄── Infra (Driven Adapters)
                   └──────────────────┴─────────────────────┴─────────────────────┘
                   ▲                  ▲                     ▲
                   └── Cada columna es una REBANADA VERTICAL completa
```

* **El Corte Horizontal Clásico (Clean Architecture Tradicional):** Agrupa por filas técnicas (`src/ui/`, `src/use-cases/`, `src/adapters/`). Al modificar un flujo de negocio, exige editar archivos dispersos a lo largo de todas las capas horizontales.
* **El Corte Vertical (Vertical Slice Architecture - Jimmy Bogard, 2018):** Agrupa por columnas funcionales. Todo lo necesario para satisfacer un flujo de negocio específico reside en un único paquete cohesivo (`features/checkout/`).

---

## 2. ¿Cómo se Relacionan Exactamente?

La relación es simbiótica:
> **La Rebanada Vertical define DÓNDE viven físicamente los archivos (la frontera del paquete).**
> **Clean / Hexagonal Architecture define CÓMO fluyen las dependencias lógicas DENTRO de esa rebanada.**

La Rebanada Vertical **no destruye el hexágono; lo miniaturiza y lo hace autosuficiente**. Cada rebanada es un **micro-hexágono completo**:
* **Driving Adapter:** La interfaz visual o endpoint que dispara la acción.
* **Núcleo:** El caso de uso que defiende las reglas de negocio de esa rebanada.
* **Puertos:** Las interfaces TypeScript de lo que la rebanada necesita del exterior.
* **Driven Adapters:** La implementación con la base de datos o el SDK externo.

---

## 3. ¿Qué le Aporta Cada Enfoque al Otro?

### A. Lo que la Rebanada Vertical le aporta a Clean Architecture:
* **Elimina los "Paquetes Dios" (God Packages):** Evita que `domain/` acumule 150 entidades y 200 use-cases de dominios no relacionados. Confinada la lógica a su *Bounded Context* estricto.
* **Elimina la Burocracia Estructural:** Libera al equipo de crear carpetas vacías solo para satisfacer un diagrama estático.

### B. Lo que Clean / Hexagonal le aporta a la Rebanada Vertical:
* **Evita el Código Espagueti:** Previene que programadores mezclen consultas directas a base de datos o llamadas crudas de red dentro de componentes de interfaz visual.
* **Mantiene la Inversión de Dependencias (DIP):** El caso de uso gobierna la lógica sin acoplarse al botón de la pantalla ni al SDK de terceros, permitiendo tests en memoria a velocidad de CPU.

---

## 4. El Vínculo con "Lean Architecture" (Eliminación de Desperdicio)

El pensamiento **Lean** en desarrollo de software busca eliminar todo lo que no añade valor directo (*overhead* o burocracia técnica):
* **Clean Architecture dogmática genera desperdicio:** Obliga a crear 4 capas y 8 archivos aunque la operación sea simplemente consultar un dato de solo lectura (*Query*).
* **Lean + Vertical Slice + Hexagonal:** Permite calibrar la profundidad arquitectónica según la complejidad real del flujo:
  * Si el flujo tiene reglas de negocio críticas o estado complejo, se aplica el hexágono con rigor formal: puertos, adaptadores y máquinas de estado.
  * Si el flujo es trivial (ej. mostrar texto estático de términos y condiciones), la rebanada puede ser un simple componente plano sin inventar puertos artificiales innecesarios.

---

## 5. Referencias Externas para Profundizar

* 📄 [Vertical Slice Architecture - Jimmy Bogard (2018)](https://jimmybogard.com/vertical-slice-architecture/)

---

> 💡 **Invariante Fundamental:**
> *"Clean / Hexagonal Architecture es el protocolo de pureza lógica (las dependencias solo apuntan hacia adentro). Vertical Slices es la estrategia de empaquetado físico (el software se divide en columnas autónomas). Juntas garantizan la protección de Clean Architecture sin la burocracia de las capas horizontales globales."*

---

# Tratamiento Homogéneo y Relaciones Muchos a Muchos (N:M) en DDD

Modelado de entidades asociativas con roles para erradicar el antipatrón del caso especial y la duplicación de lógica.

---

## 1. Origen Histórico y Genealogía

* **Formas Normales (Edgar F. Codd, 1970):** Descomposición obligatoria de relaciones $N:M$ mediante entidades asociativas (tablas puente) para preservar 1NF.
* **Patrón Party-Role (Martin Fowler, 1997):** Los roles no son subclases rígidas (`class Owner extends User`), sino vínculos contextuales que decoran la relación.
* **Entidades e Invariantes Asociativos (Eric Evans, 2003):** La asociación entre agregados se formaliza como una entidad de dominio con reglas de negocio e invariantes propios.

---

## 2. El Problema vs. El Principio

| Enfoque | Estructura | Consecuencia Técnica |
| :--- | :--- | :--- |
| ❌ **Antipatrón del Caso Especial** *(Heterogéneo)* | `Recurso -> propietario_id`<br>`Recurso -> HasMany(Invitados)` | • **Explosión condicional:** `if (isOwner) ... else` duplicado en UI, sockets y autorización.<br>• **Consultas asimétricas:** Requiere unir manualmente dos fuentes de datos distintas.<br>• **Fragilidad:** Introducir nuevos roles (ej. Co-Host) colapsa el esquema físico. |
| ✅ **Tratamiento Homogéneo** *(Entidad Asociativa)* | `Usuario 1 ── N Membresia N ── 1 Recurso`<br>`(rol: HOST \| GUEST)` | • **Consulta única:** `SELECT * FROM membresias WHERE recurso_id = :id`.<br>• **Polimorfismo de dominio:** Colección uniforme de participantes para la UI y la red.<br>• **Invariantes puros:** Las diferencias de autoridad residen en la máquina de estados. |

---

## 3. Mecanismo Clave: La Membresía Raíz Inmortal

Todos los participantes (incluyendo al propietario) poseen una `Membresia`. La asimetría de autoridad se delega exclusivamente a invariantes de dominio:
* **`AbandonarRecurso`:** Permitido para `GUEST`; prohibido para `HOST` (lanza violación de invariante).
* **`ExpulsarMiembro`:** Solo ejecutable por `HOST`; el dominio prohíbe revocar la membresía raíz.

> 🚢 **Analogía del Manifiesto de Navegación:**
> Un barco no mantiene dos listas separadas ("El Capitán" y "Los Marineros"). Mantiene un único **Crew Manifest** donde el Capitán ocupa la fila 1 con rol `"Capitán"`. La logística y la aduana procesan una sola lista; la jerarquía de mando reside en el rol.

---

## 4. Referencias Externas para Profundizar

* 📘 *Analysis Patterns: Reusable Object Models* (Martin Fowler, 1997 - Cap. 2: "Accountability and Party-Role").
* 📘 *Domain-Driven Design* (Eric Evans, 2003 - Cap. 5: "Entities & Associations").
* 📄 *A Relational Model of Data for Large Shared Data Banks* (E. F. Codd, 1970).

---

> 💡 **Invariante Fundamental:**
> *"Nunca bifurques la estructura de datos para resolver una asimetría de privilegios. Unifica el modelo mediante entidades asociativas homogéneas y traslada la autoridad a roles gobernados por invariantes."*

---

# Organización Física, Lazy Loading por Grafos y Concepción del Dominio

Comparativa de empaquetado: Cajones Globales vs. Subcarpetas por Vista vs. Vertical Slices Planos.

---

## 1. Cómo Funciona el Lazy Loading a Bajo Nivel (Teoría de Grafos del Empaquetador)

Cualquier empaquetador moderno (**Vite, Rollup, Webpack, esbuild**) no procesa carpetas; construye un **Grafo Dirigido de Módulos** a partir del punto de entrada (`main.tsx` o `index.html`):

1. **Importación Estática (`import { X } from './Y'`):** Crea una arista síncrona obligatoria. El empaquetador incluye `./Y` en el mismo archivo JavaScript inicial (`main.chunk.js`).
2. **Importación Dinámica (`import('./path')` o `React.lazy()`):** Marca un **Punto de Corte (Split Point)**. El empaquetador corta el grafo en ese vértice y empaqueta ese nodo y todas sus dependencias transitivas en un archivo físico independiente: un **Chunk Dinámico** (`chunk-xyz.js`).

### El Fracaso del Lazy Loading en Arquitecturas Horizontales (Bundle Leakage)
En una arquitectura por capas globales (`src/ui/`, `src/services/`, `src/adapters/`), si un desarrollador importa estáticamente un SDK pesado (ej. cliente de pagos de 300 KB) desde un archivo común o un contenedor de servicios compartido, **el Punto de Corte se rompe silenciosamente**. El empaquetador rastrea la arista y arrastra los 300 KB al bundle inicial del arranque, arruinando el tiempo de carga (**LCP e INP**).

---

## 2. Comparativa de Tres Enfoques de Organización de Código

Frente a este desafío, existen tres formas de estructurar un proyecto:

```
ENFOQUE 1: Cajones Globales          ENFOQUE 2: Subcarpetas por Vista       ENFOQUE 3: Vertical Slices Planos
(Package-by-Layer)                  (View-Scoped Nested Drawers)           (Package-by-Feature)

src/                                src/                                   src/features/
├── components/                     └── views/                             ├── auth/
│   ├── LoginForm.tsx                   └── login/                         │   ├── LoginForm.tsx
│   └── CheckoutModal.tsx                   ├── components/                │   ├── login.use-case.ts
├── services/                               │   └── LoginForm.tsx          │   ├── auth.types.ts
│   ├── auth.service.ts                     ├── services/                  │   ├── auth-http.adapter.ts
│   └── checkout.service.ts                 │   └── auth.service.ts        │   └── index.ts (Frontera)
└── adapters/                               └── adapters/                  └── checkout/
    ├── http.adapter.ts                         └── auth-http.adapter.ts       ├── CheckoutModal.tsx
    └── stripe.adapter.ts                                                      ├── checkout.use-case.ts
                                                                               └── index.ts
```

| Dimensión | 1. Cajones Globales (Root) | 2. Subcarpetas Anidadas por Vista | 3. Vertical Slices Planos |
| :--- | :--- | :--- | :--- |
| **Estructura** | `src/components/`<br>`src/services/`<br>`src/adapters/` | `views/login/components/`<br>`views/login/services/`<br>`views/login/adapters/` | `features/login/`<br>(Archivos cohesivos en un mismo nivel plano) |
| **Lazy Loading** | ❌ **Muy frágil:** Propenso a *Bundle Leakage* por importaciones cruzadas. | ✅ **Funciona:** Confinar el código dentro de la vista permite crear un chunk aislado. | ✅ **Funciona al 100%:** Cada feature es un sub-grafo acíclico cerrado con un único `index.ts`. |
| **Ergonomía** | ❌ Baja cohesión: Editar 1 feature exige saltar entre 3 carpetas distantes. | ❌ **Burocracia alta:** Laberinto de carpetas con 1 solo archivo y rutas relativas `../../../`. | ✅ **Alta cohesión:** Todo reside en un mismo directorio plano; cero fricción de navegación. |
| **Eliminación** | ❌ Riesgo alto de dejar código muerto disperso. | ⚠️ Borrar la vista elimina casi todo, salvo adaptadores compartidos. | ✅ **Atómica:** Borrar la carpeta de la feature elimina el 100% del código asociado. |

### La Pregunta Clave: ¿Crear subcarpetas dentro de cada vista funciona?
**SÍ, FUNCIONA A NIVEL DE EMPAQUETADOR.** Agrupar componentes y servicios dentro de la carpeta de la vista resuelve el problema de la fuga de dependencias porque confina el sub-grafo de esa pantalla.

**Sin embargo, su defecto es la sobre-ingeniería de directorios:** reproduce la jerarquía técnica en miniatura dentro de cada pantalla, obligando a crear carpetas como `login/services/` que contienen un único archivo solitario. 

**La evolución hacia Vertical Slices Planos:** mantiene **exactamente el mismo beneficio de aislamiento de dependencias para el Lazy Loading**, pero aplana la estructura (`features/login/`). No necesitas 4 cajones para 4 archivos; los agrupas por su propósito de negocio, no por su extensión técnica.

---

## 3. ¿Cómo se Concibe el Dominio en Cada Enfoque?

La mayor diferencia arquitectónica entre estos tres modelos radica en **dónde y cómo reside la lógica de negocio**:

### A. En Cajones Globales: El Dominio Anémico Monolítico (Objeto Dios)
* Se crea una carpeta central `src/domain/` o `src/models/` donde se acumulan todas las entidades de la empresa juntas.
* **Consecuencia:** Surge el **"Objeto Dios"** (ej. una entidad `User.ts` de 2,500 líneas con 60 propiedades: credenciales, roles, tarjetas bancarias, preferencias de UI, estados de sesión). Todas las partes del sistema dependen de la misma entidad inflada, generando acoplamiento destructivo.

### B. En Subcarpetas por Vista: El Dominio Secuestrado por la UI
* Como el código se organiza alrededor de "Pantallas" o "Vistas" (`views/`), las reglas de negocio quedan atrapadas dentro del ciclo de vida visual de los componentes o hooks locales.
* **Consecuencia:** Si dos vistas distintas necesitan aplicar la misma regla de negocio o validar un invariante, los programadores suelen duplicar el código o crear dependencias circulares entre vistas.

### C. En Vertical Slices: Dominio Descentralizado por Bounded Contexts (DDD Puro)
Domain-Driven Design (DDD) is a software development approach that structures code around a real-world business domain and its core rules. Introduced by Eric Evans in 2003
* **No existe un dominio universal.** El dominio vive encapsulado dentro de cada Rebanada Vertical, modelado exclusivamente para la capacidad de negocio que resuelve:
  * En `features/auth/`: El dominio modela `UserCredentials`, `SessionToken`, `AuthPort`. Ignora pagos y sockets.
  * En `features/order-checkout/`: El dominio modela `Order`, `Money`, `TaxCalculator`. Ignora contraseñas.
  * En `features/room-presence/`: El dominio modela `Room`, `Participant`, `Heartbeat`. Ignora tarjetas de crédito.
* **Beneficio:** Máxima pureza, modelos compactos (< 50 líneas por archivo) e invariantes blindados dentro de su frontera contextual.

---

## 4. Referencias Externas para Profundizar

* 📄 [Vertical Slice Architecture - Jimmy Bogard (2018)](https://jimmybogard.com/vertical-slice-architecture/)
* 📘 *Domain-Driven Design: Tackling Complexity in the Heart of Software* (Eric Evans, 2003 - "Bounded Contexts & Context Maps").
* 📘 *Clean Architecture: A Craftsman's Guide to Software Structure and Design* (Robert C. Martin, 2017 - Cap. 34: "The Missing Chapter: Package by Component").
* 📄 [Screaming Architecture - Uncle Bob (2011)](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)

---

> 💡 **Invariante Fundamental:**
> *"La Rebanada Vertical define DÓNDE viven físicamente los archivos para que el Lazy Loading sea matemáticamente exacto y libre de fugas; Clean / Hexagonal Architecture define CÓMO fluyen las dependencias hacia adentro para que el código no se convierta en espagueti."*

---

# El Paradigma Canónico: Monolito Modular (DDD + Rebanadas Verticales Internas)

Este es el **paradigma arquitectónico oficial y por defecto** adoptado para el proyecto. Resuelve de raíz el dilema de tener un dominio desparramado por la aplicación sin caer en la burocracia anémica de las capas horizontales tradicionales.

---

## 1. La Síntesis Arquitectónica: Dos Niveles de Jerarquía

En lugar de elegir entre "todo plano en rebanadas" o "todo dividido en capas técnicas", el sistema se organiza formalmente en dos niveles conceptuales y físicos:

```text
Nivel 1: Bounded Context (Módulo de Negocio Autónomo)
   │
   ├── Dominio Protegido (Agregados, Invariantes, Value Objects, Puertos)
   │
   ├── Nivel 2: Rebanadas Verticales Internas (Casos de uso atómicos)
   │
   ├── Infraestructura (Adaptadores secundarios: DB, WebSockets, etc.)
   │
   └── public-api.ts (Frontera pública estricta del módulo)
```

---

## 2. Los 3 Pilares del Monolito Modular

### A. Aislamiento de Memoria y Fronteras de Compilación (`public-api.ts`)
* Cada módulo (`src/modules/<nombre-modulo>/`) es un Bounded Context cerrado con un único punto de exportación: `public-api.ts` (o `index.ts`).
* Ningún módulo externo tiene permitido importar archivos internos (`/domain/`, `/use-cases/`, `/infrastructure/`) de otro módulo.
* La comunicación entre módulos se realiza exclusivamente a través de contratos de interfaces públicas tipadas o clientes internos definidos en su frontera pública.

### B. Dominio Rico y Protegido (Eliminación del Dominio Desparramado)
* **El problema evitado:** En Vertical Slices puros sin DDD, las reglas de negocio suelen degenerar en scripts procedurales (*Transaction Scripts*) duplicados en cada manejador.
* **La solución:** Las invariantes críticas del negocio (ej. la regla de aforo $N \le 10$, la reserva de cupo garantizada para el Anfitrión, la máquina de estados de presencia con periodos de gracia) no se dispersan en cada caso de uso. Residen de forma centralizada en el modelo de dominio puro del módulo (`domain/`).
* **Casos de uso delgados:** Cada rebanada vertical interna orquesta la operación: carga el agregado, le delega la ejecución de la regla de negocio y persiste el resultado.

### C. Desacoplamiento Inter-Módulo mediante Eventos de Dominio en Memoria
* Cuando una acción en un módulo debe provocar una reacción en otro módulo (ej. un usuario abandona la sala y la pizarra debe limpiar sus punteros temporales), **se prohíben las llamadas directas acopladas**.
* El módulo emite un **Evento de Dominio Tipado** en un bus de eventos en memoria (`EventEmitter` tipado). El módulo receptor se suscribe de forma reactiva y autónoma.
* **Invariante de Grafo:** La relación de importación entre módulos debe formar siempre un **Grafo Acíclico Dirigido (DAG)**. Las dependencias circulares están terminantemente prohibidas y son rechazadas en tiempo de compilación.

---

## 3. Estructura Canónica de Directorios de un Módulo

```text
src/modules/room-presence/
│
├── domain/                         ◄── DOMINIO PURO (0 dependencias externas, TypeScript puro)
│   ├── model/
│   │   ├── Room.ts                 (Agregado raíz: estado privado y métodos de mutación protegidos)
│   │   ├── Participant.ts          (Entidad: identidad, rol HOST/GUEST)
│   │   ├── PresenceState.ts        (Value Object: Online, Reconnecting, Offline)
│   │   └── RoomCapacity.ts         (Value Object: invariante de aforo <= 10 y cupo prioritario)
│   ├── events/
│   │   ├── ParticipantJoined.ts    (Evento de dominio)
│   │   └── ParticipantDisconnected.ts
│   └── ports/
│       ├── RoomRepository.ts       (Puerto secundario: persistencia)
│       └── PresenceNotifier.ts     (Puerto secundario: difusión en tiempo real)
│
├── use-cases/                      ◄── REBANADAS VERTICALES INTERNAS (Casos de uso atómicos)
│   ├── provision-room/
│   │   ├── provision-room.use-case.ts
│   │   └── provision-room.spec.ts
│   ├── redeem-invitation/
│   │   ├── redeem-invitation.use-case.ts
│   │   └── redeem-invitation.spec.ts
│   └── handle-heartbeat/
│       ├── handle-heartbeat.use-case.ts
│       └── handle-heartbeat.spec.ts
│
├── infrastructure/                 ◄── ADAPTADORES SECUNDARIOS (Implementación de puertos)
│   ├── persistence/
│   │   └── room-sqlite.repository.ts
│   └── realtime/
│       └── websocket-presence.notifier.ts
│
└── public-api.ts                   ◄── BARRERA DE ENCAPSULACIÓN (Único export público hacia el exterior)
```

---

> 💡 **Invariante Fundamental:**
> *"El Bounded Context define la frontera de autonomía y consistencia transaccional; el Dominio Rico centraliza y protege las invariantes para que no se desparramen; y las Rebanadas Verticales internas orquestan cada caso de uso con máxima cohesión y cero burocracia."*

---

# Monorepo con Workspaces de pnpm: Arquitectura Cliente-Servidor para Tiempo Real con Estado

Estrategia física y de empaquetado para gobernar un servidor persistente en tiempo real, un cliente web interactivo y contratos de red fuertemente tipados en un único repositorio sin fugas de dependencias.

---

## 1. Exploración de la Técnica: Monorepo con Workspaces de pnpm

### ¿Qué problema resuelve?
En aplicaciones interactivas donde coexisten un servidor de WebSockets y un cliente web:
1. **Evita la desincronización de contratos (El dolor del Polyrepo):** Si cambias el payload de un evento de presencia en el servidor, TypeScript detecta inmediatamente el error en el cliente en tiempo de compilación.
2. **Elimina las Dependencias Fantasma (*Phantom Dependencies*):** A diferencia de npm o yarn v1 (que aplanan agresivamente `node_modules/`), pnpm utiliza un almacén direccionable por contenido mediante enlaces duros (*hard links*) y enlaces simbólicos aislados (*symlinks*). Si el cliente web no declara explícitamente una librería en su propio `package.json`, es físicamente incapaz de importarla, evitando que módulos nativos del servidor (como `Buffer` o `net`) se cuelen en el bundle del navegador.
3. **Desarrollo con Cero Pasos de Compilación Intermedia (*Zero-Build DX*):** Mediante el campo `exports` apuntando directamente a TypeScript y el uso de compiladores al vuelo en memoria (Vite vía esbuild en el frontend, y Node.js con `tsx` o ejecución nativa en el backend), los cambios en los contratos compartidos se reflejan de forma instantánea sin necesidad de ejecutar un `build` previo.

### ¿Cómo se hace? (Topología y Reglas de Diseño)

```text
RealTimeInteraction/
├── pnpm-workspace.yaml            ◄── Define la topología del monorepo
├── package.json                   ◄── Raíz privada (scripts de orquestación global)
├── tsconfig.base.json             ◄── Configuración base unificada y estricta
│
├── packages/
│   └── contracts/                 ◄── CONTRATOS COMPARTIDOS (Protocolo de red / DTOs)
│       ├── package.json           (name: "@rti/contracts")
│       └── src/
│           ├── room.dto.ts        (Payloads: RoomJoinedPayload, RoomCapacityReachedError)
│           ├── presence.dto.ts    (Heartbeats, UserPresenceState)
│           ├── events.ts          (Nombres canónicos de eventos WebSocket)
│           └── index.ts
│
└── apps/
    ├── server/                    ◄── SERVIDOR EN TIEMPO REAL (Monolito Modular)
    │   ├── package.json           (name: "@rti/server", consume "@rti/contracts")
    │   └── src/
    │       ├── modules/
    │       │   └── room-presence/ ◄── Bounded Context Módulo 01 (Dominio puro + Slices)
    │       └── main.ts            (Daemon persistente: HTTP + WebSockets)
    │
    └── web/                       ◄── CLIENTE WEB (Lienzo interactivo en Vite)
        ├── package.json           (name: "@rti/web", consume "@rti/contracts")
        └── src/
            ├── features/
            │   └── room-presence/ ◄── Slices de UI
            └── main.tsx
```

#### Regla de Oro: ¿Qué se comparte y qué se aísla?
* **En `@rti/contracts`:** Únicamente DTOs, interfaces de eventos de red, enums/tipos literales y esquemas de validación de entrada (ej. Zod/TypeBox).
* **Fuera de `@rti/contracts`:** Las entidades de dominio con lógica de persistencia e invariantes del backend (`Room.ts`) jamás se comparten con el cliente. El cliente conoce los mensajes que viajan por el cable, no la maquinaria interna del servidor.

---

## 2. La Otra Opción: Metaframeworks Fullstack Serverless (Next.js, Nuxt, SvelteKit)

### ¿Qué hacen y por qué son la corriente dominante?
Hoy representan el enfoque predominante para más del 80% de los desarrollos web comerciales (sitios de contenido, plataformas de comercio electrónico, paneles administrativos y CRUDs tradicionales).

* **Unificación extrema:** Escriben componentes que pueden ejecutarse tanto en el servidor como en el cliente (React Server Components). El backend se reduce a funciones invocables (*Server Actions* o *Route Handlers*).
* **Despliegue Serverless:** Diseñados para desplegarse en infraestructuras efímeras tipo Vercel o AWS Lambda en el borde (*Edge*).

### ¿Por qué FALLAN para Sistemas de Tiempo Real Colaborativos? (El Conflicto Físico: Stateless vs. Stateful)

| Dimensión | Metaframeworks Serverless (Next.js) | Servidor Dedicado de Tiempo Real (Nuestra Arquitectura) |
| :--- | :--- | :--- |
| **Modelo de Proceso** | **Efímero (*Stateless*):** La función nace ante una petición HTTP, se ejecuta en ~50ms y se destruye de la memoria RAM. | **Persistente (*Stateful Daemon*):** El proceso reside 24/7 en memoria RAM como un demonio continuo. |
| **Soporte WebSocket** | ❌ **Inviable nativamente:** Una función Serverless no puede sostener un socket TCP abierto indefinidamente sin sobrecostos de timeout o desconexiones forzadas. | ✅ **Nativo y Óptimo:** Mantiene miles de conexiones TCP/WebSocket abiertas concurrentemente. |
| **Monitoreo de Latidos (*Heartbeats*)** | ❌ Exige recurrir a servicios de terceros costosos (Pusher, Ably) o bases de datos como intermediarios lentos. | ✅ Monitorea latidos cada 5s en la memoria del proceso local con latencias inferiores a 5ms. |
| **Gestión de Memoria y Aforo** | ❌ No hay memoria compartida entre ejecuciones concurrentes de funciones Serverless. | ✅ Invariante de aforo ($N \le 10$) y presencia resueltos en memoria atómica. |

> ⚠️ **Conclusión Técnica:**
> Usar Next.js para un lienzo interactivo colaborativo es forzar un modelo de computación efímero y sin estado sobre un problema que es inherentemente continuo y con estado en memoria. Por eso herramientas como **Figma, Miro, Discord o Linear** ejecutan servidores persistentes dedicados.

---

## 3. Evolución Histórica de la Arquitectura Web (Las 4 Eras)

Comprender la genealogía técnica permite entender por qué las soluciones del pasado fracasaron y hacia dónde converge la ingeniería moderna:

```text
ERA 1 (1995-2005)       ERA 2 (2005-2013)       ERA 3 (2013-2020)       ERA 4 (2020-Presente)
Monolito SSR            Surgimiento AJAX/SPA    La Gran Separación      La Gran Bifurcación
┌──────────────┐        ┌──────────────┐        ┌──────┐    ┌──────┐   A) Meta-Frameworks (Next/Nuxt)
│ Servidor     │        │ Servidor     │        │ SPA  │    │ API  │      (Stateless / Serverless)
│ (PHP/Rails)  │        │ (Plantillas) │        │(React│    │ REST │   B) Monorepo Stateful RT ⭐
│ Genera HTML  │        │ + jQuery     │        │ CDN) │    │(Node)│      (Figma / Miro / Nuestro caso)
└──────────────┘        └──────────────┘        └──────┘    └──────┘
```

### Era 1: El Monolito Renderizado en Servidor (1995 – 2005)
* **Arquitectura:** Un solo proceso centralizado (PHP, Perl CGI, Java Servlets, Ruby on Rails, Django).
* **Mecánica:** El navegador era un visualizador pasivo. Cada interacción disparaba una petición HTTP completa de ida y vuelta: el servidor reconstruía la página desde cero inyectando datos en plantillas HTML y la devolvía íntegra.
* **Frontend:** No existía como disciplina independiente; JavaScript era un lenguaje accesorio para validar formularios o mostrar alertas en el DOM.

### Era 2: La Revolución AJAX y las Primeras SPAs (2005 – 2013)
* **El cambio de paradigma:** En 2005, el lanzamiento de **Google Maps y Gmail** demostró que el navegador podía intercambiar fragmentos de datos en segundo plano mediante `XMLHttpRequest` (AJAX) sin refrescar la pantalla completa.
* **Surgimiento de librerías:** Nació jQuery (2006) para mitigar las inconsistencias del DOM entre navegadores, seguido por los primeros frameworks con modelos de cliente: **Backbone.js (2010)** y **AngularJS (2010)**.
* **Organización:** Se mantenía un único repositorio donde el código cliente residía en carpetas tipo `public/javascripts/`, pero el navegador comenzó a retener estado y orquestar vistas locales.

### Era 3: La Gran Separación y el Dolor del Polyrepo (2013 – 2020)
* **El auge de las Single Page Applications (SPAs):** Con la consolidación de **React (2013)** y empaquetadores como Webpack, la industria promovió la escisión total entre frontend y backend:
  * **Repo 1 (`frontend`):** SPA estática compilada y desplegada globalmente en redes de distribución de contenido (CDNs).
  * **Repo 2 (`backend`):** API REST tradicional en Node.js, Go o Python.
* **El problema de fondo (Desincronización de Contratos):** Los repositorios independientes obligaban a duplicar manualmente las interfaces y tipos de datos en ambos extremos. Las modificaciones de contrato en el backend causaban rupturas silenciosas en producción al no existir validación cruzada en tiempo de compilación.

### Era 4: El Escenario Actual y la Gran Bifurcación (2020 – Presente)
La industria se polarizó en dos soluciones frente a las fallas de la Era 3:
1. **Para aplicaciones orientadas a documentos, contenido y transacciones cortas:** Los **Metaframeworks Fullstack Serverless** (Next.js, Remix, Nuxt) que absorben todo en un modelo HTTP sin estado.
2. **Para aplicaciones colaborativas de alta fidelidad e interacción continua:** El **Monorepo con Workspaces y Servidor Persistente con Estado (Stateful Real-Time Monorepo)** (el modelo adoptado por Figma, Miro, Linear y nuestro proyecto), donde el backend mantiene conexiones TCP persistentes en memoria y comparte contratos tipados con el cliente de forma atómica y sin fricción.

---

> 💡 **Invariante Fundamental:**
> *"La naturaleza del estado determina la topología de la infraestructura: los sistemas efímeros pertenecen a funciones Serverless sin estado; los sistemas colaborativos en tiempo real exigen procesos persistentes con estado en memoria, orquestados en un monorepo para garantizar integridad tipada de punta a punta."*

---

## 30/09/2026 - Aislamiento de Dependencias en el Monorepo (pnpm)

Durante la inicialización del monorepo, se hizo evidente el porqué de la existencia de múltiples carpetas `node_modules` dispersas en `apps/server`, `apps/web` y `packages/contracts`.

**Descubrimiento Arquitectónico: La Evolución de la Resolución de Dependencias**

El comportamiento de aislar múltiples carpetas `node_modules` utilizando `pnpm` workspaces es una decisión arquitectónica diseñada para resolver los problemas históricos de los gestores de paquetes en Node.js. Existen tres etapas clave para comprender esto:

1. **Anidamiento Profundo (npm clásico v1/v2):**
   Originalmente, cada paquete instalado descargaba sus propias dependencias dentro de su propia subcarpeta `node_modules`. Si 10 librerías requerían `lodash`, el código de `lodash` se duplicaba 10 veces físicamente en el disco. Esto garantizaba aislamiento (cada paquete tenía exactamente lo que pedía), pero generaba estructuras de directorios excesivamente profundas, provocando errores por límite de longitud de rutas en sistemas operativos (ej. Windows) y un consumo ineficiente de almacenamiento.

2. **Aplanamiento o Hoisting (Yarn v1 / npm v3+):**
   Para solucionar el consumo de disco y las rutas largas, se implementó el "Hoisting" (izado). Consiste en extraer todas las dependencias, directas y transitivas, y colocarlas planas en un único `node_modules` en la raíz del proyecto.
   **El Problema:** Esto generó las **Dependencias Fantasma (Phantom Dependencies)**. Como todas las librerías comparten la misma carpeta raíz, un archivo en `apps/server` puede importar exitosamente una librería (ej: `zod`) sin haberla declarado en su propio `package.json`, simplemente porque otro paquete del monorepo la instaló. Si dicho paquete se elimina o actualiza en el futuro, `apps/server` dejará de funcionar inesperadamente en producción debido a que su dependencia oculta desapareció.

3. **Topología Estricta con Symlinks (pnpm):**
   `pnpm` combina la eficiencia del aplanamiento con la seguridad del anidamiento mediante enlaces simbólicos del sistema operativo (symlinks). 
   - **Almacenamiento global:** Guarda los archivos físicos reales de las dependencias una sola vez en un almacén central (`.pnpm-store` en la raíz).
   - **Aislamiento local:** En el `node_modules` de cada aplicación individual (`apps/server`, `apps/web`), pnpm inyecta *únicamente* los symlinks de las dependencias explícitamente declaradas en el `package.json` de esa carpeta.
   - **Garantía:** Si `apps/server` intenta importar una librería no declarada, Node.js arrojará un error inmediatamente, previniendo la existencia de dependencias fantasma.

**Impacto de la Decisión:**
Esta estrategia garantiza que cada pieza de software dentro del monorepo es estrictamente declarativa y autocontenida. Al forzar esta validación de dependencias locales, aseguramos que la portabilidad de los Módulos (Bounded Contexts) o Apps esté garantizada, logrando un verdadero desacoplamiento a nivel de infraestructura.

---

## 04/10/2026 - Separation of Concerns vs Velocidad (El Agnosticismo del Dominio)

Durante el diseño del Módulo 1.5 (Gestor de Cámara y Layout a 60 FPS), surgió el debate arquitectónico sobre usar las herramientas reactivas del framework UI (`React Context`, `useState`) para propagar las coordenadas matemáticas del viewport hacia los módulos hijos.

**Descubrimiento Arquitectónico: El Infierno del "Context Thrashing" y la Esclavitud al Framework**

Usar el framework (React) para agilizar la sincronización de estado es la decisión correcta para la **Interfaz Superficial (UI superficial)** (modales, menús, botones), donde los cambios son de baja frecuencia. React fue diseñado como una "impresora declarativa" para datos estables.

Sin embargo, cuando la aplicación entra al terreno del **Dominio Físico/Matemático de Alta Frecuencia** (coordenadas de ratón a 60 FPS, WebSockets, colisiones, cámara, transformaciones espaciales), usar React se convierte en un anti-patrón catastrófico por dos motivos:

1. **Destrucción del Rendimiento (Context Thrashing):** La reconciliación del Virtual DOM no soporta ciclos de 60 FPS continuos. Si un `React Context` almacena el valor `cameraX`, cada arrastre del usuario provocará un "re-render" en cascada sobre miles de nodos SVG e iFrames. El hardware colapsará.
2. **Violación de Clean Architecture (Acoplamiento de Dominio):** La matemática espacial y la física de colisión le pertenecen al "Core" de la aplicación. Si se almacenan en un `useState` o un `Context`, el Core queda esclavizado a React. El día que se migre la Pizarra Vectorial a Vanilla WebGL o WebAssembly, todo el código será inservible.

**La Solución: El "Agnostic Store" Transitorio**
El estado de la cámara y las posiciones físicas deben almacenarse en un **Almacén Agnóstico (Vanilla JS/TS)** (ej. patrón Observer puro o Zustand). Los módulos leen este estado **por demanda** de forma silenciosa, sin despertar el ciclo de renderizado (Zero Re-renders). 

**Impacto de la Decisión:**
Consagra la regla de Clean Architecture: *"React es solo la impresora tonta"*. El Dominio calcula la física en JS puro, y le ordena a React qué pintar solo al final.





