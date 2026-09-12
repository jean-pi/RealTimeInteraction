# Módulo 1: Núcleo Fundacional de Sala, Acceso y Presencia
## Proyecto: RealTime Interaction
### Documento de Especificación Técnica y de Negocio

---

## 1. Propósito, Alcance y Límite Arquitectónico

### 1.1. Propósito del Módulo
Este módulo constituye el **sustrato fundacional indispensable** de la plataforma. Su responsabilidad única es resolver la infraestructura de la sala colaborativa: la identidad de los participantes, la titularidad permanente, la política de acceso mediante invitaciones, el control estricto de concurrencia y la detección de presencia en tiempo real.

### 1.2. Límite Arquitectónico (Frontera del Módulo)
Para garantizar una arquitectura limpia y modular, este documento delimita de forma estricta su alcance:
* **Punto de llegada:** El módulo concluye exactamente en el momento en que un usuario autenticado y autorizado accede a un **espacio en blanco (lienzo vacío)**, donde se refleja con certeza si los participantes autorizados están **Presentes (Conectados)** o **Ausentes (Desconectados)**, reconociendo al **Anfitrión** y a los **Invitados**.
* **Fuera de alcance:** Cualquier elemento visual, funcional o multimedia que se coloque sobre el lienzo (trazos de dibujo, pizarras, notas, tableros Kanban, sincronización de audio/música, widgets o ventanas) pertenece a **módulos superiores independientes** que se acoplarán sobre este sustrato base.

### 1.3. Invariantes Negativos y Anti-Requisitos (Límites Estrictos del Módulo)
Para prevenir alucinaciones de modelos de lenguaje, evitar sobreingeniería innecesaria y delimitar inequívocamente el espacio de búsqueda en implementaciones presentes y futuras, se declaran los siguientes invariantes negativos absolutos para este módulo:

* **ANTI-01: Prohibición de Eliminación de Sala (No DELETE / Sin Soft-Delete)**
  * *Declaración:* El sistema NO expone ninguna operación, endpoint ni interfaz para eliminar un lienzo.
  * *Consecuencia técnica:* No existen endpoints `DELETE /canvases/{id}`, no se admite columna `deleted_at` ni banderas de soft-delete en la base de datos, y no se debe renderizar ningún botón de destrucción en la UI.
  * *Razón de diseño:* El lienzo personal es un recurso persistente e inmutable acoplado 1:1 a la identidad del usuario verificado.

* **ANTI-02: Prohibición de Múltiples Salas Propias (Sin Dashboard "Mis Salas")**
  * *Declaración:* Un usuario NO puede crear, poseer ni administrar múltiples salas personales.
  * *Consecuencia técnica:* El modelo relacional prohíbe colecciones `User -> HasMany(Canvases)`. La relación es estrictamente 1:1. La UI no debe incluir selectores de sala, dashboards de gestión de múltiples lienzos propios ni modales de "Crear nueva sala".
  * *Razón de diseño:* La navegación entre espacios se resuelve enteramente mediante el puntero persistente `Lienzo Actual` hacia salas compartidas, preservando la simplicidad arquitectónica.

* **ANTI-03: Prohibición de Roles Secundarios, Co-Host o Delegación de Titularidad**
  * *Declaración:* El sistema NO admite roles intermedios (moderadores, co-anfitriones, administradores delegados) ni transferencia de propiedad.
  * *Consecuencia técnica:* El enumerador de roles en persistencia y memoria solo admite exactamente dos valores: `HOST` y `GUEST`. El campo `propietario_id` de la sala es inmutable y no tiene mecanismos de cesión o reasignación.
  * *Razón de diseño:* Evita complejidades innecesarias en las máquinas de estados de autorización y el modelo de control de acceso.

* **ANTI-04: Prohibición de Capa Gráfica, Contenido o Chat en este Módulo**
  * *Declaración:* Este módulo NO procesa trazos, notas, figuras geométricas, tableros, sincronización de audio ni mensajería de chat textual.
  * *Consecuencia técnica:* El servidor de WebSockets en este módulo rechaza cualquier mensaje o payload que no pertenezca al ciclo de vida de presencia (`CONNECT`, `HEARTBEAT`, `DISCONNECT`) o gestión de membresía (`KICK`, `LEAVE`, `RENEW_INVITE`).
  * *Razón de diseño:* Desacoplamiento estricto. El sustrato de sala y presencia debe ser totalmente ortogonal e independiente de las capas funcionales superiores.

