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


