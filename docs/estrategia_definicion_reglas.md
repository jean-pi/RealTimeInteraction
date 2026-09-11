# Estrategia de Definición y Gobierno de Reglas del Sistema
## Proyecto: RealTime Interaction

Este documento establece el marco metodológico y la arquitectura lógica inicial para ordenar, estructurar y gobernar las reglas del sistema a partir de las definiciones exploradas en el FigJam, eliminando la sobrecarga cognitiva y la explosión combinatoria de estados.

---

## 1. El Marco Metodológico: Las 4 Herramientas de Control

Para evitar que el sistema se convierta en una masa caótica de texto y notas sueltas, toda definición futura debe pasar por estas cuatro herramientas de ingeniería:

### A. El Filtro Ortogonal de Clasificación
Cada requerimiento o idea se clasifica estrictamente en una de tres categorías independientes:

| Prefijo | Tipo de Definición | Pregunta Filtro | Ejemplo Canónico |
| :--- | :--- | :--- | :--- |
| **`RN`** | **Regla de Negocio (Invariante)** | *¿Es una ley inmutable del sistema independiente de la interfaz y de la tecnología?* | *RN-01: Cada usuario tiene exactamente un único lienzo permanente.* |
| **`RF`** | **Requerimiento Funcional** | *¿Es una acción concreta que el usuario o el sistema ejecutan (un verbo)?* | *RF-03: El propietario puede generar un código de invitación para unirse a la sesión.* |
| **`RNF`** | **Requerimiento No Funcional** | *¿Es un criterio de calidad, latencia, compatibilidad o resiliencia técnica?* | *RNF-01: La propagación de eventos de cursor debe ser inferior a 100ms.* |

---

### B. El Modelo de Estados Finitos (FSM)
En sistemas concurrentes y de tiempo real, **nunca se redactan párrafos aislados para casos de borde** (*"qué pasa si se va el internet y además vuelve a los 5 segundos..."*). 

Cualquier entidad dinámica se gobierna mediante una **Máquina de Estados Finitos**. Solo existen estados discretos válidos y transiciones provocadas por eventos específicos.

---

### C. Tablas de Verdad / Tablas de Transición
Las situaciones complejas se resuelven cruzando **Estados** contra **Roles** en una matriz bidimensional, lo que garantiza cobertura del 100% de los casos sin ambigüedad.

---

### D. El "Parking Lot" (Bandeja de Ideas Sueltas)
Para proteger la estabilidad del núcleo del sistema, cualquier funcionalidad secundaria o idea espontánea que surja durante el desarrollo se anota en una sección de *Inbox / Parking Lot*. Se prohíbe incorporarla a las reglas activas hasta que no se evalúe contra los invariantes del dominio.

---

## 2. Mapa Conceptual y Diccionario de Entidades

El dominio central de *RealTime Interaction* se compone de 6 entidades desacopladas:

```
 ┌──────────┐ 1        1 ┌──────────┐
 │   User   ├────────────┤  Canvas  │
 └────┬─────┘            └────┬─────┘
      │ 1                     │ 1
      │                       │
      │ N                     │ N
 ┌────┴─────┐ 1          N ┌──┴───────┐
 │ Session  ├──────────────┤ Presence │
 └────┬─────┘              └──────────┘
      │ 1
      ├───────────────────────┐
      │ N                     │ N
 ┌────┴─────┐            ┌────┴─────┐
 │  Stroke  │            │   Item   │
 └──────────┘            └──────────┘
```

### Definición Formal de Entidades

1. **`User` (Usuario):**
   * Representa la identidad autenticada y verificada.
   * **Invariante:** Posee una relación 1:1 exclusiva y permanente con su `Canvas`.

2. **`Canvas` (Lienzo):**
   * Representa el espacio de datos persistente.
   * No depende de conexiones activas; sus datos no se destruyen al cerrarse las sesiones.
   * Contenedor de `Stroke` e `Item`.

3. **`Session` (Sesión / Sala activa):**
   * Instancia efímera de colaboración en tiempo real gobernada por un canal de WebSockets.
   * Vincula un `Canvas` con los usuarios concurrentes a través de registros de `Presence`.

4. **`Presence` (Presencia):**
   * Estado puramente volátil en memoria RAM/servidor de cada participante activo en una `Session`.
   * Atributos: Coordenadas $(x, y)$ del cursor, color de puntero, timestamp de último heartbeat, estado de conectividad.

