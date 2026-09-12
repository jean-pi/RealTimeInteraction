* **[SHAPE]** Definir el propósito de la aplicación y lógica de negocio (¿qué quieres lograr?)

* **[SHAPE]** Análisis de requisitos funcionales y no-funcionales

* **[SHAPE]** Design Thinking, UX/UI Planning & dirección de arte

* **[SHAPE]** Decisiones arquitectónicas (qué tipo de app, por qué), estructura de carpetas, estrategias técnicas.

* **[SHAPE]** Definiciones de

datos, entidades, estados

* **[SHAPE]** Tech Stack & herramientas

* **[SHAPE]** 1

* **[SHAPE]** 2

* **[SHAPE]** 4

* **[SHAPE]** 5

* **[SHAPE]** 3

* **[SHAPE]** 6

* **[SHAPE]** Desarrollo

* **[SHAPE]** Documentación

Arquitectura de software

> **[STICKY: Testabilidad El sistema debe permitir pruebas unitarias de la lógica principal. El sistema debe ser modular para facilitar testing. Mantenibilidad El sistema debe seguir una arquitectura modular. El código debe ser legible y documentado. Observabilidad (nivel pro) El sistema debe registrar errores y eventos relevantes. El sistema debe permitir monitoreo básico del estado de la app.]**

> Testabilidad

>  El sistema debe permitir pruebas unitarias de la lógica principal.

>  El sistema debe ser modular para facilitar testing. Mantenibilidad

>  El sistema debe seguir una arquitectura modular.

>  El código debe ser legible y documentado.

> Observabilidad (nivel pro)

>  El sistema debe registrar errores y eventos relevantes.

>  El sistema debe permitir monitoreo básico del estado de la app.

Definición de entidades

Design Thinking, UX/UI Planning & dirección de arte

Tener un espacio virtual en el cual se pueda compartir experiencias sensoriales, compartir interacciones en tiempo real, sentir el movimiento de las otras personas, usando recursos como imágenes, audio, video, animaciones.

Inmersivo

Fluido

Luminoso

Calmado

Proximidad

Collage

Expresión

Juego

Cercania

motion

typography

interaction

color

spatial feeling

particles/effects

Wireframes LOW FIDELITY

flujo principal

layout general

estructura del canvas

onboarding

sharing/join flow

Sistema visual

tipografía

blur

glass

iluminación

profundidad

composición

Comportamiento visual

Ejemplos:

cómo aparece un pin

cómo responde el fondo

easing

densidad de partículas

movimiento

Motion system

MUY importante para ti.

Define:

duración animaciones

tipo de easing

velocidad

interacción

🎯 Ejemplo

Click

→ ripple suave

Mouse rápido

→ distorsión

Audio

→ expansión orgánica

Sensaciones

Referencias _ Moodboards

UX conceptual

Dirección de arte

video audio interacción / filtros

Reloj cronometro

Imagen drop

texto cruadre

todo list

Apple music / spotify

Ventanas

Reorganice randonly

Minimized maximized windows

Pencil general options

Barra interactiva

Lógica de negocios

> **[STICKY: Reglas del sistema general 1. Naturaleza y propiedad del lienzo 1.1. Solo podrán utilizar el sistema los usuarios con una cuenta verificada y un perfil completo. 1.2. Cada usuario tendrá un único lienzo personal asociado permanentemente a su cuenta. 1.3. El lienzo personal se creará automáticamente al completar el registro del usuario. 1.4. Después de iniciar sesión, el usuario accederá directamente a su lienzo actual. 1.5. La aplicación no manejará múltiples lienzos propios por usuario ni incluirá un panel de administración de salas. 1.6. Cada lienzo tendrá un único propietario permanente. 1.7. La propiedad del lienzo no podrá transferirse. 1.8. No existirán propietarios temporales, hosts interinos ni roles administrativos adicionales. 1.9. El lienzo no podrá eliminarse desde la aplicación. 1.10. El lienzo será un espacio persistente compuesto por una pizarra compartida y diferentes ítems funcionales. 1.11. La disponibilidad del lienzo será independiente de que su propietario esté conectado. 1.12. Los usuarios autorizados podrán ingresar y continuar trabajando aunque el propietario no se encuentre presente. 2. Lienzo personal y lienzo actual 2.1. Cada usuario conservará siempre su lienzo personal. 2.2. El sistema mantendrá para cada usuario un lienzo actual, que será el espacio abierto automáticamente al ingresar a la aplicación. 2.3. Inicialmente, el lienzo actual será el lienzo personal del usuario. 2.4. Cuando un usuario acceda correctamente al lienzo de otra persona mediante una invitación, este pasará a convertirse en su lienzo actual. 2.5. Cerrar el navegador, cerrar sesión o perder temporalmente la conexión no modificará el lienzo actual. 2.6. En futuros inicios de sesión, el usuario volverá automáticamente al último lienzo actual mientras conserve acceso a él. 2.7. Si el usuario accede posteriormente a otro lienzo compartido, este sustituirá al anterior como lienzo actual. 2.8. Cambiar de lienzo actual no afecta la propiedad del lienzo personal del usuario. 3. Acceso persistente a lienzos 3.1. El enlace y el código de acceso servirán para obtener acceso inicial a un lienzo. 3.2. Cuando un usuario utilice correctamente una invitación válida, se registrará su acceso al lienzo. 3.3. Después de obtener acceso, no tendrá que volver a introducir el enlace o código en futuros ingresos. 3.4. El acceso permanecerá vigente hasta que: el usuario abandone voluntariamente el lienzo; o el propietario revoque su acceso. 3.5. La desconexión temporal o el cierre de sesión no eliminarán el acceso concedido. 3.6. La ausencia del propietario tampoco afectará los accesos previamente concedidos. 3.7. El número máximo inicial será de 7 usuarios conectados simultáneamente por lienzo, incluido el propietario cuando esté presente. 5. Persistencia y eliminación de ítems 5.1. Los ítems continuarán existiendo independientemente de que su propietario esté conectado. 5.2. Desconectarse no eliminará ningún ítem 5.3. Cerrar el navegador o cerrar sesión no eliminará ningún ítem 5.4. Abandonar un lienzo eliminará los ítems del lienzo pero los datos de los ítem creados anteriormente por el usuario persistirán en base de datos. 5.5. Ser expulsado de un lienzo eliminará los ítems y los datos del ítem creados anteriormente por ese usuario. 5.6. Minimizar un ítem no representará su eliminación. 5.7. Solo el propietario del ítem podrá eliminarlo. 5.8. La acción X del ítem representará una eliminación permanente. 5.9. Cuando el propietario utilice la X, se eliminará el ítem y sus datos persistentes asociados. 5.10. Un ítem eliminado no reaparecerá al reconectarse ni al volver a ingresar al lienzo. 5.11. El ítem de cámara será una excepción a la persistencia visual, debido a que representa una transmisión temporal. 6. Estado compartido del lienzo 6.1. Todos los usuarios conectados visualizarán el mismo estado compartido del lienzo. 6.2. El estado compartido incluirá: ítems existentes; posición de los ítems; tamaño; contenido persistente; estado visible o minimizado; orden Z; trazos de la pizarra; creación de elementos; eliminación de elementos. 6.3. El orden Z será compartido. 6.4. Todo cambio autorizado en la superposición de los elementos será visible para los demás usuarios. 6.5. Los cambios realizados sobre el estado compartido se actualizarán en tiempo real para los usuarios conectados. 6.6. Los estados exclusivamente personales permanecerán locales. 6.7. Entre los estados locales estarán: volumen; herramienta de dibujo seleccionada; color activo; grosor activo; autenticación individual en servicios externos; configuraciones personales de reproducción; estados exclusivamente visuales de la interfaz. 7. Conexión y presencia 7.1. La conexión de cada usuario será independiente de la disponibilidad general del lienzo. 7.2. La desconexión de un usuario no cerrará el lienzo ni afectará la permanencia de los demás participantes. 7.3. Los ítems persistentes de un usuario desconectado permanecerán visibles. 7.4. Estos ítems tendrán una apariencia visual atenuada o desactivada que indique que su propietario no está presente. 7.5. Los demás usuarios podrán visualizar esos ítems, pero no podrán modificarlos. 7.6. Cuando el propietario vuelva a conectarse, sus ítems recuperarán automáticamente su apariencia activa. 7.7. El ítem de cámara desaparecerá cuando su propietario se desconecte. 7.8. Al desaparecer el ítem de cámara también se detendrán sus transmisiones de audio y video. 7.9. Una pérdida temporal de conexión podrá mostrar un estado de reconexión al usuario afectado. 7.10. La reconexión de un usuario no bloqueará el funcionamiento del lienzo para los demás participantes. 7.11. Cuando sea posible, los cambios locales pendientes podrán conservarse temporalmente hasta recuperar la conexión. 8. Invitaciones 8.1. Cada lienzo tendrá: un enlace compartible; un código de acceso de seis dígitos. 8.2. El enlace permitirá abrir directamente la invitación correspondiente. 8.3. El código podrá introducirse manualmente desde la interfaz de acceso. 8.4. Utilizar una invitación no sustituirá los requisitos de cuenta verificada y perfil completo. 8.5. Cada código vigente deberá identificar de manera inequívoca un único lienzo. 8.6. El propietario no tendrá que estar conectado para que otro usuario pueda utilizar una invitación válida. 8.7. Una invitación válida concederá acceso persistente al usuario que la utilice correctamente. 8.8. Al llegar al máximo de participantes, si alguien mas desea ingresar ,a este se le negara el acceso. 9. Vigencia de las invitaciones 9.1. El enlace y el código permanecerán vigentes hasta que el propietario los renueve manualmente. 9.2. No caducarán automáticamente: por el transcurso del tiempo; al cerrar el navegador; al cerrar sesión; cuando el propietario se desconecte; cuando no exista ningún usuario conectado. 9.3. El acceso previamente concedido a un usuario será independiente de la vigencia posterior de la invitación utilizada para obtenerlo. 10. Renovación del acceso mediante invitación 10.1. Solo el propietario podrá renovar las credenciales de invitación de su lienzo. 10.2. La renovación generará: un nuevo enlace; un nuevo código de seis dígitos. 10.3. Las credenciales anteriores dejarán inmediatamente de permitir nuevos accesos. 10.4. Un intento de utilizar una invitación anterior mostrará un mensaje indicando que el acceso ya no es válido. 10.5. La renovación afectará únicamente a futuras admisiones. 10.6. Los usuarios que ya tengan acceso persistente al lienzo conservarán dicho acceso. 10.7. Los participantes que estén conectados permanecerán dentro del lienzo. 10.8. La renovación no modificará ni eliminará: ítems; trazos; imágenes; textos; tareas; demás contenido persistente. 10.9. Renovar una invitación y revocar el acceso de un usuario serán operaciones independientes. 11. Abandonar un lienzo 11.1. Un participante podrá abandonar voluntariamente un lienzo mediante la acción Salir del lienzo. 11.2. Abandonar el lienzo eliminará su acceso persistente a ese espacio. 11.3. Después de abandonar un lienzo compartido, su lienzo personal se convertirá nuevamente en su lienzo actual. 11.4. Para regresar posteriormente deberá utilizar nuevamente una invitación válida. 11.5. Abandonar un lienzo eliminará los ítems del lienzo , pero no eliminara los datos persistentes creados anteriormente por el usuario, en caso de obtener un nuevo acceso al lienzo recuperara sus ítems en el estado que quedaron. 11.6. Sus ítems permanecerán en el lienzo con una apariencia que indique que su propietario no está presente. 11.7. Abandonar un lienzo afectará únicamente al usuario que realiza la acción. 12. Administración de participantes 12.1. El propietario podrá visualizar los usuarios conectados actualmente a su lienzo. 12.2. Solo el propietario podrá expulsar a otro usuario. 12.3. La expulsión retirará inmediatamente al usuario del lienzo. 12.4. La expulsión también revocará el acceso persistente de ese usuario. 12.5. El lienzo personal del usuario expulsado volverá a convertirse en su lienzo actual. 12.6. El usuario expulsado no podrá regresar automáticamente en futuros inicios de sesión. 12.7. Para volver a acceder deberá utilizar nuevamente una invitación válida. 12.8. La expulsión eliminará sus ítems y sus datos los datos y estados de sus ítems. 12.9. No se incluirán inicialmente: bloqueos permanentes; listas negras; transferencia de propiedad; hosts adicionales; roles administrativos secundarios; aprobación manual de cada ingreso. 13. Propiedad y permisos 13.1. Cada usuario podrá crear y controlar únicamente sus propios ítems. 13.2. Solo el propietario de un ítem podrá: moverlo; redimensionarlo; minimizarlo; restaurarlo; modificar su contenido; utilizar sus controles; cambiar su orden Z; eliminarlo. 13.3. Ningún usuario podrá modificar un ítem perteneciente a otra persona salvo que una regla específica del módulo lo permita expresamente. 13.4. La desconexión del propietario de un ítem no transferirá sus permisos. 13.5. La ausencia del propietario del lienzo tampoco otorgará permisos administrativos a otros usuarios. 13.6. Las acciones administrativas permanecerán reservadas al propietario del lienzo. 14. Pizarra compartida 14.1. El lienzo tendrá una única pizarra compartida. 14.2. Los trazos persistentes continuarán visibles independientemente de la conexión de su autor. 14.3. Las reglas específicas de creación, eliminación, herramientas, orden visual y sincronización de los trazos se definirán en la sección correspondiente a la pizarra. 14.4. La ausencia de un usuario no eliminará automáticamente sus trazos. 14.5. La eliminación de trazos se realizará únicamente mediante las operaciones permitidas por las reglas de la pizarra. 15. Estrategia general de actualización en tiempo real 15.1. Respuesta local 15.1.1. Las acciones autorizadas se reflejarán inmediatamente en el dispositivo del usuario que las realiza. 15.1.2. La interfaz no esperará innecesariamente una confirmación remota para mostrar localmente una acción válida. 15.2. Acciones continuas 15.2.1. Las acciones continuas no enviarán necesariamente una actualización por cada evento generado por el dispositivo de entrada. 15.2.2. Las actualizaciones podrán agruparse y transmitirse con una frecuencia controlada. 15.2.3. Entre estas acciones podrán encontrarse: movimiento; redimensionamiento; dibujo; escritura. 15.2.4. Cada módulo determinará su frecuencia de actualización adecuada. 15.3. Confirmación final 15.3.1. Al finalizar una interacción continua se enviará inmediatamente su estado final exacto. 15.3.2. El estado final tendrá prioridad sobre las actualizaciones intermedias correspondientes a la misma interacción. 15.3.3. Una actualización intermedia retrasada no podrá sobrescribir un estado final más reciente. 15.3.4. La pérdida de una actualización intermedia no deberá impedir que los participantes reciban el resultado final correcto. 15.4. Acciones discretas 15.4.1. Las acciones discretas que modifiquen el estado compartido se transmitirán inmediatamente. 15.4.2. Cada módulo especificará cuáles de sus operaciones son continuas y cuáles son discretas. 15.5. Ajuste técnico 15.5.1. Las frecuencias y tiempos de actualización serán parámetros técnicos ajustables. 15.5.2. Estos valores podrán modificarse mediante pruebas de rendimiento, consumo de red y experiencia de usuario.]**

> Reglas del sistema general

>

> 1. Naturaleza y propiedad del lienzo

> 1.1. Solo podrán utilizar el sistema los usuarios con una cuenta verificada y un perfil completo.

> 1.2. Cada usuario tendrá un único lienzo personal asociado permanentemente a su cuenta.

> 1.3. El lienzo personal se creará automáticamente al completar el registro del usuario.

> 1.4. Después de iniciar sesión, el usuario accederá directamente a su lienzo actual.

> 1.5. La aplicación no manejará múltiples lienzos propios por usuario ni incluirá un panel de administración de salas.

> 1.6. Cada lienzo tendrá un único propietario permanente.

> 1.7. La propiedad del lienzo no podrá transferirse.

> 1.8. No existirán propietarios temporales, hosts interinos ni roles administrativos adicionales.

> 1.9. El lienzo no podrá eliminarse desde la aplicación.

> 1.10. El lienzo será un espacio persistente compuesto por una pizarra compartida y diferentes ítems funcionales.

> 1.11. La disponibilidad del lienzo será independiente de que su propietario esté conectado.

> 1.12. Los usuarios autorizados podrán ingresar y continuar trabajando aunque el propietario no se encuentre presente.

> 2. Lienzo personal y lienzo actual

> 2.1. Cada usuario conservará siempre su lienzo personal.

> 2.2. El sistema mantendrá para cada usuario un lienzo actual, que será el espacio abierto automáticamente al ingresar a la aplicación.

> 2.3. Inicialmente, el lienzo actual será el lienzo personal del usuario.

> 2.4. Cuando un usuario acceda correctamente al lienzo de otra persona mediante una invitación, este pasará a convertirse en su lienzo actual.

> 2.5. Cerrar el navegador, cerrar sesión o perder temporalmente la conexión no modificará el lienzo actual.

> 2.6. En futuros inicios de sesión, el usuario volverá automáticamente al último lienzo actual mientras conserve acceso a él.

> 2.7. Si el usuario accede posteriormente a otro lienzo compartido, este sustituirá al anterior como lienzo actual.

> 2.8. Cambiar de lienzo actual no afecta la propiedad del lienzo personal del usuario.

> 3. Acceso persistente a lienzos

> 3.1. El enlace y el código de acceso servirán para obtener acceso inicial a un lienzo.

> 3.2. Cuando un usuario utilice correctamente una invitación válida, se registrará su acceso al lienzo.

> 3.3. Después de obtener acceso, no tendrá que volver a introducir el enlace o código en futuros ingresos.

> 3.4. El acceso permanecerá vigente hasta que:

>  el usuario abandone voluntariamente el lienzo; o el propietario revoque su acceso.

> 3.5. La desconexión temporal o el cierre de sesión no eliminarán el acceso concedido.

> 3.6. La ausencia del propietario tampoco afectará los accesos previamente concedidos.

> 3.7. El número máximo inicial será de 7 usuarios conectados simultáneamente por lienzo, incluido el propietario cuando esté presente.

> 5. Persistencia y eliminación de ítems

> 5.1. Los ítems continuarán existiendo independientemente de que su propietario esté conectado.

> 5.2. Desconectarse no eliminará ningún ítem

> 5.3. Cerrar el navegador o cerrar sesión no eliminará ningún ítem

> 5.4. Abandonar un lienzo eliminará los ítems del lienzo pero los datos de los ítem creados anteriormente por el usuario persistirán en base de datos.

> 5.5. Ser expulsado de un lienzo eliminará los ítems y los datos del ítem creados anteriormente por ese usuario.

> 5.6. Minimizar un ítem no representará su eliminación.

> 5.7. Solo el propietario del ítem podrá eliminarlo.

> 5.8. La acción X del ítem representará una eliminación permanente.

> 5.9. Cuando el propietario utilice la X, se eliminará el ítem y sus datos persistentes asociados.

> 5.10. Un ítem eliminado no reaparecerá al reconectarse ni al volver a ingresar al lienzo.

> 5.11. El ítem de cámara será una excepción a la persistencia visual, debido a que representa una transmisión temporal.

> 6. Estado compartido del lienzo

> 6.1. Todos los usuarios conectados visualizarán el mismo estado compartido del lienzo.

> 6.2. El estado compartido incluirá:

>  ítems existentes;

>  posición de los ítems;

>  tamaño;

>  contenido persistente;

>  estado visible o minimizado;

>  orden Z;

>  trazos de la pizarra;

>  creación de elementos;

>  eliminación de elementos.

> 6.3. El orden Z será compartido.

> 6.4. Todo cambio autorizado en la superposición de los elementos será visible para los demás usuarios.

> 6.5. Los cambios realizados sobre el estado compartido se actualizarán en tiempo real para los usuarios conectados.

> 6.6. Los estados exclusivamente personales permanecerán locales.

> 6.7. Entre los estados locales estarán:

>  volumen;

>  herramienta de dibujo seleccionada;

>  color activo;

>  grosor activo;

>  autenticación individual en servicios externos;

>  configuraciones personales de reproducción;

>  estados exclusivamente visuales de la interfaz.

> 7. Conexión y presencia

> 7.1. La conexión de cada usuario será independiente de la disponibilidad general del lienzo.

> 7.2. La desconexión de un usuario no cerrará el lienzo ni afectará la permanencia de los demás participantes.

> 7.3. Los ítems persistentes de un usuario desconectado permanecerán visibles.

> 7.4. Estos ítems tendrán una apariencia visual atenuada o desactivada que indique que su propietario no está presente.

> 7.5. Los demás usuarios podrán visualizar esos ítems, pero no podrán modificarlos.

> 7.6. Cuando el propietario vuelva a conectarse, sus ítems recuperarán automáticamente su apariencia activa.

> 7.7. El ítem de cámara desaparecerá cuando su propietario se desconecte.

> 7.8. Al desaparecer el ítem de cámara también se detendrán sus transmisiones de audio y video.

> 7.9. Una pérdida temporal de conexión podrá mostrar un estado de reconexión al usuario afectado.

> 7.10. La reconexión de un usuario no bloqueará el funcionamiento del lienzo para los demás participantes.

> 7.11. Cuando sea posible, los cambios locales pendientes podrán conservarse temporalmente hasta recuperar la conexión.

> 8. Invitaciones

