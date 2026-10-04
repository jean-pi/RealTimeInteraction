# Módulo 1.5: Workspace Stage (Contenedor Padre)
## Proyecto: RealTime Interaction
### Documento de Especificación Arquitectónica

---

## 1. Propósito y Límite Arquitectónico

### 1.1. Propósito del Módulo
Este módulo es el **Escenario Principal (Shell)** de la aplicación. Su única responsabilidad es administrar el espacio de trabajo geométrico, manejar la cámara (paneo) según el dispositivo, e inyectar de forma agnóstica los módulos visuales hijos (Módulo 02 y Módulo 03).

### 1.2. Separación de Responsabilidades
* **Delega hacia arriba (Módulo 01):** Consume la información de "quiénes están en la sala" y el token de conexión, pero no maneja sockets de presencia.
* **Delega hacia abajo (Módulos 02 y 03):** Provee un plano estricto de coordenadas. Si el usuario mueve el dedo en la pantalla, este módulo intercepta el gesto, aplica la transformación matemática de la cámara (resta el paneo) y le entrega al Módulo 02 o 03 una coordenada `(X, Y)` absoluta y normalizada. 

---

## 2. Invariantes del Entorno Físico (El Muro de Cristal)

* **STAGE-01: El Lienzo Finito Estándar (16:9)**
  * *Declaración:* El espacio de trabajo colaborativo no es infinito. Tiene dimensiones lógicas estrictas ancladas a una resolución estándar de escritorio (ej. **1920x1080 píxeles**).
  * *Razón de diseño:* Un espacio finito asegura que el 100% de la pizarra sea visible en monitores de PC sin requerir navegación, y sienta las bases matemáticas para poder exportar todo el lienzo a una imagen plana en el futuro.

* **STAGE-02: Navegación por Dispositivo (Paneo)**
  * *Declaración:* 
    * **Desktop / iPad (Pantallas grandes):** El contenedor centra el lienzo de 1920x1080 en la pantalla con una escala 1:1 estática. No se habilita cámara ni paneo, ya que todo el contenido es visible.
    * **Celulares (Móviles):** Debido a que 1920x1080 no cabe en un teléfono, este módulo implementa una "Cámara Virtual". El usuario móvil puede arrastrar la pantalla (Paneo) para recorrer el lienzo fijo. 
  * *Efecto Colateral:* El paneo en celulares mueve simultáneamente las capas del Módulo 02 (Pizarra) y el Módulo 03 (Ventanas), garantizando que los dibujos y los widgets mantengan siempre su alineación relativa.

---

## 3. Arquitectura de Capas Visuales (Z-Index)

El Workspace Stage orquesta sus módulos hijos mediante apilamiento estricto:

1. **Capa Fondo (Física):** Color plano o cuadrícula decorativa.
2. **Capa Módulo 02 (Whiteboard Engine):** Canvas transparente estirado al 100% (1920x1080) donde viven los trazos vectoriales. Se coloca por debajo para que la tinta no cubra los widgets.
3. **Capa Módulo 03 (Window Manager):** Contenedor DOM sobre el Canvas, donde se renderizan las ventanas y post-its flotantes. Captura los clics con mayor prioridad (Z-Index superior) para evitar que arrastrar una ventana dibuje una línea en la pizarra por error.

---

## 4. Normalización de Coordenadas
* **STAGE-03: Aislamiento Matemático**
  * Los Módulos 02 y 03 son "Tontos" (Dumb Components). No saben si el usuario hizo zoom o paneo. El Workspace Stage intercepta los eventos nativos del navegador (`PointerEvent`), les aplica la matriz de transformación inversa de la cámara local, y emite un evento interno normalizado hacia los hijos.