* **ANTI-05: Prohibición de Expiración Automática por Tiempo (Sin TTL en Invitaciones)**
  * *Declaración:* Los enlaces y códigos de invitación NO caducan por paso del tiempo, inactividad de la sala o desconexión del anfitrión.
  * *Consecuencia técnica:* La entidad de invitación no debe contener campos de expiración como `expires_at`, ni tareas cron/background workers que invaliden credenciales por tiempo transcurrido. Solo caducan por la acción atómica y manual de renovación del Anfitrión.
  * *Razón de diseño:* Garantizar acceso asíncrono y predecible sin fricción temporal innecesaria.

* **ANTI-06: Prohibición de Salas de Espera (Lobby) y Aprobación en Puerta**
  * *Declaración:* El sistema NO implementa salas de espera, estados pendientes de admisión ni requiere que el anfitrión autorice manualmente el ingreso de cada invitado en tiempo real.
  * *Consecuencia técnica:* Si el código/enlace es válido, el usuario posee cuenta verificada y la sala tiene aforo concurrente disponible (< 10), el ingreso es inmediato y transaccional.
  * *Razón de diseño:* Reducir la sobrecarga de negociación y latencia en el handshake de conexión.

* **ANTI-07: Prohibición de Acoplamiento de Sala al Cliente del Anfitrión (No P2P Host-Server)**
  * *Declaración:* La disponibilidad y el ciclo de vida de la sala NO dependen de que el anfitrión mantenga la aplicación abierta o esté conectado.
  * *Consecuencia técnica:* La sala reside y se orquesta en la infraestructura del servidor central, no en el cliente del anfitrión como nodo P2P primario. Si el anfitrión se desconecta, la sala sigue viva y los invitados continúan operando.
  * *Razón de diseño:* Garantizar la persistencia y disponibilidad de la colaboración distribuida.

* **ANTI-08: Prohibición de Listas Negras Permanentes (Bans) en esta Etapa**
  * *Declaración:* La expulsión de un participante NO registra una lista negra ni bloqueo permanente de usuario.
  * *Consecuencia técnica:* La acción `KICK` destruye la membresía activa y cierra el socket. No se debe modelar una tabla `Blacklist` ni comprobaciones de IP/ID vetado. Si en el futuro el usuario obtiene un nuevo enlace/código válido generado tras una renovación, podrá canjearlo.
  * *Razón de diseño:* Mantener el modelo libre de estado punitivo complejo que corresponde a módulos de moderación avanzada.

---

## 2. Reglas de Negocio (RN)

### RN-01: Naturaleza y Titularidad del Lienzo
* **RN-01.1.** Solo los usuarios con cuenta verificada y perfil completo pueden operar en el sistema.
* **RN-01.2.** Cada usuario tiene exactamente **un único lienzo personal** asociado de forma permanente a su cuenta, generado automáticamente al completar su registro.
* **RN-01.3.** Cada lienzo posee un **único propietario permanente (Anfitrión / Host)**. La titularidad no puede cederse, venderse ni transferirse bajo ninguna circunstancia.
* **RN-01.4.** No existen propietarios temporales, anfitriones delegados ni roles co-administrativos.
* **RN-01.5.** El lienzo no puede ser eliminado desde la interfaz de la aplicación.
* **RN-01.6.** El lienzo es un espacio persistente e independiente de la conexión de su dueño: los participantes autorizados pueden ingresar y permanecer en la sala aunque el Anfitrión esté ausente.

### RN-02: Puntero de Lienzo Actual y Navegación
* **RN-02.1.** El usuario conserva siempre la titularidad inmutable de su propio lienzo personal.
* **RN-02.2.** El sistema mantiene para cada usuario un puntero denominado **Lienzo Actual**, que determina qué sala se abre de forma predeterminada al iniciar sesión.
* **RN-02.3.** Al registrarse, el *Lienzo Actual* apunta a su propio lienzo personal.
* **RN-02.4.** Al canjear exitosamente una invitación a la sala de otro usuario, ese lienzo compartido pasa a ser su nuevo *Lienzo Actual*.
* **RN-02.5.** Cerrar la pestaña, apagar el navegador o cerrar sesión no reinicia el puntero; en el siguiente inicio de sesión, el usuario regresa automáticamente al último *Lienzo Actual* al que tenga acceso vigente.
* **RN-02.6.** El acceso posterior a otra sala compartida reemplaza el puntero al nuevo espacio. Cambiar de sala nunca destruye ni altera el lienzo personal del usuario.

