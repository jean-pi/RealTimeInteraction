# Relación entre Rebanadas Verticales (Vertical Slices), Lazy Loading y Dominio

Documento de debate técnico y análisis arquitectónico profundo.

---

## 1. Cómo Funciona el Lazy Loading a Bajo Nivel (Teoría de Grafos del Empaquetador)

Cualquier empaquetador moderno (como **Vite, Rollup, Webpack o esbuild**) no procesa carpetas; construye un **Grafo Dirigido de Módulos** a partir del punto de entrada (`main.tsx` o `index.html`):

1. **Importación Estática (`import { X } from './Y'`):** Crea una arista síncrona obligatoria. El empaquetador incluye `./Y` en el mismo archivo JavaScript inicial (`main.chunk.js`).
2. **Importación Dinámica (`import('./path')` o `React.lazy()`):** Marca un **Punto de Corte (Split Point)**. El empaquetador corta el grafo en ese vértice y empaqueta ese nodo y todas sus dependencias en un archivo físico independiente: un **Chunk Dinámico** (`chunk-xyz.js`).

---

## 2. El Fracaso del Lazy Loading en Arquitecturas Horizontales (Fuga de Dependencias)

En una arquitectura tradicional por capas horizontales globales (`src/ui/`, `src/use-cases/`, `src/adapters/`), el lazy loading suele fallar de forma silenciosa por **fuga de dependencias (Bundle Leakage)**:

```
src/
├── ui/              ◄── Se intenta aplicar lazy load sobre CheckoutModal.tsx
├── use-cases/       ◄── CheckoutUseCase.ts
└── adapters/        ◄── StripePaymentAdapter.ts (¡Importa un SDK pesado de 300 KB!)
```

* Si en algún punto del sistema (un contenedor de dependencias global, un index central o un helper común) alguien importa estáticamente el adaptador de Stripe:
* **El Punto de Corte se rompe.**
* El empaquetador rastrea la importación estática y arrastra los 300 KB del SDK externo al **chunk principal del arranque**.
* El usuario que únicamente abrió la pantalla de login termina descargando y compilando el código de pagos sin saberlo.

---

## 3. La Simbiosis con Vertical Slices: El Sub-Grafo Confinado

Una **Rebanada Vertical** es un **sub-grafo acíclico cerrado** que se comunica con el exterior a través de una única frontera: su `index.ts`.

```
                                  APLICACIÓN PRINCIPAL (main.tsx)
                                                │
                               (Arista Dinámica / Split Point)
                         const Checkout = React.lazy(() => import('@features/checkout'))
                                                │
                       ═════════════════════════╪══════════════════════════════════ Frontera de Red
                                                ▼
                                   [ CHUNK: checkout.chunk.js ]
                                   ┌───────────────────────────┐
                                   │ index.ts (Frontera)       │
                                   │   │                       │
                                   │   ▼                       │
                                   │ CheckoutModal.tsx         │
                                   │   │                       │
                                   │   ▼                       │
                                   │ CheckoutUseCase.ts        │
                                   │   │                       │
                                   │   ▼                       │
                                   │ StripePaymentAdapter.ts   │
                                   │   │                       │
                                   │   ▼                       │
                                   │ [ SDK Stripe: 300 KB ]    │
                                   └───────────────────────────┘
```

### Mecanismos Clave:
1. **Isomorfismo Carpeta $\longleftrightarrow$ Chunk:** La carpeta `features/checkout/` en disco se traduce exactamente en el archivo físico `checkout.chunk.js` en el servidor web.
2. **Cero Fuga Transversal:** Como las demás features tienen prohibido importar las tripas internas de `checkout`, el empaquetador garantiza que nada de esa carpeta viaje en el bundle inicial.
3. **Contención de SDKs Pesados:** Las librerías de terceros complejas quedan atrapadas dentro del chunk dinámico y solo viajan por la red cuando el usuario activa esa funcionalidad.

---

## 4. Beneficios Críticos en Tiempo de Ejecución (Runtime)

1. **Aceleración del Motor JavaScript (Parseo y Compilación en CPU):**
   * El navegador no solo descarga código; el hilo principal (Main Thread) debe compilar el texto a bytecode.
   * Con Vertical Slices y Lazy Loading, en el arranque la CPU solo compila el chunk mínimo indispensable (~50 KB), manteniendo excelentes métricas de interactividad (**TTI e INP**).
2. **Invalidación Granular de Caché HTTP:**
   * Si se modifica un bug en `checkout`, únicamente cambia el hash del archivo `checkout.[hash].js`.
   * Los chunks de las demás features en el navegador del usuario permanecen intactos en caché.
3. **Consumo de Memoria RAM Confinado:**
   * En interfaces complejas, los módulos que el usuario no utiliza jamás son instanciados en el *heap* de memoria del navegador.

---

## 5. ¿Cómo se Relaciona esto con Crear Carpetas Locales Repetidas (Subcarpetas vs. Root)?

La intuición de crear carpetas como `components/`, `services/`, `adapters/` dentro de cada vista (en lugar de ponerlas todas en la raíz `src/`) nació precisamente para resolver este problema: **evitar que el chunk principal (`main.chunk.js`) se sobrecargue con cosas que no son para todo el mundo**.

### La Comparación Técnica:
* **El Problema que Intentabas Evitar:** Si pones `login.service.ts` o un `PaymentButton.tsx` en `src/services/` o `src/components/` globales, corres el riesgo de que el empaquetador los meta al bundle principal, penalizando la carga de toda la aplicación.
* **El Propósito Compartido:** Tanto tu técnica de "subcarpetas repetidas por vista" como la arquitectura de **Vertical Slices** buscan exactamente lo mismo: **confinamiento de dependencias**.
* **La Evolución en Vertical Slices:**
  * En lugar de crear 4 cajones técnicos anidados dentro de la vista (`login/components/`, `login/services/`, `login/adapters/`), la Rebanada Vertical mantiene los archivos en el mismo nivel plano (`features/login/`).
  * **Logras exactamente el mismo confinamiento de dependencias para el Lazy Loading**, pero eliminas la fricción de navegar rutas profundas (`../../`) y carpetas vacías con un solo archivo.

