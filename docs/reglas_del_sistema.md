# Especificación: Reglas del Sistema General, Reglas de Negocio y Requerimientos
## Proyecto: RealTime Interaction

---

## 1. Reglas del Sistema General

### 1.1. Naturaleza y Propiedad del Lienzo
* **1.1.1.** Solo podrán utilizar el sistema los usuarios con una cuenta verificada y un perfil completo.
* **1.1.2.** Cada usuario tendrá un único lienzo personal asociado permanentemente a su cuenta.
* **1.1.3.** El lienzo personal se creará automáticamente al completar el registro del usuario.
* **1.1.4.** Después de iniciar sesión, el usuario accederá directamente a su lienzo actual.
* **1.1.5.** La aplicación no manejará múltiples lienzos propios por usuario ni incluirá un panel de administración de salas.
* **1.1.6.** Cada lienzo tendrá un único propietario permanente.
* **1.1.7.** La propiedad del lienzo no podrá transferirse.
* **1.1.8.** No existirán propietarios temporales, hosts interinos ni roles administrativos adicionales.
* **1.1.9.** El lienzo no podrá eliminarse desde la aplicación.
* **1.1.10.** El lienzo será un espacio persistente compuesto por una pizarra compartida y diferentes ítems funcionales.
* **1.1.11.** La disponibilidad del lienzo será independiente de que su propietario esté conectado.
* **1.1.12.** Los usuarios autorizados podrán ingresar y continuar colaborando incluso si el propietario se desconecta, salvo expulsión o cierre explícito.

### 1.2. Pizarra y Herramientas de Dibujo
* **1.2.1.** La pizarra compartida soportará dibujo vectorial concurrente en tiempo real.
* **1.2.2.** Cada usuario podrá borrar únicamente sus propios trazos.
* **1.2.3.** El propietario del lienzo será el único con privilegios para limpiar la totalidad de la pizarra.
* **1.2.4.** Mientras una herramienta de dibujo o borrado esté activa en el cliente, los ítems flotantes no recibirán eventos del puntero para ese usuario (los arrastres se interpretarán como trazos sobre la pizarra).
* **1.2.5.** Para volver a interactuar con los ítems, el usuario deberá desactivar o alternar la herramienta de dibujo.
* **1.2.6.** La relación de superposición entre los ítems y la capa de dibujo respetará el orden Z compartido del lienzo.

---

## 2. Reglas de Negocio

### 2.1. Propiedad y Gestión de Ítems
* **2.1.1.** Los ítems pertenecerán exclusivamente al usuario que los creó dentro del lienzo.
* **2.1.2.** Ningún usuario podrá mover, redimensionar, configurar o eliminar ítems que pertenezcan a otro participante.
* **2.1.3.** Los ítems deberán permanecer recuperables y no podrán quedar completamente fuera del área interactuable del lienzo. Siempre deberá haber una zona visible y accesible para que su propietario pueda manipularlos.
* **2.1.4.** El redimensionamiento respetará los tamaños mínimos y máximos establecidos para cada tipo de ítem.

### 2.2. Orden Z y Superposición
* **2.2.1.** El orden Z forma parte del estado compartido y sincronizado del lienzo.
* **2.2.2.** Cuando un propietario interactúe con cualquiera de sus ítems o controles internos, este podrá pasar al frente.
* **2.2.3.** Solo el propietario de un ítem podrá modificar su orden Z.
* **2.2.4.** Todo cambio en el orden Z se sincronizará inmediatamente con el resto de participantes conectados.

### 2.3. Presencia, Ausencia y Estado de Ítems
* **2.3.1.** Los ítems persistentes permanecerán en el lienzo aunque su creador se desconecte temporalmente o cierre sesión.
* **2.3.2.** Cuando el creador de un ítem no esté conectado, sus ítems adoptarán una apariencia atenuada o inactiva, permaneciendo en modo solo lectura para los demás.
* **2.3.3.** Cuando el creador vuelva a conectarse, sus ítems recuperarán automáticamente su apariencia y estado interactivo activo.
* **2.3.4.** La desconexión del creador no alterará: posición, dimensiones, contenido, configuración, estado minimizado u orden Z.
* **2.3.5.** Excepción de cámara/streaming: los ítems de transmisión audiovisual en vivo finalizarán su transmisión y se ocultarán inmediatamente al desconectarse el usuario emisor.

### 2.4. Persistencia y Ciclo de Vida
* **2.4.1.** El estado persistente de los ítems y trazos se conservará en el almacenamiento central aunque no haya ningún usuario conectado al lienzo.
* **2.4.2.** Al reabrir el lienzo, se restaurará el último estado persistente conocido.
* **2.4.3.** La desconexión, cierre de sesión, pérdida de red o expulsión de un usuario no eliminará sus ítems persistentes.
* **2.4.4.** Minimizar un ítem no constituye una eliminación; conserva su estado y configuración.
* **2.4.5.** Solo el creador del ítem podrá eliminarlo de forma definitiva mediante la acción explícita de borrado (acción X).
* **2.4.6.** Un ítem eliminado no reaparecerá al reconectarse ni al recargar el lienzo.

