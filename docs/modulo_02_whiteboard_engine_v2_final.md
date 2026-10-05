# Módulo 2: Motor de Pizarra Vectorial (Whiteboard Engine) v2
## Proyecto: RealTime Interaction
### Documento de Especificación Técnica y de Negocio (Arquitectura Final)

---

## 1. Propósito, Alcance y Límite Arquitectónico

### 1.1. Propósito del Módulo
Este módulo es el responsable exclusivo de la **captura, renderizado y sincronización en tiempo real de trazos vectoriales**. Proporciona un lienzo de dibujo de dimensiones finitas y fijas donde los usuarios pueden expresarse gráficamente mediante herramientas (lápiz y goma), garantizando alta fidelidad, 60 FPS y persistencia distribuida sin conflictos de concurrencia.

### 1.2. Límite Arquitectónico (Frontera del Módulo)
* **Punto de llegada:** El módulo procesa eventos de puntero (ratón/táctil), genera objetos inmutables de tinta digital (Strokes), los renderiza en un `<canvas>` HTML5 nativo y los sincroniza mediante WebSockets apoyándose en el middleware de autorización del Módulo 01.
* **Fuera de alcance:** Este módulo **NO** dibuja ventanas flotantes, no gestiona contenedores arrastrables, ni sabe qué usuario está en línea (eso es del Módulo 01). Si un usuario coloca un widget de cámara o un post-it, el Módulo 02 simplemente se queda "debajo" funcionando como una capa de fondo gráfica independiente.

### 1.3. Invariantes Negativos y Anti-Requisitos

* **ANTI-01: Prohibición del DOM para Renderizado Gráfico (No SVG)**
  * *Declaración:* Queda estrictamente prohibido usar elementos del DOM (ej. `<svg>`, `<path>`, o `<div>`) para representar los trazos de tinta.
  * *Razón de diseño:* El DOM colapsa al tener miles de nodos reactivos. Todo el dibujo se orquesta en una única etiqueta `<canvas>` nativa (2D o WebGL) para maximizar los fotogramas por segundo (FPS).

* **ANTI-02: Prohibición de Imágenes Base64 para Sincronización**
  * *Declaración:* El servidor y los clientes nunca intercambian el estado de la pizarra enviando imágenes rasterizadas (`canvas.toDataURL()`). Todo trazo en vivo debe ser puramente un arreglo matemático de coordenadas vectoriales.
  * *Razón de diseño:* Enviar imágenes fotograma a fotograma genera un consumo insostenible de ancho de banda y colisiones destructivas en la concurrencia. (La excepción de Snapshots ha sido deshabilitada en la v1 por seguridad, ver RN-05.4).

* **ANTI-03: Prohibición de Modificación Dinámica (Inmutabilidad en Sesión Activa)**
  * *Declaración:* Durante una sesión en vivo (`ACTIVE`), un trazo confirmado no puede ser alterado en su geometría, color o puntos intermedios. **Solo** el Borrado Total del Host (RN-04) tiene autoridad para truncar o reemplazar los trazos históricos.
  * *Razón de diseño:* Mantener una arquitectura temporal de *Append-Only* en tiempo real elimina de raíz las condiciones de carrera (Race Conditions) al sincronizar clientes.

* **ANTI-04: Normalización Autónoma (Dependencia del Agnostic Store)**
  * *Declaración:* El motor de pizarra NO determina el tamaño físico de su espacio ni controla la cámara. El origen absoluto `(0,0)` y la escala matemática son manejados por el **Módulo 1.5**. 
  * *Razón de diseño:* El Módulo 2 atrapa los eventos nativos crudos (`e.clientX`) y tiene la estricta obligación de consultar el **Almacén Agnóstico de Cámara** del M1.5 para traducir por su cuenta ese clic físico a coordenadas lógicas puras. No debe "esperar" a que React le inyecte coordenadas procesadas.