5. **`Stroke` (Trazo vectorial):**
   * Unidad atómica de dibujo en la pizarra compartida.
   * Atributos: ID único, ID del autor (`User`), lista de puntos $(x, y)$, grosor, color, timestamp.

6. **`Item` (Elemento funcional en lienzo):**
   * Todo objeto colocado en el lienzo que no sea un trazo a mano alzada (imágenes importadas, notas, bloques de texto).
   * Atributos: ID único, posición $(x, y)$, dimensiones $(w, h)$, tipo de contenido, payload, autor.

---

## 3. Catálogo Canónico de Reglas Iniciales

### 3.1. Reglas de Negocio / Invariantes de Dominio (`RN`)

* **`RN-01` (Unicidad y Creación Automática):**  
  Cada usuario con cuenta verificada tiene exactamente un único lienzo personal asociado permanentemente. El lienzo se instancia automáticamente al completar el registro del perfil.
* **`RN-02` (Inmutabilidad de la Propiedad):**  
  Cada lienzo tiene un único propietario inmutable. No existe la transferencia de propiedad, no existen propietarios temporales ni roles de co-administrador.
* **`RN-03` (Persistencia Desacoplada):**  
  El estado del lienzo (`Stroke`, `Item`) es persistente e independiente de la presencia del propietario. Los usuarios autorizados pueden operar en la pizarra aunque el propietario no esté en la sesión, salvo que el propietario haya cerrado la sala activamente.
* **`RN-04` (Autoridad de Conectividad del Propietario):**  
  El propietario del lienzo es la única entidad autorizada para:
  * Generar y revocar credenciales de acceso (códigos/enlaces).
  * Expulsar participantes de la sesión activa de forma inmediata.
  * Limpiar la totalidad del lienzo de forma masiva.
* **`RN-05` (Invariante de Borrado de Trazos):**  
  Un participante invitado solo puede modificar o borrar sus propios trazos (`Stroke.authorId == currentUserId`). El propietario del lienzo tiene permiso de borrado sobre cualquier elemento.
* **`RN-06` (No Eliminación de la Entidad Lienzo):**  
  Un lienzo no puede ser eliminado desde la aplicación por ningún rol.

---

### 3.2. Requerimientos Funcionales (`RF`)

#### A. Identidad y Acceso
* **`RF-01` (Validación de Perfil):** El sistema impide el acceso a cualquier lienzo si el perfil del usuario no está completo y verificado.
* **`RF-02` (Navegación Directa):** Al autenticarse, el usuario accede automáticamente a su propio lienzo personal sin paneles intermediarios.
* **`RF-03` (Compartición por Enlace/Código):** El propietario puede generar un token de acceso compartible (URL o código alfanumérico) con caducidad configurable.
* **`RF-04` (Expulsión Forzada):** Al ejecutar la expulsión de un participante, el servidor desconecta su socket y revoca inmediatamente su token de sesión.

#### B. Presencia y Conectividad
* **`RF-05` (Transmisión de Coordenadas):** El cliente emite la posición de su cursor con una tasa máxima controlada (*throttle* a 30-60 eventos/segundo) para no saturar el canal de red.
* **`RF-06` (Heartbeat y Timeout):** El cliente envía una señal de latido (*heartbeat*) cada 5 segundos. Si el servidor no recibe señales en 15 segundos, declara el estado en gracia o desconexión.

#### C. Interacción y Pizarra
* **`RF-07` (Dibujo Concurrente No Bloqueante):** Múltiples usuarios pueden emitir trazos vectoriales simultáneamente. El servidor reenvía los puntos sin requerir bloqueos pesados sobre el documento.
* **`RF-08` (Importación de Imágenes):** Inserción de imágenes mediante pegado directo del portapapeles (`Ctrl+V` / `Cmd+V`) o mediante descarga desde URL pública.
* **`RF-09` (Borrado Selectivo):** Herramienta de goma/borrador que elimina trazos vectoriales completos al intersectar con la trayectoria del puntero.

---

### 3.3. Requerimientos No Funcionales (`RNF`)