### 2.5. Autoridad de Acceso y Sala
* **2.5.1.** El propietario del lienzo es la única entidad que puede compartir el acceso mediante enlace o código.
* **2.5.2.** El propietario del lienzo puede revocar o renovar las credenciales de acceso en cualquier momento.
* **2.5.3.** El propietario del lienzo puede expulsar participantes de forma inmediata.
* **2.5.4.** Si el propietario finaliza la sesión de forma definitiva, se cerrará la sala y se desconectará a los invitados.

---

## 3. Requerimientos Funcionales

### 3.1. Acceso y Usuarios
* **RF-01:** Permitir el registro e inicio de sesión de usuarios con verificación de cuenta.
* **RF-02:** Impedir el acceso al lienzo si el perfil del usuario no está completo.
* **RF-03:** Instanciar automáticamente un lienzo personal único en el primer acceso tras el registro.
* **RF-04:** Redirigir al usuario directamente a su lienzo personal al autenticarse.
* **RF-05:** Proveer mecanismo para compartir el lienzo mediante enlace directo o código alfanumérico.
* **RF-06:** Permitir al propietario renovar o invalidar códigos y enlaces de acceso.
* **RF-07:** Permitir al propietario expulsar a cualquier participante conectado en tiempo real.
* **RF-08:** Finalizar la sesión compartida y revocar accesos cuando el propietario cierre la sesión de forma explícita.

### 3.2. Lienzo Compartido y Colaboración
* **RF-09:** Mostrar en tiempo real la lista y posición de los participantes conectados (presencia y cursores).
* **RF-10:** Permitir la creación, traslación, redimensionamiento, minimización y eliminación de ítems según los permisos de su creador.
* **RF-11:** Sincronizar y conservar en tiempo real posición, tamaño, contenido y orden Z de los ítems.
* **RF-12:** Impedir técnicamente que un usuario modifique o manipule ítems que no le pertenecen.
* **RF-13:** Atenuar visualmente los ítems de usuarios desconectados y reactivarlos al reconectarse.
* **RF-14:** Dibujo vectorial colaborativo concurrente: múltiples usuarios pueden trazar simultáneamente sin colisiones de bloqueo.
* **RF-15:** Importar imágenes al lienzo pegando directamente desde el portapapeles (`Clipboard API`).
* **RF-16:** Importar imágenes al lienzo mediante URL externa pública.
* **RF-17:** Herramienta de borrado selectivo: cada usuario puede borrar sus propios trazos vectoriales.
* **RF-18:** Herramienta de borrado total: el propietario puede limpiar la totalidad de la pizarra en una sola acción.

### 3.3. Sincronización en Tiempo Real
* **RF-19:** Las modificaciones autorizadas de un ítem deben reflejarse localmente de inmediato (respuesta sin latencia percibida para el autor).
* **RF-20:** Durante el arrastre o redimensionamiento, las actualizaciones de posición deben transmitirse en ráfagas controladas (cada 40–60 ms) para evitar saturación de red.
* **RF-21:** Los demás clientes deben renderizar una transición suavizada entre las coordenadas recibidas sin alterar el estado persistente.
* **RF-22:** Al finalizar el movimiento o redimensionamiento, el cliente debe emitir de forma inmediata el estado final exacto para consolidar la persistencia.
* **RF-23:** Las acciones discretas (crear, borrar, minimizar, restaurar, cambiar orden Z) deben sincronizarse de forma inmediata con prioridad alta.

---

## 4. Requerimientos No Funcionales

### 4.1. Portabilidad y Compatibilidad
* **RNF-01:** La aplicación debe funcionar de forma homogénea en las dos últimas versiones estables de:
  * Google Chrome
  * Microsoft Edge
  * Mozilla Firefox
  * Safari
* **RNF-02:** Debe ofrecer soporte y diseño responsivo para computadoras de escritorio, tablets y teléfonos celulares.
* **RNF-03:** Debe admitir indistintamente interacción por mouse, teclado y pantallas táctiles (eventos multitáctiles).
* **RNF-04:** Cuando una función no sea compatible con el navegador o dispositivo, el sistema debe informar claramente al usuario.
* **RNF-05:** La incompatibilidad de una función secundaria no debe impedir el acceso ni romper el funcionamiento del resto del lienzo (degradación elegante).
* **RNF-06:** No se garantizará compatibilidad con navegadores desactualizados o webviews integrados que carezcan de soporte para WebSockets o Canvas moderno.

### 4.2. Rendimiento y Concurrencia
* **RNF-07:** La latencia de distribución de eventos de presencia y trazos debe ser inferior a 100 ms en condiciones normales de red.
* **RNF-08:** La tasa de refresco del renderizado local del canvas debe apuntar a 60 FPS estables durante el dibujo continuo.

### 4.3. Testabilidad
* **RNF-09:** La lógica principal del dominio (reglas de pertenencia, validación de permisos, orden Z y máquinas de estado) debe estar modularizada y desacoplada de la interfaz para permitir pruebas unitarias automatizadas.

### 4.4. Mantenibilidad
* **RNF-10:** El código debe seguir una arquitectura modular y legible, con contratos de datos fuertemente tipados y documentados.

### 4.5. Observabilidad
* **RNF-11:** El sistema debe registrar eventos relevantes (conexiones, desconexiones, expulsiones, errores de sincronización) para facilitar el monitoreo básico del estado de la aplicación.
