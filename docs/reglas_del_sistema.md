# Especificación: Reglas del Sistema General
## Proyecto: RealTime Interaction

Este documento define el **núcleo fundacional de la aplicación** (la infraestructura de sala, membresía, sesiones y presencia). 

Establece las reglas para un espacio colaborativo antes de añadir capas de contenido: el usuario accede a un lienzo base con identificación de roles (**Anfitrión vs. Invitado**) y estados de presencia (**Presente vs. Ausente**), administrando los accesos y la concurrencia.

---

### 1. Naturaleza y Propiedad del Lienzo

* **1.1.** Solo podrán utilizar el sistema los usuarios con una cuenta verificada y un perfil completo.
* **1.2.** Cada usuario tendrá un único lienzo personal asociado permanentemente a su cuenta.
* **1.3.** El lienzo personal se creará automáticamente al completar el registro del usuario.
* **1.4.** Después de iniciar sesión, el usuario accederá directamente a su *lienzo actual*.
* **1.5.** La aplicación no manejará múltiples lienzos propios por usuario ni incluirá un panel de administración de salas.
* **1.6.** Cada lienzo tendrá un único propietario permanente (Anfitrión / Host).
* **1.7.** La propiedad del lienzo no podrá transferirse bajo ninguna circunstancia.
* **1.8.** No existirán propietarios temporales, hosts interinos ni roles administrativos secundarios.
* **1.9.** El lienzo no podrá eliminarse desde la aplicación.
* **1.10.** El lienzo será un espacio persistente cuya disponibilidad es independiente de que su propietario esté conectado.
* **1.11.** Los usuarios autorizados podrán ingresar y permanecer en la sala aunque el propietario no se encuentre presente en ese momento.

---

### 2. Lienzo Personal y Lienzo Actual

* **2.1.** Cada usuario conservará siempre la titularidad permanente de su lienzo personal propio.
* **2.2.** El sistema mantendrá para cada usuario un puntero de **lienzo actual**, que define la sala abierta automáticamente cada vez que ingresa a la aplicación.
* **2.3.** Inicialmente, el lienzo actual de un usuario recién registrado será su propio lienzo personal.
* **2.4.** Cuando un usuario acceda a la sala de otra persona mediante una invitación válida, dicho lienzo compartido se convertirá inmediatamente en su nuevo **lienzo actual**.
* **2.5.** Cerrar el navegador, cerrar sesión o perder la conexión no modificará el puntero de lienzo actual.
* **2.6.** En futuros inicios de sesión, el usuario volverá automáticamente a su último lienzo actual mientras conserve acceso concedido a él.
* **2.7.** Si el usuario accede posteriormente a otro lienzo compartido mediante una nueva invitación, este último sustituirá al anterior como su lienzo actual.
* **2.8.** Cambiar de lienzo actual no altera la propiedad de su lienzo personal, el cual permanece intacto en el sistema.

---

### 3. Capacidad de Concurrencia y Acceso a la Sala

* **3.1.** El número máximo de usuarios conectados simultáneamente a un lienzo será de **10 usuarios**.
* **3.2. Prioridad de Ingreso del Anfitrión:**
  * El propietario del lienzo tendrá **acceso garantizado permanente** (su cupo está reservado; la sala admite hasta 9 invitados concurrentes más el anfitrión).
  * El anfitrión siempre podrá ingresar a su propio espacio.
* **3.3. Límite de Capacidad (Sala Llena):**
  * Si la sala alcanza los 10 usuarios conectados, se denegará el acceso a cualquier otro invitado informando que la capacidad máxima ha sido alcanzada.
  * Solo se admitirá a un nuevo participante cuando un cupo se libere por salida voluntaria o expulsión.

---

### 4. Presencia y Roles en la Sala

* **4.1.** Cada participante en la sala tendrá asignado uno de dos roles inmutables:
  * **Anfitrión (Host):** Creador y dueño permanente del lienzo.
  * **Invitado (Guest):** Participante que ingresó mediante una invitación válida.
* **4.2.** Todos los usuarios conectados visualizarán en tiempo real la lista de participantes y sus etiquetas de estado:
  * **Conectado / Presente:** Usuario con sesión activa y socket abierto en el lienzo.
  * **Desconectado / Ausente:** Usuario con acceso concedido al lienzo que no se encuentra en línea en ese momento.