### RN-03: Jerarquía de Roles
* **RN-03.1.** Todo participante dentro de una sala posee uno de dos roles inmutables:
  * **Anfitrión (Host):** Creador y titular permanente del espacio. Posee privilegios de expulsión de miembros y renovación de invitaciones.
  * **Invitado (Guest):** Participante admitido mediante invitación válida. Posee derechos de permanencia y salida voluntaria.
* **RN-03.2.** Los roles son estructurales y no permutables.

### RN-04: Capacidad y Política de Aforo
* **RN-04.1.** El aforo máximo concurrente es de **10 usuarios conectados simultáneamente** por lienzo.
* **RN-04.2. Reserva Garantizada del Anfitrión:** El Anfitrión siempre tiene garantizado el ingreso a su propio lienzo. La sala admite un máximo de 9 invitados concurrentes si el anfitrión está conectado, o hasta 10 invitados si el anfitrión está ausente. Si la sala está llena con 10 invitados y el anfitrión se conecta, el sistema debe garantizar su cupo prioritario.
* **RN-04.3. Rechazo en Puerta (Sala Llena):** Si la sala alcanza los 10 usuarios conectados, cualquier intento de conexión entrante es rechazado inmediatamente indicando que la sala ha alcanzado su capacidad máxima.
* **RN-04.4.** Solo se admite a un nuevo participante cuando un cupo se libere por salida voluntaria, desconexión confirmada o expulsión.

### RN-05: Ciclo de Vida del Acceso (Membresía Persistente)
* **RN-05.1.** El canje exitoso de una invitación otorga **membresía persistente** al lienzo.
* **RN-05.2.** El usuario no necesita volver a introducir el código ni hacer clic en el enlace para visitas posteriores.
* **RN-05.3.** La membresía se extingue únicamente por:
  * Salida voluntaria del invitado (*Abandonar sala*); o
  * Expulsión ejecutada por el Anfitrión.

### RN-06: Mecanismo y Vigencia de Invitaciones
* **RN-06.1.** Cada lienzo dispone de dos factores de invitación sincronizados:
  * Un **enlace directo** compartible; y
  * Un **código alfanumérico unívoco de 6 caracteres**.
* **RN-06.2.** El código y el enlace son de vigencia indefinida: no caducan por tiempo transcurrido, inactividad de la sala ni por desconexión del Anfitrión.
* **RN-06.3.** El Anfitrión no requiere estar conectado para que un invitado canjee una invitación válida.

### RN-07: Renovación Atómica de Invitaciones
* **RN-07.1.** Solo el Anfitrión puede renovar las credenciales de acceso de su lienzo.
* **RN-07.2.** La renovación invalida inmediatamente el enlace y el código anteriores para nuevos ingresos, generando atómicamente un nuevo par de credenciales.
* **RN-07.3.** La renovación no revoca el acceso a quienes ya fueron admitidos previamente ni expulsa a los usuarios conectados en ese instante.

### RN-08: Salida Voluntaria vs. Expulsión
* **RN-08.1. Salida Voluntaria:** El invitado decide revocar su propia membresía. Su *Lienzo Actual* se reconfigura automáticamente a su lienzo personal. Para regresar en el futuro, requerirá una nueva invitación válida.
* **RN-08.2. Expulsión por el Anfitrión:** El Anfitrión revoca forzosamente la membresía de un participante. Se corta su conexión en tiempo real, se le redirige a su lienzo personal y se bloquea su reingreso salvo que en el futuro obtenga una nueva invitación válida.
* **RN-08.3.** No existen listas negras permanentes ni salas de espera previas en esta etapa.

---

## 3. Requisitos Funcionales (RF)