---

## 6. ¿Dónde se Encuentra el Dominio en las Vertical Slices?

En Clean Architecture tradicional de libro, los desarrolladores buscan una carpeta monolítica global llamada `src/domain/` donde esperan encontrar todas las entidades de la empresa juntas.

En **Vertical Slice Architecture**, el dominio se concibe de forma radicalmente distinta:

### El Dominio está Descentralizado y Particionado por Bounded Contexts
No existe un "dominio universal gigante". **El dominio vive adentro de cada Rebanada Vertical**, modelado exclusivamente para el problema que esa rebanada resuelve:

```
src/
└── features/
    ├── auth/
    │   ├── auth.types.ts             ◄── DOMINIO DE AUTH: UserCredentials, SessionToken, AuthPort
    │   └── login.use-case.ts
    │
    ├── order-checkout/
    │   ├── checkout.types.ts         ◄── DOMINIO DE CHECKOUT: OrderSummary, Money, PaymentGatewayPort
    │   └── process-checkout.ts
    │
    └── room-presence/
        ├── presence.types.ts         ◄── DOMINIO DE PRESENCIA: Room, RoomMember, PresenceState
        ├── room-capacity.guard.ts    ◄── INVARIANTE DE DOMINIO: Aforo <= 10
        └── heartbeat-monitor.ts
```

### ¿Por qué esta distribución del Dominio es superior?
1. **Evita la Entidad Monolítica "Dios" (`User.ts` de 2,000 líneas):**
   * En `auth`, el usuario solo necesita `id`, `email` y `passwordHash`.
   * En `presence`, el usuario solo necesita `id`, `socketId` y `connectionState`.
   * Al partir el dominio por rebanadas, cada feature modela exactamente los atributos que necesita, sin arrastrar datos innecesarios.
2. **Invariantes Encapsulados:** Las reglas de negocio (ej. la regla de que el anfitrión tiene cupo garantizado) viven dentro de su propia rebanada vertical (`room-capacity.guard.ts`), blindadas de cualquier interferencia externa.
3. **Primitivas Globales Compartidas:** Lo único que reside en `src/shared/` son los identificadores universales puros (Value Objects como `UserId`, `TenantId`) que permiten correlacionar eventos entre rebanadas sin acoplarlas lógicamente.

---

> 💡 **Conclusión:**
> *El Dominio en Vertical Slices no es una capa horizontal distante; es el corazón palpitante de cada rebanada. Y el confinamiento físico de esa rebanada es lo que hace que el Lazy Loading sea matemáticamente perfecto.*

---

## 7. Conexión con el Límite del Módulo 1 (La Frontera del Sustrato)

El ejercicio previo de delimitar estrictamente el [Módulo 1: Núcleo de Sala y Presencia](file:///c:/Repos/RealTimeInteraction/docs/modulo_01_nucleo_sala_presencia.md) se conecta de forma directa y natural con todo lo discutido:

### A. La Primera Rebanada Vertical Fundacional (The Root Slice)
* El [Módulo 1](file:///c:/Repos/RealTimeInteraction/docs/modulo_01_nucleo_sala_presencia.md) es exactamente la **primera Rebanada Vertical del sistema** (`features/room-presence/` o sustrato base).
* Al definir que este módulo **concluye en el lienzo vacío con presencia verificada y aforo $\le 10$**, le dimos una **frontera de confinamiento perfecta**.

### B. Habilitador del Lazy Loading para Capas Superiores
* Si no hubiéramos trazado ese límite estricto, la lógica de presencia estaría entrelazada con el motor de dibujo, notas o chat.
* Gracias a este límite, **el motor gráfico pesado (Canvas 2D / WebGL / algoritmos CRDT) se convierte en una Rebanada Vertical posterior que se cargará 100% bajo demanda (Lazy Loaded)**.
* El usuario se conecta a la sala, valida aforo e intercambia heartbeats descargando un chunk mínimo (~40 KB). El motor de trazos o widgets solo viajará por la red una vez confirmada la admisión.

### C. Dominio Descentralizado y Puro
* El dominio del Módulo 1 solo conoce conceptos de su límite: `Room`, `Member`, `Host`, `Guest`, `CapacityGuard`, `PresenceState`.
* **Ignora por completo qué es un píxel, un trazo o un color.**
* Cuando implementemos los módulos superiores, ellos tendrán su propio dominio (`Stroke`, `Point`, `Brush`, `CRDTNode`) sin contaminar ni una sola línea del núcleo de sala y presencia.

### D. Los Anti-Invariantes como Guardianes de la Rebanada
* El invariante **ANTI-04 (Prohibición de capa gráfica y chat en este módulo)** es la regla arquitectónica explícita que protege al empaquetador de sufrir *Bundle Leakage*.
* Garantiza que ningún desarrollador ni agente de IA importe por error librerías gráficas dentro de la rebanada de presencia, manteniendo intacto el corte del sub-grafo.

---

> 💡 **Síntesis Integradora:**
> *Definir las "Reglas del Sistema General" fue, en esencia, trazar los límites físicos y lógicos de la primera gran Rebanada Vertical. Garantizó que el sustrato de red sea ligero e independiente, y que todo el peso de las herramientas colaborativas futuras pueda cargarse de forma perezosa (Lazy Loaded) sobre él.*

