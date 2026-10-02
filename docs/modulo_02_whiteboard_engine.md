# Módulo 2: Motor de Pizarra Vectorial (Whiteboard Engine)
## Proyecto: RealTime Interaction
### Documento de Especificación Técnica y de Negocio (Base)

---

## 1. Propósito, Alcance y Límite Arquitectónico

### 1.1. Propósito del Módulo
Este módulo es el responsable exclusivo de la **captura, renderizado y sincronización en tiempo real de trazos vectoriales**. Proporciona el lienzo infinito donde los usuarios pueden expresarse gráficamente mediante herramientas de dibujo (lápiz y goma), garantizando alta fidelidad, 60 FPS y persistencia distribuida sin conflictos de concurrencia.

### 1.2. Límite Arquitectónico (Frontera del Módulo)
* **Punto de llegada:** El módulo procesa eventos de puntero (ratón/táctil), genera objetos inmutables de tinta digital (Strokes), los renderiza en un `<canvas>` HTML5 nativo y los sincroniza mediante WebSockets apoyándose en el middleware de autorización del Módulo 01.
* **Fuera de alcance:** Este módulo **NO** dibuja ventanas flotantes, no gestiona contenedores arrastrables, ni sabe qué usuario está en línea (eso es del Módulo 01). Si un usuario coloca un widget de cámara o un post-it, el Módulo 02 simplemente se queda "debajo" funcionando como una capa de fondo gráfica independiente.

### 1.3. Invariantes Negativos y Anti-Requisitos

* **ANTI-01: Prohibición del DOM para Renderizado Gráfico (No SVG)**
  * *Declaración:* Queda estrictamente prohibido usar elementos del DOM (ej. `<svg>`, `<path>`, o `<div>`) para representar los trazos de tinta.
  * *Razón de diseño:* El DOM colapsa al tener miles de nodos reactivos. Todo el dibujo se orquesta en una única etiqueta `<canvas>` nativa (2D o WebGL) para maximizar los fotogramas por segundo (FPS).

* **ANTI-02: Prohibición de Imágenes Base64 para Sincronización**
  * *Declaración:* El servidor y los clientes nunca intercambian el estado de la pizarra enviando imágenes rasterizadas o capturas base64 (`canvas.toDataURL()`).
  * *Razón de diseño:* Consumo insostenible de ancho de banda y colisiones destructivas en la concurrencia. Todo trazo es puramente un arreglo matemático de coordenadas.

* **ANTI-03: Prohibición de Modificación Dinámica (Inmutabilidad en Sesión Activa)**
  * *Declaración:* Durante una sesión en vivo (`ACTIVE`), un trazo confirmado no puede ser alterado en su geometría, color o puntos intermedios. **Solo** el proceso de limpieza en reposo (ver RN-05) tiene permiso para alterar los trazos.
  * *Razón de diseño:* Mantener una arquitectura temporal de *Append-Only* en tiempo real elimina de raíz las condiciones de carrera (Race Conditions) al sincronizar clientes, delegando la mutación destructiva exclusivamente al servidor en reposo.

* **ANTI-04: Prohibición de Acercamiento y Desplazamiento (Cero Zoom/Pan)**
  * *Declaración:* El lienzo es estático. No existe un plano infinito navegable. Se utiliza una "Resolución Virtual Fija" que se escala para encajar en el monitor del usuario (`object-fit: contain`).
  * *Razón de diseño:* Garantiza la igualdad visual (todos ven lo mismo siempre) y elimina la inmensa carga matemática de calcular traslaciones dinámicas entre las coordenadas de la pantalla y la base de datos.

---

## 2. Reglas de Negocio (RN)

### RN-01: Persistencia Independiente
* **RN-01.1.** Los trazos pertenecen al espacio compartido del lienzo, no al estado de conexión temporal del usuario.
* **RN-01.2.** La desconexión, ausencia temporal o expulsión definitiva del autor no elimina automáticamente sus trazos.
* **RN-01.3.** Un usuario recién admitido a la sala debe recibir el historial inmutable de trazos activos para renderizar la misma obra final que los demás.

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

### RN-05: Estrategia de Compactación de Datos (Vector Culling en Reposo)
* **RN-05.1.** Para mitigar la acumulación infinita de trazos invisibles generados por la goma (RN-03), el servidor implementará un recolector de basura (*Worker*) que operará en segundo plano.
* **RN-05.2.** **Condición de Ejecución:** Cuando el Módulo 01 determine que una sala ha quedado vacía y entra en estado de hibernación (`DORMANT`), el *Worker* analizará el historial de la pizarra.
* **RN-05.3.** **Mecánica de Recorte:** El proceso de compactación aplicará matemática geométrica para encontrar intersecciones entre la tinta y las gomas. Cortará las curvas afectadas, hará un `DELETE` real de las porciones borradas y de los propios trazos de goma, y guardará solo los vectores limpios resultantes. 
* **RN-05.4.** Esto asegura que la base de datos se mantenga 100% vectorial, pura y ligera. Así, un usuario nuevo al conectarse no debe descargar todo el historial infinito de pinceladas y borrados de nuevo.

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
* **RNF-02. Throttling Continuo de Red:** Durante el arrastre continuo del lápiz, el cliente debe acumular puntos y enviar un paquete discreto `stroke:update` a una frecuencia máxima controlada (ej. cada `33ms` o `30 fps`) para no ahogar la red.
* **RNF-03. Confirmación de Estado Final (Packet Loss Recovery):** Al levantar el lápiz, el cliente debe emitir un evento definitivo `stroke:end` con el estado final inmutable. Este asienta la verdad absoluta y sobrescribe cualquier paquete parcial perdido.
* **RNF-04. Rasterización Local (Baking) contra FPS Drop:** Para evitar que el Canvas HTML5 pinte miles de curvas por fotograma, el Frontend debe estampar los trazos inmutables inactivos en un Canvas de fondo estático, manteniendo vivos solo los trazos en curso.
* **RNF-05. Simplificación Geométrica (Decimación de Puntos):** Antes de enviar datos, el arreglo de puntos capturados por el hardware debe pasar por un algoritmo de reducción (ej. Douglas-Peucker) para eliminar puntos redundantes en rectas, reduciendo el *payload* de red hasta en un 80%.

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
* `puntos`: Estructura comprimida de coordenadas relativas `[x1, y1, presión1, x2, y2, presión2...]`.
* `timestamp`: Fecha y milisegundo de inicio del trazo.

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
           [ FINALIZADO (Mouse Up) ] 
                     │     └───> Emite paquete final stroke:end
                     ▼
           [ INMUTABLE (Persistido) ] 
                           └───> El objeto se bloquea para escritura. 
                                 Se inserta en la BD (Append). No se modifica nunca más.
```