| ID | Nombre | Descripción | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **RF-01** | Provisión de Lienzo Personal | El sistema debe crear una entidad de Lienzo asociada al usuario inmediatamente después de confirmar su cuenta. | Un usuario recién registrado tiene asignado exactamente un `canvas_id` como propietario. |
| **RF-02** | Resolución de Lienzo Actual | Al autenticarse, el cliente debe redirigir al usuario al lienzo registrado en su puntero `current_canvas_id`. | Si el puntero apunta a una sala ajena con acceso vigente, entra a esa sala; si el acceso fue revocado o es nulo, entra a su lienzo propio. |
| **RF-03** | Generación de Invitación | El Anfitrión debe poder consultar y copiar el enlace directo y el código de 6 caracteres de su sala. | La interfaz del Anfitrión expone el enlace y el código con acción de copiado en un clic. |
| **RF-04** | Canje de Invitación | Un usuario autenticado puede ingresar a una sala navegando al enlace de invitación o introduciendo el código de 6 dígitos en la pantalla de unión. | El sistema valida la vigencia del código, crea el registro de membresía y actualiza el *Lienzo Actual* del usuario. |
| **RF-05** | Validación de Aforo en Puerta | El servidor debe interceptar cada intento de conexión y verificar si la concurrencia activa es menor a 10. | Si hay 10 conectados, el handshake de conexión se rechaza con código específico `ROOM_CAPACITY_REACHED`. |
| **RF-06** | Visualización de Presencia | La sala debe desplegar la lista de todos los usuarios con membresía, indicando en tiempo real si están **Conectados (Presentes)** o **Desconectados (Ausentes)**. | Al abrirse o cerrarse un socket, todos los miembros conectados reciben el evento de cambio de estado en tiempo real. |
| **RF-07** | Salida Voluntaria | Un invitado debe disponer de la opción explícita *Salir del Lienzo*. | Al confirmar, se elimina su registro de membresía, se desconecta el socket de la sala y se le redirige a su lienzo personal. |
| **RF-08** | Expulsión por Anfitrión | El Anfitrión debe contar con un control de expulsión en la lista de participantes frente a cada invitado. | Al ejecutar la expulsión, el servidor cierra forzosamente la conexión del invitado, revoca su membresía y notifica la baja a los demás participantes. |
| **RF-09** | Gestión de Reconexión | Si un cliente pierde conectividad temporalmente, el cliente debe mostrar un estado de reconexión y el servidor debe otorgar una ventana de gracia antes de marcarlo como ausente. | Caídas breves de red (< 10s) no disparan eventos falsos de salida definitiva. |

---

## 4. Requisitos No Funcionales (RNF)

* **RNF-01. Latencia de Notificación de Presencia:** La difusión de un cambio de estado de presencia (entrada, salida o pérdida de latido) a todos los clientes concurrentes de una sala no debe superar los **150 ms** en condiciones normales de red.
* **RNF-02. Protocolo de Latido (*Heartbeat*):**
  * El cliente enviará un ping periódico al servidor cada **5 segundos**.
  * El servidor mantendrá una ventana de gracia de **10 segundos** de silencio antes de marcar al usuario en estado `RECONNECTING` y posteriormente `OFFLINE`.
* **RNF-03. Seguridad y Autorización en Handshake:**
  * El acceso a la sala mediante WebSockets o WebTransport requiere un token de sesión criptográficamente firmado (JWT o sesión segura).
  * El servidor valida antes de aceptar la conexión que el usuario posea una membresía activa (`ACTIVE`) para ese `canvas_id`.
* **RNF-04. Concurrencia Aislada:** El sistema debe aislar las salas entre sí; la carga o eventos de una sala no deben interferir en la latencia o capacidad de las salas vecinas.
* **RNF-05. Idempotencia y Atomicidad:** La renovación de credenciales de invitación y el canje de accesos deben ejecutarse bajo transacciones atómicas para evitar condiciones de carrera (*race conditions* en concurrencia límite).
* **RNF-06. Trazabilidad y Auditoría:** Todos los eventos de ciclo de vida de sala deben registrarse con estructura uniforme: `USER_JOINED`, `USER_LEFT`, `USER_KICKED`, `HEARTBEAT_TIMEOUT`, `INVITATION_RENEWED`.

---

## 5. Entidades del Dominio (Modelo de Datos)

```
┌─────────────────┐       1:1        ┌─────────────────┐
│     Usuario     │ ───────────────> │  LienzoPersonal │
│     (User)      │                  │  (PersonalRoom) │
└─────────────────┘                  └─────────────────┘
        │ 1                                   │ 1
        │                                     │
        │ N                                   │ N
        ▼                                     ▼
┌─────────────────┐       N:1        ┌─────────────────┐       1:1        ┌─────────────────┐
│ MembresiaLienzo │ <─────────────── │   LienzoSala    │ ───────────────> │ InvitacionSala  │
│(CanvasMembership│                  │  (CanvasRoom)   │                  │(CanvasInvitation│
└─────────────────┘                  └─────────────────┘                  └─────────────────┘
        │ 1
        │ 
        ▼ [En Memoria / Redis]
┌─────────────────┐
│ SesionPresencia │
│(PresenceSession)│
└─────────────────┘
```

### 5.1. Definición de Entidades y Atributos

