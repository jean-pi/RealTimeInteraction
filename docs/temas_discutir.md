# Debate Técnico: Delimitación de Bounded Contexts y Contratos de Interconexión

Este documento formaliza la partición modular del sistema, resolviendo el dilema entre **la dispersión caótica (sobre-modularización artificial)** y **el bloque monolítico inmanejable (*God Module*)**.

---

## 1. El Riesgo Arquitectónico: La Falacia del "Lienzo Monolítico"

Al diseñar una plataforma interactiva en tiempo real, es común caer en uno de dos extremos destructivos:

1. **Sobre-modularización prematura (6+ micro-módulos):** Convertir detalles de presentación visual (CSS, partículas, animaciones) en Bounded Contexts, o aislar la cámara en un subsistema paralelo cuando comparte el 90% de las invariantes de una ventana.
2. **El Bloque Monolítico Monstruoso (Meter todo en un "Módulo 2: Lienzo"):** Agrupar el motor gráfico de trazos vectoriales (Canvas/WebGL a 60 fps), el gestor de ventanas DOM, el streaming WebRTC y la lógica de cada widget en un único módulo. Esto viola la cohesión y hace imposible el desacoplamiento (*Plug & Play*).

---

## 2. La Arquitectura Canónica: 4 Bounded Contexts Desacoplados

Para garantizar que cada capacidad sea autónoma, testeable en aislamiento y acoplable/desacoplable sin dependencias circulares, el sistema se divide en **4 Bounded Contexts ortogonales**:

```text
                               ┌────────────────────────────────┐
                               │           MÓDULO 01            │
                               │     room-presence (Núcleo)     │
                               └───────────────┬────────────────┘
                                               │ Bus de Eventos (Auth/Presencia)
                                               ▼
                               ┌────────────────────────────────┐
                               │          MÓDULO 01.5           │
                               │    workspace-stage (Shell)     │
                               │  (Contenedor Padre 1920x1080)  │
                               └───────────────┬────────────────┘
                                               │
                 ┌─────────────────────────────┼─────────────────────────────┐
                 │                             │                             │
                 ▼                             ▼                             ▼
  ┌─────────────────────────────┐┌─────────────────────────────┐┌─────────────────────────────┐
  │          MÓDULO 02          ││          MÓDULO 03          ││          MÓDULO 04          │
  │     whiteboard-engine       ││       window-manager        ││      workspace-widgets      │
  │                             ││                             ││                             │
  │ • Trazos vectoriales 2D     ││ • Contenedores flotantes    ││ • Catálogo de plugins       │
  │ • Lápiz, color, grosor      ││ • Coordenadas X/Y, Orden Z  ││   autónomos:                │
  │ • Renderizado Canvas/WebGL  ││ • Arrastre y redimensión    ││   - Widget Notas            │
  │ • Append-only de puntos     ││ • Estado atenuado/ausencia  ││   - Widget Cronómetro       │
  │                             ││ • Slot para widgets         ││   - Widget Todo List        │
  │                             ││                             ││   - Widget Cámara (WebRTC)  │
  └─────────────────────────────┘└──────────────┬──────────────┘└──────────────┬──────────────┘
                                                │                              │
                                                └──────────────┬───────────────┘
                                                               │
                                                    Contrato Host <-> Plugin
                                                    (id_contenedor, payload_datos)
```

---

## 3. Contratos de Interconexión (Cómo se comunican los Boundaries)

Un límite arquitectónico es una ficción si no tiene contratos de red y de memoria rigurosamente definidos. La comunicación entre los 4 módulos ocurre a través de 3 mecanismos explícitos:

### Contrato A: Bus de Eventos de Ciclo de Vida (Módulo 01 ──► Módulos 02, 03, 04)
El Módulo 01 es la autoridad central de presencia. No conoce la interfaz gráfica ni los widgets; solo emite eventos tipados a un bus en memoria al que los demás módulos reaccionan de forma reactiva:

* **Evento `user:disconnected` (Usuario entra en ventana de gracia de 10s):**
  * `whiteboard-engine` (Módulo 02): No muta. Los trazos existentes permanecen intactos (Regla 14.2).
  * `window-manager` (Módulo 03): Transiciona las ventanas del usuario a `MUTED_BY_ABSENCE` (apariencia atenuada y bloqueada para edición ajena, Regla 7.4).
  * `workspace-widgets / camera` (Módulo 04): Detiene inmediatamente el stream audiovisual WebRTC y muestra el avatar estático en pausa (Regla 7.7).
* **Evento `user:reconnected` (Usuario recupera la señal antes de 10s):**
  * `window-manager` (Módulo 03): Restaura las ventanas a estado interactivo activo.
