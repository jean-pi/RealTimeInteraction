# Especificación: Reglas del Sistema General
## Proyecto: RealTime Interaction

Este documento contiene la especificación canónica y definitiva de las **Reglas del Sistema General** de la aplicación, afinadas a partir del modelo del FigJam y de las decisiones arquitectónicas consolidadas.

---

### 1. Naturaleza y Propiedad del Lienzo

* **1.1.** Solo podrán utilizar el sistema los usuarios con una cuenta verificada y un perfil completo.
* **1.2.** Cada usuario tendrá un único lienzo personal asociado permanentemente a su cuenta.
* **1.3.** El lienzo personal se creará automáticamente al completar el registro del usuario.
* **1.4.** Después de iniciar sesión, el usuario accederá directamente a su *lienzo actual*.
* **1.5.** La aplicación no manejará múltiples lienzos propios por usuario ni incluirá un panel de administración de salas.
* **1.6.** Cada lienzo tendrá un único propietario permanente.
* **1.7.** La propiedad del lienzo no podrá transferirse.
* **1.8.** No existirán propietarios temporales, hosts interinos ni roles administrativos adicionales.
* **1.9.** El lienzo no podrá eliminarse desde la aplicación.
* **1.10.** El lienzo será un espacio persistente compuesto por una pizarra compartida y diferentes ítems funcionales.
* **1.11.** La disponibilidad del lienzo será independiente de que su propietario esté conectado.
* **1.12.** Los usuarios autorizados podrán ingresar y continuar trabajando colaborativamente aunque el propietario no se encuentre presente en la sesión.

---

### 2. Lienzo Personal y Lienzo Actual

* **2.1.** Cada usuario conservará siempre la titularidad de su propio lienzo personal.
* **2.2.** El sistema mantendrá para cada usuario un puntero de **lienzo actual**, que será el espacio abierto automáticamente cada vez que ingrese a la aplicación.
* **2.3.** Inicialmente, el lienzo actual de un usuario nuevo será su lienzo personal.
* **2.4.** Cuando un usuario acceda correctamente al lienzo de otra persona mediante una invitación válida, ese lienzo compartido pasará a convertirse inmediatamente en su nuevo **lienzo actual**.
* **2.5.** Cerrar el navegador, cerrar sesión o perder temporalmente la conexión no modificará el lienzo actual.
* **2.6.** En futuros inicios de sesión, el usuario volverá automáticamente al último lienzo actual mientras conserve acceso concedido a él.
* **2.7.** Si el usuario accede posteriormente a otro lienzo compartido mediante una nueva invitación, este último sustituirá al anterior como su lienzo actual.
* **2.8.** Cambiar de lienzo actual no afecta la propiedad ni la persistencia del lienzo personal propio del usuario.

---

### 3. Acceso Persistente y Capacidad de Concurrencia

* **3.1.** El enlace compartible y el código de acceso de seis dígitos servirán para obtener acceso inicial a un lienzo.
* **3.2.** Cuando un usuario utilice correctamente una invitación válida, se registrará su acceso persistente al lienzo.
* **3.3.** Después de obtener acceso, el participante no tendrá que volver a introducir el enlace o código en futuros ingresos.
* **3.4.** El acceso permanecerá vigente hasta que:
  * El usuario abandone voluntariamente el lienzo; o
  * El propietario revoque su acceso mediante expulsión.
* **3.5.** La desconexión temporal, el cierre de sesión o la inactividad no eliminarán el acceso concedido.
* **3.6.** La ausencia del propietario no afectará los accesos previamente concedidos a los invitados.
* **3.7. Límite y Concurrencia:**
  * El número máximo de usuarios conectados simultáneamente a un lienzo será de **10 usuarios**.
  * El propietario del lienzo tendrá **acceso garantizado permanente** (su cupo está reservado; la sala admite hasta 9 invitados concurrentes más el anfitrión).
  * Si la sala alcanza los 10 usuarios conectados, se denegará la entrada a cualquier otro participante hasta que se libere un cupo mediante salida voluntaria o expulsión.

---

### 4. Ítems Disponibles

* **4.1.** El lienzo podrá contener los siguientes tipos de ítems:
  * Ítem de cámara (transmisión en vivo);
  * Ítem de lista de tareas;
  * Ítem de Apple Music® o Spotify®;
  * Ítem de texto enriquecido;
  * Ítem de imagen.