#### Entidad: `Usuario` (User)
* `id`: Identificador único inmutable (UUID).
* `email`: Correo electrónico verificado.
* `nombre_completo`: Nombre público en la plataforma.
* `avatar_url`: Imagen o representación visual.
* `perfil_completo`: Booleano (true indica que completó el onboarding).
* `lienzo_personal_id`: Llave foránea hacia su propio `LienzoSala`.
* `lienzo_actual_id`: Llave foránea que apunta a la sala que se abrirá al iniciar sesión.

#### Entidad: `LienzoSala` (CanvasRoom)
* `id`: Identificador único de la sala (UUID).
* `propietario_id`: Llave foránea inmutable hacia el `Usuario` creador (Anfitrión).
* `creado_en`: Timestamp de creación.

#### Entidad: `MembresiaLienzo` (CanvasMembership)
* `id`: Identificador de membresía (UUID).
* `lienzo_id`: Referencia a la sala.
* `usuario_id`: Referencia al usuario admitido.
* `rol`: Enumerador inmutable [`HOST`, `GUEST`].
* `estado`: Enumerador mutable [`ACTIVE`, `REVOKED`].
* `fecha_admision`: Timestamp en que se canjeó la invitación inicial.

#### Entidad: `InvitacionSala` (CanvasInvitation)
* `id`: Identificador único (UUID).
* `lienzo_id`: Referencia unívoca a la sala correspondiente.
* `codigo_acceso`: Cadena alfanumérica de 6 caracteres en mayúsculas (ej. `K9X2P4`). Índice único en base de datos.
* `token_enlace`: Hash criptográfico seguro para acceso por URL.
* `estado`: Enumerador [`ACTIVE`, `REVOKED`].
* `actualizado_en`: Timestamp de última renovación.

#### Entidad Efímera: `SesionPresencia` (PresenceSession - Estado en Memoria / Redis)
* `socket_id`: Identificador de la conexión activa.
* `lienzo_id`: Sala en la que se encuentra conectado.
* `usuario_id`: Usuario autenticado.
* `estado_presencia`: Enumerador [`ONLINE`, `RECONNECTING`].
* `ultimo_latido`: Timestamp del último ping recibido.

---

## 6. Máquinas de Estados del Sistema

### 6.1. Ciclo de Presencia del Usuario en la Sala
Modela el estado del participante en tiempo real dentro del lienzo:

```
                  ┌────────────────────────────────────────┐
                  │                                        │
                  ▼                                        │
          [ DESCONECTADO ] (Offline / Ausente)             │
                  │                                        │
                  │ Handshake WS Exitoso                   │
                  ▼                                        │
            [ CONECTADO ] (Online / Presente)              │
                  │                                        │
                  │ Pérdida de Latido (> 5s)               │
                  ▼                                        │
           [ RECONECTANDO ] (Ventana Gracia < 10s)         │
             │           │                                 │
   Latido OK │           │ Timeout de Gracia (> 10s)       │
             │           └─────────────────────────────────┘
             ▼
       [ CONECTADO ]
```

### 6.2. Ciclo de Membresía del Participante
Modela el derecho legal del usuario para ingresar a una sala ajena:

```
               [ SIN ACCESO ]
                      │
                      │ Canje de Invitación Válida
                      ▼
                 [ ACTIVO ] (Membresía Persistente)
                  │      │
 Salida Voluntaria│      │ Expulsión por el Anfitrión
                  ▼      ▼
             [ REVOCADO / CANCELADO ]
                      │
                      │ Canje de Nueva Invitación Válida
                      ▼
                 [ ACTIVO ]
```

### 6.3. Ciclo de las Credenciales de Invitación
Modela la vigencia del enlace y código de acceso:

```
       [ VIGENTE ] (Activo indefinidamente)
            │
            │ Acción manual del Anfitrión: "Renovar Invitación"
            ▼
       [ REVOCADA ] ───> Se genera atómicamente un nuevo registro [ VIGENTE ]
```

### 6.4. Estado de Aforo de la Sala (Control de Capacidad)
Modela la compuerta de admisión en tiempo real frente al límite estricto de 10 concurrentes:

```
        ┌────────────────────────────────────────────────────────┐
        │                                                        │
        ▼                                                        │
  [ DISPONIBLE ] (Conectados < 10)                               │
        │                                                        │
        │ Conexión entrante alcanza el usuario número 10         │
        ▼                                                        │
     [ LLENA ] (Conectados == 10)                                │
        │        │                                               │
        │        │ Intento de conexión entrante: RECHAZO INMEDIATO
        │        │                                               │
        │        │ Usuario se desconecta, abandona o es expulsado│
        │        └───────────────────────────────────────────────┘
        ▼
  [ DISPONIBLE ]
```
