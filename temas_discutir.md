# Debate Técnico: Alcance Arquitectónico del Módulo 01 y Rebanadas Verticales

¡Esa es una observación de ARQUITECTO SENIOR! Tienes absolutamente toda la razón: el Módulo 01 NO es una feature pequeña. No es un botón de "dar like" ni un formulario de perfil.

Toca identidad, aprovisionamiento de sala, credenciales, membresías, validación de aforo, servidores de WebSockets y monitorización de latidos (heartbeats).

Entonces, ¿cómo encaja esto con la teoría de las Rebanadas Verticales? ¿Es una sola rebanada monstruosa? ¿Es un error llamarlo "rebanada"? Vamos a desmitificarlo.

---

## 1. La Analogía de la Construcción: Cimientos vs. Muebles

Cuando construyes un edificio residencial:
* Instalar un espejo en el baño o pintar una pared de azul es una feature pequeña (un acabado visual aislado).
* Pero las zapatas de hormigón armado, las columnas de carga, la acometida eléctrica principal y las tuberías de agua son el **SUSTRATO FUNDACIONAL**.

¿Toca muchas cosas el sustrato fundacional? ¡Por supuesto! Toca albañilería, fontanería, electricidad y cálculo estructural. Pero no puedes amueblar ni pintar una casa que no tiene suelo ni paredes.

El Módulo 01 es el **Sustrato Fundacional** de tu plataforma. Todo lo que construiremos después (la pizarra de dibujo, las ventanas de Apple Music, las listas de tareas, las cámaras de video) son los "muebles" que se apoyarán sobre este suelo.

---

## 2. Bounded Context vs. Rebanada Vertical (El Matiz Teórico)

En arquitectura de software, hay una jerarquía que muchos confunden:

* **Nivel 1: El Bounded Context (Contexto Delimitado en DDD):**
  * El Módulo 01 es un Bounded Context completo: **Room & Presence Engine** (Motor de Sala y Presencia).
  * Es el núcleo que gobierna las 4 entidades que diseñamos: `Usuario`, `LienzoSala`, `MembresiaLienzo` e `InvitacionSala`.

* **Nivel 2: Las Rebanadas Verticales Internas (Casos de Uso):**
  * Dentro de este gran Bounded Context del Módulo 01, NO creas un archivo gigante de 3,000 líneas.
  * Lo descompones en rebanadas funcionales atómicas (Vertical Slices) que comparten el mismo dominio:

```text
src/features/room-presence/
│
├── domain/                         ◄── DOMINIO DEL CONTEXTO (Puro, sin dependencias externas)
│   ├── room.types.ts               (Entidades: Room, Membership, Invitation)
│   ├── presence-state.machine.ts   (Máquina de estados: Online, Reconnecting, Offline)
│   └── capacity.guard.ts           (Invariante: aforo <= 10, prioridad de Host)
│
├── use-cases/                      ◄── REBANADAS VERTICALES INTERNAS (Casos de uso atómicos)
│   ├── provision-room.use-case.ts  (1:1 al registrar usuario)
│   ├── resolve-current-room.ts     (Determinar qué sala abrir al iniciar sesión)
│   ├── generate-invitation.ts      (Crear/renovar código de 6 caracteres y URL)
│   ├── redeem-invitation.ts        (Canjear código y crear membresía GUEST)
│   ├── handle-heartbeat.ts         (Ping cada 5s y ventana de gracia de 10s)
│   └── disconnect-participant.ts   (Salida voluntaria, kick o timeout)
│
├── adapters/                       ◄── INFRAESTRUCTURA (Conexión con el exterior)
│   ├── websocket-room.gateway.ts   (Manejo del socket, handshake y eventos WS)
│   └── room-db.repository.ts       (Persistencia en SQLite / Postgres)
│
└── index.ts                        ◄── FRONTERA PÚBLICA DEL MÓDULO
```

---

## 3. Por qué el Módulo 01 es MANEJABLE (El Poder de los Anti-Requisitos)

Aunque el Módulo 01 toca identidad, persistencia y WebSockets, es **ESTRUCTURALMENTE SEGURO Y MANEJABLE** gracias a lo que decidimos dejar FUERA:

Recuerda el escudo que construimos en [docs/modulo_01_nucleo_sala_presencia.md](file:///c:/Repos/RealTimeInteraction/docs/modulo_01_nucleo_sala_presencia.md) con los Anti-Requisitos:

* **ANTI-04:** Cero trazos de dibujo, cero notas, cero chat, cero música.
* **ANTI-01:** Cero eliminación de salas.
* **ANTI-02:** Cero dashboards de "Mis salas múltiples".
* **ANTI-03:** Cero roles intermedios complejos (solo `HOST` y `GUEST`).
* **ANTI-05:** Cero tareas de fondo cron para expiración de invitaciones.
* **ANTI-06:** Cero salas de espera complejas (lobbies).

Al haber eliminado toda esa grasa y complejidad prematura, el Módulo 01 se reduce a un problema matemático estricto:

> *"Un usuario autenticado entra a un lienzo, valida si hay cupo ($N \le 10$), abre un socket y el servidor le avisa a los demás si está conectado o ausente."*

---

## 4. La Trampa que DEBEMOS Evitar

Muchos desarrolladores cometen el error de separar esto en 4 paquetitos diminutos prematuros:
* `features/invitations/`
* `features/membership/`
* `features/presence/`
* `features/canvas/`

**¿Qué pasa si haces eso?** Creas un infierno de dependencias circulares: `presence` necesita a `membership`, `membership` necesita a `canvas`, y `canvas` necesita a `invitations`. Terminas con espagueti distribuido.

---

## La Conclusión Arquitectónica

El Módulo 01 es el **tronco del árbol**:

1. Se empaqueta junto en `src/features/room-presence/` porque sus entidades están fuertemente acopladas por naturaleza de negocio.
2. Se implementa ordenadamente a través de sus casos de uso atómicos.
3. Y una vez que este tronco esté en pie y testeado, todas las demás features (pizarra, música, ventanas) florecerán como ramas independientes (verdaderas rebanadas externas cargadas bajo demanda) sin tocar jamás el núcleo de presencia.
