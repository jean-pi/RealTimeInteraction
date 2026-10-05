# Módulo 1.5: Workspace Stage (Contenedor Padre)
## Proyecto: RealTime Interaction
### Documento de Especificación Arquitectónica

---

## 1. Propósito, Alcance y Límite Arquitectónico

### 1.1. Propósito del Módulo
Este módulo es el **Escenario Principal (Shell)** de la aplicación. Su única responsabilidad es administrar el espacio de trabajo geométrico, manejar la cámara (paneo) según el dispositivo, e inyectar de forma agnóstica los módulos visuales hijos (Módulo 02 y Módulo 03).

### 1.2. Límite Arquitectónico (Frontera del Módulo)
* **Punto de llegada:** El módulo concluye en la orquestación del layout HTML y la traducción matemática del viewport. Establece el contenedor escalado (`transform: scale()`) y coordina las capas (Z-Index).
* **Fuera de alcance:** Este módulo NO procesa los eventos de dibujo (`PointerEvents`) ni gestiona la barra de herramientas (lápiz, mano, goma). Delega la lectura cruda del DOM a los módulos hijos para preservar el rendimiento y los datos de hardware.

### 1.3. Invariantes Negativos y Anti-Requisitos
* **ANTI-01: Prohibición de Secuestro de Eventos (Event Interception)**
  * *Declaración:* El Contenedor Padre NO intercepta ni detiene los eventos del puntero (`PointerEvents`) para pasarlos como propiedades reactivas a sus hijos.
  * *Razón de diseño:* Evitar el cuello de botella del ciclo de renderizado de React. Los módulos hijos (ej. Módulo 2) deben escuchar directamente al DOM nativo para mantener los 60 FPS y capturar telemetría pura (ej. presión del lápiz).

---

## 2. Reglas de Negocio (RN)

### RN-01: El Sistema de Coordenadas y el "Área Segura"
* **RN-01.1.** El espacio de trabajo colaborativo utiliza un sistema de coordenadas lógicas anclado al centro `(X: 0, Y: 0)`.
* **RN-01.2.** Existe un **Área Segura de referencia** equivalente a `1920x1080` unidades lógicas (proporción 16:9), garantizando consistencia geométrica base entre todos los participantes.

### RN-02: Estrategia de Escalado (Sangría Dinámica)
* **RN-02.1.** El lienzo físico se adapta dinámicamente igualando el **ANCHO** lógico de la pantalla, con un límite máximo de proporción 16:9.
* **RN-02.2. Monitores Panorámicos (16:9):** El ancho y la altura calzan al 100%. El usuario ve exactamente el Área Segura.
* **RN-02.3. Tablets/iPad (4:3 o similares):** Al igualar el ancho, la altura lógica expone espacio adicional (*Bleed Area* o Sangría) por encima y debajo del Área Segura. El usuario asume orgánicamente que sus trazos en los bordes extremos podrían no ser visibles en pantallas 16:9.
* **RN-02.4. Monitores Ultrawide (21:9 o mayor):** El lienzo se topa con el límite 16:9 y se centra (Pillarboxing) dejando bordes inactivos a los lados.

### RN-03: Navegación y Paneo Móvil
* **RN-03.1.** El paneo libre (arrastrar la pantalla entera) está desactivado en resoluciones de Tablet y Desktop, ya que la regla RN-02 asegura la visibilidad del ancho total.
* **RN-03.2. Excepción Móvil:** En teléfonos celulares (pantallas verticales), se suspende el encaje por ancho. El lienzo se inicializa con un zoom predeterminado y se habilita una "Cámara Virtual" (Paneo manual).
* **RN-03.3. Desambiguación de Gestos:** El permiso para ejecutar el paneo en móviles es dictado por la herramienta activa del **Módulo 2** (ej. herramienta "Mano"). El Módulo 1.5 solo obedece la variable de estado habilitada por los módulos funcionales para saber cuándo mover la cámara y cuándo ignorar el evento.

### RN-04: Estratificación Estricta (El Sándwich de Z-Index)
* **RN-04.1.** El Módulo 1.5 impone un orden estricto de renderizado (Z-Index) de fondo a frente:
  1. **Nivel 0 (Fondo):** Pizarra Vectorial (Módulo 2).
  2. **Nivel 100:** Gestor de Ventanas Flotantes (Módulo 3).
  3. **Nivel 500:** Cursores Telepresentes (Los ratones remotos de otros usuarios).
  4. **Nivel 1000 (Frente Absoluto):** Interfaz UI Local y Modales de sistema. Los cursores remotos nunca podrán sobreponerse a los menús del usuario local.

### RN-05: Sincronización de Telepresencia (Cursores)
* **RN-05.1.** El renderizado visual de los cursores remotos de la sala recae exclusivamente en el Contenedor Padre.
* **RN-05.2.** Utiliza la red multiplexada del Módulo 1 para enviar sus propias coordenadas lógicas y escuchar las de los demás.
* **RN-05.3.** Para prevenir la saturación de red, la emisión local de coordenadas aplica *Throttling* (aceleración regulada, ej. 30 fps).
* **RN-05.4.** El renderizado inyecta los cursores como nodos DOM directamente dentro del contenedor escalado. No hay traducción matemática en Javascript para la telepresencia; la tarjeta gráfica (CSS) escala la posición automáticamente.

### RN-06: Exposición del Estado de Cámara (Viewport Context)
* **RN-06.1.** Como "Dueño de la Cámara", el Módulo 1.5 está obligado a exponer un estado global reactivo de solo lectura (ej. vía Context) con las variables: `{ scale, cameraX, cameraY }`.
* **RN-06.2.** Los módulos hijos (M2 y M3) consumirán estas variables para poder traducir de forma autónoma sus propios eventos físicos (`e.clientX`) a coordenadas lógicas puras durante el dibujo o arrastre.

### RN-07: La "Prisión Geométrica" (Bounding Box de Ventanas)
* **RN-07.1.** Matemáticamente, el Área Segura va desde `X: -960, Y: -540` hasta `X: 960, Y: 540`. Esta es la única zona garantizada como visible y "alcanzable" para el 100% de los dispositivos (sin importar su Aspect Ratio o Sangría).
* **RN-07.2.** M1.5 **delega** la aplicación de este límite al **Módulo 3**. El Gestor de Ventanas leerá este Bounding Box y creará la física de colisión (Clamping) para evitar que un usuario arrastre una ventana hacia su zona de sangría ciega.