> 8.1. Cada lienzo tendrá:

>  un enlace compartible;

>  un código de acceso de seis dígitos.

> 8.2. El enlace permitirá abrir directamente la invitación correspondiente.

> 8.3. El código podrá introducirse manualmente desde la interfaz de acceso.

> 8.4. Utilizar una invitación no sustituirá los requisitos de cuenta verificada y perfil completo.

> 8.5. Cada código vigente deberá identificar de manera inequívoca un único lienzo.

> 8.6. El propietario no tendrá que estar conectado para que otro usuario pueda utilizar una invitación válida.

> 8.7. Una invitación válida concederá acceso persistente al usuario que la utilice correctamente.

> 8.8. Al llegar al máximo de participantes, si alguien mas desea ingresar ,a este se le negara el acceso.

> 9. Vigencia de las invitaciones

> 9.1. El enlace y el código permanecerán vigentes hasta que el propietario los renueve manualmente.

> 9.2. No caducarán automáticamente:

>  por el transcurso del tiempo;

>  al cerrar el navegador;

>  al cerrar sesión;

>  cuando el propietario se desconecte;

>  cuando no exista ningún usuario conectado.

> 9.3. El acceso previamente concedido a un usuario será independiente de la vigencia posterior de la invitación utilizada para obtenerlo.

> 10. Renovación del acceso mediante invitación

> 10.1. Solo el propietario podrá renovar las credenciales de invitación de su lienzo.

> 10.2. La renovación generará:

>  un nuevo enlace;

>  un nuevo código de seis dígitos.

> 10.3. Las credenciales anteriores dejarán inmediatamente de permitir nuevos accesos.

> 10.4. Un intento de utilizar una invitación anterior mostrará un mensaje indicando que el acceso ya no es válido.

> 10.5. La renovación afectará únicamente a futuras admisiones.

> 10.6. Los usuarios que ya tengan acceso persistente al lienzo conservarán dicho acceso.

> 10.7. Los participantes que estén conectados permanecerán dentro del lienzo.

> 10.8. La renovación no modificará ni eliminará:

>  ítems;

>  trazos;

>  imágenes;

>  textos;

>  tareas;

>  demás contenido persistente.

> 10.9. Renovar una invitación y revocar el acceso de un usuario serán operaciones independientes.

> 11. Abandonar un lienzo

> 11.1. Un participante podrá abandonar voluntariamente un lienzo mediante la acción Salir del lienzo.

> 11.2. Abandonar el lienzo eliminará su acceso persistente a ese espacio.

> 11.3. Después de abandonar un lienzo compartido, su lienzo personal se convertirá nuevamente en su lienzo actual.

> 11.4. Para regresar posteriormente deberá utilizar nuevamente una invitación válida.

> 11.5. Abandonar un lienzo eliminará los ítems del lienzo , pero no eliminara los datos persistentes creados anteriormente por el usuario, en caso de obtener un nuevo acceso al lienzo recuperara sus ítems en el estado que quedaron.

> 11.6. Sus ítems permanecerán en el lienzo con una apariencia que indique que su propietario no está presente.

> 11.7. Abandonar un lienzo afectará únicamente al usuario que realiza la acción.

> 12. Administración de participantes

> 12.1. El propietario podrá visualizar los usuarios conectados actualmente a su lienzo.

> 12.2. Solo el propietario podrá expulsar a otro usuario.

> 12.3. La expulsión retirará inmediatamente al usuario del lienzo.

> 12.4. La expulsión también revocará el acceso persistente de ese usuario.

> 12.5. El lienzo personal del usuario expulsado volverá a convertirse en su lienzo actual.

> 12.6. El usuario expulsado no podrá regresar automáticamente en futuros inicios de sesión.

> 12.7. Para volver a acceder deberá utilizar nuevamente una invitación válida.

> 12.8. La expulsión eliminará sus ítems y sus datos los datos y estados de sus ítems.

> 12.9. No se incluirán inicialmente:

>  bloqueos permanentes;

>  listas negras;

>  transferencia de propiedad;

>  hosts adicionales;

>  roles administrativos secundarios;

>  aprobación manual de cada ingreso.

> 13. Propiedad y permisos

> 13.1. Cada usuario podrá crear y controlar únicamente sus propios ítems.

> 13.2. Solo el propietario de un ítem podrá:

>  moverlo;

>  redimensionarlo;

>  minimizarlo;

>  restaurarlo;

>  modificar su contenido;

>  utilizar sus controles;

>  cambiar su orden Z;

>  eliminarlo.

> 13.3. Ningún usuario podrá modificar un ítem perteneciente a otra persona salvo que una regla específica del módulo lo permita expresamente.

> 13.4. La desconexión del propietario de un ítem no transferirá sus permisos.

> 13.5. La ausencia del propietario del lienzo tampoco otorgará permisos administrativos a otros usuarios.

> 13.6. Las acciones administrativas permanecerán reservadas al propietario del lienzo.

> 14. Pizarra compartida

> 14.1. El lienzo tendrá una única pizarra compartida.

> 14.2. Los trazos persistentes continuarán visibles independientemente de la conexión de su autor.

> 14.3. Las reglas específicas de creación, eliminación, herramientas, orden visual y sincronización de los trazos se definirán en la sección correspondiente a la pizarra.

> 14.4. La ausencia de un usuario no eliminará automáticamente sus trazos.

> 14.5. La eliminación de trazos se realizará únicamente mediante las operaciones permitidas por las reglas de la pizarra.

> 15. Estrategia general de actualización en tiempo real

> 15.1. Respuesta local

> 15.1.1. Las acciones autorizadas se reflejarán inmediatamente en el dispositivo del usuario que las realiza.

> 15.1.2. La interfaz no esperará innecesariamente una confirmación remota para mostrar localmente una acción válida.

> 15.2. Acciones continuas

> 15.2.1. Las acciones continuas no enviarán necesariamente una actualización por cada evento generado por el dispositivo de entrada.

> 15.2.2. Las actualizaciones podrán agruparse y transmitirse con una frecuencia controlada.

> 15.2.3. Entre estas acciones podrán encontrarse:

>  movimiento;

>  redimensionamiento;

>  dibujo;

>  escritura.

> 15.2.4. Cada módulo determinará su frecuencia de actualización adecuada.

> 15.3. Confirmación final

> 15.3.1. Al finalizar una interacción continua se enviará inmediatamente su estado final exacto.

> 15.3.2. El estado final tendrá prioridad sobre las actualizaciones intermedias correspondientes a la misma interacción.

> 15.3.3. Una actualización intermedia retrasada no podrá sobrescribir un estado final más reciente.

> 15.3.4. La pérdida de una actualización intermedia no deberá impedir que los participantes reciban el resultado final correcto.

> 15.4. Acciones discretas

> 15.4.1. Las acciones discretas que modifiquen el estado compartido se transmitirán inmediatamente.

> 15.4.2. Cada módulo especificará cuáles de sus operaciones son continuas y cuáles son discretas.

> 15.5. Ajuste técnico

> 15.5.1. Las frecuencias y tiempos de actualización serán parámetros técnicos ajustables.

> 15.5.2. Estos valores podrán modificarse mediante pruebas de rendimiento, consumo de red y experiencia de usuario.

> **[STICKY: Reglas del ítem Cámara Las reglas generales de propiedad, movimiento, tamaño, minimización, orden Z y eliminación de ventanas se definen en Sistema general de ítems o ventanas. Esta sección regula únicamente el funcionamiento audiovisual del ítem Cámara. Propósito El ítem Cámara estará destinado a videocomunicación ligera dentro del lienzo. No tendrá como objetivo reemplazar una plataforma completa de videoconferencia. Acceso y cantidad Solo los usuarios que pertenezcan al lienzo podrán utilizar el ítem Cámara. Cada usuario podrá tener un único ítem Cámara dentro del mismo lienzo. Crear el ítem no activará automáticamente la cámara ni el micrófono. Dispositivos de entrada El ítem utilizará la cámara y el micrófono predeterminados por el navegador. La aplicación no incluirá controles para seleccionar o cambiar dispositivos manualmente. Si existen varios dispositivos conectados, el navegador determinará cuál utilizar según su configuración. El usuario podrá cambiar el dispositivo predeterminado desde la configuración del navegador o del sistema operativo. Los cambios externos de dispositivo podrán aplicarse la próxima vez que se active la función correspondiente. Si el dispositivo predeterminado no está disponible, la función afectada permanecerá desactivada y se mostrará un aviso. La ausencia de cámara no impedirá utilizar el micrófono, ni la ausencia de micrófono impedirá utilizar el video. El nombre y la información técnica de los dispositivos no formarán parte del estado compartido. Permisos Activar el video requerirá permiso de acceso a la cámara. Activar el audio requerirá permiso de acceso al micrófono. Ambos permisos se solicitarán y gestionarán de forma independiente. Denegar un permiso bloqueará únicamente la función correspondiente. El usuario podrá permanecer en el lienzo y conservar el ítem aunque no conceda ningún permiso. Si un permiso se revoca durante la transmisión, el flujo correspondiente se detendrá sin cerrar el ítem. Estados Video, el video podrá estar: activado; desactivado; pausado automáticamente. Micrófono, el micrófono podrá estar: activado; silenciado. El video y el micrófono podrán controlarse independientemente. Cuando el video esté desactivado, se mostrará el avatar o fotografía del usuario. Cuando el video esté pausado automáticamente, se mostrará el avatar y un indicador de pausa. Cuando el micrófono esté silenciado, los demás participantes no recibirán audio. Los estados de video y micrófono se mostrarán mediante indicadores visibles. Una pausa automática no se interpretará como una desactivación manual. Controles del propietario Solo el propietario podrá: activar o desactivar su video; activar o silenciar su micrófono; Intentar un reconexión; seleccionar un filtro visual; eliminar su ítem Cámara. Eliminar el ítem detendrá inmediatamente cualquier transmisión activa. Transmisión y persistencia El video se transmitirá únicamente mientras esté activado y disponible. El audio se transmitirá únicamente mientras el micrófono esté activado y disponible. Desactivar el video o silenciar el micrófono detendrá inmediatamente el flujo correspondiente. El audio podrá continuar activo aunque el video esté desactivado o pausado. La transmisión finalizará cuando el usuario: abandone el lienzo; sea expulsado; elimine el ítem; pierda los permisos necesarios; pierda definitivamente su conexión. Al volver a ingresar, la cámara y el micrófono permanecerán desactivados hasta que el usuario los active manualmente. El audio y el video no formarán parte del estado persistente. La aplicación no grabará ni almacenará copias de las transmisiones. Sincronización Todos los participantes visualizarán en tiempo real: el estado del video; el estado del micrófono; el avatar cuando no exista transmisión de video; los indicadores de pausa, permisos o reconexión; el filtro visual seleccionado. Las siguientes acciones se sincronizarán inmediatamente: activar o desactivar el video; activar o silenciar el micrófono; cambiar el filtro; iniciar o finalizar una reconexión; detener una transmisión; eliminar el componente. Acciones locales de los espectadores Cada participante podrá silenciar localmente el audio de una cámara ajena. Esta acción afectará únicamente al dispositivo del participante. El silencio local no modificará el micrófono del propietario ni afectará a otros usuarios. La acción será temporal y no persistente. La interfaz diferenciará entre: micrófono silenciado por el propietario; audio silenciado localmente por el espectador. Filtros Solo se permitirán filtros visuales predefinidos y ligeros. El filtro seleccionado será visible para todos los participantes. Los filtros modificarán únicamente la representación visual del video. No se incluirán filtros que utilicen: reconocimiento facial; inteligencia artificial; fondos virtuales; eliminación de fondo; procesamiento avanzado. El filtro seleccionado podrá conservarse como configuración persistente del ítem. Restaurar el filtro al volver a ingresar no activará automáticamente la cámara. Rendimiento y calidad adaptativa La cámara utilizará una calidad reducida adecuada para videocomunicación ligera. La calidad máxima inicial aproximada será: 480 × 270 píxeles; 15 fotogramas por segundo. Cuando la conexión o el dispositivo presenten limitaciones, podrá reducirse hasta aproximadamente: 320 × 180 píxeles; entre 10 y 15 fotogramas por segundo. El sistema priorizará la estabilidad del audio sobre la calidad del video. La adaptación podrá realizarse en el siguiente orden: reducir la tasa de fotogramas; reducir la resolución; desactivar temporalmente filtros; pausar temporalmente el video. Reducir o pausar el video no detendrá el audio mientras el micrófono siga activado. La calidad recibida podrá variar entre participantes según su conexión y dispositivo. Los cambios automáticos de calidad serán temporales y no persistentes. El sistema no buscará proporcionar video en alta definición ni tasas elevadas de fotogramas. Los valores definitivos se establecerán mediante pruebas con usuarios, redes y dispositivos reales. Minimización y rendimiento Al minimizar el ítem, el sistema podrá pausar temporalmente el video. El audio podrá continuar mientras el micrófono permanezca activado. Cuando el ítem se restaure, el sistema intentará recuperar automáticamente la transmisión y la calidad disponible. Una cámara cubierta visualmente por otros ítems continuará transmitiendo normalmente. La superposición de ventanas no se considerará una minimización ni una solicitud para reducir la transmisión. Interrupción y reconexión audiovisual Una interrupción audiovisual no desconectará automáticamente al usuario del lienzo. Cuando la transmisión se interrumpa, el ítem entrará en estado de reconexión. Durante la reconexión: el ítem permanecerá visible; el video será sustituido temporalmente por el avatar; se mostrará el indicador «Reconectando…»; el audio podrá interrumpirse temporalmente; el resto del lienzo seguirá funcionando. El sistema intentará recuperar automáticamente la transmisión durante un máximo inicial de 10 segundos. Si la conexión se recupera, se restaurarán los estados que existían antes de la interrupción. La recuperación correcta no requerirá confirmación manual. Si la transmisión no se recupera: el video quedará desactivado; el micrófono quedará silenciado; se mostrará el avatar; aparecerá un aviso de pérdida audiovisual; el usuario podrá intentar reactivar las funciones manualmente. El sistema no realizará intentos automáticos indefinidos. El fallo de una cámara no afectará las transmisiones de otros participantes. El fallo audiovisual no modificará la posición, tamaño ni estado persistente de la ventana. Si la interrupción corresponde a una desconexión completa del lienzo, se aplicarán las reglas generales de presencia. Esta reconexión audiovisual será independiente del periodo de 30 segundos definido para la desconexión del propietario del lienzo. Restricciones No se permitirá compartir pantalla. No se permitirá grabar audio ni video. No se permitirá más de un ítem Cámara por usuario. No se permitirá transmitir desde varias cámaras simultáneamente. No se incluirán: fondos virtuales; eliminación de fondo; filtros avanzados; transcripción; subtítulos automáticos; salas separadas; control remoto de micrófonos ajenos; funciones propias de una plataforma completa de videoconferencia.]**

> Reglas del ítem Cámara

> Las reglas generales de propiedad, movimiento, tamaño, minimización, orden Z y eliminación de ventanas se definen en Sistema general de ítems o ventanas. Esta sección regula únicamente el funcionamiento audiovisual del ítem Cámara.

> Propósito

>  El ítem Cámara estará destinado a videocomunicación ligera dentro del lienzo.

>  No tendrá como objetivo reemplazar una plataforma completa de videoconferencia.

> Acceso y cantidad

>  Solo los usuarios que pertenezcan al lienzo podrán utilizar el ítem Cámara.

>  Cada usuario podrá tener un único ítem Cámara dentro del mismo lienzo.

>  Crear el ítem no activará automáticamente la cámara ni el micrófono.

> Dispositivos de entrada

>  El ítem utilizará la cámara y el micrófono predeterminados por el navegador.

>  La aplicación no incluirá controles para seleccionar o cambiar dispositivos manualmente.

>  Si existen varios dispositivos conectados, el navegador determinará cuál utilizar según su configuración.

>  El usuario podrá cambiar el dispositivo predeterminado desde la configuración del navegador o del sistema operativo.

>  Los cambios externos de dispositivo podrán aplicarse la próxima vez que se active la función correspondiente.

>  Si el dispositivo predeterminado no está disponible, la función afectada permanecerá desactivada y se mostrará un aviso.

>  La ausencia de cámara no impedirá utilizar el micrófono, ni la ausencia de micrófono impedirá utilizar el video.

>  El nombre y la información técnica de los dispositivos no formarán parte del estado compartido.

> Permisos

>  Activar el video requerirá permiso de acceso a la cámara.

>  Activar el audio requerirá permiso de acceso al micrófono.

>  Ambos permisos se solicitarán y gestionarán de forma independiente.

>  Denegar un permiso bloqueará únicamente la función correspondiente.

>  El usuario podrá permanecer en el lienzo y conservar el ítem aunque no conceda ningún permiso.

>  Si un permiso se revoca durante la transmisión, el flujo correspondiente se detendrá sin cerrar el ítem.

> Estados

> Video, el video podrá estar:

>  activado;

>  desactivado;

>  pausado automáticamente.

> Micrófono, el micrófono podrá estar:

>  silenciado.

>  El video y el micrófono podrán controlarse independientemente.

>  Cuando el video esté desactivado, se mostrará el avatar o fotografía del usuario.

>  Cuando el video esté pausado automáticamente, se mostrará el avatar y un indicador de pausa.

>  Cuando el micrófono esté silenciado, los demás participantes no recibirán audio.

>  Los estados de video y micrófono se mostrarán mediante indicadores visibles.

>  Una pausa automática no se interpretará como una desactivación manual.

> Controles del propietario

> Solo el propietario podrá:

>  activar o desactivar su video;

>  activar o silenciar su micrófono;

> Intentar un reconexión;

>  seleccionar un filtro visual;

>  eliminar su ítem Cámara.

> Eliminar el ítem detendrá inmediatamente cualquier transmisión activa.

> Transmisión y persistencia

>  El video se transmitirá únicamente mientras esté activado y disponible.

>  El audio se transmitirá únicamente mientras el micrófono esté activado y disponible.

>  Desactivar el video o silenciar el micrófono detendrá inmediatamente el flujo correspondiente.

>  El audio podrá continuar activo aunque el video esté desactivado o pausado.

>  La transmisión finalizará cuando el usuario:

>  abandone el lienzo;

>  sea expulsado;

>  elimine el ítem;

>  pierda los permisos necesarios;

>  pierda definitivamente su conexión.

>  Al volver a ingresar, la cámara y el micrófono permanecerán desactivados hasta que el usuario los active manualmente.

>  El audio y el video no formarán parte del estado persistente.

>  La aplicación no grabará ni almacenará copias de las transmisiones.

> Sincronización

> Todos los participantes visualizarán en tiempo real:

>  el estado del video;

>  el estado del micrófono;

>  el avatar cuando no exista transmisión de video;

>  los indicadores de pausa, permisos o reconexión;

>  el filtro visual seleccionado.

> Las siguientes acciones se sincronizarán inmediatamente:

>  activar o desactivar el video;

>  activar o silenciar el micrófono;

>  cambiar el filtro;

>  iniciar o finalizar una reconexión;

>  detener una transmisión;

>  eliminar el componente.

> Acciones locales de los espectadores

>  Cada participante podrá silenciar localmente el audio de una cámara ajena.

>  Esta acción afectará únicamente al dispositivo del participante.

>  El silencio local no modificará el micrófono del propietario ni afectará a otros usuarios.

>  La acción será temporal y no persistente.

>  La interfaz diferenciará entre:

>  micrófono silenciado por el propietario;

>  audio silenciado localmente por el espectador.

> Filtros

>  Solo se permitirán filtros visuales predefinidos y ligeros.

>  El filtro seleccionado será visible para todos los participantes.

>  Los filtros modificarán únicamente la representación visual del video.

>  No se incluirán filtros que utilicen:

>  reconocimiento facial;

>  inteligencia artificial;

>  fondos virtuales;

>  eliminación de fondo;

>  procesamiento avanzado.

>  El filtro seleccionado podrá conservarse como configuración persistente del ítem.

>  Restaurar el filtro al volver a ingresar no activará automáticamente la cámara.

> Rendimiento y calidad adaptativa

>  La cámara utilizará una calidad reducida adecuada para videocomunicación ligera.

>  La calidad máxima inicial aproximada será:

>  480 × 270 píxeles;

>  15 fotogramas por segundo.

>  Cuando la conexión o el dispositivo presenten limitaciones, podrá reducirse hasta aproximadamente:

>  320 × 180 píxeles;

>  entre 10 y 15 fotogramas por segundo.

>  El sistema priorizará la estabilidad del audio sobre la calidad del video.

>  La adaptación podrá realizarse en el siguiente orden:

>  reducir la tasa de fotogramas;

>  reducir la resolución;

>  desactivar temporalmente filtros;

>  pausar temporalmente el video.

>  Reducir o pausar el video no detendrá el audio mientras el micrófono siga activado.

>  La calidad recibida podrá variar entre participantes según su conexión y dispositivo.

>  Los cambios automáticos de calidad serán temporales y no persistentes.

>  El sistema no buscará proporcionar video en alta definición ni tasas elevadas de fotogramas.

>  Los valores definitivos se establecerán mediante pruebas con usuarios, redes y dispositivos reales.

> Minimización y rendimiento

>  Al minimizar el ítem, el sistema podrá pausar temporalmente el video.

>  El audio podrá continuar mientras el micrófono permanezca activado.

