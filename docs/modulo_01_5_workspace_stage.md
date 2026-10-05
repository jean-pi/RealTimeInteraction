# Módulo 1.5: Workspace Stage (Contenedor Padre)
## Proyecto: RealTime Interaction
### Documento de Especificación Arquitectónica

---

## 1. Propósito y Límite Arquitectónico

### 1.1. Propósito del Módulo
Este módulo es el **Escenario Principal (Shell)** de la aplicación. Su única responsabilidad es administrar el espacio de trabajo geométrico, manejar la cámara (paneo) según el dispositivo, e inyectar de forma agnóstica los módulos visuales hijos (Módulo 02 y Módulo 03).

### 1.2. Separación de Responsabilidades
* **Delega hacia arriba (Módulo 01):** Consume la información de "quiénes están en la sala" y el token de conexión, pero no maneja sockets de presencia.
* **Delega hacia abajo (Módulos 02 y 03):** Provee un plano estricto de coordenadas absolutas.

### 1.3. Contrato de Caja Negra (Inputs / Outputs)
* **📥 Lo que Recibe (Inputs):**
  * Estado de la sala (`roomState`, `activeUsers`) desde el Módulo 1.
  * Dimensiones físicas de la pantalla para calcular el `Scale` global.
  * *Aclaración de Rendimiento:* M1.5 NO secuestra ni intercepta los eventos puros de dibujo del usuario (`PointerEvents`).
* **⚙️ Lo que Procesa:**
  * Calcula y aplica el escalado global del lienzo mediante CSS (`transform: scale()`).
  * Realiza la traducción matemática inversa exclusivamente para calcular dónde pintar los cursores remotos.
  * Orquesta el "Sándwich de Z-Index" asegurando el orden correcto de las capas visuales.
* **📤 Lo que Devuelve (Outputs):**
  * Hacia los Hijos (M2 y M3): El factor de escala (`Scale`) y el contenedor transformado. El Módulo 2 lee los eventos del DOM directamente desde su propio lienzo para no perder rendimiento ni datos de hardware (presión del lápiz).
  * Hacia el Usuario: Renderiza la UI local (Barra de avatares) y los cursores telepresentes de los demás usuarios.

---

## 2. Invariantes del Entorno Físico (El Muro de Cristal)

* **STAGE-01: El Sistema de Coordenadas y el "Área Segura"**
  * *Declaración:* El espacio de trabajo colaborativo utiliza un sistema de coordenadas lógicas anclado al centro `(X: 0, Y: 0)`. Existe un **Área Segura de referencia** equivalente a `1920x1080` unidades lógicas (proporción 16:9), pero el lienzo físico puede revelar espacio adicional según el dispositivo del usuario.
  * *Razón de diseño:* Desacoplar la matemática de las coordenadas de los píxeles CSS reales, garantizando que los trazos vectoriales y las ventanas coincidan exactamente para todos los usuarios.

* **STAGE-02: Estrategia de Escalado (Sangría Dinámica o Bleed Area)**
  * *Declaración:* El lienzo no usa dimensiones rígidas en CSS, sino que se adapta dinámicamente aplicando un escalado basado en igualar el **ANCHO** de la pantalla, con un máximo de 16:9.
  * *Escenarios de Renderizado:*
    * **Monitores PC/Mac (16:9):** El ancho encaja al 100% y la altura calza perfectamente. El usuario ve exactamente el Área Segura.
    * **Tablets / iPad (4:3 o similares):** El ancho encaja al 100%, pero al ser pantallas más "cuadradas", la escala genera que el lienzo revele espacio adicional ("Sangría" o *Bleed Area*) por encima y por debajo del Área Segura. El usuario dibuja a pantalla completa, asumiendo orgánicamente que sus trazos en los extremos superior/inferior no serán visibles para usuarios con pantallas panorámicas (16:9).
    * **Monitores Ultrawide (21:9 o mayor):** El lienzo alcanza su límite de escalado al llegar a la proporción 16:9. No se estira más allá de eso; se centra en la pantalla dejando bordes inactivos (Pillarboxing) a los lados.

* **STAGE-03: Navegación Limitada (Paneo Exclusivo para Móviles)**
  * *Declaración:* El paneo libre (arrastrar la pantalla) está estrictamente desactivado en Tablets y Desktop, ya que la regla `STAGE-02` garantiza que todo el ancho de trabajo sea visible.
  * *Excepción Móvil y Desambiguación:* Solo en teléfonos celulares se habilita una "Cámara Virtual" (Paneo). Para resolver el choque de gestos entre "mover" y "dibujar", se implementa un control explícito mediante **botones gigantes en la interfaz móvil**: un **Modo Mano ✋ (Navegación)** y un **Modo Lápiz ✏️ (Dibujo)**. Solo un modo puede estar activo a la vez.

* **STAGE-04: Sincronización de Telepresencia (Cursores)**
  * *Declaración:* El renderizado y sincronización de los cursores de los usuarios recae exclusivamente en este módulo, no en la Pizarra (M2).
  * *Mecanismo de Red:* Módulo 1.5 utiliza la red multiplexada del Módulo 1 para enviar sus propias coordenadas lógicas y escuchar las de los demás. Para no saturar el servidor, la emisión de coordenadas se regula mediante *Throttling* (ej. 30 actualizaciones por segundo).
  * *Renderizado Visual:* Al recibir coordenadas remotas, el módulo dibuja los cursores en la capa superior absoluta (High Z-Index) interpolando el movimiento mediante transiciones CSS, y usa la lista de `activeUsers` del Módulo 1 para pintar la flecha del color e identidad correspondientes.

* **STAGE-05: Estratificación Estricta (El Sándwich de Z-Index)**
  * *Declaración:* Para evitar que la telepresencia arruine la usabilidad local, el Módulo 1.5 impone un orden estricto de capas de renderizado, de fondo a frente:
    1. **Nivel 0 (Fondo):** Pizarra Vectorial (Módulo 2).
    2. **Nivel 100:** Gestor de Ventanas Flotantes (Módulo 3).
    3. **Nivel 500:** Cursores Telepresentes (Los ratones de los demás).
    4. **Nivel 1000 (Frente Absoluto):** Interfaz UI Local y Modales (Menús, Lista de invitados, Alertas, Botones Mano/Lápiz). *Los cursores de otros usuarios NUNCA podrán sobreponerse ni tapar los modales del usuario local.*