* **4.2.** Cada ítem pertenecerá permanentemente al usuario que lo creó en el lienzo.
* **4.3.** La propiedad de un ítem no podrá transferirse a otro usuario.
* **4.4.** Las reglas particulares de interacción de cada cápsula se establecerán en sus respectivas secciones específicas.

---

### 5. Persistencia y Eliminación de Ítems

* **5.1.** Los ítems continuarán existiendo en el lienzo independientemente de que su creador esté conectado.
* **5.2.** Desconectarse temporalmente no eliminará ningún ítem.
* **5.3.** Cerrar el navegador o cerrar sesión no eliminará ningún ítem.
* **5.4.** Si un participante abandona voluntariamente el lienzo:
  * Sus ítems se ocultan visualmente del lienzo compartido para no saturar el espacio.
  * Los datos de sus ítems persistirán en la base de datos central. Si el usuario vuelve a obtener acceso en el futuro, sus ítems reaparecerán en el estado exacto en que quedaron.
* **5.5.** Si un participante es expulsado por el propietario:
  * Se produce una eliminación definitiva (**Hard Delete**) de sus ítems en el lienzo y de sus datos asociados en la base de datos.
* **5.6.** Minimizar un ítem no representará su eliminación; conserva su configuración y contenido.
* **5.7.** Solo el propietario del ítem podrá eliminarlo individualmente.
* **5.8.** La acción `X` del ítem representará una eliminación manual permanente.
* **5.9.** Cuando el creador utilice la acción `X`, se eliminará el ítem y sus datos asociados sin posibilidad de recuperación.
* **5.10.** Un ítem eliminado no reaparecerá al reconectarse ni al recargar el lienzo.
* **5.11.** El ítem de cámara será la excepción a la persistencia visual: al representar una transmisión temporal en vivo, desaparecerá del lienzo en cuanto su propietario se desconecte.

---

### 6. Estado Compartido del Lienzo

* **6.1.** Todos los usuarios conectados visualizarán el mismo estado compartido del lienzo en tiempo real.
* **6.2.** El estado compartido incluirá:
  * Ítems existentes y sus creadores;
  * Posición $(x, y)$ de los ítems;
  * Dimensiones $(w, h)$ de los ítems;
  * Contenido persistente de cada ítem;
  * Estado visual (abierto o minimizado);
  * Orden de superposición (orden Z);
  * Trazos vectoriales de la pizarra compartida;
  * Creación y eliminación de elementos.
* **6.3.** El orden Z será compartido y visible de forma homogénea para todos los participantes.
* **6.4.** Todo cambio autorizado en la superposición de un elemento se reflejará inmediatamente en los demás clientes.
* **6.5.** Los cambios sobre el estado compartido se actualizarán en tiempo real para todos los usuarios concurrentes.
* **6.6.** Los estados exclusivamente personales permanecerán locales en el dispositivo del usuario.
* **6.7.** Entre los estados locales estarán:
  * Nivel de volumen personal;
  * Herramienta de dibujo activa;
  * Color y grosor de pincel seleccionados;
  * Autenticación individual en servicios de terceros (Spotify/Apple);
  * Preferencias personales de visualización de la interfaz.

---

### 7. Conexión y Presencia

* **7.1.** La conexión de cada usuario será independiente de la disponibilidad general del lienzo.
* **7.2.** La desconexión de cualquier usuario no cerrará el lienzo ni interrumpirá la sesión de los demás participantes.
* **7.3.** Los ítems persistentes de un usuario ausente permanecerán visibles en la pizarra.
* **7.4.** Estos ítems mostrarán una apariencia atenuada o inactiva que indicará claramente que su propietario no está presente.
* **7.5.** Los demás usuarios podrán ver los ítems del ausente pero no podrán modificarlos.
* **7.6.** Cuando el creador vuelva a conectarse, sus ítems recuperarán automáticamente su apariencia activa e interactiva.
* **7.7.** El ítem de cámara desaparecerá automáticamente cuando su propietario pierda conexión.
* **7.8.** Al desaparecer el ítem de cámara, se interrumpirán de inmediato sus transmisiones de audio y video.
* **7.9.** Una pérdida temporal de red mostrará un estado de reconexión al usuario afectado sin expulsarlo inmediatamente.
* **7.10.** La reconexión de un participante no bloqueará ni degradará el funcionamiento del lienzo para los demás.
* **7.11.** Siempre que sea viable, los cambios locales pendientes se conservarán temporalmente en cola local hasta restablecer la conexión.