* **`RNF-01` (Latencia de Tiempo Real):** La latencia de distribución de eventos de presencia y trazos debe ser inferior a 100 milisegundos en condiciones normales de red.
* **`RNF-02` (Compatibilidad Cross-Platform):** Operatividad plena en las dos últimas versiones estables de Chrome, Edge, Firefox y Safari, sobre escritorio, tablets y dispositivos móviles con soporte para mouse, teclado y pantalla multitáctil.
* **`RNF-03` (Aislamiento de Fallos y Degradación Elegante):** El fallo de una funcionalidad auxiliar (ej. carga de imagen externa) no debe degradar ni interrumpir el canal de dibujo ni la sesión de tiempo real.
* **`RNF-04` (Testabilidad sin Dependencias de UI):** La totalidad de las reglas de negocio (`RN`) y las máquinas de estado de sesión deben poder probarse mediante pruebas unitarias puras en Node.js/Go/Python sin instanciar un navegador ni un servidor WebSockets real.

---

## 4. Matriz de Estados de Conectividad y Resiliencia

Para resolver la incertidumbre de qué ocurre ante pérdidas de red, la sesión se rige por la siguiente matriz determinista:

### Estados Posibles del Participante (`ParticipantState`)
1. `CONNECTED`: Socket abierto y heartbeats al día.
2. `PENDING_GRACE_PERIOD`: Pérdida de paquetes o cierre abrupto. El servidor reserva su lugar por una ventana de tiempo fija.
3. `TERMINATED`: Conexión cerrada de forma definitiva y recursos liberados.

### Matriz de Transición de Decisiones:

| Evento de Red | Comportamiento si es INVITADO (Guest) | Comportamiento si es ANFITRIÓN (Host) |
| :--- | :--- | :--- |
| **Corte de red o cierre abrupto** | • Pasa a `PENDING` por **30 segundos**.<br>• Su cursor queda estático y translúcido.<br>• La sesión colaborativa continúa activa. | • Pasa a `PENDING` por **60 segundos**.<br>• La sala entra en modo `HOST_RECONNECTING`.<br>• El lienzo de los invitados se congela en solo lectura para evitar desincronización. |
| **Reconexión exitosa (dentro de la ventana de gracia)** | • Vuelve a `CONNECTED`.<br>• El servidor le transmite el delta de trazos ocurridos durante su ausencia. | • Vuelve a `CONNECTED`.<br>• Se levanta el modo solo lectura de la sala.<br>• Todos los participantes continúan normalmente. |
| **Expiración de ventana de gracia (Timeout alcanzado)** | • Pasa a `TERMINATED`.<br>• Se destruye su registro de `Presence`.<br>• Se notifica a la sala su salida.<br>• Sus trazos previos persisten en el lienzo. | • Pasa a `TERMINATED`.<br>• El servidor finaliza la `Session` activa.<br>• Se desconectan todos los invitados con el mensaje: *"Sesión cerrada por desconexión del anfitrión"*. |
| **Intento de dibujar sin conexión confirmada (`ACK`)** | • La interfaz bloquea el puntero de dibujo.<br>• Muestra indicador de "Sin conexión".<br>• No almacena trazos locales para evitar conflictos de sincronización. | • Mismo comportamiento.<br>• Dibujo bloqueado hasta que el canal de WebSockets confirme recepción de heartbeats. |

---

## 5. Bandeja de Ideas y Funcionalidades en Espera (Parking Lot)

Estas ideas fueron relevadas en el FigJam y quedan formalmente registradas para etapas posteriores. No forman parte del alcance del núcleo inicial:

* [ ] *Widgets flotantes multimedia (integración con Apple Music / Spotify).*
* [ ] *Widgets utilitarios de productividad (reloj, cronómetro, to-do list).*
* [ ] *Motor de partículas y efectos visuales de iluminación reactiva.*
* [ ] *Filtros de interacción de video y audio espacial.*
* [ ] *Dispersión aleatoria o reordenamiento automático de ventanas flotantes.*

---

## 6. Hoja de Ruta para Integración con SDD

Cuando este documento esté validado, la transición hacia la implementación con Spec-Driven Development (SDD) se ejecuta en **tres ciclos de cambios acotados**:

1. **Ciclo 1 (`change-01-identity-and-canvas`):** Implementación de `User`, `Canvas`, validación de perfiles y reglas de unicidad 1:1 (`RN-01`, `RN-02`, `RN-06`).
2. **Ciclo 2 (`change-02-session-and-presence-engine`):** Implementación del servidor de WebSockets, máquina de estados de conexión, heartbeats y matriz de resiliencia (`RF-05`, `RF-06`, Sección 4).
3. **Ciclo 3 (`change-03-collaborative-drawing`):** Implementación del motor de trazos (`Stroke`), dibujo concurrente no bloqueante y borrador (`RN-05`, `RF-07`, `RF-09`).