>  Cuando el ítem se restaure, el sistema intentará recuperar automáticamente la transmisión y la calidad disponible.

>  Una cámara cubierta visualmente por otros ítems continuará transmitiendo normalmente.

>  La superposición de ventanas no se considerará una minimización ni una solicitud para reducir la transmisión.

> Interrupción y reconexión audiovisual

>  Una interrupción audiovisual no desconectará automáticamente al usuario del lienzo.

>  Cuando la transmisión se interrumpa, el ítem entrará en estado de reconexión.

>  Durante la reconexión:

>  el ítem permanecerá visible;

>  el video será sustituido temporalmente por el avatar;

>  se mostrará el indicador «Reconectando…»;

>  el audio podrá interrumpirse temporalmente;

>  el resto del lienzo seguirá funcionando.

>  El sistema intentará recuperar automáticamente la transmisión durante un máximo inicial de 10 segundos.

>  Si la conexión se recupera, se restaurarán los estados que existían antes de la interrupción.

>  La recuperación correcta no requerirá confirmación manual.

>  Si la transmisión no se recupera:

>  el video quedará desactivado;

>  el micrófono quedará silenciado;

>  se mostrará el avatar;

>  aparecerá un aviso de pérdida audiovisual;

>  el usuario podrá intentar reactivar las funciones manualmente.

>  El sistema no realizará intentos automáticos indefinidos.

>  El fallo de una cámara no afectará las transmisiones de otros participantes.

>  El fallo audiovisual no modificará la posición, tamaño ni estado persistente de la ventana.

>  Si la interrupción corresponde a una desconexión completa del lienzo, se aplicarán las reglas generales de presencia.

>  Esta reconexión audiovisual será independiente del periodo de 30 segundos definido para la desconexión del propietario del lienzo.

> Restricciones

>  No se permitirá compartir pantalla.

>  No se permitirá grabar audio ni video.

>  No se permitirá más de un ítem Cámara por usuario.

>  No se permitirá transmitir desde varias cámaras simultáneamente.

>  No se incluirán:

>  filtros avanzados;

>  transcripción;

>  subtítulos automáticos;

>  salas separadas;

>  control remoto de micrófonos ajenos;

>  funciones propias de una plataforma completa de videoconferencia.

> **[STICKY: Reglas del ítem Lista de tareas Las reglas generales de propiedad, movimiento, tamaño, minimización, orden Z, persistencia y eliminación de la ventana se definen en Sistema general de ítems o ventanas. Esta sección regula únicamente el contenido de la lista de tareas. 1. Naturaleza y cantidad Cada ítem Lista de tareas representará una única lista. Un usuario podrá crear varios ítems Lista de tareas dentro del mismo lienzo. Cada lista tendrá: identificador único; propietario; título; conjunto ordenado de tareas. La lista podrá permanecer vacía. Crear una lista no añadirá tareas automáticamente. Esta estructura es más sencilla que permitir varias listas dentro de una misma ventana: Ítem Lista A ├── Tarea 1 ├── Tarea 2 └── Tarea 3 Ítem Lista B ├── Tarea 1 └── Tarea 2 2. Título Cada lista deberá tener un título visible. El propietario podrá editar el título. Si el usuario crea la lista sin escribir un título, se utilizará temporalmente el nombre: Lista de tareas El título formará parte del estado persistente del ítem. 3. Tareas Cada lista podrá contener múltiples tareas. Cada tarea pertenecerá exclusivamente a la lista en la que fue creada. Cada tarea tendrá: identificador único; contenido; estado; posición dentro de la lista. Una tarea no podrá existir sin una lista. No se permitirá crear tareas sin contenido. El propietario podrá: crear tareas; editar su contenido; cambiar su estado; reordenarlas; eliminarlas. 4. Estados Cada tarea podrá encontrarse únicamente en uno de estos estados: pendiente; completada. Toda tarea nueva comenzará en estado pendiente. El propietario podrá alternar una tarea entre pendiente y completada. Las tareas completadas permanecerán visibles hasta que sean eliminadas. Marcar una tarea como completada no modificará automáticamente su posición dentro de la lista. No existirán estados adicionales como en progreso, bloqueada o cancelada. 5. Organización Las tareas podrán ordenarse manualmente dentro de la lista. Solo el propietario podrá modificar su orden. Una tarea podrá moverse únicamente dentro de la lista a la que pertenece. No se permitirá trasladar tareas entre diferentes ítems Lista de tareas. El orden será compartido y persistente. Al finalizar el reordenamiento, se guardará inmediatamente el nuevo orden definitivo. 6. Visualización de participantes Los demás participantes podrán visualizar: título de la lista; contenido de las tareas; estado pendiente o completado; orden de las tareas. Los participantes que no sean propietarios no podrán: crear tareas; editar tareas; completar o reabrir tareas; reordenarlas; eliminarlas; modificar el título. Los cambios del propietario serán visibles para todos los participantes conectados. 7. Sincronización Las siguientes acciones se sincronizarán inmediatamente: crear una tarea; eliminar una tarea; cambiar su estado; confirmar un nuevo orden. La edición de texto seguirá esta estrategia: La escritura se mostrará inmediatamente en el dispositivo del propietario. El contenido podrá sincronizarse con los demás usuarios cada 100 a 200 milisegundos. La versión definitiva se guardará: después de una pausa breve sin escritura; al abandonar el campo; al confirmar la edición; al cerrar o minimizar el ítem. Una versión antigua no podrá sobrescribir contenido más reciente. 8. Persistencia Se conservarán: título de la lista; identificadores de las tareas; contenido de cada tarea; estado pendiente o completado; orden de las tareas. No se conservarán: tarea que esté escribiéndose pero no haya sido confirmada; campo actualmente seleccionado; posición del cursor de texto; estado visual de arrastre; animaciones temporales. La posición, tamaño, minimización y orden Z de la ventana se conservarán según las reglas generales de los ítems. 9. Eliminación El propietario podrá eliminar una tarea individual. Eliminar una tarea la retirará definitivamente de la lista. Eliminar el ítem completo eliminará también todas las tareas que contiene. La eliminación del ítem completo seguirá el sistema general de ventanas. No se incluirá una papelera ni recuperación de tareas eliminadas en la primera versión. 10. Restricciones El ítem no incluirá inicialmente: fechas límite; recordatorios; notificaciones automáticas; prioridades; etiquetas; subtareas; archivos adjuntos; comentarios; responsables; traslado de tareas entre listas; edición colaborativa; historial de cambios; integración automática con calendarios o servicios externos.]**

> Reglas del ítem Lista de tareas

> Las reglas generales de propiedad, movimiento, tamaño, minimización, orden Z, persistencia y eliminación de la ventana se definen en Sistema general de ítems o ventanas. Esta sección regula únicamente el contenido de la lista de tareas.

> 1. Naturaleza y cantidad

>  Cada ítem Lista de tareas representará una única lista.

>  Un usuario podrá crear varios ítems Lista de tareas dentro del mismo lienzo.

>  Cada lista tendrá:

>  identificador único;

>  propietario;

>  título;

>  conjunto ordenado de tareas.

>  La lista podrá permanecer vacía.

>  Crear una lista no añadirá tareas automáticamente.

> Esta estructura es más sencilla que permitir varias listas dentro de una misma ventana:

> Ítem Lista A ├── Tarea 1 ├── Tarea 2 └── Tarea 3  Ítem Lista B ├── Tarea 1 └── Tarea 2

> 2. Título

>  Cada lista deberá tener un título visible.

>  El propietario podrá editar el título.

>  Si el usuario crea la lista sin escribir un título, se utilizará temporalmente el nombre:

> Lista de tareas

>  El título formará parte del estado persistente del ítem.

> 3. Tareas

>  Cada lista podrá contener múltiples tareas.

>  Cada tarea pertenecerá exclusivamente a la lista en la que fue creada.

>  Cada tarea tendrá:

>  contenido;

>  estado;

>  posición dentro de la lista.

>  Una tarea no podrá existir sin una lista.

>  No se permitirá crear tareas sin contenido.

>  El propietario podrá:

>  crear tareas;

>  editar su contenido;

>  cambiar su estado;

>  reordenarlas;

>  eliminarlas.

> 4. Estados

> Cada tarea podrá encontrarse únicamente en uno de estos estados:

>  pendiente;

>  completada.

>  Toda tarea nueva comenzará en estado pendiente.

>  El propietario podrá alternar una tarea entre pendiente y completada.

>  Las tareas completadas permanecerán visibles hasta que sean eliminadas.

>  Marcar una tarea como completada no modificará automáticamente su posición dentro de la lista.

>  No existirán estados adicionales como en progreso, bloqueada o cancelada.

> 5. Organización

>  Las tareas podrán ordenarse manualmente dentro de la lista.

>  Solo el propietario podrá modificar su orden.

>  Una tarea podrá moverse únicamente dentro de la lista a la que pertenece.

>  No se permitirá trasladar tareas entre diferentes ítems Lista de tareas.

>  El orden será compartido y persistente.

>  Al finalizar el reordenamiento, se guardará inmediatamente el nuevo orden definitivo.

> 6. Visualización de participantes

>  Los demás participantes podrán visualizar:

>  título de la lista;

>  contenido de las tareas;

>  estado pendiente o completado;

>  orden de las tareas.

>  Los participantes que no sean propietarios no podrán:

>  editar tareas;

>  completar o reabrir tareas;

>  eliminarlas;

>  modificar el título.

>  Los cambios del propietario serán visibles para todos los participantes conectados.

> 7. Sincronización

>  crear una tarea;

>  eliminar una tarea;

>  confirmar un nuevo orden.

> La edición de texto seguirá esta estrategia:

>  La escritura se mostrará inmediatamente en el dispositivo del propietario.

>  El contenido podrá sincronizarse con los demás usuarios cada 100 a 200 milisegundos.

>  La versión definitiva se guardará:

>  después de una pausa breve sin escritura;

>  al abandonar el campo;

>  al confirmar la edición;

>  al cerrar o minimizar el ítem.

>  Una versión antigua no podrá sobrescribir contenido más reciente.

> 8. Persistencia

> Se conservarán:

>  identificadores de las tareas;

>  contenido de cada tarea;

> No se conservarán:

>  tarea que esté escribiéndose pero no haya sido confirmada;

>  campo actualmente seleccionado;

>  posición del cursor de texto;

>  estado visual de arrastre;

>  animaciones temporales.

> La posición, tamaño, minimización y orden Z de la ventana se conservarán según las reglas generales de los ítems.

> 9. Eliminación

>  El propietario podrá eliminar una tarea individual.

>  Eliminar una tarea la retirará definitivamente de la lista.

>  Eliminar el ítem completo eliminará también todas las tareas que contiene.

>  La eliminación del ítem completo seguirá el sistema general de ventanas.

>  No se incluirá una papelera ni recuperación de tareas eliminadas en la primera versión.

> 10. Restricciones

> El ítem no incluirá inicialmente:

>  fechas límite;

>  recordatorios;

>  notificaciones automáticas;

>  prioridades;

>  etiquetas;

>  subtareas;

>  archivos adjuntos;

>  comentarios;

>  responsables;

>  traslado de tareas entre listas;

>  edición colaborativa;

>  historial de cambios;

>  integración automática con calendarios o servicios externos.

> **[STICKY: Ítem Apple music®️️ 1. Naturaleza y cantidad Cada ítem Apple Music pertenecerá al usuario que lo creó. Cada usuario podrá tener un único ítem Apple Music dentro del mismo lienzo. Podrán existir varios ítems Apple Music simultáneamente, uno por cada participante que decida crearlo. Cada ítem mostrará la reproducción correspondiente a su propietario. Crear el ítem no conectará automáticamente la cuenta ni iniciará música. La aplicación no transmitirá, descargará ni almacenará el audio de Apple Music. Cada participante escuchará directamente desde su propia cuenta, suscripción, navegador y dispositivo. 2. Acceso y autenticación Solo los usuarios pertenecientes al lienzo podrán crear o utilizar un ítem Apple Music. Cada usuario deberá autorizar individualmente su propia cuenta de Apple Music. La autenticación será privada y no se compartirá con otros participantes. Las credenciales, tokens, datos de cuenta, errores de autenticación y estado de suscripción serán visibles únicamente para el usuario afectado. No será necesario que todos los participantes conecten Apple Music para permanecer dentro del lienzo. Si un usuario no conecta su cuenta, podrá visualizar los ítems musicales de los demás, pero no escuchar ni sincronizarse. La cuenta de Apple Music deberá disponer de acceso válido para reproducir el contenido seleccionado. 3. Estados del propietario El ítem de cada usuario podrá encontrarse en uno de los siguientes estados: Apple Music no conectado; conectado sin reproducción; reproducción independiente; siguiendo a otro participante; seguimiento pausado localmente; error o contenido no disponible. El estado musical del propietario será independiente del estado de otros ítems. El propietario podrá pasar de escucha independiente a seguimiento y volver al modo independiente. El seguimiento no cambiará la propiedad ni el comportamiento general de la ventana. 4. Vista compartida del ítem Todos los participantes podrán visualizar en cada ítem: avatar o nombre del propietario; portada; título de la canción; artista; estado de reproducción; progreso aproximado; indicación de reproducción independiente; indicación de «Escuchando con…» cuando esté siguiendo a otro usuario. Si el propietario sigue a otra persona, el ítem mostrará claramente a quién está siguiendo. La información compartida se limitará a la reproducción necesaria para comprender y sincronizar la escucha. No se mostrarán públicamente: búsquedas; canciones favoritas; playlists; biblioteca; historial; volumen; errores privados; datos de la cuenta; información de suscripción. 5. Controles del propietario Solo el propietario podrá utilizar los controles internos de su ítem. Podrá: conectar o desconectar Apple Music; buscar canciones; consultar sus favoritas; consultar sus playlists; seleccionar una canción; seleccionar una canción dentro de una playlist; reproducir; pausar; avanzar; retroceder; mover la posición de reproducción; modificar su volumen local; seguir a otro participante; volver a sincronizarse; dejar de seguir; eliminar su ítem. Los demás participantes no podrán controlar la reproducción de un ítem ajeno. 6. Selección privada de música La selección musical se abrirá mediante un panel privado asociado al ítem. Este panel solo será visible para el propietario del ítem. El panel podrá incluir: Buscar; Favoritas; Playlists. La sección Buscar permitirá encontrar canciones por título, artista o álbum. La sección Favoritas mostrará las canciones favoritas disponibles en la biblioteca del usuario. La sección Playlists mostrará las listas creadas o guardadas por el usuario y permitirá consultar sus canciones. Seleccionar una canción cerrará o podrá cerrar automáticamente el panel y actualizará el reproductor. El panel privado no modificará el orden Z compartido ni aparecerá como un ítem independiente. En la primera versión no se permitirá: crear playlists; editar playlists; borrar canciones de playlists; reordenar playlists; administrar completamente la biblioteca. 7. Reproducción independiente Un usuario estará en modo independiente cuando controle directamente su propia reproducción. Mientras reproduzca de forma independiente, otros participantes podrán sincronizarse con él. Un usuario independiente podrá modificar libremente su canción, estado y posición. Los cambios realizados por un usuario independiente serán reflejados en su propio ítem. La reproducción pausada continuará mostrándose, aunque deberá definirse posteriormente si el usuario permanece disponible como fuente de seguimiento. 8. Sincronización con otro participante Cada usuario podrá seguir como máximo a un participante a la vez. Para sincronizarse, el usuario seleccionará un ítem musical disponible y elegirá Escuchar con…. Solo podrá seguirse a un usuario que esté reproduciendo de forma independiente. Un usuario que ya esté siguiendo a otra persona no podrá ser utilizado como fuente de seguimiento. No se permitirán cadenas ni ciclos de seguimiento. Al comenzar el seguimiento, el reproductor del seguidor intentará cargar: la misma canción; el mismo estado de reproducción; una posición temporal aproximada. La sincronización será aproximada y podrá presentar pequeñas diferencias por red, almacenamiento en búfer, navegador o dispositivo. El audio continuará siendo reproducido directamente por Apple Music desde la cuenta de cada usuario. La persona seguida no controlará directamente la cuenta ni el dispositivo del seguidor. El seguidor podrá utilizar Volver a sincronizar para recuperar la canción y posición actuales de la fuente. 9. Controles durante el seguimiento El seguidor conservará sus controles locales. Acciones que no finalizarán el seguimiento modificar el volumen; silenciar localmente; minimizar o restaurar la ventana; mover o redimensionar el ítem; cambiar su orden Z; pausar localmente de manera temporal; utilizar Volver a sincronizar. Acciones que finalizarán el seguimiento seleccionar otra canción; elegir una canción favorita; elegir una canción o playlist diferente; avanzar o retroceder de canción manualmente; mover manualmente la barra de progreso; pulsar Dejar de seguir; desconectar Apple Music; eliminar el ítem. Cuando una acción finalice el seguimiento, el usuario pasará automáticamente al modo independiente. La acción seleccionada por el usuario se ejecutará después de terminar el seguimiento. La interfaz podrá mostrar brevemente: Dejaste de escuchar con [usuario]. 10. Pausa local durante el seguimiento El seguidor podrá pausar localmente sin modificar la reproducción de la fuente ni la de otros usuarios. La pausa local no finalizará necesariamente el seguimiento. Mientras esté pausado localmente, el ítem mostrará que el seguimiento se encuentra suspendido en ese dispositivo. El usuario podrá pulsar Volver a sincronizar para retomar la canción y posición actuales de la fuente. Los cambios posteriores de la fuente no deberán iniciar audio automáticamente sin una interacción permitida por el navegador y Apple Music. 11. Cambios realizados por la fuente Mientras el seguimiento esté activo, el seguidor podrá recibir: cambio de canción; reproducción; pausa; reanudación; cambio manual importante de posición. El sistema no intentará corregir continuamente diferencias mínimas de tiempo. Se sincronizarán eventos relevantes y referencias temporales. El progreso podrá calcularse localmente a partir de: canción; posición de referencia; estado; hora de referencia; versión del evento. Si el desfase es evidente, el usuario podrá volver a sincronizarse manualmente. 12. Fuente que deja de estar disponible El seguimiento finalizará cuando la fuente: se desconecte; abandone el lienzo; sea expulsada; elimine su ítem; desconecte Apple Music; pierda la capacidad de reproducir; comience a seguir a otra persona; deje de estar disponible como fuente. Cuando esto ocurra: Los seguidores dejarán automáticamente de seguirla. No serán transferidos a la nueva fuente que esa persona haya elegido. Los seguidores conservarán localmente la canción y posición alcanzadas. Pasarán al modo independiente. Se mostrará un aviso breve indicando que la fuente dejó de estar disponible. 13. Sincronización y estado compartido Se compartirán en tiempo real: existencia del ítem; propietario; canción actual; artista; portada; estado de reproducción; posición temporal de referencia; modo independiente o siguiendo; usuario seguido, cuando corresponda; versión de la operación musical. Se mantendrán privados: audio; volumen; autenticación; credenciales; biblioteca; favoritas; playlists; búsquedas; errores personales; dispositivo de salida; estado detallado de la suscripción. Las siguientes acciones se transmitirán inmediatamente como eventos compartidos: iniciar una canción; cambiar de canción; reproducir; pausar; cambiar significativamente la posición; comenzar a seguir; dejar de seguir; finalizar la disponibilidad de una fuente. El progreso no se enviará continuamente en cada instante. 14. Persistencia Se conservarán: existencia del ítem; última canción mostrada; portada; título; artista; posición, tamaño y minimización de la ventana; demás configuraciones persistentes definidas para los ítems. No se conservarán como sesión activa: reproducción en curso; posición temporal exacta; volumen; seguimiento activo; pausa local; usuarios disponibles; autenticación compartida; errores temporales. Al volver a ingresar: El ítem podrá mostrar la última canción conocida. La reproducción permanecerá detenida. El usuario no continuará siguiendo automáticamente a otra persona. La música no se iniciará automáticamente. 15. Eliminación Solo el propietario podrá eliminar su ítem Apple Music. Eliminarlo finalizará su reproducción dentro de la aplicación y cualquier seguimiento activo relacionado con ese ítem. Los usuarios que lo estaban siguiendo pasarán al modo independiente. La eliminación retirará definitivamente el estado persistente del ítem. Eliminar un ítem musical no eliminará canciones, favoritas ni playlists de la cuenta de Apple Music. 16. Restricciones En la primera versión no se incluirán: transmisión o retransmisión de audio; almacenamiento de canciones; descarga de contenido musical; sincronización exacta al milisegundo; cadenas de seguimiento; seguimiento de varios usuarios simultáneamente; edición de playlists; cola compartida; votaciones; solicitudes musicales; letras; modo karaoke; historial compartido; visualización pública de biblioteca o favoritas; control remoto directo sobre la cuenta de otro participante; reproducción automática al entrar al lienzo. Aspectos pendientes de definir Disponibilidad como fuente ¿Un usuario pausado continuará apareciendo como fuente disponible? En caso afirmativo, ¿durante cuánto tiempo podrá permanecer pausado antes de dejar de estar disponible? ¿Un usuario conectado pero sin canción cargada aparecerá en la lista o simplemente no se mostrará? Pausa local durante el seguimiento Cuando el seguidor pausa localmente y la fuente cambia de canción, ¿debe actualizarse silenciosamente la canción sin reproducirla o mantenerse la canción pausada anterior? Cuando el seguidor pulse reproducir después de una pausa local, ¿se reanudará desde su posición pausada o se sincronizará automáticamente con la fuente? ¿La pausa local necesita un estado visual diferente de «Siguiendo»? Cambios de la fuente ¿Los cambios de canción de la fuente deben aplicarse automáticamente o requerir una confirmación del seguidor? ¿Una pausa realizada por la fuente pausará automáticamente a todos sus seguidores? ¿Un cambio pequeño de posición debe sincronizarse o solo los cambios superiores a un umbral? ¿Cuál será el desfase máximo aceptable antes de recomendar o ejecutar una resincronización? Selección de participantes ¿Dónde se abrirá la lista de usuarios disponibles: dentro del reproductor, en un menú emergente o en un panel lateral privado? ¿La lista mostrará únicamente avatar y nombre, o también canción y portada? ¿Los usuarios deberán pulsar el ítem ajeno para seguirlo o utilizarán un botón dentro de su propio reproductor? ¿Se mostrará públicamente cuántas personas siguen a una fuente? Privacidad de la reproducción ¿Crear y utilizar el ítem implica automáticamente hacer visible la canción actual? ¿Debería existir una opción para escuchar de forma privada sin permitir que otros se sincronicen? Si no existe modo privado, ¿debe mostrarse una explicación antes de activar Apple Music por primera vez? ¿El nombre de la playlist o álbum actual será visible, o únicamente canción y artista? Favoritas y playlists ¿“Favoritas” significa únicamente canciones marcadas como favoritas o todas las canciones añadidas a la biblioteca? ¿Se mostrarán playlists creadas por el usuario, guardadas por él o ambas? ¿Las playlists muy largas se cargarán completas o mediante paginación? ¿Seleccionar una playlist comenzará desde la primera canción o requerirá escoger una canción concreta? ¿Se permitirá reproducir un álbum completo o solamente canciones individuales y playlists? Reproducción y controles ¿Se incluirán los controles anterior y siguiente al reproducir una sola canción? ¿Se incluirá repetición o modo aleatorio en una fase posterior? ¿El volumen se controlará desde el propio ítem o se usará únicamente el volumen del dispositivo? ¿Cerrar o minimizar el ítem permitirá que la música continúe? ¿Qué significa exactamente «cerrar» en este componente: eliminar el ítem o detener temporalmente la reproducción? Errores y disponibilidad ¿Qué mensaje verá un usuario sin suscripción activa? ¿Qué ocurrirá cuando una canción no esté disponible en la región del seguidor? ¿El seguidor permanecerá siguiendo aunque no pueda reproducir una canción concreta? ¿Se intentará continuar automáticamente cuando la fuente cambie a una canción disponible? ¿Qué sucede si vence la autorización de Apple Music durante una reproducción? Reconexión ¿Durante los 30 segundos de reconexión del propietario del lienzo continuará la música localmente? ¿Qué ocurre si un usuario musical pierde conexión durante pocos segundos pero permanece dentro del lienzo? ¿Habrá un intento automático de recuperar el reproductor o solamente un botón para reconectar? ¿Al reconectarse se recuperará el seguimiento anterior o siempre volverá al modo independiente? Persistencia ¿Se conservará realmente la última canción mostrada o el reproductor aparecerá vacío al regresar? ¿La autorización de Apple Music se mantendrá entre sesiones cuando sea técnicamente posible? ¿El panel privado recordará la última pestaña abierta o siempre iniciará en Buscar? Limitaciones técnicas y legales Debe verificarse mediante implementación real qué partes de favoritas y playlists expone MusicKit en navegador y qué permisos específicos requiere. Debe comprobarse el comportamiento de reproducción automática en Safari, Chrome, iOS y otros navegadores compatibles. Debe validarse si Apple permite el modelo de sincronización automática entre cuentas dentro de una aplicación monetizada. Debe definirse si el ítem estará disponible gratuitamente para todos los usuarios, aunque otras funciones de la aplicación puedan formar parte de planes futuros. Debe establecerse qué navegadores y dispositivos se considerarán oficialmente compatibles con el ítem.]**