* **4.3.** La desconexión de cualquier usuario (incluido el anfitrión) no cerrará la sala ni expulsará a los demás participantes conectados.
* **4.4.** Una desconexión temporal por fallo de red mostrará al usuario un indicador de reconexión sin alterar la sesión de los demás.
* **4.5.** La reconexión de un usuario a la sala no interrumpirá el funcionamiento de los demás participantes.

---

### 5. Invitaciones

* **5.1.** Cada lienzo dispondrá de dos mecanismos de admisión:
  * Un enlace directo compartible;
  * Un código de acceso alfanumérico de seis dígitos.
* **5.2.** El enlace abrirá directamente la pantalla de acceso a la sala correspondiente.
* **5.3.** El código de seis dígitos podrá introducirse manualmente desde la pantalla de unión a sala.
* **5.4.** El uso de una invitación no eximirá los requisitos de poseer una cuenta verificada con perfil completo.
* **5.5.** Cada código vigente identificará de manera unívoca a un único lienzo.
* **5.6.** El anfitrión no necesitará estar conectado para que un invitado utilice una invitación válida e ingrese a la sala.
* **5.7.** El canje correcto de una invitación otorgará **acceso persistente** al lienzo (el invitado no requerirá volver a ingresar el código en futuras sesiones).

---

### 6. Vigencia de las Invitaciones

* **6.1.** El enlace y el código permanecerán vigentes indefinidamente hasta que el anfitrión decida renovarlos manualmente.
* **6.2.** Las credenciales de invitación no caducarán de forma automática por:
  * El transcurso del tiempo;
  * Cierre del navegador o de la sesión;
  * Desconexión del anfitrión;
  * Inactividad de la sala (quedar sin usuarios conectados).
* **6.3.** El acceso previamente concedido a un participante será independiente de la vigencia posterior de la invitación utilizada para entrar por primera vez.

---

### 7. Renovación del Acceso Mediante Invitación

* **7.1.** Solo el anfitrión tendrá potestad para renovar las credenciales de invitación de su lienzo.
* **7.2.** La acción de renovación generará de forma atómica:
  * Un nuevo enlace compartible;
  * Un nuevo código de acceso de seis dígitos.
* **7.3.** Las credenciales anteriores quedarán invalidadas inmediatamente para nuevos ingresos.
* **7.4.** Cualquier intento de utilizar una invitación anterior mostrará un mensaje indicando que la credencial ha expirado.
* **7.5.** La renovación afectará exclusivamente a futuras admisiones; no expulsará a los usuarios conectados ni revocará el acceso a quienes ya formaban parte de la sala.

---

### 8. Salida Voluntaria (Abandonar un Lienzo)

* **8.1.** Cualquier invitado podrá desvincularse voluntariamente de un lienzo compartido mediante la acción *Salir del lienzo*.
* **8.2.** Abandonar el lienzo revocará definitivamente su acceso persistente a esa sala.
* **8.3.** Tras abandonar el lienzo compartido, el lienzo personal del usuario volverá a configurarse automáticamente como su *lienzo actual*.
* **8.4.** Para regresar en el futuro a esa sala, el usuario deberá canjear una nueva invitación válida.
* **8.5.** Abandonar un lienzo es una acción individual que no afectará a los demás participantes.

---

### 9. Administración de Participantes (Expulsión por el Anfitrión)

* **9.1.** Solo el anfitrión podrá ver los controles de gestión y expulsar participantes.
* **9.2.** La expulsión desconectará en tiempo real al usuario de la sala de forma inmediata.
* **9.3.** La expulsión revocará definitivamente el acceso persistente de dicho usuario al lienzo.
* **9.4.** El lienzo personal del usuario expulsado volverá a configurarse automáticamente como su *lienzo actual*.
* **9.5.** El usuario expulsado no podrá reingresar a menos que obtenga una nueva invitación válida otorgada posteriormente.
* **9.6.** El sistema no incluirá inicialmente listas negras permanentes, traspasos de sala ni salas de espera previas.

---

### 10. Sincronización de Eventos de Red de la Sala

* **10.1.** Los eventos de conexión, entrada, salida y cambio de estado de presencia de los usuarios se transmitirán en tiempo real con alta prioridad a todos los participantes conectados.
* **10.2.** El cliente mantendrá una señal de latido (*heartbeat*) periódica con el servidor para verificar la conectividad activa.
* **10.3.** Si el servidor detecta pérdida de latidos durante una ventana de gracia temporal, marcará al usuario en estado de reconexión antes de declararlo ausente.