* **ANTI-05: Prohibición de Reloj Local para Ordenamiento (Z-Index)**
  * *Declaración:* El frontend tiene estrictamente prohibido determinar el orden de superposición visual de los trazos basándose en su reloj local (`timestamp`).
  * *Razón de diseño:* Los relojes de los clientes son inconsistentes y no confiables. El servidor es la única fuente de verdad: asigna un `sequence_id` autoincremental y global a cada evento recibido. El cliente debe acatar este orden para dibujar, logrando un determinismo 100% consistente entre todos los usuarios.

* **ANTI-06: Prohibición de Trazos Multi-Touch Paralelos**
  * *Declaración:* Un cliente no puede enviar múltiples trazos originados simultáneamente por varios dedos en la misma pantalla táctil (Single-Touch estricto).
  * *Razón de diseño:* Por principio YAGNI (You Aren't Gonna Need It). Rastrear múltiples `pointerId` e independizar flujos de throttling requiere gran sobreingeniería sin aportar valor real al negocio. Al presionar el primer dedo (`pointerdown`), el frontend descarta silenciosamente otros toques hasta que el dedo principal se levante (`pointerup`).

* **ANTI-07: Prohibición de Origen Relativo (Mathematical Anchor Invariant)**
  * *Declaración:* Aunque exista una cámara 2D (en móviles), el "Zero Absoluto" `(0,0)` de la sala nunca cambia. Queda estrictamente prohibido que el cliente altere (sume o reste) los vectores puros para compensar el tamaño de su pantalla antes de enviarlos. El frontend debe limitarse a aplicar un "offset visual" (cámara) únicamente al momento de renderizar en el Canvas.
  * *Razón de diseño:* Desvincular el `(0,0)` del hardware físico (ancho del monitor) y anclarlo matemáticamente al servidor, previene que los trazos se teletransporten o queden desfasados al rotar un teléfono celular, redimensionar ventanas de escritorio o interactuar en un setup multi-monitor.

* **ANTI-08: Prohibición de Deshacer/Rehacer (No Undo)**
  * *Declaración:* El sistema no soportará la funcionalidad de "Deshacer" (Ctrl+Z) ni "Rehacer" de forma nativa. 
  * *Razón de diseño:* En un entorno de dibujo colaborativo con sobreescritura destructiva compartida (cualquiera puede borrar lo de cualquiera), gestionar la mutación del historial introduce una complejidad altísima (CRDTs/OT) que destruye el principio de servidor "Dumb Pipe". Si un usuario se equivoca, simplemente debe usar la goma.

* **ANTI-09: (Regla delegada al Módulo 1.5)**
  * *Declaración:* Las dimensiones estrictas del lienzo (ej. 1920x1080) son gobernadas por el contenedor padre (Workspace Stage). El Módulo 02 simplemente estira su Canvas para cubrir el 100% del contenedor que le proporcionen.

* **ANTI-10: Prohibición de Interpolación Lineal Cruda (Polígonos vs Curvas)**
  * *Declaración:* Queda estrictamente prohibido unir los puntos crudos capturados por el hardware usando líneas rectas simples (ej. `ctx.lineTo()`) durante un trazo continuo.
  * *Razón de diseño:* Si el usuario mueve el dedo muy rápido, el hardware captura pocos puntos. Unirlos con rectas generará trazos robóticos y con bordes filosos. El motor gráfico debe implementar obligatoriamente un algoritmo de suavizado (ej. *Splines de Bezier cuadráticas a través de puntos medios*) para garantizar que la tinta luzca fluida, orgánica y Premium, sin importar la tasa de muestreo del hardware físico.

---

## 2. Reglas de Negocio (RN)

### RN-01: Persistencia Independiente
* **RN-01.1.** Los trazos pertenecen al espacio compartido del lienzo, no al estado de conexión temporal del usuario.
* **RN-01.2.** La desconexión, ausencia temporal o expulsión definitiva del autor no elimina automáticamente sus trazos.
* **RN-01.3.** Un usuario recién admitido a la sala debe recibir el historial inmutable de trazos activos para renderizar la misma obra final que los demás.
* **RN-01.4. Hidratación Dual (Sincronización de Estado):** Al unirse a la sala, un usuario no solo recibe el historial inmutable (Base de Datos), sino que el servidor debe inyectarle simultáneamente los trazos volátiles que actualmente se encuentran en estado `DIBUJANDO`. Esto previene la "ceguera" temporal ante trazos largos de otros usuarios.

### RN-02: Propiedad y Estados Locales
* **RN-02.1.** La selección de herramienta (lápiz, goma), el color activo y el grosor son estados exclusivamente **locales** del cliente. No se transmiten al servidor hasta que el usuario comienza a efectuar un trazo físico real.

### RN-03: La Goma Anárquica (Borrador de Píxeles Compartido)
* **RN-03.1.** El borrador no busca matemáticamente objetos de la base de datos para eliminarlos. Se modela como un **trazo de tinta invisible** que se renderiza en el Canvas con recorte (`globalCompositeOperation = 'destination-out'`).
* **RN-03.2.** **Anarquía Colaborativa:** Dado que la goma es solo un trazo de recubrimiento que se apila, **cualquier usuario puede borrar visualmente el trazo de cualquier otro usuario**. Esto fomenta el juego y la interacción física tipo pizarra real.
* **RN-03.3.** Para el servidor, borrar es idéntico a dibujar. Esto garantiza que no existan conflictos de concurrencia: el servidor simplemente apila eventos cronológicamente.

### RN-04: El Botón Nuclear (Limpieza de Pizarra Exclusiva)
* **RN-04.1.** Dado que la regla RN-03 añade datos en lugar de quitarlos (borrar frotando agranda el historial), existirá un botón de acción discreta denominado **"Limpiar Pizarra"**.
* **RN-04.2.** **Privilegio Estricto:** Esta acción destructiva masiva está **reservada exclusivamente para el Anfitrión (HOST)** de la sala. Ningún invitado puede vaciar el lienzo general.
* **RN-04.3.** Ejecutar "Limpiar Pizarra" envía un evento atómico `board:clear` al servidor. El servidor verifica el rol de HOST, trunca o inactiva lógicamente todo el historial de trazos de esa sala en la BD, y ordena un vaciado (`clearRect`) a todos los clientes conectados.
* **RN-04.4. Prevención de Trazos Zombis:** El evento `board:clear` debe forzar una interrupción dura (Abort) en el cliente. Si algún usuario está dibujando en ese instante, el motor gráfico local cancela la acción inmediatamente, purgando el Canvas Activo para evitar que un segmento residual sobreviva a la limpieza total.

### RN-05: Backend "Dumb Pipe" (Sin Compactación Vectorial)
* **RN-05.1.** El servidor actúa exclusivamente como un canal de transmisión y almacenamiento (*Dumb Pipe*). Está **estrictamente prohibido** que el backend (Node.js) realice cálculos matemáticos de intersección de curvas de Bézier o manipulación de vectores.
* **RN-05.2.** **Manejo de Gomas:** Los trazos de borrador (goma) se apilan y almacenan en la base de datos de forma idéntica a la tinta normal, considerándose eventos vectoriales inmutables.
* **RN-05.3.** **Delegación de Carga:** El servidor prioriza la disponibilidad del *Event Loop* para mantener la latencia en tiempo real al mínimo. La responsabilidad de interpretar la superposición de vectores y gomas recae enteramente en la GPU de los clientes.
* **RN-05.4.** **Deuda Técnica: Suspensión de Snapshots (Prevención de OOM/Seguridad):** Por motivos críticos de seguridad (riesgo de corrupción de datos si un cliente malicioso envía un snapshot falso), la delegación de Snapshots al cliente queda **estrictamente deshabilitada** para la versión inicial.
  * *Consecuencia Aceptada:* El historial vectorial crecerá de manera lineal. Se confía en el límite del lienzo (ANTI-09) y en las capacidades modernas de renderizado para soportar sesiones razonables.
  * *Resolución Futura:* En la v2.0, el mecanismo de Snapshot se delegará a un proceso de *backend aislado* (ej. Serverless Headless Canvas) para asegurar que la "compactación" de vectores a imagen se realice en un entorno 100% confiable y sin bloquear el Event Loop principal del WebSocket.
* **RN-05.5.** **Defensa contra Inundación y Fusión de Buffer (Flood Control):** El servidor debe imponer un límite estricto de mensajes por segundo (Rate Limit) por conexión WebSocket. Si un cliente emite ráfagas abusivas de `stroke:update`, el servidor descarta los paquetes o cierra la conexión.
  * *Responsabilidad del Cliente (Buffer Merging):* Para evitar expulsiones falsas (Falsos Positivos DDoS) por la liberación de buffers TCP tras una caída temporal de Wi-Fi, el cliente tiene **prohibido** enviar la cola de paquetes rezagados en ráfaga. Si hay múltiples actualizaciones encoladas, el frontend debe fusionar todas las coordenadas en **un solo paquete masivo** antes de reanudar el envío.

---

## 3. Requisitos Funcionales (RF)

| ID | Nombre | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **RF-01** | Dibujo de Trazos | El usuario debe poder realizar trazos continuos utilizando el puntero. | Los trazos se renderizan localmente al instante y se propagan a todos los clientes conectados. |
| **RF-02** | Selección de Herramientas | El usuario debe poder seleccionar diferentes tipos de pinceles (lápiz, resaltador, goma, crayón, etc.). | Cambiar la herramienta modifica la apariencia del trazo local antes de enviarlo. |
| **RF-03** | Selección de Color y Grosor | El usuario debe poder alterar el color y grosor de su pincel activo. | Los trazos nuevos adoptan estas propiedades visuales sin afectar los anteriores. |
| **RF-04** | Borrado de Píxeles | El usuario debe poder borrar trazos frotando la herramienta Goma sobre ellos. | La goma actúa transparentando visualmente los trazos subyacentes sin importar quién los dibujó. |
| **RF-05** | Limpieza Total (Solo Host) | El Anfitrión debe poder limpiar el lienzo por completo con un solo clic. | La pizarra se vacía inmediatamente para todos los usuarios de la sala tras confirmación. |

---

## 4. Requisitos No Funcionales (RNF)

* **RNF-01. Respuesta Local (Optimistic UI):** Al tocar la pantalla, el dispositivo del usuario debe pintar el inicio del trazo instantáneamente. No se espera una confirmación de latencia del servidor para dar retroalimentación visual al creador.
* **RNF-02. Desacoplamiento de Captura y Sincronización (Throttling de Red):** El motor gráfico debe operar en dos carriles independientes para proteger la fidelidad de la curva y la estabilidad del servidor:
  * *Tasa de Captura (Hardware):* El cliente escucha eventos del puntero a la velocidad máxima nativa del dispositivo (ej. 120Hz) y los renderiza instantáneamente en el Canvas Activo.
  * *Tasa de Sincronización (Red):* En paralelo, el cliente empaqueta los puntos acumulados y envía un único mensaje `stroke:update` a una frecuencia estrangulada (Throttling a ~30 fps o 33ms). La red viaja lento, pero los paquetes contienen la resolución matemática de alta velocidad intacta.
* **RNF-03. Confirmación de Estado Final (Packet Loss Recovery):** Al levantar el lápiz, el cliente debe emitir un evento definitivo `stroke:end` con el estado final inmutable. Este asienta la verdad absoluta y sobrescribe cualquier paquete parcial perdido.
* **RNF-04. Arquitectura de Renderizado Multicapa (Compositing):** Para evitar caídas de FPS al repintar miles de curvas y permitir borrar con `destination-out` sin destruir el fondo, el módulo inyecta **únicamente dos capas transparentes**: (1) un Canvas Base (donde se estampan o *bakean* los trazos inmutables) y (2) un Canvas Activo (para el trazo a 60 fps). El fondo estático (color, cuadrícula) queda estrictamente fuera del alcance de este módulo y debe ser provisto por el contenedor de la aplicación base (ej. el `index.html`), logrando un desacoplamiento visual absoluto.
  * *Flujo de Baking Constructivo (Lápiz):* Durante el `Mouse Move`, se dibuja a 60 fps solo en el Canvas Activo. Al emitir `stroke:end`, el trazo final se estampa en el Canvas Base y se purga el Canvas Activo con un `clearRect()`.
  * *Flujo de Feedback Destructivo (Goma):* Como excepción estricta, las herramientas de sustracción (goma) no dibujan en el Canvas Activo. Para garantizar la integridad del *feedback* visual, la goma debe interactuar directamente contra el Canvas Base en tiempo real durante su uso.
  * *Flujo de Baking (Remotos):* Los paquetes parciales entrantes `stroke:update` se renderizan temporalmente en el Canvas Activo. Al recibir un `stroke:end` por red, se estampa la curva final en el Canvas Base y se purga del Activo.
  * *Re-Baking por Inconsistencia de Red:* Dado que la UI es optimista, un trazo local se *bakea* de inmediato. Si posteriormente llega un trazo remoto cuyo `sequence_id` (servidor) indica que ocurrió *antes* que el trazo local, el cliente debe purgar (`clearRect`) su Canvas Base y ejecutar un re-estampado total rápido iterando la lista de trazos usando el orden estricto del servidor, corrigiendo visualmente cualquier superposición (Z-Index) errónea.
* **RNF-05. Simplificación Geométrica (Decimación de Puntos):** Antes de enviar datos, el arreglo de puntos capturados por el hardware debe pasar por un algoritmo de reducción (ej. Douglas-Peucker) para eliminar puntos redundantes en rectas, reduciendo el *payload* de red hasta en un 80%.
* **RNF-06. Fragmentación Silenciosa y Vinculación Gráfica (Auto-Commit):** Para mitigar el riesgo de *packet loss* y evitar payloads de red masivos, el frontend fuerza cortes lógicos si un trazo continuo excede un umbral (ej. 3 segundos o 500 puntos), emitiendo de inmediato `stroke:end` seguido de `stroke:start`.
  * *Estructura de Datos:* Los segmentos fragmentados viajan como paquetes independientes al servidor, pero comparten un `parent_id` (o el mismo `stroke_id` maestro) para vincularlos lógicamente.
  * *Pipeline de Renderizado Local:* El cliente desacopla el estado de la red del estado gráfico. Durante la fase viva del trazo, la memoria local retiene todos los puntos vinculados. El motor gráfico procesa el grupo entero como un solo *Path* continuo, aplicando la composición visual (ej. opacidad) uniformemente sobre el conjunto total. La escritura final en el *Canvas Base* (Baking) ocurre exclusivamente tras el evento físico de liberación del puntero (`pointerup`), garantizando fidelidad visual absoluta sin importar la cantidad de fragmentaciones de red subyacentes.
  * *Excepción de Regla de Baking (Clarificación sobre RNF-04):* Aunque el motor de red emita múltiples eventos `stroke:end` silenciosos debido al Auto-Commit, el motor gráfico los ignora. No se aplica el estampado (Baking) al Canvas Base estipulado en el RNF-04 sino hasta el final físico real del trazo, evitando que los cortes intermedios se pisen entre sí y formen manchas oscuras.
* **RNF-07. Conservación de Batería (Renderizado por Demanda):** Queda estrictamente prohibido el uso de un ciclo de renderizado continuo e infinito (Game Loop / `requestAnimationFrame` constante). El motor gráfico debe usar un sistema de validación de estado (*Dirty Flag*). El repintado del lienzo (60 FPS) solo se activa si hay movimiento del hardware local o si entra un paquete de red. En cuanto cesa la actividad, los FPS deben caer a 0 (reposo total) para prevenir sobrecalentamiento y drenaje de batería en móviles.

---

## 5. Entidades del Dominio (Modelo de Datos)

### Entidad: `TrazoPizarra` (Stroke)
Representa un movimiento continuo en el lienzo. Estructurado para *Append-Only*.
* `id`: Identificador único (UUID v4) autogenerado en el cliente al iniciar el toque.
* `lienzo_id`: Referencia unívoca a la sala en el Módulo 01.
* `autor_id`: Referencia al usuario.
* `tipo_pincel`: Enumerador [`PEN`, `HIGHLIGHTER`, `ERASER`, `CRAYON`, `WATERCOLOR`, `CALLIGRAPHY`].
* `color`: Código Hexadecimal o RGB (ej. `#FF0000`). Carece de efecto visual si es `ERASER`.
* `grosor`: Número entero para el radio/diámetro del pincel.
* `opacidad`: Número flotante (0.0 a 1.0) para la transparencia del trazo completo.
* `caja_delimitadora`: Objeto `{minX, minY, maxX, maxY}` calculado una única vez al emitir `stroke:end`. Obligatorio para permitir *Frustum Culling* (descarte visual de trazos fuera de pantalla) en orden O(1).
* `puntos`: Estructura comprimida de coordenadas relativas `[x1, y1, presión1, x2, y2, presión2...]`.
  * *Nota de Agnosticismo (Escala):* El cliente es responsable de normalizar todas las coordenadas de hardware a "Píxeles Lógicos CSS" (neutralizando factores como el `devicePixelRatio`) antes de inyectarlas en este arreglo, garantizando paridad dimensional en cualquier pantalla.
* `timestamp`: Fecha y milisegundo de inicio del trazo. **(Server-Side Only)**. Queda estrictamente prohibido que el cliente inyecte este dato. El servidor debe autogenerarlo con su reloj maestro al recibir el `stroke:start` para garantizar orden absoluto e inmunidad ante clientes maliciosos o desincronizados (NTP desfasado).

---

## 6. Máquinas de Estados del Sistema

### 6.1. Ciclo de Vida de un Trazo
Define la maduración del estado de la tinta desde que el dedo toca la pantalla hasta que entra a la base de datos persistente:

```text
           [ INICIO (Mouse Down) ] 
                     │     └───> Se genera UUID en el cliente y se emite stroke:start
                     ▼
           [ DIBUJANDO (Mouse Move) ] 
                     │     └───> Emite paquetes parciales stroke:update (Throttled)
                     ▼
           [ FINALIZADO (Mouse Up / Cancel) ] 
                     │     └───> Emite paquete final stroke:end
                     ▼
           [ INMUTABLE (Persistido) ] 
                           └───> El objeto se bloquea para escritura. 
                                 Se inserta en la BD (Append). No se modifica nunca más.
```

* **Invariante de Estado (Limpieza de Huérfanos):** Si un trazo permanece en estado `DIBUJANDO` por un tiempo excesivo sin recibir actualizaciones (debido a desconexión abrupta o cierre de pestaña), el servidor inyecta automáticamente un `stroke:end` (o lo descarta) para evitar bloqueos de memoria (Deadlocks).
* **Invariante de Hardware (Captura de Puntero Segura):** Para evitar que la máquina de estados quede bloqueada permanentemente en `DIBUJANDO` si el usuario arrastra el cursor fuera de la ventana del navegador y suelta el clic allí, el cliente **debe** utilizar la API `element.setPointerCapture()` al iniciar el trazo y escuchar el evento `pointercancel`. Esto asegura que el levantamiento del dedo o ratón siempre sea interceptado, forzando un cierre limpio del estado.
