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
  * Eventos físicos del usuario (`clientX`, `clientY`, toques, scroll) y dimensiones reales de la pantalla.
* **⚙️ Lo que Procesa:**
  * Realiza la traducción matemática de Coordenadas de Pantalla (píxeles físicos) a Coordenadas de Lienzo (unidades lógicas), compensando la escala y el paneo.
  * Orquesta las capas HTML (Z-Index), asegurando que los cursores multijugador floten por encima de todo.
* **📤 Lo que Devuelve (Outputs):**
  * Hacia los Hijos (M2 y M3): Un lienzo estandarizado y coordenadas pre-masticadas absolutas. Los hijos son "tontos" respecto a la cámara.
  * Hacia el Usuario: Renderiza la UI de contorno (Barra de avatares) y los cursores telepresentes de los demás usuarios.

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
  * *Excepción Móvil:* En teléfonos celulares (ej. pantallas verticales 9:16), el escalado por ancho haría que los elementos fueran microscópicos. Solo en celulares se omite la regla de encaje de ancho; el lienzo se muestra a una escala ampliada y se habilita una "Cámara Virtual" que permite al usuario arrastrar el dedo (paneo) para navegar manualmente por el lienzo lógico.