> Ítem Apple music®️️

>  Cada ítem Apple Music pertenecerá al usuario que lo creó.

>  Cada usuario podrá tener un único ítem Apple Music dentro del mismo lienzo.

>  Podrán existir varios ítems Apple Music simultáneamente, uno por cada participante que decida crearlo.

>  Cada ítem mostrará la reproducción correspondiente a su propietario.

>  Crear el ítem no conectará automáticamente la cuenta ni iniciará música.

>  La aplicación no transmitirá, descargará ni almacenará el audio de Apple Music.

>  Cada participante escuchará directamente desde su propia cuenta, suscripción, navegador y dispositivo.

> 2. Acceso y autenticación

>  Solo los usuarios pertenecientes al lienzo podrán crear o utilizar un ítem Apple Music.

>  Cada usuario deberá autorizar individualmente su propia cuenta de Apple Music.

>  La autenticación será privada y no se compartirá con otros participantes.

>  Las credenciales, tokens, datos de cuenta, errores de autenticación y estado de suscripción serán visibles únicamente para el usuario afectado.

>  No será necesario que todos los participantes conecten Apple Music para permanecer dentro del lienzo.

>  Si un usuario no conecta su cuenta, podrá visualizar los ítems musicales de los demás, pero no escuchar ni sincronizarse.

>  La cuenta de Apple Music deberá disponer de acceso válido para reproducir el contenido seleccionado.

> 3. Estados del propietario

> El ítem de cada usuario podrá encontrarse en uno de los siguientes estados:

>  Apple Music no conectado;

>  conectado sin reproducción;

>  reproducción independiente;

>  siguiendo a otro participante;

>  seguimiento pausado localmente;

>  error o contenido no disponible.

>  El estado musical del propietario será independiente del estado de otros ítems.

>  El propietario podrá pasar de escucha independiente a seguimiento y volver al modo independiente.

>  El seguimiento no cambiará la propiedad ni el comportamiento general de la ventana.

> 4. Vista compartida del ítem

> Todos los participantes podrán visualizar en cada ítem:

>  avatar o nombre del propietario;

>  portada;

>  título de la canción;

>  artista;

>  estado de reproducción;

>  progreso aproximado;

>  indicación de reproducción independiente;

>  indicación de «Escuchando con…» cuando esté siguiendo a otro usuario.

>  Si el propietario sigue a otra persona, el ítem mostrará claramente a quién está siguiendo.

>  La información compartida se limitará a la reproducción necesaria para comprender y sincronizar la escucha.

>  No se mostrarán públicamente:

>  búsquedas;

>  canciones favoritas;

>  playlists;

>  biblioteca;

>  historial;

>  errores privados;

>  datos de la cuenta;

>  información de suscripción.

> 5. Controles del propietario

> Solo el propietario podrá utilizar los controles internos de su ítem.

> Podrá:

>  conectar o desconectar Apple Music;

>  buscar canciones;

>  consultar sus favoritas;

>  consultar sus playlists;

>  seleccionar una canción;

>  seleccionar una canción dentro de una playlist;

>  reproducir;

>  pausar;

>  avanzar;

>  retroceder;

>  mover la posición de reproducción;

>  modificar su volumen local;

>  seguir a otro participante;

>  volver a sincronizarse;

>  dejar de seguir;

>  eliminar su ítem.

> Los demás participantes no podrán controlar la reproducción de un ítem ajeno.

> 6. Selección privada de música

>  La selección musical se abrirá mediante un panel privado asociado al ítem.

>  Este panel solo será visible para el propietario del ítem.

>  El panel podrá incluir:

>  Buscar;

>  Favoritas;

>  Playlists.

>  La sección Buscar permitirá encontrar canciones por título, artista o álbum.

>  La sección Favoritas mostrará las canciones favoritas disponibles en la biblioteca del usuario.

>  La sección Playlists mostrará las listas creadas o guardadas por el usuario y permitirá consultar sus canciones.

>  Seleccionar una canción cerrará o podrá cerrar automáticamente el panel y actualizará el reproductor.

>  El panel privado no modificará el orden Z compartido ni aparecerá como un ítem independiente.

>  En la primera versión no se permitirá:

>  crear playlists;

>  editar playlists;

>  borrar canciones de playlists;

>  reordenar playlists;

>  administrar completamente la biblioteca.

> 7. Reproducción independiente

>  Un usuario estará en modo independiente cuando controle directamente su propia reproducción.

>  Mientras reproduzca de forma independiente, otros participantes podrán sincronizarse con él.

>  Un usuario independiente podrá modificar libremente su canción, estado y posición.

>  Los cambios realizados por un usuario independiente serán reflejados en su propio ítem.

>  La reproducción pausada continuará mostrándose, aunque deberá definirse posteriormente si el usuario permanece disponible como fuente de seguimiento.

> 8. Sincronización con otro participante

>  Cada usuario podrá seguir como máximo a un participante a la vez.

>  Para sincronizarse, el usuario seleccionará un ítem musical disponible y elegirá Escuchar con….

>  Solo podrá seguirse a un usuario que esté reproduciendo de forma independiente.

>  Un usuario que ya esté siguiendo a otra persona no podrá ser utilizado como fuente de seguimiento.

>  No se permitirán cadenas ni ciclos de seguimiento.

>  Al comenzar el seguimiento, el reproductor del seguidor intentará cargar:

>  la misma canción;

>  el mismo estado de reproducción;

>  una posición temporal aproximada.

>  La sincronización será aproximada y podrá presentar pequeñas diferencias por red, almacenamiento en búfer, navegador o dispositivo.

>  El audio continuará siendo reproducido directamente por Apple Music desde la cuenta de cada usuario.

>  La persona seguida no controlará directamente la cuenta ni el dispositivo del seguidor.

>  El seguidor podrá utilizar Volver a sincronizar para recuperar la canción y posición actuales de la fuente.

> 9. Controles durante el seguimiento

> El seguidor conservará sus controles locales.

> Acciones que no finalizarán el seguimiento

>  modificar el volumen;

>  silenciar localmente;

>  minimizar o restaurar la ventana;

>  mover o redimensionar el ítem;

>  pausar localmente de manera temporal;

>  utilizar Volver a sincronizar.

> Acciones que finalizarán el seguimiento

>  seleccionar otra canción;

>  elegir una canción favorita;

>  elegir una canción o playlist diferente;

>  avanzar o retroceder de canción manualmente;

>  mover manualmente la barra de progreso;

>  pulsar Dejar de seguir;

>  desconectar Apple Music;

>  eliminar el ítem.

>  Cuando una acción finalice el seguimiento, el usuario pasará automáticamente al modo independiente.

>  La acción seleccionada por el usuario se ejecutará después de terminar el seguimiento.

>  La interfaz podrá mostrar brevemente:

> Dejaste de escuchar con [usuario].

> 10. Pausa local durante el seguimiento

>  El seguidor podrá pausar localmente sin modificar la reproducción de la fuente ni la de otros usuarios.

>  La pausa local no finalizará necesariamente el seguimiento.

>  Mientras esté pausado localmente, el ítem mostrará que el seguimiento se encuentra suspendido en ese dispositivo.

>  El usuario podrá pulsar Volver a sincronizar para retomar la canción y posición actuales de la fuente.

>  Los cambios posteriores de la fuente no deberán iniciar audio automáticamente sin una interacción permitida por el navegador y Apple Music.

> 11. Cambios realizados por la fuente

> Mientras el seguimiento esté activo, el seguidor podrá recibir:

>  cambio de canción;

>  reproducción;

>  pausa;

>  reanudación;

>  cambio manual importante de posición.

>  El sistema no intentará corregir continuamente diferencias mínimas de tiempo.

>  Se sincronizarán eventos relevantes y referencias temporales.

>  El progreso podrá calcularse localmente a partir de:

>  canción;

>  posición de referencia;

>  hora de referencia;

>  versión del evento.

>  Si el desfase es evidente, el usuario podrá volver a sincronizarse manualmente.

> 12. Fuente que deja de estar disponible

> El seguimiento finalizará cuando la fuente:

>  se desconecte;

>  sea expulsada;

>  elimine su ítem;

>  desconecte Apple Music;

>  pierda la capacidad de reproducir;

>  comience a seguir a otra persona;

>  deje de estar disponible como fuente.

> Cuando esto ocurra:

>  Los seguidores dejarán automáticamente de seguirla.

>  No serán transferidos a la nueva fuente que esa persona haya elegido.

>  Los seguidores conservarán localmente la canción y posición alcanzadas.

>  Pasarán al modo independiente.

>  Se mostrará un aviso breve indicando que la fuente dejó de estar disponible.

> 13. Sincronización y estado compartido

> Se compartirán en tiempo real:

>  existencia del ítem;

>  canción actual;

>  posición temporal de referencia;

>  modo independiente o siguiendo;

>  usuario seguido, cuando corresponda;

>  versión de la operación musical.

> Se mantendrán privados:

>  audio;

>  autenticación;

>  credenciales;

>  favoritas;

>  errores personales;

>  dispositivo de salida;

>  estado detallado de la suscripción.

> Las siguientes acciones se transmitirán inmediatamente como eventos compartidos:

>  iniciar una canción;

>  cambiar de canción;

>  cambiar significativamente la posición;

>  comenzar a seguir;

>  finalizar la disponibilidad de una fuente.

> El progreso no se enviará continuamente en cada instante.

> 14. Persistencia

>  última canción mostrada;

>  posición, tamaño y minimización de la ventana;

>  demás configuraciones persistentes definidas para los ítems.

> No se conservarán como sesión activa:

>  reproducción en curso;

>  posición temporal exacta;

>  seguimiento activo;

>  pausa local;

>  usuarios disponibles;

>  autenticación compartida;

>  errores temporales.

> Al volver a ingresar:

>  El ítem podrá mostrar la última canción conocida.

>  La reproducción permanecerá detenida.

>  El usuario no continuará siguiendo automáticamente a otra persona.

>  La música no se iniciará automáticamente.

> 15. Eliminación

>  Solo el propietario podrá eliminar su ítem Apple Music.

>  Eliminarlo finalizará su reproducción dentro de la aplicación y cualquier seguimiento activo relacionado con ese ítem.

>  Los usuarios que lo estaban siguiendo pasarán al modo independiente.

>  La eliminación retirará definitivamente el estado persistente del ítem.

>  Eliminar un ítem musical no eliminará canciones, favoritas ni playlists de la cuenta de Apple Music.

> 16. Restricciones

> En la primera versión no se incluirán:

>  transmisión o retransmisión de audio;

>  almacenamiento de canciones;

>  descarga de contenido musical;

>  sincronización exacta al milisegundo;

>  cadenas de seguimiento;

>  seguimiento de varios usuarios simultáneamente;

>  edición de playlists;

>  cola compartida;

>  votaciones;

>  solicitudes musicales;

>  letras;

>  modo karaoke;

>  historial compartido;

>  visualización pública de biblioteca o favoritas;

>  control remoto directo sobre la cuenta de otro participante;

>  reproducción automática al entrar al lienzo.

> Aspectos pendientes de definir

> Disponibilidad como fuente

>  ¿Un usuario pausado continuará apareciendo como fuente disponible?

>  En caso afirmativo, ¿durante cuánto tiempo podrá permanecer pausado antes de dejar de estar disponible?

>  ¿Un usuario conectado pero sin canción cargada aparecerá en la lista o simplemente no se mostrará?

> Pausa local durante el seguimiento

>  Cuando el seguidor pausa localmente y la fuente cambia de canción, ¿debe actualizarse silenciosamente la canción sin reproducirla o mantenerse la canción pausada anterior?

>  Cuando el seguidor pulse reproducir después de una pausa local, ¿se reanudará desde su posición pausada o se sincronizará automáticamente con la fuente?

>  ¿La pausa local necesita un estado visual diferente de «Siguiendo»?

> Cambios de la fuente

>  ¿Los cambios de canción de la fuente deben aplicarse automáticamente o requerir una confirmación del seguidor?

>  ¿Una pausa realizada por la fuente pausará automáticamente a todos sus seguidores?

>  ¿Un cambio pequeño de posición debe sincronizarse o solo los cambios superiores a un umbral?

>  ¿Cuál será el desfase máximo aceptable antes de recomendar o ejecutar una resincronización?

> Selección de participantes

>  ¿Dónde se abrirá la lista de usuarios disponibles: dentro del reproductor, en un menú emergente o en un panel lateral privado?

>  ¿La lista mostrará únicamente avatar y nombre, o también canción y portada?

>  ¿Los usuarios deberán pulsar el ítem ajeno para seguirlo o utilizarán un botón dentro de su propio reproductor?

>  ¿Se mostrará públicamente cuántas personas siguen a una fuente?

> Privacidad de la reproducción

>  ¿Crear y utilizar el ítem implica automáticamente hacer visible la canción actual?

>  ¿Debería existir una opción para escuchar de forma privada sin permitir que otros se sincronicen?

>  Si no existe modo privado, ¿debe mostrarse una explicación antes de activar Apple Music por primera vez?

>  ¿El nombre de la playlist o álbum actual será visible, o únicamente canción y artista?

> Favoritas y playlists

>  ¿“Favoritas” significa únicamente canciones marcadas como favoritas o todas las canciones añadidas a la biblioteca?

>  ¿Se mostrarán playlists creadas por el usuario, guardadas por él o ambas?

>  ¿Las playlists muy largas se cargarán completas o mediante paginación?

>  ¿Seleccionar una playlist comenzará desde la primera canción o requerirá escoger una canción concreta?

>  ¿Se permitirá reproducir un álbum completo o solamente canciones individuales y playlists?

> Reproducción y controles

>  ¿Se incluirán los controles anterior y siguiente al reproducir una sola canción?

>  ¿Se incluirá repetición o modo aleatorio en una fase posterior?

>  ¿El volumen se controlará desde el propio ítem o se usará únicamente el volumen del dispositivo?

>  ¿Cerrar o minimizar el ítem permitirá que la música continúe?

>  ¿Qué significa exactamente «cerrar» en este componente: eliminar el ítem o detener temporalmente la reproducción?

> Errores y disponibilidad

>  ¿Qué mensaje verá un usuario sin suscripción activa?

>  ¿Qué ocurrirá cuando una canción no esté disponible en la región del seguidor?

>  ¿El seguidor permanecerá siguiendo aunque no pueda reproducir una canción concreta?

>  ¿Se intentará continuar automáticamente cuando la fuente cambie a una canción disponible?

>  ¿Qué sucede si vence la autorización de Apple Music durante una reproducción?

> Reconexión

>  ¿Durante los 30 segundos de reconexión del propietario del lienzo continuará la música localmente?

>  ¿Qué ocurre si un usuario musical pierde conexión durante pocos segundos pero permanece dentro del lienzo?

>  ¿Habrá un intento automático de recuperar el reproductor o solamente un botón para reconectar?

>  ¿Al reconectarse se recuperará el seguimiento anterior o siempre volverá al modo independiente?

> Persistencia

>  ¿Se conservará realmente la última canción mostrada o el reproductor aparecerá vacío al regresar?

>  ¿La autorización de Apple Music se mantendrá entre sesiones cuando sea técnicamente posible?

>  ¿El panel privado recordará la última pestaña abierta o siempre iniciará en Buscar?

> Limitaciones técnicas y legales

>  Debe verificarse mediante implementación real qué partes de favoritas y playlists expone MusicKit en navegador y qué permisos específicos requiere.

>  Debe comprobarse el comportamiento de reproducción automática en Safari, Chrome, iOS y otros navegadores compatibles.

>  Debe validarse si Apple permite el modelo de sincronización automática entre cuentas dentro de una aplicación monetizada.

>  Debe definirse si el ítem estará disponible gratuitamente para todos los usuarios, aunque otras funciones de la aplicación puedan formar parte de planes futuros.

>  Debe establecerse qué navegadores y dispositivos se considerarán oficialmente compatibles con el ítem.

