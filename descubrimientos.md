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

## ¿Qué es Domain-Driven Design (DDD)?

**Domain-Driven Design (DDD)** es una disciplina de diseño de software (formalizada por Eric Evans en 2003) donde la estructura y el vocabulario del código reflejan fielmente el modelo conceptual del negocio, subordinando la tecnología, frameworks y bases de datos a meros detalles de implementación.

* 📄 **Referencia Externa:** [Domain-Driven Design Reference (Eric Evans, 2015)](https://www.domainlanguage.com/ddd/reference/)