---

### 8. Invitaciones

* **8.1.** Cada lienzo dispondrá de dos métodos de invitación:
  * Un enlace compartible directo;
  * Un código alfanumérico de seis dígitos.
* **8.2.** El enlace permitirá abrir directamente la interfaz de admisión del lienzo correspondiente.
* **8.3.** El código de seis dígitos podrá introducirse manualmente desde la pantalla de acceso.
* **8.4.** Utilizar una invitación no eximirá de los requisitos de cuenta verificada y perfil completo.
* **8.5.** Cada código vigente identificará de manera unívoca a un único lienzo.
* **8.6.** El propietario no requerirá estar conectado para que un invitado utilice una invitación válida.
* **8.7.** El uso correcto de una invitación válida concederá acceso persistente automático al lienzo.
* **8.8.** Si la sala cuenta con el cupo completo de 10 usuarios concurrentes, a cualquier nuevo usuario que intente conectarse se le denegará el ingreso informando que la capacidad está al máximo.

---

### 9. Vigencia de las Invitaciones

* **9.1.** El enlace y el código de seis dígitos permanecerán vigentes indefinidamente hasta que el propietario decida renovarlos manualmente.
* **9.2.** Las credenciales de invitación no caducarán de forma automática:
  * Por el transcurso de un límite de tiempo;
  * Al cerrar el navegador;
  * Al cerrar sesión;
  * Cuando el propietario se desconecte;
  * Cuando el lienzo quede completamente vacío sin usuarios conectados.
* **9.3.** El acceso persistente previamente concedido a un participante será independiente de la vigencia posterior del código utilizado para entrar por primera vez.

---

### 10. Renovación del Acceso Mediante Invitación

* **10.1.** Solo el propietario del lienzo tendrá privilegios para renovar las credenciales de invitación.
* **10.2.** La acción de renovación generará simultáneamente:
  * Un nuevo enlace compartible;
  * Un nuevo código de acceso de seis dígitos.
* **10.3.** Las credenciales anteriores quedarán invalidadas inmediatamente para futuras admisiones.
* **10.4.** Cualquier intento de utilizar el enlace o código anterior mostrará un mensaje indicando que la invitación ha caducado.
* **10.5.** La renovación afectará exclusivamente a futuros intentos de ingreso.
* **10.6.** Los usuarios que ya cuenten con acceso persistente previo conservarán su membresía al lienzo intacta.
* **10.7.** Los participantes que se encuentren conectados al momento de la renovación no serán interrumpidos ni desconectados.
* **10.8.** La renovación de credenciales no modificará ni borrará ítems, trazos, imágenes ni contenido alguno del lienzo.
* **10.9.** Renovar una invitación y revocar el acceso de un usuario específico continuarán siendo operaciones completamente independientes.

---

### 11. Abandonar un Lienzo

* **11.1.** Un participante podrá desvincularse voluntariamente de un lienzo mediante la acción explícita *Salir del lienzo*.
* **11.2.** Abandonar el lienzo revocará su acceso persistente a ese espacio.
* **11.3.** Tras abandonar el lienzo compartido, el lienzo personal del usuario volverá a establecerse como su lienzo actual.
* **11.4.** Para regresar en el futuro, el usuario deberá canjear nuevamente una invitación vigente.
* **11.5. Gestión de Ítems al Salir:**  
  Sus ítems se retirarán de la vista del lienzo para no saturar el espacio, pero su configuración y datos persistirán en base de datos.
* **11.6. Gestión de Trazos al Salir:**  
  **Todos los trazos vectoriales (`Stroke`) dibujados por el usuario que abandona el lienzo serán eliminados de la pizarra compartida.**
* **11.7.** La acción de abandonar el lienzo afectará única y exclusivamente al participante que la ejecuta.

---

### 12. Administración de Participantes

* **12.1.** El propietario podrá visualizar en todo momento la lista de usuarios conectados a su lienzo.
* **12.2.** Solo el propietario tendrá potestad para expulsar a un usuario.
* **12.3.** La expulsión desconectará inmediatamente al usuario de la sesión de tiempo real.
* **12.4.** La expulsión revocará de forma definitiva el acceso persistente de dicho usuario al lienzo.
* **12.5.** El lienzo personal del usuario expulsado volverá a configurarse automáticamente como su lienzo actual.
* **12.6.** El usuario expulsado no podrá reingresar en futuros inicios de sesión a menos que obtenga una nueva invitación válida.
* **12.7. Destrucción de Ítems por Expulsión:**  
  La expulsión ejecutará un borrado definitivo (**Hard Delete**) de todos los ítems y estados persistentes creados por ese usuario en el lienzo.