> **[STICKY: Reglas de la pizarra compartida 1. Naturaleza 1.1. La pizarra será una función global del lienzo y no un ítem independiente. 1.2. Existirá una única capa de dibujo compartida y persistente por lienzo. 1.3. Todos los usuarios conectados visualizarán el mismo estado de la pizarra. 1.4. Todos los usuarios podrán dibujar y borrar simultáneamente. 1.5. Los trazos terminados permanecerán en el lienzo aunque su autor: se desconecte; cierre sesión; abandone el lienzo; sea expulsado; cierre la aplicación. 1.6. La ausencia del autor no modificará ni ocultará sus trazos. 2. Herramientas de dibujo 2.1. La barra de dibujo incluirá: lápiz; marcador; resaltador; borrador de trazos; selector de color; selector de grosor; eliminar trazos propios; limpiar toda la pizarra, únicamente para el propietario del lienzo. 2.2. La herramienta, color y grosor seleccionados serán configuraciones locales de cada usuario. 2.3. Las configuraciones locales de un usuario no afectarán a los demás participantes. 2.4. Solo podrá existir una herramienta activa por usuario al mismo tiempo. 2.5. Las configuraciones de dibujo no serán persistentes. 2.6. Al volver a ingresar al lienzo, el modo dibujo estará desactivado. 3. Modo dibujo e interacción 3.1. El usuario deberá activar expresamente una herramienta para dibujar o borrar. 3.2. La herramienta permanecerá activa hasta que: se desactive; sea sustituida por otra; el usuario abandone el lienzo. 3.3. Mientras una herramienta esté activa, los arrastres dentro del área dibujable se interpretarán como acciones de la pizarra. 3.4. Durante el modo dibujo, los ítems no recibirán interacciones del puntero para ese usuario. 3.5. Para volver a mover, redimensionar o utilizar sus ítems, el usuario deberá desactivar el modo dibujo. 4. Relación con los ítems y orden Z 4.1. La pizarra participará en el orden Z compartido como una sola capa. 4.2. Al comenzar un trazo, la capa de dibujo pasará al frente. 4.3. Este cambio será visible para todos los usuarios conectados. 4.4. Los trazos individuales no tendrán posiciones Z independientes. 4.5. La capa completa de dibujo podrá encontrarse por encima o por debajo de un ítem según el orden Z compartido. 4.6. Para elevar un ítem propio por encima de la pizarra, el usuario deberá: desactivar el modo dibujo; interactuar con su ítem. 5. Creación de trazos 5.1. Cada trazo tendrá como mínimo: identificador; autor; herramienta; color; grosor; opacidad; secuencia de puntos; orden de creación. 5.2. Un trazo comenzará al presionar o tocar el área dibujable y terminará al liberar el puntero. 5.3. Solo los trazos finalizados correctamente pasarán al estado persistente. 5.4. Si la conexión se pierde antes de completar el trazo, el trazo incompleto será descartado. 5.5. Los trazos podrán superponerse entre sí. 5.6. Los puntos utilizarán coordenadas lógicas del lienzo y no píxeles físicos del dispositivo. 5.7. La ubicación de los trazos deberá mantenerse coherente entre distintas resoluciones, tamaños de ventana y dispositivos. 6. Tipos de trazo 6.1. El lápiz generará trazos principalmente delgados y opacos. 6.2. El marcador utilizará un grosor medio y alta opacidad. 6.3. El resaltador utilizará trazos más anchos y transparentes. 6.4. El usuario podrá modificar color y grosor dentro de los límites definidos para cada herramienta. 6.5. La opacidad base dependerá de la herramienta seleccionada. 6.6. No se incluirán pinceles personalizados, texturas o imágenes utilizadas como pinceles. 7. Borrador 7.1. El borrador eliminará trazos completos. 7.2. Cuando el área del borrador entre en contacto con un trazo, este podrá seleccionarse para eliminación. 7.3. Cualquier participante podrá borrar trazos creados por otros usuarios. 7.4. El borrador no cortará ni dividirá un trazo en fragmentos. 7.5. El tamaño de detección podrá ajustarse mediante el grosor de la herramienta. 7.6. La eliminación será compartida y persistente. 7.7. Un trazo eliminado no podrá reaparecer debido a actualizaciones retrasadas o a una futura carga del lienzo. 8. Eliminación de trazos propios 8.1. Cada usuario podrá eliminar de una sola vez todos los trazos creados por él. 8.2. Esta acción no afectará los trazos de otros usuarios. 8.3. Tampoco afectará los ítems del lienzo. 8.4. La acción requerirá confirmación. 8.5. Una vez confirmada, la eliminación será compartida y persistente. 9. Limpieza completa 9.1. Solo el propietario del lienzo podrá limpiar completamente la pizarra. 9.2. La opción será visible únicamente para el propietario. 9.3. La limpieza requerirá confirmación. 9.4. La acción eliminará todos los trazos existentes. 9.5. No eliminará ni modificará los ítems. 9.6. El resultado será visible inmediatamente para todos los usuarios conectados. 9.7. La limpieza será persistente y los trazos anteriores no podrán reaparecer posteriormente. 10. Persistencia 10.1. Se conservarán: trazos terminados; identificador y autor; herramienta; color; grosor; opacidad; puntos simplificados; orden de creación; estado necesario para reconocer eliminaciones y limpiezas. 10.2. No se conservarán: posición del cursor; herramienta activa; color seleccionado actualmente; grosor seleccionado actualmente; previsualizaciones; trazos incompletos; movimientos del puntero que no generen dibujo. 10.3. Los trazos persistentes estarán disponibles aunque ninguno de sus autores esté conectado. 11. Restricciones 11.1. Un trazo terminado no podrá seleccionarse para editar su geometría. 11.2. Los trazos no podrán: moverse; rotarse; escalarse; duplicarse; agruparse; editar sus puntos manualmente. 11.3. No se incluirán inicialmente: figuras geométricas automáticas; reconocimiento de formas; corrección automática; texto mediante la herramienta de dibujo; pinceles personalizados; múltiples capas; deshacer o rehacer global. 11.4. Los trazos no estarán vinculados a un ítem concreto. 11.5. No existirán permisos individuales por trazo. 11.6. Las acciones destructivas generales utilizarán confirmaciones en lugar de un sistema complejo de historial y recuperación. 12. Sincronización en tiempo real 12.1. El trazo aparecerá inmediatamente en el dispositivo del usuario que dibuja. 12.2. La representación local no esperará una respuesta remota. 12.3. Los demás usuarios visualizarán progresivamente el trazo mientras se crea. 12.4. Varios trazos activos podrán visualizarse simultáneamente. 12.5. Los puntos no se transmitirán individualmente. 12.6. Los puntos podrán agruparse y enviarse aproximadamente cada 30–50 ms. 12.7. La frecuencia podrá ajustarse posteriormente según rendimiento y experiencia de usuario. 12.8. Al finalizar el trazo se enviará inmediatamente su versión definitiva. 12.9. La versión definitiva tendrá prioridad sobre las actualizaciones temporales anteriores. 12.10. Las actualizaciones retrasadas de un trazo ya confirmado deberán ignorarse. 12.11. La pérdida de una actualización temporal no impedirá reconstruir correctamente el trazo mediante su versión final. 12.12. Los usuarios que ingresen al lienzo recibirán directamente el estado actual de la pizarra, sin necesidad de reproducir el historial de dibujo. 13. Captura y simplificación de puntos 13.1. No será necesario registrar un punto nuevo ante movimientos mínimos del puntero. 13.2. La captura podrá considerar: distancia mínima; intervalo mínimo de tiempo; una combinación de ambos. 13.3. Estos parámetros podrán ajustarse según el zoom y grosor de la herramienta. 13.4. Al terminar un trazo, sus puntos podrán simplificarse antes de almacenarlo definitivamente. 13.5. La simplificación deberá conservar visualmente la forma del trazo. 13.6. La versión simplificada será la utilizada para persistencia. 13.7. Este proceso no deberá retrasar la representación local del dibujo. 14. Almacenamiento de trazos 14.1. Cada trazo terminado se almacenará como una unidad identificable. 14.2. No se almacenará un registro independiente por cada punto. 14.3. Cada trazo conservará sus propiedades y una colección compacta de puntos. 14.4. Los trazos excesivamente grandes podrán dividirse internamente en una cantidad limitada de fragmentos ordenados. 14.5. Esta división será exclusivamente técnica y no será visible para el usuario. 15. Renderizado 15.1. Los trazos activos y los trazos persistentes podrán mantenerse separados durante el renderizado. 15.2. Los nuevos puntos no deberán provocar una reconstrucción completa de toda la pizarra. 15.3. Durante el dibujo se representarán principalmente los segmentos nuevos. 15.4. Los trazos terminados podrán mantenerse en una superficie gráfica de caché. 15.5. Una reconstrucción completa podrá realizarse cuando sea necesaria, por ejemplo: al abrir el lienzo; al recuperar el estado después de una desconexión; al borrar un trazo; al eliminar los trazos de un usuario; al limpiar completamente la pizarra; ante cambios relevantes del sistema de coordenadas. 16. Eliminación y consistencia 16.1. Cada trazo tendrá un identificador único. 16.2. Una eliminación utilizará principalmente dicho identificador para que todos los participantes eliminen exactamente el mismo trazo. 16.3. No será necesario transmitir información de borrado píxel por píxel. 16.4. Las operaciones importantes de creación, eliminación y limpieza tendrán identificación y orden suficientes para distinguir estados antiguos de estados recientes. 16.5. Una operación antigua no podrá sobrescribir una modificación confirmada posteriormente. 16.6. La limpieza total establecerá un nuevo punto de referencia para la pizarra. 16.7. Los trazos pertenecientes a un estado anterior a la última limpieza no podrán reaparecer aunque lleguen actualizaciones retrasadas. 17. Límites técnicos 17.1. El sistema podrá establecer límites configurables para: puntos máximos por trazo; duración máxima de un trazo continuo; frecuencia de transmisión; trazos activos simultáneamente; cantidad total de trazos; tamaño máximo del estado persistente de la pizarra. 17.2. Estos límites existirán para proteger el rendimiento del sistema. 17.3. Sus valores definitivos se determinarán mediante pruebas reales. 17.4. Alcanzar un límite deberá finalizar o simplificar correctamente la operación sin perder el estado ya confirmado. 17.5. Los límites no deberán interferir constantemente con un uso normal de la pizarra.]**

> Reglas de la pizarra compartida

> 1. Naturaleza

> 1.1. La pizarra será una función global del lienzo y no un ítem independiente.

> 1.2. Existirá una única capa de dibujo compartida y persistente por lienzo.

> 1.3. Todos los usuarios conectados visualizarán el mismo estado de la pizarra.

> 1.4. Todos los usuarios podrán dibujar y borrar simultáneamente.

> 1.5. Los trazos terminados permanecerán en el lienzo aunque su autor:

>  cierre sesión;

>  cierre la aplicación.

> 1.6. La ausencia del autor no modificará ni ocultará sus trazos.

> 2. Herramientas de dibujo

> 2.1. La barra de dibujo incluirá:

>  lápiz;

>  marcador;

>  resaltador;

>  borrador de trazos;

>  selector de color;

>  selector de grosor;

>  eliminar trazos propios;

>  limpiar toda la pizarra, únicamente para el propietario del lienzo.

> 2.2. La herramienta, color y grosor seleccionados serán configuraciones locales de cada usuario.

> 2.3. Las configuraciones locales de un usuario no afectarán a los demás participantes.

> 2.4. Solo podrá existir una herramienta activa por usuario al mismo tiempo.

> 2.5. Las configuraciones de dibujo no serán persistentes.

> 2.6. Al volver a ingresar al lienzo, el modo dibujo estará desactivado.

> 3. Modo dibujo e interacción

> 3.1. El usuario deberá activar expresamente una herramienta para dibujar o borrar.

> 3.2. La herramienta permanecerá activa hasta que:

>  se desactive;

>  sea sustituida por otra;

>  el usuario abandone el lienzo.

> 3.3. Mientras una herramienta esté activa, los arrastres dentro del área dibujable se interpretarán como acciones de la pizarra.

> 3.4. Durante el modo dibujo, los ítems no recibirán interacciones del puntero para ese usuario.

> 3.5. Para volver a mover, redimensionar o utilizar sus ítems, el usuario deberá desactivar el modo dibujo.

> 4. Relación con los ítems y orden Z

> 4.1. La pizarra participará en el orden Z compartido como una sola capa.

> 4.2. Al comenzar un trazo, la capa de dibujo pasará al frente.

> 4.3. Este cambio será visible para todos los usuarios conectados.

> 4.4. Los trazos individuales no tendrán posiciones Z independientes.

> 4.5. La capa completa de dibujo podrá encontrarse por encima o por debajo de un ítem según el orden Z compartido.

> 4.6. Para elevar un ítem propio por encima de la pizarra, el usuario deberá:

>  desactivar el modo dibujo;

>  interactuar con su ítem.

> 5. Creación de trazos

> 5.1. Cada trazo tendrá como mínimo:

>  identificador;

>  autor;

>  herramienta;

>  color;

>  grosor;

>  opacidad;

>  secuencia de puntos;

>  orden de creación.

> 5.2. Un trazo comenzará al presionar o tocar el área dibujable y terminará al liberar el puntero.

> 5.3. Solo los trazos finalizados correctamente pasarán al estado persistente.

> 5.4. Si la conexión se pierde antes de completar el trazo, el trazo incompleto será descartado.

> 5.5. Los trazos podrán superponerse entre sí.

> 5.6. Los puntos utilizarán coordenadas lógicas del lienzo y no píxeles físicos del dispositivo.

> 5.7. La ubicación de los trazos deberá mantenerse coherente entre distintas resoluciones, tamaños de ventana y dispositivos.

> 6. Tipos de trazo

> 6.1. El lápiz generará trazos principalmente delgados y opacos.

> 6.2. El marcador utilizará un grosor medio y alta opacidad.

> 6.3. El resaltador utilizará trazos más anchos y transparentes.

> 6.4. El usuario podrá modificar color y grosor dentro de los límites definidos para cada herramienta.

> 6.5. La opacidad base dependerá de la herramienta seleccionada.

> 6.6. No se incluirán pinceles personalizados, texturas o imágenes utilizadas como pinceles.

> 7. Borrador

> 7.1. El borrador eliminará trazos completos.

> 7.2. Cuando el área del borrador entre en contacto con un trazo, este podrá seleccionarse para eliminación.

> 7.3. Cualquier participante podrá borrar trazos creados por otros usuarios.

> 7.4. El borrador no cortará ni dividirá un trazo en fragmentos.

> 7.5. El tamaño de detección podrá ajustarse mediante el grosor de la herramienta.

> 7.6. La eliminación será compartida y persistente.

> 7.7. Un trazo eliminado no podrá reaparecer debido a actualizaciones retrasadas o a una futura carga del lienzo.

> 8. Eliminación de trazos propios

> 8.1. Cada usuario podrá eliminar de una sola vez todos los trazos creados por él.

> 8.2. Esta acción no afectará los trazos de otros usuarios.

> 8.3. Tampoco afectará los ítems del lienzo.

> 8.4. La acción requerirá confirmación.

> 8.5. Una vez confirmada, la eliminación será compartida y persistente.

> 9. Limpieza completa

> 9.1. Solo el propietario del lienzo podrá limpiar completamente la pizarra.

> 9.2. La opción será visible únicamente para el propietario.

> 9.3. La limpieza requerirá confirmación.

> 9.4. La acción eliminará todos los trazos existentes.

> 9.5. No eliminará ni modificará los ítems.

> 9.6. El resultado será visible inmediatamente para todos los usuarios conectados.

> 9.7. La limpieza será persistente y los trazos anteriores no podrán reaparecer posteriormente.

> 10. Persistencia

> 10.1. Se conservarán:

>  trazos terminados;

>  identificador y autor;

>  puntos simplificados;

>  orden de creación;

>  estado necesario para reconocer eliminaciones y limpiezas.

> 10.2. No se conservarán:

>  posición del cursor;

>  herramienta activa;

>  color seleccionado actualmente;

>  grosor seleccionado actualmente;

>  previsualizaciones;

>  trazos incompletos;

>  movimientos del puntero que no generen dibujo.

> 10.3. Los trazos persistentes estarán disponibles aunque ninguno de sus autores esté conectado.

> 11. Restricciones

> 11.1. Un trazo terminado no podrá seleccionarse para editar su geometría.

> 11.2. Los trazos no podrán:

>  moverse;

>  rotarse;

>  escalarse;

>  duplicarse;

>  agruparse;

>  editar sus puntos manualmente.

> 11.3. No se incluirán inicialmente:

>  figuras geométricas automáticas;

>  reconocimiento de formas;

>  corrección automática;

>  texto mediante la herramienta de dibujo;

>  pinceles personalizados;

>  múltiples capas;

>  deshacer o rehacer global.

> 11.4. Los trazos no estarán vinculados a un ítem concreto.

> 11.5. No existirán permisos individuales por trazo.

> 11.6. Las acciones destructivas generales utilizarán confirmaciones en lugar de un sistema complejo de historial y recuperación.

> 12. Sincronización en tiempo real

> 12.1. El trazo aparecerá inmediatamente en el dispositivo del usuario que dibuja.

> 12.2. La representación local no esperará una respuesta remota.

> 12.3. Los demás usuarios visualizarán progresivamente el trazo mientras se crea.

> 12.4. Varios trazos activos podrán visualizarse simultáneamente.

> 12.5. Los puntos no se transmitirán individualmente.

> 12.6. Los puntos podrán agruparse y enviarse aproximadamente cada 30–50 ms.

> 12.7. La frecuencia podrá ajustarse posteriormente según rendimiento y experiencia de usuario.

> 12.8. Al finalizar el trazo se enviará inmediatamente su versión definitiva.

> 12.9. La versión definitiva tendrá prioridad sobre las actualizaciones temporales anteriores.

> 12.10. Las actualizaciones retrasadas de un trazo ya confirmado deberán ignorarse.

> 12.11. La pérdida de una actualización temporal no impedirá reconstruir correctamente el trazo mediante su versión final.

> 12.12. Los usuarios que ingresen al lienzo recibirán directamente el estado actual de la pizarra, sin necesidad de reproducir el historial de dibujo.

> 13. Captura y simplificación de puntos

> 13.1. No será necesario registrar un punto nuevo ante movimientos mínimos del puntero.

> 13.2. La captura podrá considerar:

>  distancia mínima;

>  intervalo mínimo de tiempo;

>  una combinación de ambos.

> 13.3. Estos parámetros podrán ajustarse según el zoom y grosor de la herramienta.

> 13.4. Al terminar un trazo, sus puntos podrán simplificarse antes de almacenarlo definitivamente.

> 13.5. La simplificación deberá conservar visualmente la forma del trazo.

> 13.6. La versión simplificada será la utilizada para persistencia.

> 13.7. Este proceso no deberá retrasar la representación local del dibujo.

> 14. Almacenamiento de trazos

> 14.1. Cada trazo terminado se almacenará como una unidad identificable.

> 14.2. No se almacenará un registro independiente por cada punto.

> 14.3. Cada trazo conservará sus propiedades y una colección compacta de puntos.

> 14.4. Los trazos excesivamente grandes podrán dividirse internamente en una cantidad limitada de fragmentos ordenados.

> 14.5. Esta división será exclusivamente técnica y no será visible para el usuario.

> 15. Renderizado

> 15.1. Los trazos activos y los trazos persistentes podrán mantenerse separados durante el renderizado.

> 15.2. Los nuevos puntos no deberán provocar una reconstrucción completa de toda la pizarra.

> 15.3. Durante el dibujo se representarán principalmente los segmentos nuevos.

> 15.4. Los trazos terminados podrán mantenerse en una superficie gráfica de caché.

> 15.5. Una reconstrucción completa podrá realizarse cuando sea necesaria, por ejemplo:

>  al abrir el lienzo;

>  al recuperar el estado después de una desconexión;

>  al borrar un trazo;

>  al eliminar los trazos de un usuario;

>  al limpiar completamente la pizarra;

>  ante cambios relevantes del sistema de coordenadas.

> 16. Eliminación y consistencia

> 16.1. Cada trazo tendrá un identificador único.

> 16.2. Una eliminación utilizará principalmente dicho identificador para que todos los participantes eliminen exactamente el mismo trazo.

> 16.3. No será necesario transmitir información de borrado píxel por píxel.

> 16.4. Las operaciones importantes de creación, eliminación y limpieza tendrán identificación y orden suficientes para distinguir estados antiguos de estados recientes.

> 16.5. Una operación antigua no podrá sobrescribir una modificación confirmada posteriormente.

> 16.6. La limpieza total establecerá un nuevo punto de referencia para la pizarra.

> 16.7. Los trazos pertenecientes a un estado anterior a la última limpieza no podrán reaparecer aunque lleguen actualizaciones retrasadas.

> 17. Límites técnicos

> 17.1. El sistema podrá establecer límites configurables para:

>  puntos máximos por trazo;

>  duración máxima de un trazo continuo;

>  frecuencia de transmisión;

>  trazos activos simultáneamente;

>  cantidad total de trazos;

>  tamaño máximo del estado persistente de la pizarra.

> 17.2. Estos límites existirán para proteger el rendimiento del sistema.

> 17.3. Sus valores definitivos se determinarán mediante pruebas reales.

> 17.4. Alcanzar un límite deberá finalizar o simplificar correctamente la operación sin perder el estado ya confirmado.

> 17.5. Los límites no deberán interferir constantemente con un uso normal de la pizarra.