* **Evento `user:kicked` (Expulsión ejecutada por el Anfitrión):**
  * `window-manager` (Módulo 03): Puga de la memoria y la persistencia todos los contenedores y datos asociados a ese usuario (Regla 12.8).

### Contrato B: Sistema de Coordenadas y Viewport Fijo (Módulo 02 ◄──► Módulo 03)
¿Cómo conviven la pizarra de dibujo y las ventanas flotantes en la misma pantalla sin acoplarse?
* **Contrato Matemático de Espacio (Resolución Virtual Fija):** Se establece la prohibición estricta de *Zoom* y *Pan*. El lienzo tiene una resolución interna fija (ej. `1920x1080`). La única transformación espacial es un escalado CSS proporcional para ajustar este lienzo al tamaño del monitor del usuario (`object-fit: contain`).
  $$\text{coordenada}_{\text{interna}} = \text{coordenada}_{\text{pantalla}} \times \text{factor\_de\_escala\_monitor}$$
* **Aislamiento de Renderizado (El Híbrido DOM/Canvas):**
  * La **Pizarra (Módulo 02)** opera al **fondo** (`z-index: 1`) en un Canvas 2D estático.
  * Las **Ventanas (Módulo 03)** se renderizan al **frente** (`z-index: 10`) como elementos del DOM HTML.
* **Modo de Interacción (Pointer Events):** Cuando se dibuja, el Canvas intercepta los clics (`pointer-events: auto`). Al usar la herramienta "Puntero/Selección", el Canvas se vuelve invisible a los clics (`pointer-events: none`), permitiendo al usuario arrastrar e interactuar con las ventanas del Módulo 03 de forma nativa.

### Contrato C: Patrón Host-Plugin (Módulo 03 ◄──► Módulo 04)
Para evitar que el Gestor de Ventanas conozca la lógica de cada herramienta, se aplica el **Principio Abierto/Cerrado (OCP)**:

1. **El Gestor de Ventanas (Módulo 03) actúa como HOST:**
   * Administra únicamente la envoltura espacial y permisos:
     ```typescript
     interface WindowContainer {
       id: string;
       ownerId: string;
       position: { x: number; y: number };
       size: { width: number; height: number };
       zIndex: number;
       isMinimized: boolean;
       status: 'ACTIVE' | 'MUTED_BY_ABSENCE';
     }
     ```
   * Provee los controles de arrastre, redimensión, botón de cerrar (`X`) y minimizado.

2. **Cada Widget (Módulo 04) actúa como PLUGIN:**
   * Es un componente autónomo que implementa un contrato estándar:
     ```typescript
     interface CanvasWidgetPlugin<TData> {
       type: 'NOTE' | 'TIMER' | 'TODO' | 'CAMERA' | 'IMAGE';
       renderContent(data: TData, isReadOnly: boolean): JSX.Element;
       onDataChange(newData: Partial<TData>): void;
     }
     ```
   * El widget de Notas no sabe cómo se calcula el orden Z ni cómo se arrastra la ventana.
   * El Gestor de Ventanas no sabe qué es un temporizador ni qué es una cámara.

---

## 4. Matriz de Frecuencia de Red y Modelo de Datos por Módulo

| Módulo | Tipo de Tráfico de Red | Frecuencia | Modelo de Persistencia |
| :--- | :--- | :--- | :--- |
| **01. Room & Presence** | Paquetes de control JSON (WebSocket) | Discreta / Latidos cada 5s | Base de datos relacional (Usuarios, Membresías, Salas) + RAM |
| **02. Whiteboard** | Stream vectorial continuo (WebSocket) | Alta (Throttled 30–60 fps) | Colección de trazos *Append-Only* |
| **03. Window Manager** | Transformaciones espaciales (WebSocket) | Media (Al arrastrar) / Discreta | Tabla relacional de contenedores (`x, y, w, h, zIndex`) |
| **04. Widgets** | Mutaciones de estado JSON / Streaming P2P | Discreta (Notas, Timer) / WebRTC (Cámara) | Tablas específicas por widget (excepto Cámara que es efímera) |

---

## 5. Conclusión del Debate

Esta separación en **4 Bounded Contexts**:
1. Respeta el principio de **alta cohesión y bajo acoplamiento**.
2. Evita la sobre-modularización (no crea módulos para detalles visuales/CSS).
3. Evita el "módulo monstruo" separando el motor gráfico de dibujo, el gestor de ventanas y los plugins funcionales.
4. Permite que la especificación de cada módulo sea concisa, independiente y directamente ejecutable mediante TDD.

---