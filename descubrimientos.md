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

# Tratamiento Homogéneo y Resolución de Relaciones Muchos a Muchos (N:M) en DDD

Modelado formal de entidades asociativas con roles para erradicar la complejidad condicional y el antipatrón del caso especial.

---

## 1. Origen Histórico y Genealogía

* **Álgebra Relacional y Formas Normales (1970):** Introducido por **Edgar F. Codd** en su artículo fundacional *"A Relational Model of Data for Large Shared Data Banks"*. Establece que las relaciones Muchos a Muchos ($N:M$) no pueden coexistir directamente dentro de una tupla sin violar la Primera Forma Normal (1NF), exigiendo la descomposición mediante una relación binaria asociativa (tabla de unión, puente o *junction table*).
* **El Patrón Party-Role y Accountability (1997):** Sistematizado por **Martin Fowler** en *"Analysis Patterns: Reusable Object Models"*. Plantea que los roles que un actor desempeña en un contexto no deben modelarse mediante herencia rígida (`class Owner extends User`, `class Guest extends User`), sino a través de una relación contractual asociativa que decora y cualifica el vínculo.
* **Entidades de Dominio e Invariantes Asociativos (2003):** Formalizado por **Eric Evans** en *"Domain-Driven Design: Tackling Complexity in the Heart of Software"*. Define que cuando una relación entre dos agregados acumula ciclo de vida, reglas de negocio o identidad propia, la asociación asciende formalmente al estatus de **Entidad Asociativa de Dominio** con sus propios invariantes de consistencia y autorización.

---

## 2. El Problema: El Antipatrón del Caso Especial (Special Case Antipattern)

Cuando una entidad raíz (un Recurso, una Organización, un Espacio Colaborativo) tiene un "Propietario" o "Creador" y al mismo tiempo admite "Miembros" o "Invitados", muchos diseñadores cometen el error de tratar al propietario como una entidad o relación estructuralmente separada:

```
❌ MODELADO HETEROGÉNEO (Antipatrón del Caso Especial)
Recurso ─── 1:1 ───> Propietario (Columna propietario_id en Recurso)
Recurso ─── 1:N ───> MiembrosInvitados (Tabla separada para los demás)
```

### Consecuencias Técnicas Destructivas:
1. **Proliferación de Código Condicional (Branching Explosion):** Toda operación de consulta, autorización, renderizado de listas o difusión en tiempo real se ve forzada a bifurcar su lógica con `if/else` defensivos:
   ```typescript
   // Código frágil y propenso a regresiones:
   function obtenerParticipantes(recursoId) {
     const duenio = db.recursos.findPropietario(recursoId);
     const invitados = db.invitados.findByRecurso(recursoId);
     return [duenio, ...invitados]; // Unión manual de estructuras heterogéneas
   }
   ```
2. **Consultas Asimétricas (N+1 Queries):** Para saber si un usuario tiene acceso a un recurso, el sistema debe consultar dos tablas distintas o ejecutar un `UNION` artificial, impidiendo un indexado limpio y degradando la latencia de red.
3. **Fragilidad ante Cambios de Negocio:** Si en el futuro se introducen nuevos privilegios intermedios (ej. Co-Host, Administrador Delegado, Auditor), el modelo colapsa porque el "Caso Especial" del dueño estaba grabado a fuego en el esquema físico.

---

## 3. El Principio: Tratamiento Homogéneo (Homogeneous Treatment Pattern)

El **Principio de Tratamiento Homogéneo** dicta:
> *"Modela todos los vínculos de participación bajo una abstracción de datos uniforme y simétrica; delega las diferencias de jerarquía y privilegios a la semántica de roles y a los invariantes del dominio."*

### La Solución Relacional y de Dominio:
Se modela una única **Entidad Asociativa (Membership / Participación)** para TODA persona con acceso al recurso, **INCLUYENDO AL PROPIETARIO**:

```
┌───────────────┐       1:N        ┌─────────────────────────────┐       N:1        ┌───────────────┐
│    Usuario    │ ───────────────> │         Membresia           │ <─────────────── │    Recurso    │
│    (Actor)    │                  │ (Entidad Asociativa: N:M)   │                  │  (Espacio)    │
│               │                  │  - rol: HOST | GUEST        │                  │               │
│               │                  │  - estado: ACTIVE | REVOKED │                  │               │
└───────────────┘                  └─────────────────────────────┘                  └───────────────┘
```

---

## 4. Mecanismos Clave y Beneficios Técnicos

### 1. Consultas Simétricas y Atómicas (Single Query Consistency)
Obtener la totalidad de participantes con acceso vigente se reduce a una única consulta sobre la tabla asociativa indexada:
```sql
SELECT usuario_id, rol, estado 
FROM membresias 
WHERE recurso_id = :recursoId AND estado = 'ACTIVE';
```
La interfaz de usuario, el canal de mensajería en tiempo real y el motor de políticas de autorización procesan una sola colección uniforme.

### 2. Invariante de Dominio: La Membresía Raíz Inmortal (Root Membership Invariant)
El propietario posee un registro idéntico en la tabla `Membresia`, pero su comportamiento está protegido por reglas de negocio en la capa de dominio:
* **Operación `AbandonarRecurso(usuarioId, recursoId)`:**
  * Si `membresia.rol === GUEST`: Transición válida a `estado = REVOKED`.
  * Si `membresia.rol === HOST`: Violación de invariante. Lanza excepción de dominio `CANNOT_ABANDON_OWNED_RESOURCE`.
* **Operación `ExpulsarMiembro(targetUsuarioId)`:**
  * El dominio valida que `targetMembresia.rol !== HOST` antes de permitir la revocación.

La diferencia entre el creador y el invitado no reside en una estructura física distinta, sino en **los invariantes de transición de su máquina de estados**.

---

## 5. Analogía Arquitectónica: El Manifiesto de Navegación

> En una embarcación marítima internacional, las autoridades portuarias y el oficial de seguridad no mantienen dos documentos separados: uno titulado "El Capitán del Barco" y otro titulado "Los Marineros". 
> 
> Existe un único documento oficial y vinculante: el **Manifiesto de Tripulación (Crew Manifest)**. En él figuran todos los seres humanos a bordo. El Capitán ocupa la primera fila con rango `"Capitán"`, mientras que los oficiales y marineros ocupan las siguientes filas con sus respectivos rangos. 
> 
> Para calcular las raciones de comida, planificar los botes salvavidas o registrar la entrada en un puerto extranjero, el sistema consulta **una única lista uniforme**. La diferencia de autoridad del Capitán no requiere un documento aparte; está codificada en las atribuciones de su rango.

---

## 6. Referencias Externas para Profundizar

* 📘 *Analysis Patterns: Reusable Object Models* (Martin Fowler, Addison-Wesley, 1997 - Cap. 2: "Accountability and Party-Role").
* 📘 *Domain-Driven Design: Tackling Complexity in the Heart of Software* (Eric Evans, Addison-Wesley, 2003 - Cap. 5: "Model Driven Design: Associations & Entities").
* 📄 *A Relational Model of Data for Large Shared Data Banks* (E. F. Codd, Communications of the ACM, 1970).
* 📘 *Refactoring: Improving the Design of Existing Code* (Martin Fowler - "Replace Conditional with Polymorphism" y "Introduce Special Case").

---

> 💡 **Invariante Fundamental:**
> *"Nunca bifurques la estructura de datos para resolver una asimetría de privilegios. Unifica el modelo mediante entidades asociativas homogéneas y traslada la diferencia a roles protegidos por invariantes de dominio."*