> **[STICKY: Reglas del sistema de ítems o ventanas 1. Naturaleza y propiedad 1.1. Cada ítem funcionará como una ventana independiente con identificador, propietario, contenido, posición, tamaño, estado y orden Z propios. 1.2. Los ítems podrán superponerse dentro del lienzo. 1.3. Cada tipo de ítem tendrá límites propios de tamaño y funcionamiento definidos en sus reglas específicas. 1.4. Cada ítem pertenecerá permanentemente al usuario que lo creó y su propiedad no podrá transferirse. 1.5. Solo el propietario podrá modificar su ítem, incluyendo: moverlo; redimensionarlo; minimizarlo y restaurarlo; utilizar sus controles; modificar su contenido o configuración; cambiar su posición en el orden Z; eliminarlo. 1.6. Los demás usuarios podrán visualizar los ítems ajenos, pero no modificar su estado compartido. 1.7. Podrán existir acciones locales sobre ítems ajenos cuando no afecten a los demás usuarios, como silenciar localmente un audio. 2. Movimiento y tamaño 2.1. El propietario podrá mover y redimensionar sus ítems dentro del área disponible del lienzo. 2.2. Los ítems deberán permanecer recuperables y no podrán quedar completamente fuera del área interactuable. 2.3. Siempre deberá permanecer accesible una zona suficiente del ítem para que su propietario pueda recuperarlo. 2.4. El redimensionamiento respetará los tamaños mínimos y máximos establecidos para cada tipo de ítem. 3. Orden Z y superposición 3.1. El orden Z formará parte del estado compartido del lienzo. 3.2. Cuando el propietario interactúe con cualquier parte de uno de sus ítems, este podrá pasar al frente. 3.3. Interactuar con un control interno del ítem también podrá elevarlo. 3.4. Solo el propietario podrá modificar el orden Z de sus propios ítems. 3.5. Los cambios de orden Z se sincronizarán y serán visibles para todos los usuarios conectados. 3.6. Debera existir un boton que 4. Relación con la pizarra 4.1. Mientras una herramienta de dibujo o borrado esté activa, los ítems no recibirán interacciones del puntero para ese usuario. 4.2. Durante el modo dibujo, los arrastres se interpretarán como acciones sobre la pizarra y no como movimiento o redimensionamiento de ventanas. 4.3. Para volver a interactuar con los ítems, el usuario deberá desactivar o cambiar la herramienta de dibujo. 4.4. La relación de superposición entre los ítems y la capa de dibujo seguirá el orden Z compartido del lienzo. 5. Presencia del propietario 5.1. Los ítems persistentes permanecerán visibles aunque su propietario se desconecte o cierre sesión y se eliminaran cuando abandone el lienzo o sea expulsado. 5.2. Cuando el propietario no esté presente, sus ítems mostrarán una apariencia atenuada o desactivada. 5.3. Los ítems de usuarios ausentes continuarán siendo visibles, pero no podrán ser modificados por otros participantes. 5.4. Cuando su propietario vuelva a conectarse al lienzo, sus ítems recuperarán automáticamente su apariencia activa. 5.5. La ausencia del propietario no modificará: posición; tamaño; contenido; configuración; estado minimizado; orden Z; demás datos persistentes. 5.6. El ítem de cámara será la excepción: desaparecerá cuando su propietario deje de estar conectado y finalizará su transmisión de audio y video. 5.7. Los demás estados temporales dependientes de la conexión se comportarán según las reglas específicas de cada tipo de ítem. 6. Persistencia y eliminación 6.1. El estado persistente de un ítem se conservará aunque no haya usuarios conectados al lienzo. 6.2. Al volver a abrir el lienzo, los ítems recuperarán su último estado persistente. 6.3. Desconectarse, cerrar sesión, abandonar el lienzo, perder la conexión o ser expulsado no eliminará un ítem. 6.4. Minimizar un ítem tampoco representará su eliminación. 6.5. Solo el propietario podrá eliminar definitivamente su ítem mediante la acción X. 6.6. La acción X eliminará el ítem y sus datos persistentes asociados. 6.7. Un ítem eliminado no reaparecerá al reconectarse o volver a acceder al lienzo. 6.8. Los estados temporales, como transmisiones audiovisuales o actividad momentánea, no se restaurarán automáticamente salvo que las reglas específicas del módulo indiquen lo contrario. 7. Sincronización en tiempo real 7.1. Las modificaciones autorizadas del ítem se reflejarán inmediatamente en el dispositivo de su propietario. 7.2. Los cambios compartidos se sincronizarán con los demás usuarios conectados. 7.3. Durante el movimiento o redimensionamiento, las actualizaciones podrán enviarse aproximadamente cada 40–60 ms, evitando transmitir cada evento individual del puntero. 7.4. Los demás usuarios podrán visualizar una transición suavizada entre los estados recibidos. 7.5. El suavizado será únicamente visual y no modificará el estado persistente. 7.6. Al terminar un movimiento o redimensionamiento se enviará inmediatamente el estado final exacto. 7.7. Una actualización intermedia retrasada no podrá sobrescribir un estado final más reciente. 7.8. Las acciones discretas se sincronizarán inmediatamente, incluyendo: crear un ítem; eliminarlo; minimizarlo o restaurarlo; modificar su orden Z; cambiar un estado compartido; realizar una modificación puntual de su configuración compartida. 7.9. El contenido de cada tipo de ítem podrá utilizar una estrategia de sincronización propia según sus características.]**

> Reglas del sistema de ítems o ventanas

> 1. Naturaleza y propiedad

> 1.1. Cada ítem funcionará como una ventana independiente con identificador, propietario, contenido, posición, tamaño, estado y orden Z propios.

> 1.2. Los ítems podrán superponerse dentro del lienzo.

> 1.3. Cada tipo de ítem tendrá límites propios de tamaño y funcionamiento definidos en sus reglas específicas.

> 1.4. Cada ítem pertenecerá permanentemente al usuario que lo creó y su propiedad no podrá transferirse.

> 1.5. Solo el propietario podrá modificar su ítem, incluyendo:

>  minimizarlo y restaurarlo;

>  modificar su contenido o configuración;

>  cambiar su posición en el orden Z;

> 1.6. Los demás usuarios podrán visualizar los ítems ajenos, pero no modificar su estado compartido.

> 1.7. Podrán existir acciones locales sobre ítems ajenos cuando no afecten a los demás usuarios, como silenciar localmente un audio.

> 2. Movimiento y tamaño

> 2.1. El propietario podrá mover y redimensionar sus ítems dentro del área disponible del lienzo.

> 2.2. Los ítems deberán permanecer recuperables y no podrán quedar completamente fuera del área interactuable.

> 2.3. Siempre deberá permanecer accesible una zona suficiente del ítem para que su propietario pueda recuperarlo.

> 2.4. El redimensionamiento respetará los tamaños mínimos y máximos establecidos para cada tipo de ítem.

> 3. Orden Z y superposición

> 3.1. El orden Z formará parte del estado compartido del lienzo.

> 3.2. Cuando el propietario interactúe con cualquier parte de uno de sus ítems, este podrá pasar al frente.

> 3.3. Interactuar con un control interno del ítem también podrá elevarlo.

> 3.4. Solo el propietario podrá modificar el orden Z de sus propios ítems.

> 3.5. Los cambios de orden Z se sincronizarán y serán visibles para todos los usuarios conectados.

> 3.6. Debera existir un boton que

> 4. Relación con la pizarra

> 4.1. Mientras una herramienta de dibujo o borrado esté activa, los ítems no recibirán interacciones del puntero para ese usuario.

> 4.2. Durante el modo dibujo, los arrastres se interpretarán como acciones sobre la pizarra y no como movimiento o redimensionamiento de ventanas.

> 4.3. Para volver a interactuar con los ítems, el usuario deberá desactivar o cambiar la herramienta de dibujo.

> 4.4. La relación de superposición entre los ítems y la capa de dibujo seguirá el orden Z compartido del lienzo.

> 5. Presencia del propietario

> 5.1. Los ítems persistentes permanecerán visibles aunque su propietario se desconecte o cierre sesión y se eliminaran cuando abandone el lienzo o sea expulsado.

> 5.2. Cuando el propietario no esté presente, sus ítems mostrarán una apariencia atenuada o desactivada.

> 5.3. Los ítems de usuarios ausentes continuarán siendo visibles, pero no podrán ser modificados por otros participantes.

> 5.4. Cuando su propietario vuelva a conectarse al lienzo, sus ítems recuperarán automáticamente su apariencia activa.

> 5.5. La ausencia del propietario no modificará:

>  posición;

>  configuración;

>  estado minimizado;

>  demás datos persistentes.

> 5.6. El ítem de cámara será la excepción: desaparecerá cuando su propietario deje de estar conectado y finalizará su transmisión de audio y video.

> 5.7. Los demás estados temporales dependientes de la conexión se comportarán según las reglas específicas de cada tipo de ítem.

> 6. Persistencia y eliminación

> 6.1. El estado persistente de un ítem se conservará aunque no haya usuarios conectados al lienzo.

> 6.2. Al volver a abrir el lienzo, los ítems recuperarán su último estado persistente.

> 6.3. Desconectarse, cerrar sesión, abandonar el lienzo, perder la conexión o ser expulsado no eliminará un ítem.

> 6.4. Minimizar un ítem tampoco representará su eliminación.

> 6.5. Solo el propietario podrá eliminar definitivamente su ítem mediante la acción X.

> 6.6. La acción X eliminará el ítem y sus datos persistentes asociados.

> 6.7. Un ítem eliminado no reaparecerá al reconectarse o volver a acceder al lienzo.

> 6.8. Los estados temporales, como transmisiones audiovisuales o actividad momentánea, no se restaurarán automáticamente salvo que las reglas específicas del módulo indiquen lo contrario.

> 7. Sincronización en tiempo real

> 7.1. Las modificaciones autorizadas del ítem se reflejarán inmediatamente en el dispositivo de su propietario.

> 7.2. Los cambios compartidos se sincronizarán con los demás usuarios conectados.

> 7.3. Durante el movimiento o redimensionamiento, las actualizaciones podrán enviarse aproximadamente cada 40–60 ms, evitando transmitir cada evento individual del puntero.

> 7.4. Los demás usuarios podrán visualizar una transición suavizada entre los estados recibidos.

> 7.5. El suavizado será únicamente visual y no modificará el estado persistente.

> 7.6. Al terminar un movimiento o redimensionamiento se enviará inmediatamente el estado final exacto.

> 7.7. Una actualización intermedia retrasada no podrá sobrescribir un estado final más reciente.

> 7.8. Las acciones discretas se sincronizarán inmediatamente, incluyendo:

>  crear un ítem;

>  eliminarlo;

>  minimizarlo o restaurarlo;

>  modificar su orden Z;

>  cambiar un estado compartido;

>  realizar una modificación puntual de su configuración compartida.

> 7.9. El contenido de cada tipo de ítem podrá utilizar una estrategia de sincronización propia según sus características.