* **12.8. Destrucción de Trazos por Expulsión:**  
  **Todos los trazos vectoriales (`Stroke`) dibujados por el usuario expulsado serán eliminados inmediatamente de la pizarra compartida.**
* **12.9.** El sistema no incluirá inicialmente:
  * Listas negras ni bloqueos permanentes;
  * Transferencia de propiedad;
  * Co-administradores o roles secundarios;
  * Mecanismo de aprobación manual previa (sala de espera).

---

### 13. Propiedad y Permisos

* **13.1.** Cada usuario podrá crear, controlar y manipular únicamente sus propios ítems.
* **13.2.** Solo el propietario de un ítem tendrá permisos para:
  * Moverlo y posicionarlo;
  * Redimensionarlo;
  * Minimizarlo y restaurarlo;
  * Editar o alterar su contenido;
  * Interactuar con sus controles funcionales internos;
  * Modificar su orden Z;
  * Eliminarlo mediante la acción `X`.
* **13.3.** Ningún participante podrá alterar un ítem ajeno, salvo autorización expresa de una regla específica de módulo.
* **13.4.** La desconexión del propietario de un ítem no transferirá sus derechos de edición a otros participantes.
* **13.5.** La ausencia del propietario del lienzo no otorgará permisos administrativos a ningún invitado.
* **13.6.** Las acciones administrativas (renovación de accesos y expulsión) continuarán reservadas con exclusividad al propietario del lienzo.

---

### 14. Pizarra Compartida

* **14.1.** Cada lienzo poseerá una única pizarra compartida sincronizada.
* **14.2.** Los trazos de usuarios conectados o temporalmente ausentes permanecerán visibles de forma colaborativa.
* **14.3. Ciclo de Vida de Trazos:**  
  Los trazos vectoriales creados por un participante permanecerán en la pizarra mientras conserve su acceso al lienzo. Si el usuario abandona voluntariamente el lienzo (11.6) o es expulsado por el anfitrión (12.8), sus trazos se eliminarán de la pizarra.
* **14.4.** La desconexión temporal de un usuario no eliminará sus trazos mientras su acceso persistente siga activo.
* **14.5.** Las herramientas, grosores, paletas y operaciones puntuales de dibujo se regularán en la sección específica de la pizarra.

---

### 15. Estrategia General de Actualización en Tiempo Real

#### 15.1. Respuesta Local Inmediata
* **15.1.1.** Las acciones autorizadas se reflejarán localmente de forma instantánea en el cliente del usuario emisor (Optimistic UI).
* **15.1.2.** La interfaz no esperará confirmación remota del servidor para pintar un trazo o mover un ítem propio.

#### 15.2. Acciones Continuas
* **15.2.1.** Las interacciones continuas no transmitirán un paquete por cada evento de puntero generado.
* **15.2.2.** Las actualizaciones continuas se agruparán (*throttling*) con una cadencia controlada de entre 40 y 60 milisegundos.
* **15.2.3.** Pertenecen a esta categoría: traslación de ventanas, redimensionamiento, trazado continuo de dibujo y cursor en movimiento.

#### 15.3. Confirmación de Estado Final
* **15.3.1.** Al soltar el puntero o finalizar una acción continua, se emitirá de inmediato el estado final consolidado exacto.
* **15.3.2.** El estado final tendrá precedencia absoluta sobre paquetes intermedios demorados en la red.
* **15.3.3.** La pérdida eventual de un paquete intermedio no impedirá que los demás clientes reciban el estado final correcto.

#### 15.4. Acciones Discretas
* **15.4.1.** Toda acción discreta sobre el estado compartido se transmitirá al servidor de inmediato con alta prioridad.
* **15.4.2.** Se consideran acciones discretas: instanciar un ítem, eliminarlo, minimizarlo, restaurarlo, alterar el orden Z o canjear invitaciones.

#### 15.5. Parámetros Técnicos Ajustables
* **15.5.1.** Las frecuencias de actualización y ventanas de ráfaga serán variables de configuración técnica.
* **15.5.2.** Estos parámetros se calibrarán según pruebas de carga, latencia de red y consumo de CPU.