> **[STICKY: Reglas del ítem de texto enriquecido Las reglas generales de propiedad, movimiento, tamaño, minimización, orden Z, persistencia y eliminación se definen en Sistema general de ítems o ventanas. 1. Naturaleza y cantidad Cada usuario podrá crear varios ítems de texto enriquecido dentro del mismo lienzo. Cada ítem pertenecerá únicamente a su creador. Solo el propietario podrá editar el contenido y utilizar sus herramientas. Los demás participantes podrán visualizar el texto y sus cambios en tiempo real. 2. Título Cada nota tendrá un título automático, fijo y no editable. El título seguirá el formato: Nombre del usuario — Nota N La numeración será independiente para cada usuario. 3. Contenido Cada nota admitirá un máximo de 10 000 caracteres. Al alcanzar los 9 000 caracteres se mostrará un contador discreto. Al llegar al límite no podrán añadirse nuevos caracteres, pero sí editarse o eliminarse los existentes. El contenido podrá incluir varios párrafos y desplazamiento vertical interno. La ventana no aumentará automáticamente de altura por la cantidad de texto. 4. Formato permitido El propietario podrá aplicar: negrita; cursiva; subrayado; tachado; alineación izquierda, centro o derecha; listas con viñetas; listas numeradas; enlaces; tamaño de texto; color de texto; color de fondo. Se utilizará una única tipografía: Arial. Los tamaños disponibles serán valores predefinidos. Los colores de texto y fondo se seleccionarán desde paletas fijas. La paleta de fondo incluirá una opción negra. El sistema evitará combinaciones de texto y fondo con contraste insuficiente. 5. Edición El propietario deberá activar el modo edición para modificar la nota. La barra de formato solo será visible durante la edición y únicamente para el propietario. Los demás participantes no verán: cursor; selección de texto; barra de formato; paneles temporales; historial de deshacer. No existirá un botón Guardar. Todo cambio se guardará automáticamente. 6. Copiar y pegar El usuario podrá copiar texto mediante los comandos normales del sistema, como Ctrl + C. No existirá un botón específico para copiar. La aplicación no añadirá un menú contextual propio. El menú contextual normal del navegador permanecerá disponible. El contenido pegado se convertirá en texto sencillo. Al pegar se eliminarán: fuentes; tamaños; colores; fondos; imágenes; tablas; estilos externos; elementos HTML no admitidos. Se conservarán únicamente el texto y los saltos de línea. 7. Enlaces Solo se admitirán enlaces válidos con http:// o https://. Los enlaces se abrirán en una nueva pestaña. En modo lectura se abrirán con clic normal. En modo edición se abrirán mediante Ctrl + clic. Abrir un enlace no sustituirá ni cerrará el lienzo actual. 8. Sincronización y guardado La escritura se reflejará inmediatamente en el dispositivo del propietario. El contenido podrá sincronizarse con los demás participantes aproximadamente cada 100 a 200 milisegundos. El estado definitivo se guardará automáticamente: después de 300 a 500 milisegundos sin escritura; al abandonar el modo edición; al minimizar el ítem; al cerrar o eliminar el ítem; antes de abandonar el lienzo. La versión más reciente prevalecerá sobre actualizaciones anteriores. Una actualización retrasada no podrá sobrescribir contenido más nuevo. La posición de desplazamiento interno será local y no se sincronizará. 9. Persistencia Se conservarán: título; contenido; párrafos; listas; enlaces; formato; tamaños; colores de texto; color de fondo. No se conservarán: cursor; selección; barra abierta; posición de desplazamiento; texto no confirmado; historial temporal de deshacer y rehacer. 10. Restricciones No se incluirán: edición colaborativa simultánea; comentarios; menciones; tablas; imágenes incrustadas; archivos adjuntos; encabezados y pies de página; documentos de varias páginas; fuentes personalizadas; exportación; conversión en tareas; historial de versiones; edición de código HTML; macros; funciones avanzadas propias de Word.]**

> Reglas del ítem de texto enriquecido

> Las reglas generales de propiedad, movimiento, tamaño, minimización, orden Z, persistencia y eliminación se definen en Sistema general de ítems o ventanas.

>  Cada usuario podrá crear varios ítems de texto enriquecido dentro del mismo lienzo.

>  Cada ítem pertenecerá únicamente a su creador.

>  Solo el propietario podrá editar el contenido y utilizar sus herramientas.

>  Los demás participantes podrán visualizar el texto y sus cambios en tiempo real.

>  Cada nota tendrá un título automático, fijo y no editable.

> El título seguirá el formato:

> Nombre del usuario — Nota N

>  La numeración será independiente para cada usuario.

> 3. Contenido

>  Cada nota admitirá un máximo de 10 000 caracteres.

>  Al alcanzar los 9 000 caracteres se mostrará un contador discreto.

>  Al llegar al límite no podrán añadirse nuevos caracteres, pero sí editarse o eliminarse los existentes.

>  El contenido podrá incluir varios párrafos y desplazamiento vertical interno.

>  La ventana no aumentará automáticamente de altura por la cantidad de texto.

> 4. Formato permitido

> El propietario podrá aplicar:

>  negrita;

>  cursiva;

>  subrayado;

>  tachado;

>  alineación izquierda, centro o derecha;

>  listas con viñetas;

>  listas numeradas;

>  enlaces;

>  tamaño de texto;

>  color de texto;

>  color de fondo.

>  Se utilizará una única tipografía: Arial.

>  Los tamaños disponibles serán valores predefinidos.

>  Los colores de texto y fondo se seleccionarán desde paletas fijas.

>  La paleta de fondo incluirá una opción negra.

>  El sistema evitará combinaciones de texto y fondo con contraste insuficiente.

> 5. Edición

>  El propietario deberá activar el modo edición para modificar la nota.

>  La barra de formato solo será visible durante la edición y únicamente para el propietario.

>  Los demás participantes no verán:

>  cursor;

>  selección de texto;

>  barra de formato;

>  paneles temporales;

>  historial de deshacer.

>  No existirá un botón Guardar.

>  Todo cambio se guardará automáticamente.

> 6. Copiar y pegar

>  El usuario podrá copiar texto mediante los comandos normales del sistema, como Ctrl + C.

>  No existirá un botón específico para copiar.

>  La aplicación no añadirá un menú contextual propio.

>  El menú contextual normal del navegador permanecerá disponible.

>  El contenido pegado se convertirá en texto sencillo.

>  Al pegar se eliminarán:

>  fuentes;

>  tamaños;

>  colores;

>  fondos;

>  tablas;

>  estilos externos;

>  elementos HTML no admitidos.

>  Se conservarán únicamente el texto y los saltos de línea.

> 7. Enlaces

>  Solo se admitirán enlaces válidos con http:// o https://.

>  Los enlaces se abrirán en una nueva pestaña.

>  En modo lectura se abrirán con clic normal.

>  En modo edición se abrirán mediante Ctrl + clic.

>  Abrir un enlace no sustituirá ni cerrará el lienzo actual.

> 8. Sincronización y guardado

>  La escritura se reflejará inmediatamente en el dispositivo del propietario.

>  El contenido podrá sincronizarse con los demás participantes aproximadamente cada 100 a 200 milisegundos.

>  El estado definitivo se guardará automáticamente:

>  después de 300 a 500 milisegundos sin escritura;

>  al abandonar el modo edición;

>  al minimizar el ítem;

>  al cerrar o eliminar el ítem;

>  antes de abandonar el lienzo.

>  La versión más reciente prevalecerá sobre actualizaciones anteriores.

>  Una actualización retrasada no podrá sobrescribir contenido más nuevo.

>  La posición de desplazamiento interno será local y no se sincronizará.

> 9. Persistencia

>  párrafos;

>  listas;

>  formato;

>  colores de texto;

>  selección;

>  barra abierta;

>  posición de desplazamiento;

>  texto no confirmado;

>  historial temporal de deshacer y rehacer.

> No se incluirán:

>  edición colaborativa simultánea;

>  menciones;

>  imágenes incrustadas;

>  encabezados y pies de página;

>  documentos de varias páginas;

>  fuentes personalizadas;

>  exportación;

>  conversión en tareas;

>  historial de versiones;

>  edición de código HTML;

>  macros;

>  funciones avanzadas propias de Word.

> **[STICKY: Reglas ítem imagen Naturaleza Cada imagen subida creará un ítem independiente. Cada usuario podrá tener hasta 10 ítems Imagen dentro del mismo lienzo. Solo podrá seleccionarse y subirse un archivo por operación. La imagen pertenecerá al usuario que la agregó. Las reglas generales de propiedad, movimiento, orden Z, minimización y eliminación se aplicarán normalmente. Formatos Se admitirán únicamente: JPG o JPEG; PNG; WebP. No se admitirán: GIF; SVG; PDF; TIFF; PSD; formatos RAW. Tamaño del archivo El archivo original podrá tener un máximo de 10 MB. Antes de almacenarse, la imagen podrá comprimirse y reducirse automáticamente. La resolución procesada máxima será aproximadamente de 2560 × 2560 píxeles. La optimización no deberá modificar visualmente la proporción de la imagen. Los archivos PNG o WebP conservarán su transparencia. Creación El usuario podrá arrastrar una imagen sobre el lienzo o seleccionarla mediante Agregar imagen. Solo podrá cargarse una imagen a la vez. El ítem aparecerá inicialmente en la posición donde se soltó el archivo o en una posición visible predeterminada. La imagen se mostrará inmediatamente mediante una vista previa local mientras se completa la carga. El ítem solo se incorporará definitivamente al estado persistente cuando la carga termine correctamente. Proporción y tamaño El ítem adoptará automáticamente la proporción de aspecto original de la imagen. La ventana no tendrá un formato rectangular predeterminado diferente al de la imagen. No existirán márgenes internos alrededor de la imagen. La imagen ocupará completamente el área visible del ítem sin deformarse ni recortarse. Al redimensionar, se conservará siempre su proporción original. No se permitirá modificar independientemente el ancho y la altura. El ítem respetará un tamaño mínimo y máximo para permanecer visible y manejable dentro del lienzo. Interfaz No existirá barra de herramientas. No existirán menús de edición. La imagen se mostrará directamente dentro de su ventana. Los controles generales aparecerán únicamente cuando corresponda según el sistema visual del lienzo. El propietario dispondrá solamente de: minimizar; restaurar; eliminar mediante el botón X. Eliminación y minimización Pulsar X eliminará definitivamente el ítem y su imagen almacenada. El botón X no ocultará ni cerrará temporalmente la imagen. Para ocultarla temporalmente sin eliminarla, el propietario deberá minimizarla. Una imagen minimizada conservará su archivo, posición, tamaño y demás estado persistente. Restaurar la imagen la mostrará nuevamente con su misma proporción y dimensiones. La eliminación no tendrá opción de recuperación en la primera versión. Transparencia Las zonas transparentes de PNG y WebP mostrarán directamente el contenido del lienzo situado debajo. No se mostrará un patrón de cuadros ni un fondo artificial para representar la transparencia. Carga y errores Durante la carga se mostrará un indicador discreto de progreso. Si la carga falla, el propietario podrá: reintentar; eliminar el ítem temporal. Una carga incompleta no será visible como imagen persistente para los demás participantes. Si el usuario abandona el lienzo antes de que termine la carga, el archivo incompleto no se conservará. Los formatos o archivos que superen el límite mostrarán un mensaje claro y no crearán el ítem. Persistencia Se conservarán: identificador; propietario; archivo optimizado; proporción original; dimensiones procesadas; posición; tamaño; estado minimizado; orden Z. No se conservarán: progreso de carga; vista previa temporal; mensajes de error; estado de selección; controles visibles. Restricciones No se permitirá: reemplazar la imagen; recortarla; girarla; deformarla; aplicar filtros; cambiar brillo o contraste; eliminar el fondo; abrirla mediante doble clic; descargarla desde la aplicación; insertar varias imágenes dentro de un mismo ítem; subir varios archivos simultáneamente; importar imágenes mediante URL; pegar imágenes desde el portapapeles;]**

> Reglas ítem imagen

> Naturaleza

>  Cada imagen subida creará un ítem independiente.

>  Cada usuario podrá tener hasta 10 ítems Imagen dentro del mismo lienzo.

>  Solo podrá seleccionarse y subirse un archivo por operación.

>  La imagen pertenecerá al usuario que la agregó.

>  Las reglas generales de propiedad, movimiento, orden Z, minimización y eliminación se aplicarán normalmente.

> Formatos

> Se admitirán únicamente:

>  JPG o JPEG;

>  PNG;

>  WebP.

> No se admitirán:

>  GIF;

>  SVG;

>  PDF;

>  TIFF;

>  PSD;

>  formatos RAW.

> Tamaño del archivo

>  El archivo original podrá tener un máximo de 10 MB.

>  Antes de almacenarse, la imagen podrá comprimirse y reducirse automáticamente.

>  La resolución procesada máxima será aproximadamente de 2560 × 2560 píxeles.

>  La optimización no deberá modificar visualmente la proporción de la imagen.

>  Los archivos PNG o WebP conservarán su transparencia.

> Creación

>  El usuario podrá arrastrar una imagen sobre el lienzo o seleccionarla mediante Agregar imagen.

>  Solo podrá cargarse una imagen a la vez.

>  El ítem aparecerá inicialmente en la posición donde se soltó el archivo o en una posición visible predeterminada.

>  La imagen se mostrará inmediatamente mediante una vista previa local mientras se completa la carga.

>  El ítem solo se incorporará definitivamente al estado persistente cuando la carga termine correctamente.

> Proporción y tamaño

>  El ítem adoptará automáticamente la proporción de aspecto original de la imagen.

>  La ventana no tendrá un formato rectangular predeterminado diferente al de la imagen.

>  No existirán márgenes internos alrededor de la imagen.

>  La imagen ocupará completamente el área visible del ítem sin deformarse ni recortarse.

>  Al redimensionar, se conservará siempre su proporción original.

>  No se permitirá modificar independientemente el ancho y la altura.

>  El ítem respetará un tamaño mínimo y máximo para permanecer visible y manejable dentro del lienzo.

> Interfaz

>  No existirá barra de herramientas.

>  No existirán menús de edición.

>  La imagen se mostrará directamente dentro de su ventana.

>  Los controles generales aparecerán únicamente cuando corresponda según el sistema visual del lienzo.

> El propietario dispondrá solamente de:

>  minimizar;

>  restaurar;

>  eliminar mediante el botón X.

> Eliminación y minimización

>  Pulsar X eliminará definitivamente el ítem y su imagen almacenada.

>  El botón X no ocultará ni cerrará temporalmente la imagen.

>  Para ocultarla temporalmente sin eliminarla, el propietario deberá minimizarla.

>  Una imagen minimizada conservará su archivo, posición, tamaño y demás estado persistente.

>  Restaurar la imagen la mostrará nuevamente con su misma proporción y dimensiones.

>  La eliminación no tendrá opción de recuperación en la primera versión.

> Transparencia

>  Las zonas transparentes de PNG y WebP mostrarán directamente el contenido del lienzo situado debajo.

>  No se mostrará un patrón de cuadros ni un fondo artificial para representar la transparencia.

> Carga y errores

>  Durante la carga se mostrará un indicador discreto de progreso.

>  Si la carga falla, el propietario podrá:

>  reintentar;

>  eliminar el ítem temporal.

>  Una carga incompleta no será visible como imagen persistente para los demás participantes.

>  Si el usuario abandona el lienzo antes de que termine la carga, el archivo incompleto no se conservará.

>  Los formatos o archivos que superen el límite mostrarán un mensaje claro y no crearán el ítem.

>  archivo optimizado;

>  proporción original;

>  dimensiones procesadas;

>  orden Z.

>  progreso de carga;

>  vista previa temporal;

>  mensajes de error;

>  estado de selección;

>  controles visibles.

> No se permitirá:

>  reemplazar la imagen;

>  recortarla;

>  girarla;

>  deformarla;

>  aplicar filtros;

>  cambiar brillo o contraste;

>  eliminar el fondo;

>  abrirla mediante doble clic;

>  descargarla desde la aplicación;

>  insertar varias imágenes dentro de un mismo ítem;

>  subir varios archivos simultáneamente;

>  importar imágenes mediante URL;

>  pegar imágenes desde el portapapeles;

Requerimientos Funcionales

> **[STICKY: Acceso y usuarios El sistema debe permitir registrar e iniciar sesión a usuarios. El sistema debe crear automáticamente un lienzo personal por usuario. El sistema debe impedir el acceso al lienzo si el perfil está incompleto. El propietario debe poder compartir su lienzo mediante enlace o código. El propietario debe poder renovar las credenciales de acceso. El propietario debe poder expulsar participantes. El sistema debe finalizar la sesión cuando el propietario se desconecte definitivamente.]**

> Acceso y usuarios

>  El sistema debe permitir registrar e iniciar sesión a usuarios.

>  El sistema debe crear automáticamente un lienzo personal por usuario.

>  El sistema debe impedir el acceso al lienzo si el perfil está incompleto.

>  El propietario debe poder compartir su lienzo mediante enlace o código.

>  El propietario debe poder renovar las credenciales de acceso.

>  El propietario debe poder expulsar participantes.

>  El sistema debe finalizar la sesión cuando el propietario se desconecte definitivamente.

> **[STICKY: Lienzo compartido El sistema debe mostrar en tiempo real los participantes conectados. El sistema debe permitir crear, mover, redimensionar, minimizar y eliminar ítems. El sistema debe conservar la posición, tamaño, contenido y orden Z de los ítems. El sistema debe impedir que un usuario modifique ítems ajenos. El sistema debe ocultar temporalmente los ítems de un usuario desconectado. El sistema debe restaurarlos cuando el usuario vuelva a ingresar.]**

> Lienzo compartido

>  El sistema debe mostrar en tiempo real los participantes conectados.

>  El sistema debe permitir crear, mover, redimensionar, minimizar y eliminar ítems.

>  El sistema debe conservar la posición, tamaño, contenido y orden Z de los ítems.

>  El sistema debe impedir que un usuario modifique ítems ajenos.

>  El sistema debe ocultar temporalmente los ítems de un usuario desconectado.

>  El sistema debe restaurarlos cuando el usuario vuelva a ingresar.

> **[STICKY: Cámara El sistema debe permitir activar y desactivar cámara y micrófono. El sistema debe transmitir audio y video en tiempo real. Cada usuario debe poder silenciar localmente el audio de otro participante. El sistema debe detener la transmisión al abandonar la sesión. El sistema debe permitir aplicar filtros simples de video. El audio y el video no se transmitirán mediante la base de datos del lienzo. La transmisión utilizará WebRTC mediante un servicio SFU administrado. El servicio audiovisual administrará: transmisión; señalización; conectividad; reconexión; adaptación de calidad;]**

> Cámara

>  El sistema debe permitir activar y desactivar cámara y micrófono.

>  El sistema debe transmitir audio y video en tiempo real.

>  Cada usuario debe poder silenciar localmente el audio de otro participante.

>  El sistema debe detener la transmisión al abandonar la sesión.

>  El sistema debe permitir aplicar filtros simples de video.

>  El audio y el video no se transmitirán mediante la base de datos del lienzo.

>  La transmisión utilizará WebRTC mediante un servicio SFU administrado.

>  El servicio audiovisual administrará:

>  transmisión;

>  señalización;

>  conectividad;

>  reconexión;

>  adaptación de calidad;

> **[STICKY: Apple Music Cada usuario debe poder conectar su propia cuenta. Cada usuario debe poder reproducir música de forma independiente. El sistema debe mostrar qué escucha cada usuario. Un usuario debe poder seguir la reproducción de otro participante. El sistema debe impedir cadenas o ciclos de seguimiento. La búsqueda, biblioteca, favoritas y playlists deben ser privadas.]**

> Apple Music

>  Cada usuario debe poder conectar su propia cuenta.

>  Cada usuario debe poder reproducir música de forma independiente.

>  El sistema debe mostrar qué escucha cada usuario.

>  Un usuario debe poder seguir la reproducción de otro participante.

>  El sistema debe impedir cadenas o ciclos de seguimiento.

>  La búsqueda, biblioteca, favoritas y playlists deben ser privadas.

> **[STICKY: Lista de tareas El usuario debe poder crear varias listas. Debe poder agregar, editar, completar, reabrir, ordenar y eliminar tareas. Los cambios deben ser visibles para los demás participantes. Solo el propietario debe poder editar su lista.]**

>  El usuario debe poder crear varias listas.

>  Debe poder agregar, editar, completar, reabrir, ordenar y eliminar tareas.

>  Los cambios deben ser visibles para los demás participantes.

>  Solo el propietario debe poder editar su lista.

> **[STICKY: Texto enriquecido El usuario debe poder crear varias notas. El sistema debe generar títulos automáticos. Debe permitir formato básico, enlaces, colores y tamaños de texto. Debe limpiar el formato externo al pegar contenido. Debe guardar automáticamente. Debe impedir superar el límite de caracteres.]**

> Texto enriquecido

>  El usuario debe poder crear varias notas.

>  El sistema debe generar títulos automáticos.

>  Debe permitir formato básico, enlaces, colores y tamaños de texto.

>  Debe limpiar el formato externo al pegar contenido.

>  Debe guardar automáticamente.

>  Debe impedir superar el límite de caracteres.

> **[STICKY: Imágenes El usuario debe poder subir una imagen por operación. Debe poder arrastrarla o seleccionarla desde el dispositivo. La imagen debe conservar su proporción. Debe poder moverse, redimensionarse, minimizarse y eliminarse. El sistema debe limitar formatos, tamaño y cantidad de imágenes.]**

> Imágenes

>  El usuario debe poder subir una imagen por operación.

>  Debe poder arrastrarla o seleccionarla desde el dispositivo.

>  La imagen debe conservar su proporción.

>  Debe poder moverse, redimensionarse, minimizarse y eliminarse.

>  El sistema debe limitar formatos, tamaño y cantidad de imágenes.

> **[STICKY: Pizarra Todos los participantes deben poder dibujar. Debe permitir lápiz, marcador, resaltador y borrador. El sistema debe sincronizar los trazos en tiempo real. Cada usuario debe poder borrar sus propios trazos. El propietario debe poder limpiar toda la pizarra.]**

> Pizarra

>  Todos los participantes deben poder dibujar.

>  Debe permitir lápiz, marcador, resaltador y borrador.

>  El sistema debe sincronizar los trazos en tiempo real.

>  Cada usuario debe poder borrar sus propios trazos.

>  El propietario debe poder limpiar toda la pizarra.

Requerimientos No Funcionales

> **[STICKY: Portabilidad y compatibilidad La aplicación deberá funcionar en las dos últimas versiones estables de: Google Chrome; Microsoft Edge; Mozilla Firefox; Safari. Deberá ofrecer soporte para computadoras de escritorio, tablets y teléfonos celulares. La interfaz deberá adaptarse a diferentes tamaños, resoluciones y densidades de pantalla. La aplicación deberá admitir mouse, teclado y entrada táctil. Cuando una función no sea compatible con el navegador o dispositivo, el sistema deberá informar claramente al usuario. La incompatibilidad de una función secundaria no deberá impedir el acceso al resto del lienzo. No se garantizará compatibilidad con navegadores antiguos, desactualizados o integrados que no soporten las tecnologías requeridas.]**

> Portabilidad y compatibilidad

>  La aplicación deberá funcionar en las dos últimas versiones estables de:

>  Google Chrome;

>  Microsoft Edge;

>  Mozilla Firefox;

>  Safari.

>  Deberá ofrecer soporte para computadoras de escritorio, tablets y teléfonos celulares.

>  La interfaz deberá adaptarse a diferentes tamaños, resoluciones y densidades de pantalla.

>  La aplicación deberá admitir mouse, teclado y entrada táctil.

>  Cuando una función no sea compatible con el navegador o dispositivo, el sistema deberá informar claramente al usuario.

>  La incompatibilidad de una función secundaria no deberá impedir el acceso al resto del lienzo.

>  No se garantizará compatibilidad con navegadores antiguos, desactualizados o integrados que no soporten las tecnologías requeridas.

> **[STICKY: Rendimiento Las acciones realizadas por el usuario deberán reflejarse inmediatamente en su dispositivo. Los cambios compartidos deberán sincronizarse con una latencia suficientemente baja para mantener una experiencia fluida. El movimiento y redimensionamiento de ítems no deberá producir bloqueos o saltos importantes. La escritura, el dibujo y los cambios discretos deberán enviarse de forma agrupada para evitar tráfico innecesario. Las imágenes deberán optimizarse antes de almacenarse. Los módulos pesados deberán cargarse únicamente cuando sean necesarios. El progreso musical no deberá transmitirse de forma continua. La aplicación deberá reutilizar los recursos almacenados en caché cuando sea posible. La cantidad de elementos visibles no deberá degradar de forma significativa la interacción dentro de los límites establecidos.]**

> Rendimiento

>  Las acciones realizadas por el usuario deberán reflejarse inmediatamente en su dispositivo.

>  Los cambios compartidos deberán sincronizarse con una latencia suficientemente baja para mantener una experiencia fluida.

>  El movimiento y redimensionamiento de ítems no deberá producir bloqueos o saltos importantes.

>  La escritura, el dibujo y los cambios discretos deberán enviarse de forma agrupada para evitar tráfico innecesario.

>  Las imágenes deberán optimizarse antes de almacenarse.

>  Los módulos pesados deberán cargarse únicamente cuando sean necesarios.

>  El progreso musical no deberá transmitirse de forma continua.

>  La aplicación deberá reutilizar los recursos almacenados en caché cuando sea posible.

>  La cantidad de elementos visibles no deberá degradar de forma significativa la interacción dentro de los límites establecidos.

> **[STICKY: 4. Confiabilidad y comportamiento sin conexión Pérdida de conexión del usuario La aplicación deberá detectar la pérdida de conexión. El usuario deberá conservar temporalmente el último estado disponible del lienzo. Los cambios propios pendientes podrán mantenerse localmente hasta recuperar la conexión. La interfaz deberá indicar claramente que el usuario se encuentra sin conexión. Mientras no exista conexión, el usuario no recibirá cambios de otros participantes. Las funciones que dependan del servidor deberán quedar temporalmente inhabilitadas. Al restablecerse la conexión, el sistema deberá intentar recuperar la sincronización. Las actualizaciones antiguas no deberán sobrescribir estados más recientes. La aplicación no deberá presentarse como completamente operativa sin conexión, ya que sus funciones principales dependen del tiempo real. Backend no disponible Si el backend no responde antes de iniciar sesión, la aplicación deberá mostrar un mensaje de indisponibilidad y permitir reintentar. No deberá mostrarse una pantalla vacía ni un indicador de carga permanente. Si el backend deja de responder durante una sesión, el frontend deberá conservar el último estado recibido. Las acciones que requieran confirmación del servidor deberán bloquearse temporalmente. Los cambios locales pendientes deberán conservarse cuando sea posible. La aplicación deberá intentar reconectarse automáticamente. El usuario deberá disponer también de una opción manual para reintentar. La indisponibilidad del backend deberá comunicarse mediante un estado visible y comprensible. Fallos parciales El fallo de un módulo no deberá inutilizar toda la aplicación. Un error en Apple Music no deberá detener las cámaras, notas o tareas. Un error en una cámara no deberá cerrar el lienzo. Un fallo en una imagen no deberá afectar los demás ítems. Los errores deberán mostrarse únicamente en el módulo afectado cuando sea posible.]**

> 4. Confiabilidad y comportamiento sin conexión

> Pérdida de conexión del usuario

>  La aplicación deberá detectar la pérdida de conexión.

>  El usuario deberá conservar temporalmente el último estado disponible del lienzo.

>  Los cambios propios pendientes podrán mantenerse localmente hasta recuperar la conexión.

>  La interfaz deberá indicar claramente que el usuario se encuentra sin conexión.

>  Mientras no exista conexión, el usuario no recibirá cambios de otros participantes.

>  Las funciones que dependan del servidor deberán quedar temporalmente inhabilitadas.

>  Al restablecerse la conexión, el sistema deberá intentar recuperar la sincronización.

>  Las actualizaciones antiguas no deberán sobrescribir estados más recientes.

>  La aplicación no deberá presentarse como completamente operativa sin conexión, ya que sus funciones principales dependen del tiempo real.

> Backend no disponible

>  Si el backend no responde antes de iniciar sesión, la aplicación deberá mostrar un mensaje de indisponibilidad y permitir reintentar.

>  No deberá mostrarse una pantalla vacía ni un indicador de carga permanente.

>  Si el backend deja de responder durante una sesión, el frontend deberá conservar el último estado recibido.

>  Las acciones que requieran confirmación del servidor deberán bloquearse temporalmente.

>  Los cambios locales pendientes deberán conservarse cuando sea posible.

>  La aplicación deberá intentar reconectarse automáticamente.

>  El usuario deberá disponer también de una opción manual para reintentar.

>  La indisponibilidad del backend deberá comunicarse mediante un estado visible y comprensible.

> Fallos parciales

>  El fallo de un módulo no deberá inutilizar toda la aplicación.

>  Un error en Apple Music no deberá detener las cámaras, notas o tareas.

>  Un error en una cámara no deberá cerrar el lienzo.

>  Un fallo en una imagen no deberá afectar los demás ítems.

>  Los errores deberán mostrarse únicamente en el módulo afectado cuando sea posible.

> **[STICKY: 9. Requisitos para solucionar problemas de interfaz Registro de errores El sistema deberá registrar: errores no controlados; errores de renderizado; fallos de red; fallos de autenticación; fallos de sincronización; errores de carga de imágenes; fallos de cámara o micrófono; fallos de Apple Music; errores producidos al recuperar una sesión. Los registros no deberán incluir: contraseñas; tokens; credenciales; audio; video; contenido privado completo; bibliotecas musicales privadas. Aislamiento de errores Cada módulo importante deberá poder fallar de manera independiente. Un error en un ítem no deberá cerrar todo el lienzo. El sistema deberá presentar un estado alternativo cuando un componente no pueda mostrarse. El usuario deberá poder reintentar o cerrar el módulo afectado cuando corresponda. Mensajes para el usuario Los mensajes deberán explicar el problema con lenguaje sencillo. No deberán limitarse a mostrar códigos técnicos. Cuando sea posible, deberán ofrecer una acción de recuperación. Deberán indicar si los cambios se conservaron localmente. Deberán diferenciar entre error de red, servidor, permisos y servicio externo. Datos de diagnóstico El sistema deberá poder asociar cada incidencia con: identificador de sesión; identificador técnico del usuario; fecha y hora; versión del frontend; navegador y versión; sistema operativo; tipo de dispositivo; estado de conexión; módulo afectado; última operación enviada; última operación recibida; código o categoría del error. Información para reproducir una incidencia El proceso de soporte deberá permitir registrar: navegador y versión; dispositivo y sistema operativo; tamaño aproximado de pantalla; pasos realizados; resultado esperado; resultado obtenido; estado de conexión; módulo afectado; captura de pantalla o registro disponible; frecuencia con la que ocurre el problema.]**

> 9. Requisitos para solucionar problemas de interfaz

> Registro de errores

> El sistema deberá registrar:

>  errores no controlados;

>  errores de renderizado;

>  fallos de red;

>  fallos de autenticación;

>  fallos de sincronización;

>  errores de carga de imágenes;

>  fallos de cámara o micrófono;

>  fallos de Apple Music;

>  errores producidos al recuperar una sesión.

> Los registros no deberán incluir:

>  contraseñas;

>  tokens;

>  video;

>  contenido privado completo;

>  bibliotecas musicales privadas.

> Aislamiento de errores

>  Cada módulo importante deberá poder fallar de manera independiente.

>  Un error en un ítem no deberá cerrar todo el lienzo.

>  El sistema deberá presentar un estado alternativo cuando un componente no pueda mostrarse.

>  El usuario deberá poder reintentar o cerrar el módulo afectado cuando corresponda.

> Mensajes para el usuario

>  Los mensajes deberán explicar el problema con lenguaje sencillo.

>  No deberán limitarse a mostrar códigos técnicos.

>  Cuando sea posible, deberán ofrecer una acción de recuperación.

>  Deberán indicar si los cambios se conservaron localmente.

>  Deberán diferenciar entre error de red, servidor, permisos y servicio externo.

> Datos de diagnóstico

> El sistema deberá poder asociar cada incidencia con:

>  identificador de sesión;

>  identificador técnico del usuario;

>  fecha y hora;

>  versión del frontend;

>  navegador y versión;

>  sistema operativo;

>  tipo de dispositivo;

>  estado de conexión;

>  módulo afectado;

>  última operación enviada;

>  última operación recibida;

>  código o categoría del error.

> Información para reproducir una incidencia

> El proceso de soporte deberá permitir registrar:

>  dispositivo y sistema operativo;

>  tamaño aproximado de pantalla;

>  pasos realizados;

>  resultado esperado;

>  resultado obtenido;

>  captura de pantalla o registro disponible;

>  frecuencia con la que ocurre el problema.

> **[STICKY: 8. Accesibilidad — posiblemente Posiblemente, la aplicación deberá permitir recorrer los controles mediante teclado. Posiblemente, los controles deberán poder activarse con teclas estándar. Posiblemente, el foco de teclado deberá ser claramente visible. Posiblemente, los botones deberán tener nombres y descripciones comprensibles para lectores de pantalla. Posiblemente, los estados no deberán comunicarse únicamente mediante color. Posiblemente, la interfaz deberá mantener contraste suficiente entre texto y fondo. Posiblemente, las áreas táctiles deberán tener un tamaño adecuado. Posiblemente, el contenido deberá seguir siendo legible al aumentar el zoom del navegador. Posiblemente, la interfaz deberá respetar la preferencia de reducción de movimiento. Posiblemente, los sonidos y cambios de estado deberán acompañarse con información visual. Posiblemente, los mensajes de error deberán asociarse claramente con el elemento afectado. Posiblemente, se establecerá como objetivo un nivel equivalente a WCAG AA.]**

> 8. Accesibilidad — posiblemente

>  Posiblemente, la aplicación deberá permitir recorrer los controles mediante teclado.

>  Posiblemente, los controles deberán poder activarse con teclas estándar.

>  Posiblemente, el foco de teclado deberá ser claramente visible.

>  Posiblemente, los botones deberán tener nombres y descripciones comprensibles para lectores de pantalla.

>  Posiblemente, los estados no deberán comunicarse únicamente mediante color.

>  Posiblemente, la interfaz deberá mantener contraste suficiente entre texto y fondo.

>  Posiblemente, las áreas táctiles deberán tener un tamaño adecuado.

>  Posiblemente, el contenido deberá seguir siendo legible al aumentar el zoom del navegador.

>  Posiblemente, la interfaz deberá respetar la preferencia de reducción de movimiento.

>  Posiblemente, los sonidos y cambios de estado deberán acompañarse con información visual.

>  Posiblemente, los mensajes de error deberán asociarse claramente con el elemento afectado.

>  Posiblemente, se establecerá como objetivo un nivel equivalente a WCAG AA.

> **[STICKY: 5. Disponibilidad y recuperación La aplicación deberá recuperar el estado persistente después de una recarga o reconexión. La sesión del usuario deberá poder restablecerse después de actualizar la página, cuando continúe siendo válida. El propietario tendrá un periodo de reconexión de 30 segundos antes de finalizar la sesión compartida. La aplicación deberá distinguir entre desconexiones breves y abandonos definitivos. Las operaciones pendientes deberán mantenerse ordenadas mediante versiones o identificadores. Una actualización retrasada no deberá reemplazar información más reciente. El sistema deberá evitar duplicar ítems o acciones después de una reconexión. Los errores de recuperación deberán mostrarse de forma clara y permitir una acción posterior.]**

> 5. Disponibilidad y recuperación

>  La aplicación deberá recuperar el estado persistente después de una recarga o reconexión.

>  La sesión del usuario deberá poder restablecerse después de actualizar la página, cuando continúe siendo válida.

>  El propietario tendrá un periodo de reconexión de 30 segundos antes de finalizar la sesión compartida.

>  La aplicación deberá distinguir entre desconexiones breves y abandonos definitivos.

>  Las operaciones pendientes deberán mantenerse ordenadas mediante versiones o identificadores.

>  Una actualización retrasada no deberá reemplazar información más reciente.

>  El sistema deberá evitar duplicar ítems o acciones después de una reconexión.

>  Los errores de recuperación deberán mostrarse de forma clara y permitir una acción posterior.

> **[STICKY: 7. Usabilidad El usuario deberá ingresar directamente a su lienzo después de iniciar sesión. Las funciones principales deberán poder comprenderse sin capacitación previa. La interfaz deberá evitar paneles, opciones y pasos innecesarios. Los controles secundarios deberán mostrarse únicamente cuando sean necesarios. Las acciones destructivas deberán diferenciarse claramente de las acciones temporales. Los estados de carga, guardado, error, desconexión y reconexión deberán ser comprensibles. El sistema deberá mantener una apariencia coherente entre los distintos ítems. Los mensajes deberán explicar qué ocurrió y qué puede hacer el usuario. La aplicación deberá evitar interrumpir toda la experiencia por errores menores.]**

> 7. Usabilidad

>  El usuario deberá ingresar directamente a su lienzo después de iniciar sesión.

>  Las funciones principales deberán poder comprenderse sin capacitación previa.

>  La interfaz deberá evitar paneles, opciones y pasos innecesarios.

>  Los controles secundarios deberán mostrarse únicamente cuando sean necesarios.

>  Las acciones destructivas deberán diferenciarse claramente de las acciones temporales.

>  Los estados de carga, guardado, error, desconexión y reconexión deberán ser comprensibles.

>  El sistema deberá mantener una apariencia coherente entre los distintos ítems.

>  Los mensajes deberán explicar qué ocurrió y qué puede hacer el usuario.

>  La aplicación deberá evitar interrumpir toda la experiencia por errores menores.

> **[STICKY: 6. Seguridad y privacidad Solo los usuarios autenticados podrán acceder a la aplicación. Solo podrán entrar al lienzo los participantes con credenciales de acceso válidas. Un usuario no deberá modificar contenido que pertenezca a otro participante. Las autorizaciones y credenciales de servicios externos deberán mantenerse privadas. Las imágenes no deberán quedar disponibles mediante enlaces públicos permanentes. La aplicación no deberá almacenar ni grabar audio o video de las cámaras. La aplicación no deberá almacenar ni retransmitir el audio de Apple Music. Las búsquedas, playlists, favoritas, volumen y datos personales de Apple Music deberán permanecer privados. Los enlaces incluidos en notas deberán validarse antes de abrirse. Los registros de errores no deberán contener contraseñas, tokens, audio, video ni contenido privado completo. El sistema deberá limitar las acciones según la propiedad y los permisos definidos en las reglas de negocio.]**

> 6. Seguridad y privacidad

>  Solo los usuarios autenticados podrán acceder a la aplicación.

>  Solo podrán entrar al lienzo los participantes con credenciales de acceso válidas.

>  Un usuario no deberá modificar contenido que pertenezca a otro participante.

>  Las autorizaciones y credenciales de servicios externos deberán mantenerse privadas.

>  Las imágenes no deberán quedar disponibles mediante enlaces públicos permanentes.

>  La aplicación no deberá almacenar ni grabar audio o video de las cámaras.

>  La aplicación no deberá almacenar ni retransmitir el audio de Apple Music.

>  Las búsquedas, playlists, favoritas, volumen y datos personales de Apple Music deberán permanecer privados.

>  Los enlaces incluidos en notas deberán validarse antes de abrirse.

>  Los registros de errores no deberán contener contraseñas, tokens, audio, video ni contenido privado completo.

>  El sistema deberá limitar las acciones según la propiedad y los permisos definidos en las reglas de negocio.

> **[STICKY: Estado de conexión El sistema debe mostrar si el usuario está conectado, reconectando o sin conexión. El sistema debe intentar reconectarse automáticamente. El usuario debe poder iniciar un reintento manual. El sistema debe informar cuando una acción no pueda ejecutarse por falta de conexión.]**

> Estado de conexión

>  El sistema debe mostrar si el usuario está conectado, reconectando o sin conexión.

>  El sistema debe intentar reconectarse automáticamente.

>  El usuario debe poder iniciar un reintento manual.

>  El sistema debe informar cuando una acción no pueda ejecutarse por falta de conexión.

> **[STICKY: Cambios pendientes El sistema debe conservar temporalmente cambios propios que todavía no se hayan sincronizado. El sistema debe enviar los cambios pendientes cuando se restablezca la conexión. El sistema debe impedir que una versión antigua sobrescriba una más reciente.]**

> Cambios pendientes

>  El sistema debe conservar temporalmente cambios propios que todavía no se hayan sincronizado.

>  El sistema debe enviar los cambios pendientes cuando se restablezca la conexión.

>  El sistema debe impedir que una versión antigua sobrescriba una más reciente.

> **[STICKY: Backend no disponible El sistema debe mostrar una pantalla de indisponibilidad cuando no sea posible iniciar sesión. Durante una sesión, debe mantener visible el último estado disponible. Debe bloquear temporalmente las acciones que necesiten confirmación del servidor.]**

>  El sistema debe mostrar una pantalla de indisponibilidad cuando no sea posible iniciar sesión.

>  Durante una sesión, debe mantener visible el último estado disponible.

>  Debe bloquear temporalmente las acciones que necesiten confirmación del servidor.

> **[STICKY: Compatibilidad El sistema debe detectar cuando una función requerida no esté disponible. Debe informar al usuario qué función no puede utilizar. Debe permitir continuar con las demás funciones cuando sea posible.]**

> Compatibilidad

>  El sistema debe detectar cuando una función requerida no esté disponible.

>  Debe informar al usuario qué función no puede utilizar.

>  Debe permitir continuar con las demás funciones cuando sea posible.

> **[STICKY: Calidad de conexión El sistema debe adaptar la cámara cuando la conexión se degrade. Debe priorizar el audio sobre el video. Debe permitir que el lienzo continúe funcionando aunque el video se pause.]**

> Calidad de conexión

>  El sistema debe adaptar la cámara cuando la conexión se degrade.

>  Debe priorizar el audio sobre el video.

>  Debe permitir que el lienzo continúe funcionando aunque el video se pause.

Durante el siglo XX, especialmente desde las décadas de 1950 y 1960, surgió el llamado movimiento de los métodos de diseño.

Su intención era aplicar al diseño una racionalidad semejante a la de las ciencias y la ingeniería. Se buscaba descomponer los problemas,

identificar requisitos, comparar alternativas y justificar la solución seleccionada. El diseño comenzó a representarse como una secuencia

de análisis, síntesis y evaluación.

Sin embargo, pronto se reconoció que los problemas de diseño no se comportan exactamente como los problemas científicos. En ciencia, muchas veces se intenta explicar un fenómeno existente; en diseño, se intenta producir una situación que todavía no existe. Además, los problemas de diseño suelen ser abiertos: pueden tener varias soluciones válidas y su definición cambia mientras se trabaja sobre ellos.

Esta diferencia dio lugar a una crítica de los métodos excesivamente lineales. Autores como Herbert Simon entendieron el diseño como la transformación de situaciones existentes en situaciones preferidas. Donald Schön, por su parte, destacó que el diseñador no aplica mecánicamente reglas previamente definidas, sino que reflexiona mientras actúa. El proceso de diseño es una conversación con el problema: cada dibujo, prototipo o decisión revela información nueva y modifica la comprensión inicial.

De esta manera, el método en diseño no debe entenderse como una receta rígida. Es más apropiado verlo como una estructura de orientación. Permite organizar la incertidumbre, registrar decisiones, comparar posibilidades y evitar que todo dependa de impulsos momentáneos, pero debe admitir retrocesos, reformulaciones e iteraciones.

Desde una perspectiva filosófica, un método de diseño cumple al menos tres funciones:

Epistemológica: determina cómo se conoce el problema. Define qué se observa, qué información se considera relevante y cómo se interpreta.

Operativa: organiza las acciones necesarias para pasar de una situación inicial a una propuesta.

Crítica: permite revisar las decisiones, identificar errores y explicar por qué una solución se considera adecuada.

Por eso, elegir un método también implica adoptar una postura sobre el diseño. Un método centrado en datos considera que el problema puede comprenderse mediante información medible. Un método centrado en usuarios considera que la experiencia humana debe dirigir las decisiones. Un método experimental privilegia prototipos y pruebas. Un método participativo entiende que las personas afectadas deben intervenir en la construcción de la solución.

En el caso del diseño de una aplicación, el método permite pasar de una idea general —por ejemplo, “crear un espacio digital estético para trabajar acompañado”— a una estructura verificable:

comprender la intención del producto;

identificar usuarios y necesidades;

definir reglas de negocio;

establecer requerimientos;

modelar interacciones;

crear prototipos;

probarlos;

corregirlos;

implementar;

evaluar el funcionamiento real.

Lo importante es que estas etapas no necesariamente ocurren una sola vez ni en un orden absoluto. Es común volver de un prototipo a los requerimientos, modificar una regla después de una prueba o redefinir el problema durante el desarrollo.

En síntesis, el método surge históricamente como una forma de hacer el conocimiento y la práctica más conscientes, justificables y revisables. En diseño, no elimina la intuición ni la creatividad; las sitúa dentro de un proceso que permite comprenderlas, contrastarlas y convertirlas en decisiones comunicables. Un buen método no obliga a producir siempre el mismo resultado: ofrece una estructura para explorar problemas complejos sin perder dirección.

Cómo se observará el problema, cómo se tomarán decisiones y cómo se comprobarán los resultados, una manera de acercarse de manera consiente a una practica, observarla, medirla.

Método.

Lugar para compartir un espacio de trabajo en tiempo real, simple, estético, funcional.

Grecia.

Téchne no significaba solamente habilidad manual, sino un saber hacer sustentado en principios. Reconocimientos de causas, procedimientos y relaciones entre medios y fines. Sin embargo, gran parte de ese conocimiento permanecía vinculado a la experiencia del maestro y se transmitía mediante la práctica.

Francis Bacon defendió la observación sistemática y la experimentación como medios para construir conocimiento a partir de los hechos.

Francis Bacon Siglo XVII

Propuso dividir los problemas complejos en partes, avanzar desde lo simple hacia lo compuesto y revisar cuidadosamente el proceso. Se quería evitar que el conocimiento dependiera exclusivamente de la tradición, la autoridad o la intuición.

Rene Descartes Siglo XVII

Estas propuestas filosóficas fueron penetrando poco a poco las practicas humanas, se desarrollo el método científico, comenzó a entenderse como una estructura que permite formular preguntas, construir hipótesis, observar, experimentar, comparar y corregir. Su valor no consiste en garantizar automáticamente una verdad, sino en hacer que el proceso pueda explicarse, revisarse y repetirse. La ciencia moderna se apoya precisamente en esa posibilidad de someter las afirmaciones a comprobación y crítica.

Muy breve historia del método:

Modelado de datos lógico - conceptual

Start Here

* **[SHAPE]** Step 1

Decide what you are planning to do.

* **[SHAPE]** Step 2

Enter your inputs.

Instructions

* **[SHAPE]** Use the logical model template to show the flow during the planning, implementation and evaluation phases. Create your model to showcase the flow of activities and how they reach the final result.

Logical Model

* **[SHAPE]** Step 3

List out the activities of the program.

* **[SHAPE]** Step 4

List out the outputs of the program.

* **[SHAPE]** Step 5

List out the outcomes of the program.

* **[SHAPE]** Step 6

List out potential external factors of the program.

Navigation

Maker

Connectors

Shapes

Stickies

Shape keyboard shortcuts:

Press        to quickly select the marker tool

Press        to quickly select the connector tool

Elipsis

Zoom In

Hand Tool

Move Tool

Square

Zoom Out

Press        to quickly add a sticky

to the canvas

Widgets & More

Click         in the toolbar

to select Widgets, Stickers and More

+

H

V

O

-

R

M

x

S

New to FigJam?

> **[STICKY: Glosario: Usuario: cuenta registrada en la aplicación. Propietario: usuario dueño permanente de un lienzo. Lienzo: espacio personal y persistente del propietario. Sesión: periodo temporal durante el cual el lienzo está compartido. Presencia: participación temporal de un usuario en una sesión. Ítem: ventana colocada dentro del lienzo.]**

> Glosario:

> Usuario: cuenta registrada en la aplicación.

> Propietario: usuario dueño permanente de un lienzo.

> Lienzo: espacio personal y persistente del propietario.

> Sesión: periodo temporal durante el cual el lienzo está compartido.

> Presencia: participación temporal de un usuario en una sesión.

> Ítem: ventana colocada dentro del lienzo.

1. Alcance y glosario

2. Diagrama general de entidades

3. Relaciones y cardinalidades

4. Fichas de entidades

5. Objetos de valor

6. Diagramas de estados

7. Reglas e invariantes

8. Clasificación de datos

9. Eventos

10. Pendientes

User:

Canvas:

* [CONNECTOR] Participa mediante

Presencia:

Session:

* [CONNECTOR] Inicia

* [CONNECTOR] Pertenece

Item:

Stroke:

* [CONNECTOR] Crea

Las siguientes condiciones no se expresan completamente con las líneas del diagrama:

Cada usuario posee exactamente un lienzo personal.

Cada sesión pertenece a un único lienzo.

Un lienzo puede haber tenido varias sesiones, pero solo puede tener una sesión activa al mismo tiempo.

El propietario del lienzo también participa en la sesión mediante una presencia.

Cada ítem pertenece a un solo usuario y a un solo lienzo.

La propiedad de un ítem no puede transferirse.

Cada usuario puede tener como máximo un ítem de cámara y uno de música por lienzo.

Puede crear varias listas de tareas y varias notas enriquecidas.

Puede tener un máximo de diez ítems de imagen.

Cada tarea pertenece a una sola lista.

Cada trazo pertenece a un usuario y a un lienzo.

Cada imagen utiliza un único archivo almacenado y no puede reemplazarse.

Responsabilidad: Representar una cuenta registrada en la aplicación y conservar la identidad y los datos básicos del usuario.

* [CONNECTOR] Posee

1

...N

Métodos

Reglas generales para eventos y listeners

Respuesta directa para acciones simples.

Estado global o store para actualizar la SPA React.

Eventos de tiempo real a nivel backend para comunicar cambios a otros usuarios.

Eventos en dominios interno solo cuando varios módulos necesiten reaccionar a hechos importantes.

Eventos

¿Por qué esas estrategias de arquitectura?

qué problemas arquitectónicos tenía el proyecto;

qué principios seleccionaste;

qué decidiste no implementar;

cómo separaste las reglas de las tecnologías;

qué partes pueden cambiar sin afectar al núcleo;

cómo comprobaste que la estructura seguía siendo manejable.

Identifiqué dónde el desacoplamiento aportaba valor y dónde una abstracción solo aumentaba el costo.

Responsabilidad: Representar el espacio personal y persistente del usuario donde se almacenan los ítems y los trazos de la pizarra, y desde el cual se inicia una sesión compartida.

* [TABLE_CELL] Id

* [TABLE_CELL] CanvasId

* [TABLE_CELL] (Identificador único del lienzo)

* [TABLE_CELL] ownerId

* [TABLE_CELL] UserId

* [TABLE_CELL] Usuario propietario permanente.

* [TABLE_CELL] accessCredentials

* [TABLE_CELL] AccessCredentials

* [TABLE_CELL] Enlace y código vigentes para ingresar.

* [TABLE_CELL] accessVersion

* [TABLE_CELL] number

* [TABLE_CELL] Versión actual de las credenciales.

* [TABLE_CELL] drawingVersion

* [TABLE_CELL] Versión activa de la pizarra.

* [TABLE_CELL] createdAt

* [TABLE_CELL] DateTime

* [TABLE_CELL] Fecha de creación.

* [TABLE_CELL] updatedAt

* [TABLE_CELL] Última modificación persistente.

* [CONNECTOR] Contiene

* [TABLE_CELL] renewCanvasAccess()

* [TABLE_CELL] Genera nuevas credenciales e incrementa accessVersion.

* [TABLE_CELL] canStartSession()

* [TABLE_CELL] Comprueba que no exista otra sesión activa.

* [TABLE_CELL] clearCanvasDrawing()

* [TABLE_CELL] canvas.created

* [TABLE_CELL] se creó automáticamente el lienzo del usuario.

* [TABLE_CELL] canvas.accessRenewed

* [TABLE_CELL] el propietario renovó el enlace y el código.

* [TABLE_CELL] drawing.cleared

* [TABLE_CELL] el propietario limpió toda la pizarra.

Atributos

* [TABLE_CELL] id

* [TABLE_CELL] Identificador único de la cuenta

* [TABLE_CELL] email

* [TABLE_CELL] Email

* [TABLE_CELL] Correo utilizado para autenticación.

* [TABLE_CELL] emailVerified

* [TABLE_CELL] boolean

* [TABLE_CELL] Indica si el correo fue verificado.

* [TABLE_CELL] tagName

* [TABLE_CELL] string / null

* [TABLE_CELL] Nombre visible dentro de la aplicación.

* [TABLE_CELL] photoUrl

* [TABLE_CELL] Url / null

* [TABLE_CELL] Fotografía del perfil.

* [TABLE_CELL] isProfileComplete:

* [TABLE_CELL] Indica si el perfil cumple los datos requeridos.

* [TABLE_CELL] Fecha de creación de la cuenta.

* [TABLE_CELL] Fecha de la última actualización del perfil.

* [TABLE_CELL] completeProfile(tagName, photoUrl)

* [TABLE_CELL] registra los datos requeridos del perfil.

* [TABLE_CELL] updateProfile(tagName, photoUrl)

* [TABLE_CELL] modifica los datos visibles permitidos.

* [TABLE_CELL] canAccessCanvas()

* [TABLE_CELL] comprueba que el correo esté verificado y el perfil completo.

* [TABLE_CELL] auth.userRegistered

* [TABLE_CELL] el proveedor de autenticación creó la cuenta.

* [TABLE_CELL] auth.emailVerified

* [TABLE_CELL] el proveedor confirmó el correo.

* [TABLE_CELL] user.profileCompleted

* [TABLE_CELL] se completó el perfil por primera vez.

* [TABLE_CELL] user.profileUpdated

* [TABLE_CELL] se modificó el nombre visible o la fotografía.

Bounded Contexts (Contextos Delimitados)