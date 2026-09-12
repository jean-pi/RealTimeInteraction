![Gentle-AI](/banner.webp)

# Documentación de Gentle AI

Gentle AI equipa a los agentes de IA que ya usás con memoria persistente, desarrollo guiado por especificación, skills curadas, servidores MCP, ruteo de modelos, una persona orientada a la enseñanza y revisión nativa acotada.

Estable **v2.4.0**Última RC **v2.5.0-rc.1**Go **1.25.10+**Licencia **MIT**16 agentes soportados

**Lo primero que hay que entender**

Gentle AI **no instala agentes de IA**. Adapta los runtimes que ya están en tu máquina. Si seleccionás un agente que no está instalado, Gentle AI se niega y te muestra el comando exacto que tendrías que correr vos.

## Qué es Gentle AI

Es un **configurador de ecosistema**. Toma tu agente de IA y le agrega las piezas que le faltan para dejar de ser un chatbot que escribe código.

#### Antes

"Instalé Claude Code / OpenCode / Cursor, pero es solo un chatbot que escribe código."

#### Después

Tu agente ahora tiene memoria, skills, flujo de trabajo, herramientas MCP y una persona que además te enseña.

### La regla de oro

Gentle AI configura tu agente con memoria, skills, flujos y persona — y después se corre del camino. Según su propia documentación: *cuanto menos pienses en Gentle AI después de instalarlo, mejor está funcionando*.

| Hacé esto | No hagas esto |
| --- | --- |
| Correr el instalador y elegir agentes y preset | Editar a mano los archivos de configuración generados |
| Empezar a programar con tu agente | Memorizar fases o comandos de SDD |
| Dejar que el agente proponga SDD cuando la tarea lo amerita | Forzar SDD en cada tarea chica |
| Confiar en que Engram guarda contexto cuando está instalado y activo | Meterte en el almacenamiento de Engram salvo que necesites `engram sync` o `engram tui` |
| Dejar que los hooks de arranque o `sdd-init` refresquen el registro de skills | Reescanear skills a mano salvo que necesites `--force` |
| Decir "usá sdd" si ya sabés que querés planificación estructurada | Preocuparte por qué fase de SDD viene después |
| Volver a correr el instalador para actualizar o cambiar tu setup | Parchear a mano archivos de skills o instrucciones de persona |

## Instalación

### Requisitos previos

- **Git 2.38+** en todas las plataformas.
- **Go 1.25.10+** para compilar desde el código fuente (obligatorio en Windows, porque ahí se instala vía `go install`).
- **Node.js 18+ y npm**: `gentle-ai install` los verifica como requisito en toda plataforma y avisa con una sugerencia de instalación específica de tu distro si falta alguno. No los instala por vos.
- **macOS**: Homebrew en el PATH. Si el tap pide confianza, corré una vez `brew trust --formula gentleman-programming/tap/gentle-ai`.
- **Ubuntu/Debian, Arch, Fedora/RHEL**: el gestor de paquetes correspondiente (`apt-get`, `pacman`, `dnf`) y acceso `sudo`.
- **Pi**: si seleccionás el agente Pi, `pi` tiene que estar instalado y disponible en el `PATH`.

### macOS / Linux

```
curl -fsSL https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/main/scripts/install.sh | bash
```

### Homebrew

```
brew tap Gentleman-Programming/homebrew-tap
brew trust --formula gentleman-programming/tap/gentle-ai
brew install gentle-ai
```

### Go install (cualquier plataforma con Go 1.25.10+)

```
go install github.com/gentleman-programming/gentle-ai/v2/cmd/gentle-ai@latest
```

Fijate en el sufijo `/v2` en la ruta del módulo: Go lo exige para la versión mayor 2 en adelante. Los releases anteriores a `v2.0.0` usan la ruta sin sufijo.

**Windows**

La compilación desde fuente y los tests de CI/runtime siguen soportados, pero la distribución oficial de binarios de Windows y Scoop están temporalmente no disponibles. La instalación y las actualizaciones en Windows requieren Go 1.25.10+ y fallan de forma cerrada hacia la guía de instalación desde fuente: nunca descargan un ejecutable de Gentle AI sin firmar ni ejecutan un script remoto de actualización.

**Cambia en v2.5.0-rc.1**

La candidata publica un asset de release `windows_amd64.exe`. `arm64` sigue ausente, y el release estable `v2.4.0` no publica ningún asset de Windows — verificado contra los assets del release el 2026-08-26.

**Después de cambiar el binario, sincronizá**

Al reemplazar o actualizar el binario `gentle-ai`, corré `gentle-ai sync` para refrescar sus assets administrados. Los assets de revisión y runtime están atados a la versión del binario: hasta que `sync` tenga éxito, las operaciones del ciclo de revisión fallan de forma cerrada si falta la procedencia del escritor administrado o no coincide.

### Alcance de instalación

Por defecto, `gentle-ai install` escribe los archivos por agente en el directorio de configuración global de cada agente seleccionado. Para mantener el stack aislado a un solo proyecto:

```
gentle-ai install --scope=workspace
```

El alcance `workspace` aplica a los archivos por agente: prompts de sistema, skills, agentes SDD y archivos de persona se escriben en la raíz del proyecto actual cuando el agente soporta configuración local. Las integraciones que solo existen a nivel global — como instalación de paquetes o settings que el agente solo lee de su config global — siguen siendo globales por diseño. También se puede fijar con la variable de entorno `GENTLE_AI_INSTALL_SCOPE` para CI o uso no interactivo.

## Contexto del proyecto

Una vez configurados tus agentes, abrí el agente en un proyecto. Estos dos comandos registran el contexto del proyecto. **Ninguno es obligatorio** para el uso básico.

| Comando | Qué hace | Cuándo volver a correrlo |
| --- | --- | --- |
| `/sdd-init` | Detecta el stack y las capacidades de testing; activa Strict TDD si está disponible | Cuando el proyecto agrega o saca frameworks de test, o la primera vez en un proyecto nuevo |
| `gentle-ai skill-registry refresh` | Escanea skills instaladas y convenciones del proyecto, y construye el registro | Después de instalar o quitar skills, o la primera vez en un proyecto nuevo |

El orquestador de SDD corre `/sdd-init` automáticamente si no detecta contexto. Los hooks de arranque normalmente mantienen fresco el registro de skills en los agentes que soportan hooks — Codex, Claude Code, OpenCode y Pi a través de `gentle-pi`. Si arrancás Pi con `pi -ns`, se saltea la carga de skills y los hooks de inicio, así que ahí conviene refrescar el registro a mano.

En cualquier momento podés correr `gentle-ai doctor`, un chequeo de salud de solo lectura del ecosistema.

## Componentes, skills y presets

### Componentes

| Componente | ID | Descripción |
| --- | --- | --- |
| Engram | `engram` | Memoria persistente entre sesiones vía MCP: autodetección del nombre del proyecto, búsqueda de texto completo, sincronización con git y consolidación de proyectos |
| SDD | `sdd` | Flujo de desarrollo guiado por especificación (10 fases, incluida `sdd-onboard`). El agente lo maneja de forma orgánica cuando la tarea lo amerita, o cuando se lo pedís |
| Skills | `skills` | Biblioteca curada de skills |
| Context7 | `context7` | Servidor MCP con documentación en vivo de frameworks y librerías |
| Persona | `persona` | Inyección de la persona Gentleman/neutral administrada, o modo persona custom sin administrar |
| Permisos | `permissions` | Defaults y barreras de seguridad. Se aplica a Claude Code y OpenCode, los dos adaptadores con soporte de overlay de permisos |
| GGA | `gga` | Gentleman Guardian Angel: conmutador de proveedores de IA |
| Theme | `theme` | Overlay del tema Gentleman Kanagawa. v2.5.0-rc.1 instala los temas seleccionables **Gentleman** y **Gentleman-Cute** para Claude Code y OpenCode, sobre cuatro assets gestionados, preservando el tema activo, los ajustes no relacionados y los temas de terceros |

#### Lista de rutas sensibles denegadas por defecto

El componente de permisos aplica esta lista de negación:

```
~/.ssh/*            ~/.ssh/**/*        **/*.pem
**/*.key            **/.env*           ~/.credentials/*
~/.aws/credentials  ~/.config/gh/hosts.yml
~/Library/Keychains/*                  **/secrets/*
**/*.p12            **/*.pfx
```

**Comportamiento de GGA**

`gentle-ai install --component gga` instala el binario `gga` globalmente en tu máquina. **No** corre la configuración de hooks a nivel proyecto (`gga init` / `gga install`), porque esa debe ser una decisión explícita por repositorio.

### Presets

| Preset | ID | Qué incluye |
| --- | --- | --- |
| Dev Stack + Polish | `full-gentleman` | Todos los componentes (Engram + SDD + Skills + Context7 + GGA + Permisos + Theme) y todas las skills |
| Dev Stack | `ecosystem-only` | Componentes principales (Engram + SDD + Skills + Context7 + GGA) y todas las skills |
| Memory Only | `minimal` | Solo Engram y las skills de SDD |
| Custom | `custom` | Elegís componentes y skills a mano, y cualquier persona o setting existente queda sin administrar |

La persona se selecciona por separado en su propia pantalla y se aplica de forma independiente del preset.

---

## Engram — memoria persistente

Engram es la memoria persistente de tu agente. Guarda decisiones, descubrimientos, arreglos de bugs y contexto entre sesiones, **de forma automática**. El agente administra todo vía herramientas MCP.

**En el día a día no tenés que hacer nada**

El agente maneja la memoria solo. Los comandos existen para cuando querés inspeccionar, compartir o arreglar tus memorias a mano.

### Comandos del día a día

```
# Navegar memorias visualmente: buscar, filtrar, entrar a cada observación
engram tui

# Buscar desde la terminal sin abrir la TUI
engram search "refactor de auth"

# Exportar memorias del proyecto a .engram/ para commitearlas a git
engram sync
```

`engram tui` es la forma más rápida de ver qué viene guardando tu agente. Empezá por ahí.

### Gestión de proyectos

Engram agrupa memorias por nombre de proyecto, autodetectado desde tu remoto de git desde la v1.11.0. A veces un mismo proyecto termina con nombres duplicados ("my-app" vs "My-App" vs "my-app-frontend"). Estos comandos lo arreglan:

```
engram projects list          # Lista todos los proyectos con su conteo de observaciones
engram projects consolidate   # Fusiona nombres duplicados de forma interactiva
```

El equivalente MCP es `mem_merge_projects`, que el agente puede llamar directamente cuando detecta deriva de nombres.

### Cómo funciona la detección de proyecto

Desde la v1.11.0, Engram lee la URL del remoto de git al arrancar, la normaliza a minúsculas y la usa como nombre del proyecto. Si encuentra nombres existentes parecidos, te avisa. Esto previene el problema más común: que el mismo proyecto acumule memorias bajo variantes ligeramente distintas del nombre. Si trabajás fuera de un repo git, Engram usa el nombre del directorio.

### Compartir con el equipo

Las memorias de Engram viven localmente por defecto. Para compartirlas vía git:

```
# Después de una sesión de trabajo: exportá las memorias a .engram/ en tu repo
engram sync

# En otra máquina: importá las memorias después de clonar
engram sync --import
```

Agregá `.engram/` al repo y commiteálo. Cuando alguien del equipo clona y corre `engram sync --import`, obtiene el contexto completo del proyecto. Es especialmente útil para onboarding: quien recién entra arranca con el conocimiento acumulado del equipo.

### Herramientas MCP principales

| Herramienta | Qué hace |
| --- | --- |
| `mem_save` | Guarda una decisión, arreglo de bug, descubrimiento o convención. Desde Engram v1.15.3+ captura el prompt del usuario en modo best-effort cuando ya había contexto de prompt para el mismo proyecto/sesión |
| `mem_search` | Busca en memoria por palabras clave y devuelve las observaciones que coinciden |
| `mem_context` | Obtiene el historial reciente de sesión (se llama al inicio de sesión) |
| `mem_session_summary` | Guarda un resumen de fin de sesión para que la siguiente tenga contexto |
| `mem_get_observation` | Recupera el contenido completo sin truncar de una observación por ID |
| `mem_save_prompt` | Guarda el prompt del usuario y alimenta la actividad de sesión para que un `mem_save` posterior pueda capturarlo y deduplicarlo |

Las herramientas avanzadas — `mem_update`, `mem_suggest_topic_key`, `mem_session_start`/`mem_session_end`, `mem_stats`, `mem_delete`, `mem_timeline`, `mem_capture_passive` y `mem_merge_projects` — rara vez hacen falta, pero están disponibles.

**Sobre `capture_prompt`**

`mem_save` acepta el parámetro opcional `capture_prompt`. Dejalo sin definir para guardados humanos o proactivos normales. Usá `capture_prompt: false` solo para artefactos automatizados: reportes de propuesta, spec, diseño, tareas, apply, verify, archive e init de SDD; cachés de capacidades de testing; artefactos de onboarding o estado; o salida del registro de skills. Si el servidor MCP no tiene contexto de prompt, `mem_save` igual tiene éxito y no inventa texto.

## SDD — desarrollo guiado por especificación

SDD es un flujo de planificación estructurada para funcionalidades sustanciales. Tiene fases, pero **no necesitás aprender ninguna**.

#### Pedido chico

El agente lo hace y ya. Sin ceremonia.

#### Funcionalidad sustancial

El agente sugiere usar SDD para planificarla bien: explorar el código, proponer un enfoque, diseñar la arquitectura y después implementar paso a paso.

#### Querés SDD explícitamente

Decí "usá sdd" o "hazlo con sdd" y el agente arranca el flujo.

### Las diez fases

| Fase | Qué hace |
| --- | --- |
| `sdd-init` | Inicializa el contexto de SDD en un proyecto |
| `sdd-explore` | Investiga el código antes de comprometerse a un cambio |
| `sdd-propose` | Crea la propuesta de cambio con intención, alcance y enfoque |
| `sdd-spec` | Escribe las especificaciones con requerimientos y escenarios |
| `sdd-design` | Diseño técnico con decisiones de arquitectura |
| `sdd-tasks` | Descompone el cambio en tareas de implementación ordenadas |
| `sdd-apply` | Implementa las tareas siguiendo specs y diseño |
| `sdd-verify` | Valida que la implementación coincida con las specs |
| `sdd-archive` | Sincroniza las delta-specs con las specs principales y archiva |
| `sdd-onboard` | Recorrido guiado de punta a punta sobre el código real |

A eso se suma **Judgment Day** (`judgment-day`): revisión adversarial en paralelo donde dos jueces independientes revisan el mismo objetivo.

### Dónde viven los artefactos

Los artefactos de SDD pueden persistirse en tres modos:

- **Engram** — memoria entre sesiones.
- **OpenSpec** — archivos versionados en el repositorio.
- **Híbrido** — ambos.

### Sub-agentes: más inteligentes de lo que parecen

Cuando el orquestador delega trabajo a un sub-agente, ese sub-agente no es un ejecutor tonto corriendo un script. Es un agente completo, con su propia sesión, herramientas y contexto.

1. **El orquestador los mantiene enfocados.** Resuelve el registro de skills una vez, pasa las rutas relevantes de `SKILL.md` dentro del prompt de cada sub-agente y le da un rol concreto. Los sub-agentes leen los archivos de skill exactos en lugar de recibir resúmenes generados.
2. **Se adaptan a tu proyecto.** Un `sdd-apply` trabajando sobre React recibe patrones de React. El mismo sub-agente sobre Go recibe convenciones de testing de Go. Las reglas dependen del registro y del contexto de la tarea, no de una lista hardcodeada.
3. **Persisten artefactos de fase cuando el backend lo soporta.** En flujos SDD respaldados por Engram, los agentes de fase guardan artefactos antes de retornar. La fase siguiente puede continuar desde la propuesta, spec, diseño, tareas o progreso de apply guardados — incluso entre sesiones.

## SDD Research — la vía de evidencia

**Nuevo en v2.5.0-rc.1**

Esta vía no existe en `v2.4.0`, la línea estable actual. Las diez fases de arriba no cambian: la investigación se ofrece *junto a* ellas, nunca insertada entre ellas.

SDD tenía exploración local, pero ninguna vía de primera clase para evidencia externa auditable. La investigación se ofrece inmediatamente después de `sdd-explore`, y es opcional — pero seleccionarla vuelve obligatorios sus chequeos de admisión y persistencia.

```
flowchart TD
    A["sdd-explore"] --> B{"¿Seleccionar la vía de investigación?"}
    B -->|"no"| G["Propose"]
    B -->|"sí"| C["Declarar capacidad  
documentation / open-web"]
    C --> D["Recolectar fuentes  
claims - contradicciones - incertidumbre"]
    D --> E["Persistir el artefacto  
OpenSpec - Engram - ambos"]
    E --> F{"¿Evidencia done - store listo  
decisiones confirmadas?"}
    F -->|"no"| H["Bloqueado  
ningún claim validado"]
    H --> D
    F -->|"sí"| G
    G --> I["Spec - Design - Tasks"]

    style G fill:#2B3328,stroke:#98BB6C,color:#DCD7BA
    style H fill:#43242B,stroke:#D27E99,color:#DCD7BA
```

### Cómo se declara

En instalaciones que exponen el slash command, `/sdd-research <preguntas>` corre la vía después de que Session Preflight y `sdd-init` establecieron el cambio activo, las clases de fuente solicitadas, el artifact store y la declaración de capacidad del runtime.

La investigación acepta **únicamente** la declaración versionada `gentle-ai.sdd-research-capability/v1`, con un grant exacto para `documentation` u `open-web`. Nada más abre la vía.

### Qué persiste

Escribe un artefacto `gentle-ai.sdd-research/v1` que registra preguntas, grants, fuentes, mapeos de claim a fuente, contradicciones, incertidumbre, frescura y decisiones de producto separadas y no autoritativas.

| Store | Ubicación | Validación |
| --- | --- | --- |
| OpenSpec | `openspec/changes/{change-name}/research.md` | Valida el backend seleccionado |
| Engram | `sdd/{change-name}/research` | Valida el backend seleccionado |
| Híbrido | Ambos | Exige la misma revisión y los mismos bytes en ambos |

Una falla de un solo lado en modo híbrido se recupera solo desde la intención pre-escritura retenida y el contenido canónico. Si no, la investigación y la propuesta quedan bloqueadas — el sistema nunca prefiere una copia sobre la otra. Una investigación sin store no puede dejar lista una propuesta.

### La compuerta de la propuesta

Una vez seleccionada la investigación, `propose` exige evidencia en `done`, referencias válidas, un backend listo y decisiones de producto confirmadas. Esta es la parte que conviene internalizar: **elegir la vía es opcional, terminarla no**.

**Qué no produce un claim validado**

Bash, MCP genérico, acceso de persistencia, herramientas no declaradas, clases de fuente desconocidas, fuentes inválidas, evidencia parcial y admisión fallida. Ninguno crea un claim validado, y ninguno admite una propuesta.

---

## OpenSpec — `openspec/config.yaml`

`openspec/config.yaml` es una **convención documentada a nivel proyecto** para SDD cuando trabajás en modo de persistencia `openspec` o `hybrid`.

**Convención actual, no contrato estable**

El soporte hoy es principalmente impulsado por prompts. Las skills de SDD y los prompts del orquestador le dicen a los agentes que lean o escriban este archivo, y `sdd-init` muestra las formas que se espera que los agentes creen.

**Lo que NO es cierto hoy:** no hay un parser o validador del lado de Go que imponga un esquema canónico; no hay un contrato de compatibilidad fuerte que garantice que cada campo documentado se consuma de forma uniforme en todas las fases. La forma exacta se entiende mejor como la convención actual del repo, no como una especificación pública fija.

### Qué se puede personalizar

- Contexto del proyecto reutilizado entre fases.
- Activación de TDD estricto.
- Reglas específicas por fase para propuesta, specs, diseño, tareas, apply, verify y archive.
- Overrides de comandos y cobertura usados por los prompts de apply/verify.
- Caché de capacidades de testing detectadas para los flujos de apply/verify.

### Qué fases lo referencian

| Fase | Cómo usa la config |
| --- | --- |
| `sdd-init` | En modo OpenSpec, las instrucciones del prompt le indican al agente crear el archivo y escribir las secciones `context`, `rules` y `testing` detectadas |
| `sdd-explore` | Lo lee como parte del descubrimiento de contexto del proyecto |
| `sdd-propose` | Aplica `rules.proposal` si está presente |
| `sdd-design` | Aplica `rules.design` si está presente |
| `sdd-spec` | Aplica `rules.specs` si está presente |
| `sdd-tasks` | Aplica `rules.tasks` si está presente |
| `sdd-apply` | Lee `strict_tdd`, `testing` y `rules.apply` si están presentes |
| `sdd-verify` | Lee `strict_tdd`, `testing` y `rules.verify` si están presentes |
| `sdd-archive` | Aplica `rules.archive` si está presente |

### Ejemplo de estructura

Combinando el documento de convención compartida, la guía de `sdd-init` y las referencias de apply/verify, la estructura práctica de nivel superior se ve así:

```
schema: spec-driven

context: |
  Tech stack: ...
  Architecture: ...
  Testing: ...
  Style: ...

strict_tdd: true

rules:
  proposal:
    - Include rollback plan for risky changes
  specs:
    - Use Given/When/Then for scenarios
  design:
    - Document architecture decisions with rationale
  tasks:
    - Keep tasks completable in one session
  apply:
    - Follow existing code patterns
  verify:
    test_command: ""
    build_command: ""
    coverage_threshold: 0
  archive:
    - Warn before merging destructive deltas

testing:
  strict_tdd: true
  detected: "YYYY-MM-DD"
  runner:
    command: "go test ./..."
    framework: "Go standard testing"
```

Tomalo como una síntesis práctica de los campos que la capa de prompts puede leer o emitir hoy, no como una definición estricta de esquema.

### Inconsistencias conocidas

La forma del archivo todavía no es uniforme. En los ejemplos actuales:

- `sdd-init` muestra `rules.apply` y `rules.verify` como listas planas de instrucciones.
- El documento de convención compartida muestra `rules.apply` con `tdd` y `test_command`, y `rules.verify` con claves de override estructuradas.
- `sdd-apply/strict-tdd.md` se refiere a `rules.apply.test_command`.
- `sdd-verify` se refiere a `rules.verify.test_command`, `rules.verify.build_command` y `rules.verify.coverage_threshold`.

Es decir: `rules.apply` y `rules.verify` se tratan hoy como si pudieran contener claves estructuradas, mientras otros ejemplos muestran esas mismas reglas de fase como listas planas.

## Strict TDD

El modo TDD estricto se activa cuando el proyecto tiene soporte de testing detectable.

- `/sdd-init` detecta las capacidades de testing del proyecto y activa Strict TDD si están disponibles.
- Cuando Strict TDD está activo, **`sdd-apply` trabaja test-first**.
- **`sdd-verify` audita la evidencia RED/GREEN** y corre la verificación.
- El flag `strict_tdd` en `openspec/config.yaml` lo habilita o deshabilita; lo referencian `sdd-init`, los prompts del orquestador, `sdd-apply` y `sdd-verify`.
- La sección `testing` cachea las capacidades detectadas para que las fases no tengan que redescubrirlas cada vez.
- También se puede activar al sincronizar con `gentle-ai sync --strict-tdd`.

En Pi, los assets de soporte viven en `.pi/gentle-ai/support/strict-tdd.md` y `.pi/gentle-ai/support/strict-tdd-verify.md`.

## Skills y registro de skills

### Dos capas de skills

Gentle AI instala **skills de SDD** y **skills de base** (flujo de trabajo, patrones de testing) directamente en el directorio de skills de tu agente. Están embebidas en el binario y siempre actualizadas. Son 22 archivos de skill.

Para **skills de código** — React 19, Angular, TypeScript, Tailwind 4, Zod 4, Playwright, etc. — la comunidad mantiene un repositorio aparte: [Gentleman-Programming/Gentleman-Skills](https://github.com/Gentleman-Programming/Gentleman-Skills). Esas se instalan a mano:

```
git clone https://github.com/Gentleman-Programming/Gentleman-Skills.git
cp -r Gentleman-Skills/curated/react-19 ~/.claude/skills/
cp -r Gentleman-Skills/curated/typescript ~/.claude/skills/
# ... o copiá el directorio curated/ completo
```

Una vez instaladas, el agente detecta sobre qué estás trabajando y carga las skills relevantes automáticamente. No hace falta activarlas ni invocarlas.

#### Skills de base incluidas

| Skill | ID | Descripción |
| --- | --- | --- |
| Go Testing | `go-testing` | Patrones de testing en Go, incluido testing de TUIs Bubbletea |
| Skill Creator | `skill-creator` | Crear skills nuevas siguiendo la especificación Agent Skills |
| Skill Improver | `skill-improver` | Auditar y mejorar skills existentes contra la guía de estilo del repo |
| Branch & PR | `branch-pr` | Flujo de creación de PRs con commits convencionales, nombres de rama y regla issue-first |
| Issue Creation | `issue-creation` | Flujo de creación de issues con plantillas de bug y feature request |
| Skill Registry | `skill-registry` | Construir un índice de skills instaladas con triggers, alcances y rutas exactas de `SKILL.md` |
| Chained PR | `chained-pr` | Planificar y crear PRs encadenados y revisables |
| Cognitive Doc Design | `cognitive-doc-design` | Escribir documentación que reduce la carga cognitiva de revisión y onboarding |
| Comment Writer | `comment-writer` | Redactar comentarios de colaboración y respuestas de revisión, cálidos y directos |
| Work Unit Commits | `work-unit-commits` | Dividir la implementación en unidades de trabajo revisables |
| RDD Defect Workflow | `rdd-defect-workflow` | Guiar el trabajo sobre defectos de RDD con evidencia veraz y límites de autoridad claros |

### El registro de skills

El registro es un **índice local del proyecto** que permite que todos los agentes soportados encuentren las mismas skills sin reescribirlas. Guarda nombres, descripciones completas, alcances y rutas exactas de `SKILL.md`.

```
gentle-ai skill-registry refresh
# Solo si necesitás explícitamente volver a escanear todo:
gentle-ai skill-registry refresh --force
gentle-ai skill-registry refresh --cwd /ruta/al/proyecto --quiet
```

#### Flujo de refresco

```
gentle-ai skill-registry refresh
   │
   ├─ Escanea primero las raíces de skills del proyecto
   │     skills/, .opencode/skills/, .claude/skills/, .github/skills/, ...
   │
   ├─ Escanea después las raíces globales del agente
   │     ~/.config/opencode/skills/, ~/.claude/skills/, ...
   │
   ├─ Deduplica por nombre de skill
   │     la skill del proyecto gana sobre la global
   │
   ├─ Parsea el frontmatter
   │     name + description completa + path + scope
   │
   └─ Escribe .atl/skill-registry.md + caché
```

#### Flujo en runtime

```
Tarea del usuario
   │
   ▼
El orquestador lee .atl/skill-registry.md
   │
   ▼
Compara tarea + contexto de archivos contra las descripciones completas
   │
   ▼
Pasa las rutas exactas de SKILL.md al sub-agente
   │
   ▼
El sub-agente lee las skills completas antes de trabajar
   │
   ▼
El sub-agente ejecuta con la intención original de la skill intacta
```

#### Contrato del registro

| Campo | Significado |
| --- | --- |
| `Skill` | El `name` del frontmatter, o el nombre del directorio como respaldo |
| `Trigger / description` | La `description` completa, incluidas descripciones YAML multilínea plegadas |
| `Scope` | `project` o `user` |
| `Path` | El archivo `SKILL.md` exacto a cargar |

**Por qué un índice y no reglas compactas**

Los resúmenes compactos eran más baratos por delegación, pero podían distorsionar las skills. El diseño index-first gasta tokens solo cuando un sub-agente realmente necesita una skill, y preserva el contrato completo de runtime.

#### Skills excluidas

El registro nunca indexa `_shared`, `skill-registry`, ni ninguna skill `sdd-*`. Las dos primeras son plomería interna; las `sdd-*` las administra el flujo de SDD, no el delegador. La exclusión es intencional y silenciosa, así que una skill de usuario cuyo nombre colisione con estos prefijos se descarta sin aviso.

#### Inspeccionar sin escribir

```
gentle-ai skill-registry list          # name<TAB>scope<TAB>path
gentle-ai skill-registry list --json   # legible por máquina, incluye descripciones
```

La caché usa un fingerprint que incluye la versión de esquema más la ruta, mtime y tamaño de cada `SKILL.md` descubierto, así que un arranque normal es un cache-hit barato cuando las skills no cambiaron.

## Personas

| Persona | ID | Descripción |
| --- | --- | --- |
| Gentleman | `gentleman` | Persona mentora orientada a la enseñanza: cuestiona las malas prácticas y explica el porqué |
| Neutral | `neutral` | Mismo maestro, misma filosofía, sin lenguaje regional: cálido y profesional |
| Custom | `custom` | Mantiene tu persona o config existente sin administrar: Gentle AI no inyecta ninguna persona |

`custom` es una elección de compatibilidad y propiedad, no un editor de personas. Usalo cuando ya tenés tus propias instrucciones de persona y querés que Gentle AI las deje en paz.

---

## Ruteo orgánico de implementación

Pedí el resultado. Gentle AI mantiene inline el trabajo ya comprendido, delega solo las acciones que se benefician de contexto fresco, y ofrece SDD únicamente cuando la planificación durable reduce la incertidumbre de forma material.

**Cada cambio toma exactamente una ruta**

El conteo de archivos, las líneas cambiadas, el tamaño o el riesgo percibido **nunca** seleccionan SDD por sí solos. Solo lo hace un pedido explícito o una propuesta aceptada.

### Las tres rutas

| Ruta | Cuándo se usa | Qué pasa |
| --- | --- | --- |
| **Directa inline** | Decidir o verificar requiere **1 a 3 archivos**; o el cambio es **un archivo mecánico ya comprendido**, sin investigación ni decisiones de diseño pendientes | La acción acotada se mantiene inline |
| **Delegada directa** | Entender requiere **4 o más archivos**; la lectura prepara una escritura; hace falta investigación amplia; o hay que escribir **2 o más archivos no triviales** | Se delega la exploración acotada y/o un solo escritor para esa acción |
| **SDD opcional** | El trabajo tiene ambigüedad sustancial, o artefactos durables de propuesta, spec, diseño o tareas reducirían la incertidumbre de forma material | Se propone SDD. Se selecciona solo tras un pedido explícito o una propuesta aceptada |

Los conteos de archivos describen el **contexto necesario para la acción actual**, no un puntaje de riesgo ni un umbral de SDD. El riesgo puede fortalecer la verificación nativa o la revisión, pero nunca fuerza SDD.

La delegación también aplica por acción: tests, builds, instalaciones y actores nativos de revisión pueden usar workers frescos sin cambiar la ruta de implementación ni crear una corrida de SDD. El trabajo directo y el delegado no crean artefactos de SDD, intentos de fase ni ciclos SDD sintéticos.

Si un trabajo aparentemente simple revela ambigüedad sustancial, Gentle AI puede ofrecer SDD en el siguiente límite seguro. Rechazarlo lleva a un alcance reducido de forma segura, a una ruta directa o delegada justificada, o a **Necesita tu decisión** — nunca a una inscripción silenciosa en SDD.

## Reglas de parada de la delegación

El orquestador debe dejar de actuar como ejecutor monolítico cuando aparece complejidad:

| Regla | Disparador |
| --- | --- |
| **Regla de 4 archivos** | Leer 4 o más archivos para entender un flujo implica delegar la exploración o correr una fase de exploración |
| **Regla de escritura multiarchivo** | Tocar 2 o más archivos no triviales implica usar un solo escritor, o exigir revisión fresca antes de completar |
| **Regla de PR** | La revisión puede aportar evidencia fresca para un commit, push o PR, pero nunca autoriza la entrega |
| **Regla de incidente** | Después de un cwd equivocado, un accidente de worktree/git, una recuperación de merge, un comando de test confuso o un workaround del entorno: correr una auditoría fresca antes de continuar |
| **Regla de sesión larga** | Después de unas 20 llamadas a herramientas, 5 lecturas exploratorias o 2 ediciones no mecánicas con complejidad creciente: pausar y delegar, replanificar, o justificar por qué no |
| **Regla de revisión fresca** | Usar contexto fresco para revisión adversarial de diffs, conflictos, preparación de PR e incidentes, cuando la plataforma del agente lo soporta |

## Estados públicos

La interacción normal reporta solo cuatro estados. El usuario no elige internos de revisión, hashes, receipts ni transiciones de ciclo de vida.

**Cambia en v2.5.0-rc.1**

La proyección de estado de SDD pasa a ser el contrato limpio `gentle-ai.sdd-status/v2`. El estado de runtime conserva la verdad de planificación, tareas, verificación, selected-untracked e intentos, y ya no proyecta bindings de revisión activos ni receipts. Los registros históricos de runtime que contienen `binding`, `receipt` o `binding/set` rechazan en lugar de reproducirse.

| Estado | Significado |
| --- | --- |
| **Working** trabajando | La implementación todavía puede cambiar |
| **Checking** verificando | Gentle AI está ejecutando la prueba funcional aplicable y la revisión acotada |
| **Ready** listo | El candidato exacto tiene evidencia suficiente para la ruta de entrega seleccionada |
| **Needs your decision** necesita tu decisión | La convergencia automática segura es imposible; Gentle AI presenta la causa, el impacto y opciones concretas |

Una pregunta es necesaria solo cuando la respuesta cambia el alcance pedido, el impacto destructivo o irreversible, la exposición de permisos o seguridad, el costo de verificación o efectos secundarios externos, el riesgo residual aceptado, o la entrega.

---

## RDD — Receipt-Driven Development

RDD revisa un candidato terminado **sin apropiarse de la entrega**. Es deliberadamente chico: el código nativo congela un candidato de worktree, coordina la revisión acotada, quema la autoridad completada y devuelve el control al humano.

### El modelo en tres frases

#### La revisión sigue al trabajo

El candidato existe antes de que empiece la revisión. El padre le pide a STATUS nativo que haga preflight solo del worktree actual.

#### Lo nativo es dueño de la mecánica

Go deriva riesgo, árboles congelados, lentes, bindings del proveedor, admisión, refutación, una corrección acotada, evidencia del repositorio y validación dirigida.

#### El humano es dueño de la entrega

La aprobación nunca commitea, pushea, abre un PR ni sobrescribe la política del repositorio.

**El interruptor es un interruptor, y arranca apagado**

RDD es **opt-in**. Hasta que alguien corra `gentle-ai review mode enable --scope global`, no gobierna el candidato. Nada bloquea ni condiciona la entrega: aplica la política ordinaria del repositorio. Activar RDD revalida el candidato actual en lugar de retomar obligaciones viejas.

## Prender y apagar RDD

```
gentle-ai review mode status --cwd <repo>
gentle-ai review mode enable --scope global --cwd <repo>
gentle-ai review mode disable --cwd <repo>
gentle-ai review mode disable --scope clone --cwd <repo>
gentle-ai review mode enable  --scope clone --cwd <repo>
```

| Comando | Efecto |
| --- | --- |
| `review mode status` | Reporta la fuente global, la fuente local del clon, la fuente que decide y el modo efectivo — sin mutar nada |
| `review mode enable --scope global` | Activa RDD globalmente para candidatos futuros. **Es el único comando que lo prende** |
| `review mode disable` | Desactiva RDD globalmente |
| `review mode disable --scope clone` | Lo desactiva solo para este clon; ningún otro clon hereda el override |
| `review mode enable --scope clone` | Limpia el override de apagado de este clon. **No lo prende por sí solo** |

**Cualquier fuente en estado desactivado gana.** Un clon puede optar por salirse, pero no puede exigirle revisión al usuario, así que el alcance global es la única forma de entrar. Sin ninguna fuente expresando una opinión, el modo efectivo es `off`, reportado como decidido por `default`.

Los arranques interactivos preguntan antes del trabajo de revisión, una vez por clon. Aceptar registra esa elección; **"ahora no" aplica solo a ese candidato y no cambia el modo de revisión**. Los arranques no interactivos de tier-1/tier-2 proceden sin preguntar y reportan cómo desactivar el modo de revisión.

Mientras RDD está desactivado, el trabajo continúa por ruteo directo inline, delegado directo o SDD opcional, sin iniciar, reintentar ni reactivar la revisión por cuenta propia. Los gates nativos de entrega reportan `disabled/unmanaged` cuando no aplica ningún receipt exacto, y **nunca fabrican una aprobación**.

## El ciclo atómico

```
STATUS sin selector → START exacto → colección/finalize acotados → aprobado + quema → política ordinaria del repositorio
```

**Cambia en v2.5.0-rc.1**

La candidata cierra la revisión en su último evento causal. Un resultado terminal de reviewer, refuter, validator, plan de corrección o zero-lens cierra la transacción y quema su linaje directamente: no hay un paso FINALIZE separado, ni publicación de receipt compacto, ni gate de entrega posterior. El ciclo que se describe abajo es el que corre en `v2.4.0`, la línea estable actual.

### 1. STATUS sin selector solo hace preflight

STATUS sin selector evalúa **únicamente el candidato del worktree actual** y renderiza una invocación START exacta. **No** descubre autoridad ambiente, no retoma otro worktree, no recupera historia ni selecciona un linaje viejo. El padre corre solo la `next_transition` devuelta y sus tokens ordenados.

```
gentle-ai review status \
  --cwd <repo> \
  --contract gentle-ai.review-integration/v2 \
  --agent claude-code \
  --next-transition
```

Esto evita que una autoridad histórica, un worktree hermano o una respuesta de ciclo de vida obsoleta dirijan el candidato actual.

### 2. START congela una transacción independiente

START congela el candidato en una transacción compacta, explícitamente atada a su linaje, worktree y objetivo. Selecciona riesgo y lentes de forma nativa. El padre captura los tokens de **lineage, revision y target** devueltos.

Un replay exacto de un START activo puede devolver `replayed`. Un START genuinamente nuevo es independiente. Un linaje quemado nunca se reutiliza.

### 3. Las llamadas atadas manejan la transacción

Cada STATUS, `review capture-result` y FINALIZE posterior lleva esos tokens exactos. El padre rutea únicamente desde la `next_transition` devuelta:

**Cambia en v2.5.0-rc.1**

FINALIZE deja de ser una de las llamadas atadas. STATUS y `review capture-result` siguen llevando los tokens exactos; la captura terminal cierra la transacción por sí misma.

| Transición | Acción del padre |
| --- | --- |
| `execute` | Corre la operación exacta y los argumentos ordenados, sin cambios |
| `collect` | Provee solo el input nombrado a través de su operación de captura exacta, y después vuelve a consultar STATUS |
| `stop` | No corre ninguna operación de ciclo de vida. No infiere una recuperación a partir del texto |

Un *forecast* es descriptivo, no una ruta. Se relata completo, pero se ejecuta solo `next_transition`.

### 4. La aprobación quema la autoridad

Al tener éxito, el código nativo lee de vuelta la aprobación terminal y después **quema** el linaje exacto y sus artefactos antes de devolver `approved`. No sobrevive ningún receipt terminal, tombstone, testigo, espejo ni autoridad de entrega. Otros linajes y worktrees quedan intactos.

**Un FINALIZE no limpio no es una aprobación**

Esto incluye salida malformada o vacía, falla de transporte, ambigüedad post-mutación, y el caso en que la autoridad terminal ya pueda estar commiteada. El padre conserva el linaje, revisión y objetivo exactos, consulta STATUS atado una vez, y sigue solo la acción devuelta. Nunca cae en recuperación ambiente ni inventa otro linaje.

**Cambia en v2.5.0-rc.1**

Sin paso FINALIZE, esta forma de falla desaparece. El mismo cuidado se aplica a la captura terminal: un resultado malformado, incompleto o no disponible nunca quema autoridad, y el padre emite un único STATUS atado al objetivo en lugar de inventar un linaje.

### Continuidad entre repositorios

Una sesión con raíz en el repositorio A puede revisar un objetivo anidado — explícitamente autorizado por el usuario — en un repositorio B no relacionado. Go resuelve la ruta pedida a la raíz canónica de worktree de B; los adaptadores permanecen opacos y nunca parsean autorización ni raíces.

| Regla | Contrato |
| --- | --- |
| Raíz del ciclo de vida | Una vez seleccionado B, el host mantiene B canónico desde STATUS hasta consentimiento, colección, corrección, validación, FINALIZE y quema. A nunca es un respaldo |
| Comandos | Se corren los tokens emitidos por el proveedor sin cambios. Si un comando omite `--cwd`, se corre con el cwd de proceso B |
| Captura opaca | `repository_context` puede materializarse o capturarse desde otro cwd de proceso, pero permanece atado a B |
| Aislamiento | Un texto de linaje idéntico en A y B nombra transacciones independientes. La aprobación quema solo B; A queda intacto |
| Entrega | La política ordinaria del repositorio y cualquier autorización explícita de entrega nombran a B |

Este ciclo de vida está disponible únicamente para **Claude Code, Codex, OpenCode y Pi**. Los runtimes no soportados fallan antes de cualquier mutación de repositorio o autoridad.

## Riesgo y lentes

START clasifica el riesgo una sola vez a partir de evidencia del repositorio y lo **congela**. Una corrección no puede recalcular el riesgo hacia abajo para escapar de la revisión, ni hacia arriba para fabricar más trabajo.

| Riesgo | Lentes seleccionadas | Comportamiento |
| --- | --- | --- |
| **Bajo** | 0 lentes | Lectura estructural de vuelta. Silenciosa, sin pregunta de consentimiento |
| **Estándar** | 1 lente de foco | Un pase enfocado, con consentimiento |
| **Alto** | 4R canónicas | Riesgo, Resiliencia, Legibilidad y Confiabilidad, con consentimiento y forecast de costo |

Esa forma de 0, 1 o 4 es **control estructural de costos**. Un cambio de solo documentación no debería pagar cuatro llamadas amplias al modelo. Un cambio de código normal se beneficia de un pase enfocado. Autenticación, pagos, tokens de servicio, rutas sensibles a seguridad o un cambio grande merecen cuatro perspectivas independientes.

### Las lentes son de solo lectura

Cada lente seleccionada es de solo lectura y está separada de la autoría. Lee el candidato, juzga una preocupación, emite un resultado JSON estricto y para. **Ninguna lente edita archivos, genera un corrector ni avanza el estado del ciclo de vida.** Como dice el Capítulo 21: *el jurado no es el contratista*.

Los revisores reciben contexto inmutable emitido por el proveedor, no estado vivo del workspace. Inspeccionan solo los árboles inmutables atados por el proveedor: nunca el worktree vivo, el índice, el `HEAD` ni otra revisión. Los bytes del candidato no deben pasar por `/tmp`, un archivo scratch del repositorio ni `GENTLE_AI_FROZEN_CANDIDATE_CONTEXT`.

### La forma de un resultado de revisor

```
{
  "findings": [
    {
      "location": "internal/auth/token.go:84",
      "severity": "CRITICAL",
      "claim": "the candidate accepts an expired service token",
      "proof_refs": [
        "TestExpiredToken passes on base and fails on candidate"
      ],
      "evidence_class": "deterministic",
      "causal_disposition": "introduced"
    }
  ],
  "evidence": [
    "inspected the complete candidate diff and ran the focused differential test"
  ]
}
```

La omisión es deliberada: **sin ID de finding, sin nombre de lente, sin hash, sin metadata de linaje**. El facade ya sabe qué resultado de lente llegó en qué posición seleccionada. Go completa los IDs faltantes, canonicaliza el orden, valida la prueba requerida y rechaza campos desconocidos. Un modelo es bueno para afirmaciones y evidencia; es una pésima elección para construir bytes canónicos.

### Evidencia independiente

La opinión de revisión y la evidencia de verificación son cosas distintas. Una lente puede decir "los tests parecen adecuados". La evidencia dice *go test ./... salió con éxito*, el build completó, los ejemplos de aceptación pasaron.

**Por qué importa la independencia**

Si el mismo modelo dice "revisé el código" y después escribe "los tests pasaron" sin un resultado de herramienta, tenés dos oraciones de una sola parte interesada. El facade no puede transformar narración en verdad. Solo puede atar bytes de evidencia reales que otro mecanismo produjo.

## Corrección acotada

Solo los findings severos **causados por el candidato** pueden bloquear. Los preexistentes o de solo base se convierten en seguimientos; lo desconocido escala; WARNING y SUGGESTION quedan como información.

Una revisión ordinaria permite **exactamente una transacción de corrección**. START congela el presupuesto de corrección en `min(200, ceil(original_changed_lines / 2))`.

- Antes de editar se da un forecast positivo, y se continúa solo por la siguiente transición devuelta por el proveedor.
- Después de la edición acotada, se corre un validador de arreglo de solo lectura, únicamente cuando el input de colección exacto lo pide.
- **Un validador que no puede inspeccionar los árboles inmutables no tiene veredicto.** Hay que reportar ese bloqueo en lugar de enviar una validación fallida: un chequeo inconcluso registrado como fallido consume el único intento de corrección de forma irreversible.
- Una vez aceptado el intento — incluso con un delta medido de cero líneas — la corrección ordinaria queda agotada. Un cambio posterior requiere un sucesor autorizado.
- Las observaciones posteriores son seguimientos, no otra corrección.

## Entrega y gates

**La revisión nunca autoriza la entrega**

El estado terminal de revisión es informativo. Commit, push, PR, release y archive siguen la política ordinaria del repositorio y requieren su propia autorización explícita.

**Cambia en v2.5.0-rc.1**

Los receipts compactos y sus gates de entrega se retiran por completo. La entrega sigue la política ordinaria del repositorio, y ningún estado de receipt retirado cuenta como aprobación. En la candidata, los resultados de gate que se describen abajo ya no aplican.

`gentle-ai review validate` y sus gates nombrados — `post-apply`, `pre-commit`, `pre-push`, `pre-pr` y `release` — son comandos de compatibilidad e información. Nunca descubren autoridad ni deciden la entrega:

| Modo RDD | Resultado informativo |
| --- | --- |
| Activado | `invalidated/unmanaged` |
| Desactivado | `disabled/unmanaged` |

Nunca permiten, aprueban, bloquean, commitean, pushean ni abren un pull request.

### Proyecciones del candidato

`gentle-ai review start` usa por defecto la proyección `workspace`. Para un monorepo o un worktree compartido, se puede revisar exactamente lo que está en el índice de Git:

```
git add apps/mi-servicio
git diff --cached
gentle-ai review start --projection staged
```

La proyección `staged` congela el **índice existente completo**, incluidas todas las rutas ya stageadas. Excluye el contenido no stageado y sin trackear del worktree, y no modifica el índice ni el worktree vivos al derivar evidencia. Inicia la revisión, pero por sí sola no emite un receipt aprobado.

**Cambia en v2.5.0-rc.1**

Los receipts compactos se retiran, así que ninguna proyección emite uno. Una proyección sigue eligiendo qué bytes se congelan en START; simplemente no tiene receipt que retener.

Una autoridad existente nunca se convierte automáticamente entre proyecciones. La recuperación hereda la proyección del predecesor cuando se omite `--projection`.

### Códigos de parada

Un `stop` lleva exactamente un código de razón y ninguna transición ejecutable. Estos son algunos de los códigos más frecuentes y su continuación:

| Código | Continuación |
| --- | --- |
| `rdd_disabled` | Correr el comando `gentle-ai review mode enable` exacto que renderiza STATUS, y después volver a correr su comando STATUS exacto atado al repositorio |
| `corrected_candidate_unavailable` | Cambiar el candidato de corrección y volver a consultar STATUS con el linaje y objetivo capturados. No reutilizar el objetivo previo a la corrección |
| `correction_repository_verification_failed` | Cambiar el candidato de corrección abierto y volver a consultar STATUS para obtener evidencia nueva del repositorio |
| `unchanged_or_unverified_authority` | Terminal. Un `review start` sobre un candidato sin cambios solo retoma el mismo linaje. Hay que cambiar el contenido primero |
| `lens_context_budget_exceeded` | Terminal. El contexto inmutable del revisor no se puede truncar. Reducir el alcance del candidato e iniciar una transacción nueva |
| `corrupted_or_unverifiable_authority` | Terminal. La autoridad es ilegible o no soportada. Pedirle a un mantenedor que la inspeccione |
| `manual_intervention_required` | Terminal. El estado de autoridad está fuera del ciclo de vida negociado |
| `original_finalize_request_required` retirado en v2.5.0-rc.1 | Volver a correr `gentle-ai review finalize --lineage <id>` con el payload original exacto atado al contenido |
| `native_stop_required` | Terminal. El linaje escaló y no tiene continuación nativa |
| `empty_base_diff_bootstrap_required` | Terminal. La base commiteada no tiene rutas revisables |
| `recovery_scope_unchanged` | Cambiar el objetivo para que su identidad difiera, y reintentar la invocación `review recover` exacta devuelta |

Para cada salida con alcance de clon, `gentle-ai review mode disable --scope clone --cwd <repo>` devuelve la entrega a la política ordinaria del repositorio. **Ningún código de parada se resuelve cambiando de runtime, proveedor o toolchain.**

## Límites de confianza

El modelo mental viene del [Capítulo 21 — Verifiable Trust](https://the-amazing-gentleman-programming-book.vercel.app/en/book/Chapter21_Verifiable-Trust):

> "El modelo juzga el candidato. El facade construye la autoridad. El gate re-deriva la verdad."

La separación central: **Go hace el trabajo determinista, el modelo hace el trabajo de juicio.** El modelo no inventa un ID de linaje, no calcula hashes, no serializa payloads de operación para quince transiciones de estado, no congela ledgers a mano ni construye contextos de gate.

**Por qué insistir con el camino corto**

La complejidad de protocolo es un problema de confiabilidad. Cada operación manual es otra instrucción que puede quedar enterrada en el token 140.000, ser descartada por compactación, llamarse en el orden equivocado, o narrarse de forma convincente sin haberse ejecutado.

### Qué protege el modelo de amenazas — y qué no

El store compacto de revisión protege la autoridad válida de **corrupción accidental y escritores concurrentes**. **No** pretende autenticar el estado contra un actor local malicioso con el mismo usuario y acceso al sistema de archivos: sin un ancla de confianza externa, ese actor puede reescribir el estado, el receipt, el repositorio Git o el binario.

| Escenario | ¿En alcance? | Resultado exigido |
| --- | --- | --- |
| Estado truncado, malformado o semánticamente inválido | Sí | La validación falla de forma cerrada; la autoridad existente queda intacta |
| Reemplazo interrumpido | Sí | El reemplazo atómico y la sincronización del filesystem preservan el registro válido viejo o el nuevo |
| Escritor concurrente u obsoleto | Sí | Un lock más la revisión esperada rechazan transiciones viejas; un reintento exacto es idempotente |
| El repositorio cambia después de la revisión | Sí | Se re-deriva evidencia desde Git vivo y se reportan cambios de alcance o identidad para reparación de revisión |
| La autoridad terminal necesita otra revisión | Sí | `review recover` exige sus predicados de alcance y estado; el estado, receipt, journal y bytes de evidencia del predecesor quedan inmutables |
| **Actor local malicioso con el mismo usuario** | **No** | No se hace ninguna afirmación de autenticidad ni resistencia a manipulación |

### Controles retenidos

- Validación estricta de esquema y semántica antes de aceptar o reemplazar autoridad.
- Validación de transiciones legales contra el estado actualmente bloqueado y la evidencia derivada del repositorio.
- Reemplazo atómico de archivos, con sincronización de archivo y directorio donde sea practicable.
- Un lock de escritor y una revisión esperada para detectar escritores concurrentes.
- Un lock de mantenimiento compartido en `<git-common-dir>/gentle-ai/REVIEW-MAINTENANCE.lock`, fuera del subárbol de autoridad reemplazable. Coordina solo participantes cooperativos de Gentle AI; **no es una defensa contra un actor malicioso del mismo usuario**.
- Reconocimiento de reintentos exactos para operaciones idempotentes.
- Re-derivación de contexto desde Git vivo en lugar de confiar en espejos persistidos.
- Checksums solo donde son útiles para detectar corrupción accidental: **no son autenticación**.

### Esquemas de entrada

Se pueden imprimir los esquemas JSON versionados:

```
gentle-ai review schema reviewer
gentle-ai review schema refuter
gentle-ai review schema validator
gentle-ai review schema verification-evidence-record
gentle-ai review schema final-verification-incident
```

La evidencia de verificación cruda sigue siendo bytes arbitrarios no vacíos, pero **por sí sola nunca es autoridad de resultado**. La captura nativa persiste un registro estricto `gentle-ai.review-verification-evidence/v2` con un resultado cerrado y bindings inmutables de candidato, revisión, payload, ruta y ledger.

## Mantenimiento del store de revisión

La autoridad de revisión se acumula sin límite: cada candidato deja un linaje atrás y nada elimina uno ya entregado, así que un clon de vida larga termina con cientos de linajes y cientos de megabytes de checkouts de candidatos.

| Comando | Efecto |
| --- | --- |
| `review store-reset --cwd <repo>` | Reporta, por categoría, qué eliminaría un reset y qué preservaría. **No elimina nada** |
| `review store-reset --cwd <repo> --confirm` | Elimina el estado de linajes de revisión de este clon. **Irreversible** |
| `... --confirm --include-in-flight` | Elimina también revisiones que no llegaron a un estado terminal |
| `... --confirm --include-adapter-reviews` | Elimina también el store de grafo `reviews/` escrito por el adaptador |
| `review store-reset --cwd <repo> --json` | El mismo reporte, legible por máquina |

**La vista previa es el default**

`--confirm` es obligatorio para eliminar cualquier cosa: la operación es irreversible y abarca todo el clon, así que la invocación que uno escribe de memoria tiene que ser la que solo mira. Tiene alcance de clon y nunca toca una ubicación global o de máquina.

**Elimina** `candidate-views/` y los subárboles `v1`, `v2`, `quarantine`, `effect-markers` e `incidents` de `review-transactions/`.

**Preserva** el interruptor de RDD — tanto en `review-mode/` como en el espejo previo a #2882 — junto con `sdd-runtime/`, `defect-reports/`, `review-artifacts/`, `incidents/` y `REVIEW-MAINTENANCE.lock`. **Las revisiones que estaban apagadas siguen apagadas.** La lista es una lista de permitidos, así que cualquier ruta que el comando no reconozca — incluida una que agregue un release futuro — se reporta y se deja en su lugar en lugar de adivinar.

**Retiene** `reviews/`, el store de grafo que escribe el adaptador de gentle-pi, y solo lo elimina con `--include-adapter-reviews`. Una corrida por defecto no puede distinguir un grafo muerto de una revisión viva, y un comando destructivo no borra lo que no puede garantizar.

La TUI expone la misma acción como **Reset review store** en el menú principal, entre *Manage backups* y *Managed uninstall*, con el cursor de confirmación arrancando en *Cancel*. La TUI no tiene equivalente de `--include-in-flight` ni `--include-adapter-reviews`: cuando existen revisiones abiertas se niega e imprime la invocación de CLI, para que destruir trabajo en vuelo nunca esté a una sola tecla de distancia.

---

## Flujo orgánico completo

El agente elige la ruta más chica útil y RDD entra al final, sobre el candidato congelado.

```
flowchart TD
    A["El usuario pide un cambio"] --> B{"Ruta de  
implementación"}
    B -->|"decidir/verificar  
1-3 archivos"| C["Directa inline"]
    B -->|"explorar 4+ archivos  
o escribir 2+ no triviales"| D["Delegada directa  
(un worker acotado)"]
    C --> E["Implementación + tests"]
    D --> E
    E --> F{"¿RDD activado?  
(opt-in del usuario)"}
    F -->|"apagado (default)"| Z["Entrega ordinaria  
reporta disabled/unmanaged"]
    F -->|"activado"| G["review status --next-transition  
(ruta negociada del proveedor)"]
    G --> H{"Riesgo congelado  
en START"}
    H -->|"bajo"| I["Lectura estructural  
0 lentes - silenciosa"]
    H -->|"estándar"| J["1 lente de foco  
+ consentimiento"]
    H -->|"alto"| K["4R canónicas + consentimiento  
+ forecast de costo"]
    J --> L["Los revisores inspeccionan  
el candidato inmutable"]
    K --> L
    L --> M{"¿Findings severos  
causados por el candidato?"}
    I --> N["Resultado: aprobado  
(informativo)"]
    M -->|"no"| N
    M -->|"sí"| O["Una corrección acotada  
(presupuesto congelado)"]
    O --> P["Validador de arreglo  
(solo lectura)"]
    P -->|"pasa"| N
    P -->|"falla con evidencia"| Q["Escalado"]
    P -->|"sin acceso al diff"| R["Inconcluso: el intento  
no se consume"]
    R --> P
    Q --> S["review recover  
(sucesor autorizado)"]
    N --> T["Política ordinaria  
del repositorio"]
    T --> U["Commit → Push → PR"]
    Z --> U

    style N fill:#2B3328,stroke:#98BB6C,color:#DCD7BA
    style Q fill:#49443C,stroke:#FF9E3B,color:#DCD7BA
    style U fill:#43242B,stroke:#D27E99,color:#DCD7BA
    style Z fill:#1F1F28,stroke:#54546D,color:#727169
```

## Flujo SDD completo

Primero los artefactos durables de planificación, después apply, verificación independiente y una oferta opcional de revisión RDD. El archivado y la entrega siguen la política ordinaria del repositorio.

```
flowchart TD
    A["sdd-new / sdd-explore  
(o sdd-ff para adelantar la planificación)"] --> B["Explorar  
investigar código y enfoques"]
    B --> C["Proponer  
intención - alcance - enfoque"]
    C --> D{"¿El usuario aprueba  
la propuesta?"}
    D -->|"no"| B
    D -->|"sí"| E["Spec  
requerimientos + escenarios"]
    E --> F["Diseño  
decisiones de arquitectura"]
    F --> G["Tareas  
checklist ordenado"]
    G --> H["Apply  
el sub-agente implementa  
contra las specs"]
    H --> Q["Verify  
verificación independiente contra  
spec - diseño - tareas"]
    Q -->|"falla"| H
    Q -->|"pasa"| I["Oferta opcional de revisión RDD"]
    I --> J{"Riesgo"}
    J -->|"bajo"| K["Lectura estructural"]
    J -->|"estándar / alto"| L["1 lente o 4R + consentimiento"]
    L --> M{"¿Findings severos?"}
    M -->|"sí"| N["Una corrección acotada  
+ validador de arreglo"]
    M -->|"no"| O["Resultado: aprobado  
(informativo)"]
    K --> O
    N -->|"valida"| O
    N -->|"falla"| P["Escalado → recover"]
    O --> R["Archive  
fusiona delta-specs - cierra el ciclo"]
    R --> S["Política ordinaria del repositorio"]
    S --> T["Commit → Push → PR"]

    style O fill:#2B3328,stroke:#98BB6C,color:#DCD7BA
    style P fill:#49443C,stroke:#FF9E3B,color:#DCD7BA
    style T fill:#43242B,stroke:#D27E99,color:#DCD7BA
```

---

## Matriz de agentes compatibles

| Agente | ID | Skills | MCP | Delegación | Ruta de config |
| --- | --- | --- | --- | --- | --- |
| Claude Code | `claude-code` | Sí | Sí | Completa (Task tool) | `~/.claude` |
| OpenCode | `opencode` | Sí | Sí | Completa (overlay multi-modo) | `~/.config/opencode` |
| Kilo Code | `kilocode` | Sí | Sí | Completa (overlay multi-modo) | `~/.config/kilo` |
| Gemini CLI | `gemini-cli` | Sí | Sí | Completa (experimental) | `~/.gemini` |
| Cursor | `cursor` | Sí | Sí | Completa (subagentes nativos) | `~/.cursor` |
| VS Code Copilot | `vscode-copilot` | Sí | Sí | Completa (runSubagent) | `~/.copilot` + perfil de usuario |
| Codex | `codex` | Sí | Sí | Multi-agente nativo (default; solo-agente como respaldo) | `~/.codex` |
| Windsurf | `windsurf` | Sí (nativas) | Sí | Solo-agente | `~/.codeium/windsurf` |
| Antigravity | `antigravity` | Sí (nativas) | Sí | Solo-agente + Mission Control | `~/.gemini/antigravity` |
| Kimi Code | `kimi` | Sí | Sí | Completa (agentes custom nativos) | `~/.kimi` |
| Qwen Code | `qwen-code` | Sí | Sí | Completa (sub-agentes nativos) | `~/.qwen` |
| Kiro IDE | `kiro-ide` | Sí | Sí | Completa (subagentes nativos) | `~/.kiro` |
| OpenClaw | `openclaw` | Sí | Sí | Solo-agente | `~/.openclaw` |
| Trae | `trae-ide` | Sí | Sí | Solo-agente | `~/.trae` |
| Pi | `pi` | Sí | Sí | Completa (subagentes por paquete) | `~/.pi` |
| Hermes | `hermes` | Sí | Sí | Completa (delegate\_task efímero) | `~/.hermes` |

### Compatibilidad con SDD multimodo

**Todos** los agentes soportan el orquestador de SDD y SDD de modo único. El **multi-modo** — asignar modelos distintos a cada fase de SDD — lo soportan:

- **OpenCode** y **Kilo Code**, a través del overlay multi-modo compatible con OpenCode.
- **Kiro IDE**, a través del frontmatter `model:` de subagentes nativos.
- **Pi**, donde el multi-modo es propiedad de los paquetes: `gentle-pi` instala agentes y cadenas SDD en `.pi/agents/` y `.pi/chains/`, y los overrides de modelo viven en esos archivos o pasos de cadena.

Todos los demás se ejecutan en **modo único**: el orquestador gestiona todo con el modelo que el agente ya está usando. El modo único no es una limitación: es la opción predeterminada más simple y funciona bien. El modo multimodo es útil cuando se desea equilibrar deliberadamente el costo, la velocidad o el razonamiento por fase.

## Modelos de delegación

| Modelo | Cómo funciona | Agentes |
| --- | --- | --- |
| **Completa (sub-agentes)** | Cada fase de SDD corre en una ventana de contexto aislada, vía delegación nativa, subagentes por paquete o un overlay compatible con OpenCode. El orquestador coordina; los sub-agentes ejecutan | Claude Code, OpenCode, Kilo Code, Gemini CLI, Cursor, VS Code Copilot, Kimi Code, Kiro IDE, Qwen Code, Pi |
| **Completa (delegate\_task)** | El orquestador usa la primitiva nativa `delegate_task` de Hermes para generar workers efímeros en ventanas de contexto frescas. Los workers reciben solo una misión autocontenida; el padre recibe solo su resumen final | Hermes |
| **Multi-agente nativo** | El orquestador delega vía las herramientas nativas de colaboración del agente cuando están configuradas y disponibles, con ejecución inline como respaldo elegante | Codex |
| **Solo-agente** | Todas las fases de SDD corren inline en la misma conversación. El orquestador ES el ejecutor. Engram provee la persistencia entre fases | Windsurf, Antigravity, OpenClaw, Trae |

### Notas por agente

#### Claude Code

- Sub-agentes vía la herramienta nativa Task con ventanas de contexto aisladas.
- Servidores MCP configurados como plugins en `~/.claude/mcp/`.
- Output styles en `~/.claude/output-styles/`.
- Prompt de sistema vía secciones markdown en `~/.claude/CLAUDE.md`.

#### OpenCode

- Overlay multi-agente completo con 11 agentes nombrados en `opencode.json`: `gentle-orchestrator` más 10 agentes de fase SDD.
- Slash commands para las fases de SDD (`/sdd-new`, `/sdd-explore`, etc.).
- La ejecución en background administrada se configura con `--opencode-background-subagents=auto|on|off` o la variable `GENTLE_AI_OPENCODE_BACKGROUND_SUBAGENTS`. La precedencia de CLI es: flag, entorno no vacío, estado administrado previo, y después `auto`.
- Los jobs en background son locales al proceso y no durables, no tienen aislamiento de filesystem, y no deben usarse para fases dependientes ni escritores paralelos en un mismo worktree.
- Los modelos custom de `opencode.json` deben declarar `tool_call: true` explícitamente para aparecer como opciones seleccionables con capacidad SDD.
- Requisito para multimodo: primero conecte sus proveedores de IA y después ejecute `opencode models --refresh`.
- Gentle AI pone el sharing de agentes SDD en `disabled` por defecto, por privacidad; los valores de `share` ya administrados por el usuario, como `manual` o `auto`, se preservan.

#### Codex

- Agente nativo de CLI con config TOML en `~/.codex/config.toml`.
- Perfiles de selección de modelo escritos como archivos separados en `~/.codex/<nombre>.config.toml`. Los defaults de GPT-5.6 requieren Codex >= 0.144.0.
- Los tres carriles se dividen por lo que la fase realmente hace: `sdd-strong` razona sobre contexto que le entregan, `sdd-mid` escribe código en un loop agéntico donde el esfuerzo importa más que la fuerza bruta del modelo, y `sdd-cheap` hace transcripción estructurada con contexto corto y salida verificable — así que compra esfuerzo en lugar de un modelo más grande.
- La delegación multi-agente está activada por defecto: se escriben `features.multi_agent = true`, `agents.max_threads = 4` y `agents.max_depth = 2`. Si la configuración o las herramientas nativas no están disponibles, la orquestación cae elegantemente a ejecución inline solo-agente.

#### Cursor

- Subagentes nativos en `~/.cursor/agents/sdd-{fase}.md` (10 archivos). El Agent de Cursor autodelega al subagente correcto según el campo `description` del frontmatter YAML.
- `sdd-explore` y `sdd-verify` corren con `readonly: false` para poder inspeccionar el código y ejecutar comandos de verificación.
- Skills en `~/.cursor/skills/`, prompt de sistema en `~/.cursor/rules/gentle-ai.mdc`, MCP en `~/.cursor/mcp.json`.

#### Kiro IDE

- Detección: por el binario `kiro` en el `PATH`. Un directorio de config solo no marca a Kiro como instalado.
- Archivo de steering en `~/.kiro/steering/gentle-ai.md` con frontmatter `inclusion: always`.
- La config MCP siempre está en una raíz separada: `~/.kiro/settings/mcp.json`.
- Flujo nativo de specs de Kiro: `.kiro/specs/<feature>/requirements.md`, `design.md`, `tasks.md`, con puertas de aprobación antes de las fases de apply y archive.
- Instalación solo manual desde [kiro.dev/downloads](https://kiro.dev/downloads).

#### Windsurf

- Corre como solo-agente y aprovecha funcionalidades nativas: **Plan Mode** (documentos de plan persistentes que se pueden @mencionar entre sesiones, ideal para artefactos de spec y diseño), **Code Mode**, y **workflows nativos** (`sdd-new` disponible en `.windsurf/workflows/sdd-new.md`).
- El orquestador rutea las tareas por caminos de decisión Chico/Mediano/Grande.

#### Hermes

- **Detect-only**: Gentle AI no puede instalar Hermes. Instálelo manualmente primero y después ejecute `gentle-ai install --agent hermes`.
- La delegación efímera se ajusta en `~/.hermes/config.yaml` bajo la clave `delegation`: `max_spawn_depth` (2), `max_concurrent_children` (4), `max_iterations`, `child_timeout_seconds`, `inherit_mcp_toolsets` (false) y `subagent_auto_approve` (false).
- Los toolsets, servidores MCP y skills **no** se heredan automáticamente del padre: hay que pasarlos explícitamente en la misión.
- La salida del worker se trata como auto-reporte: hay que verificar escrituras de archivos, resultados de tests, URLs y efectos externos antes de reportar éxito.

## Perfiles SDD de OpenCode

Permiten asignar modelos distintos a fases distintas de SDD: uno potente para diseño, uno rápido para implementación, uno barato para exploración. OpenCode usa `gentle-orchestrator` como conductor SDD base.

```
# Crear un perfil "cheap" con un modelo gratuito para todas las fases
gentle-ai sync --profile cheap:openrouter/qwen/qwen3-30b-a3b:free

# Sobrescribir la fase de diseño con un modelo más fuerte
gentle-ai sync --profile-phase cheap:sdd-design:anthropic/claude-sonnet-4-20250514

# Crear varios perfiles en un solo comando
gentle-ai sync \
  --profile cheap:openrouter/qwen/qwen3-30b-a3b:free \
  --profile premium:anthropic/claude-sonnet-4-20250514
```

Después de crear un perfil, abra OpenCode y presione **Tab** para cambiar entre `gentle-orchestrator` y sus perfiles personalizados.

| Lo que necesita | Use esto |
| --- | --- |
| Conductor SDD por defecto | `gentle-orchestrator` |
| Configuraciones legacy | `sdd-orchestrator` se migra a `gentle-orchestrator` al sincronizar |
| Perfiles de modelo nombrados | `sdd-orchestrator-cheap`, `sdd-orchestrator-premium`, etc. |

Si prefiere un **gestor de perfiles en runtime** que mantenga los perfiles fuera de `opencode.json`, Gentle AI también lo admite: durante el sync, OpenCode puede detectar automáticamente archivos de perfil externos en `~/.config/opencode/profiles/*.json` y cambiar a una ruta de compatibilidad más segura que preserva el prompt activo de `gentle-orchestrator` en lugar de sobrescribirlo. Se activa con `--sdd-profile-strategy external-single-active`.

## Pi y el harness `gentle-pi`

**Pi se administra por paquetes, no solo se configura**

Seleccionar Pi instala el harness de primera clase `gentle-pi`, que es dueño de la persona, los controles de modelo, los assets de SDD, las cadenas y el cableado de memoria dentro de Pi.

### Instalación

Pi debe estar instalado y disponible como `pi` en el `PATH`. Después:

```
gentle-ai install --agent pi
pi
```

Si Pi es el único agente seleccionado, el instalador igualmente provisiona el componente real de Engram, pero omite las preguntas sobre persona, selección de componentes del ecosistema y Strict TDD, porque `gentle-pi` gestiona esas decisiones dentro de Pi.

### Paquetes que instala

```
pi install npm:gentle-pi
pi install npm:gentle-engram
pi install npm:pi-mcp-adapter
npm exec --yes --package gentle-engram@latest -- pi-engram init
pi install npm:pi-subagents-j0k3r
pi install npm:@juicesharp/rpiv-ask-user-question
pi install npm:pi-web-access
pi install npm:@juicesharp/rpiv-todo
pi install npm:pi-btw
```

| Paquete | Qué agrega |
| --- | --- |
| `gentle-pi` | Persona Gentleman, flujo SDD/OpenSpec, soporte de TDD estricto, política de seguridad, skills, prompts, agentes SDD y cadenas SDD |
| `gentle-engram` | Integración de Pi con la memoria de sesión de Engram y sus herramientas MCP. **No es el binario de Engram** |
| `pi-mcp-adapter` | Permite que Pi exponga servidores MCP, incluido Engram, a través del runtime MCP de Pi |
| `pi-engram init` | Inicializa la forma de config MCP de Engram para Pi, propiedad de `gentle-engram` |
| `pi-subagents-j0k3r` | Descubre y corre agentes SDD desde `.pi/agents/` |
| `@juicesharp/rpiv-ask-user-question` | Permite que los agentes hijos de Pi le pidan aclaraciones a la sesión activa del usuario |
| `pi-web-access`, `@juicesharp/rpiv-todo`, `pi-btw` | Acceso web, seguimiento de tareas y soporte de flujo acompañante |

### Comandos de Pi

| Comando | Qué hace |
| --- | --- |
| `/gentle-ai:status` | Muestra el estado de paquetes, assets SDD, OpenSpec y configuración de modelos |
| `/gentleman:persona` | Cambia entre las personas `gentleman` y `neutral` |
| `/gentleman:models` | Abre el modal nativo de Pi para asignación de modelos |
| `/sdd-init` | Inicializa o refresca `openspec/config.yaml` |
| `/gentle-ai:install-sdd` | Reinstala assets SDD sin sobrescribir archivos locales |
| `/gentle-ai:install-sdd --force` | Fuerza el refresco de los assets SDD instalados, reemplazando copias locales |

`/gentle-ai:persona` y `/gentle-ai:models` siguen funcionando como alias de compatibilidad.

### Asignación de modelos recomendada

| Tipo de agente | Forma de modelo recomendada |
| --- | --- |
| Exploración, propuesta, archive | Rápido y barato suele alcanzar |
| Spec, diseño, tareas | Modelo de razonamiento fuerte, porque estas fases moldean la implementación |
| Apply | Modelo de código fuerte con uso confiable de herramientas |
| Verify / agentes de revisión | Modelo fuerte con contexto fresco. La verificación se beneficia de la independencia |
| Agentes utilitarios chicos | Heredan el modelo activo salvo que se vuelvan un cuello de botella |

### Archivos del proyecto

En un `session_start` normal, `gentle-pi` copia recursos locales del proyecto sin sobrescribir ediciones locales:

```
.pi/agents/sdd-*.md
.pi/chains/sdd-*.chain.md
.pi/gentle-ai/support/strict-tdd.md
.pi/gentle-ai/support/strict-tdd-verify.md
```

**Sobre `pi -ns`**

Iniciar Pi con `pi -ns` omite la carga de skills y los hooks de inicio. Es útil para una sesión limpia o más rápida, pero también significa que el trabajo de inicio de `gentle-pi` — comprobación de recursos y actualización del registro de skills — no se ejecuta automáticamente.

### Solución de problemas

| Síntoma | Solución |
| --- | --- |
| Gentle AI indica que falta Pi | Instale Pi primero y asegúrese de que `pi` esté en el `PATH` |
| Faltan agentes SDD en Pi | Inicie Pi normalmente en el proyecto para que ejecute `session_start`, o ejecute `/gentle-ai:install-sdd` |
| La persona no cambió de inmediato | Ejecute `/reload` o inicie una sesión nueva de Pi |
| Desea quitar una anulación de modelo | Abra `/gentleman:models` y elija *Inherit active/default model* |
| Faltan herramientas de memoria o `/mcp` | Ejecute de nuevo `gentle-ai install --agent pi` y revise `/gentle-ai:status` |
| `gentle-engram` está instalado, pero Engram no está disponible | Ejecute de nuevo `gentle-ai install --agent pi` para provisionar el componente real de Engram |

---

## Referencia de CLI

### TUI interactiva

```
gentle-ai
```

La TUI Bubbletea guía la selección de agentes, componentes, skills, presets y flujos de desinstalación administrada. Antes de modificar cualquier archivo administrado, Gentle AI crea un snapshot de backup.

### `install`

```
# Ecosistema completo para varios agentes
gentle-ai install \
  --agent claude-code,opencode,gemini-cli \
  --preset full-gentleman

# Setup mínimo para Cursor
gentle-ai install --agent cursor --preset minimal

# Elegir componentes y skills específicos
gentle-ai install \
  --agent claude-code \
  --component engram,sdd,skills,context7,persona,permissions \
  --skill go-testing,skill-creator,branch-pr,issue-creation \
  --persona gentleman

# Vista previa sin aplicar cambios
gentle-ai install --dry-run --agent claude-code,opencode --preset full-gentleman
```

Al instalar un solo agente con `--agent X`, Gentle AI **fusiona** el agente nuevo en la lista `installed_agents` existente de `state.json` y **preserva** cualquier `model_assignments` existente. No sobrescribe el estado completo.

#### Flags de `install`

| Flag | Descripción |
| --- | --- |
| `--agent`, `--agents` | Agentes a configurar, separados por coma |
| `--component`, `--components` | Componentes a instalar, separados por coma |
| `--skill`, `--skills` | Skills a instalar, separadas por coma |
| `--persona` | `gentleman`, `neutral` o `custom` |
| `--preset` | `full-gentleman`, `ecosystem-only`, `minimal` o `custom` |
| `--sdd-mode` | Modo del orquestador SDD: `single` o `multi` |
| `--scope` | `global` (default) o `workspace` |
| `--dry-run` | Vista previa del plan sin aplicar cambios |

### `sync`

Refresca los assets administrados a la versión actual. Ejecútelo después de reemplazar o actualizar el binario, incluso con `brew upgrade`, `gentle-ai upgrade` o `go install`. **No** reinstala binarios: solo actualiza contenido de prompts, skills, configs MCP y orquestadores SDD.

```
gentle-ai sync --dry-run                          # Vista previa del alcance
gentle-ai sync                                     # Agentes registrados en state.json
gentle-ai sync --agent claude-code --agent opencode # Solo agentes específicos
```

**Alcance de sync**

`gentle-ai sync` actualiza los agentes registrados como instalados por Gentle AI, **no todos los directorios de config de agentes del equipo**. La selección se guarda en `~/.gentle-ai/state.json`. Previsualice el alcance activo con `gentle-ai sync --dry-run`.

Sync es seguro e idempotente: ejecutarlo dos veces no produce cambios la segunda vez. No soporta `--component`; para los componentes opt-in excluidos del alcance por defecto se usan `--include-permissions` e `--include-theme`.

#### Flags de `sync`

| Flag | Descripción |
| --- | --- |
| `--agent`, `--agents` | Agentes a sincronizar (default: todos los instalados) |
| `--skill`, `--skills` | Skills a sincronizar |
| `--sdd-mode` | `single` o `multi` |
| `--strict-tdd` | Activa el modo Strict TDD para los agentes SDD |
| `--profile` | Crear o actualizar un perfil SDD: `nombre:proveedor/modelo` |
| `--profile-phase` | Sobrescribir una fase específica: `nombre:fase:proveedor/modelo` |
| `--sdd-profile-strategy` | `generated-multi` o `external-single-active` |
| `--include-permissions` | Incluir la sincronización de permisos (opt-in) |
| `--include-theme` | Incluir la sincronización del tema (opt-in) |
| `--dry-run` | Vista previa del plan sin aplicar cambios |

### `uninstall`

Quita **solo la configuración administrada por Gentle AI** de uno o más agentes. No desinstala paquetes ni binarios externos. Antes de aplicar cualquier cambio se crea un snapshot de backup.

```
gentle-ai uninstall --agent claude-code --agent opencode
gentle-ai uninstall --agent claude-code --component sdd,persona,context7
gentle-ai uninstall --all
gentle-ai uninstall --agent cursor --component skills --yes
```

Si no se pasa `--component` en una desinstalación parcial, se quitan todos los componentes desinstalables administrados del conjunto de agentes seleccionado.

### `update` / `upgrade`

```
gentle-ai update    # Chequea si hay una versión más nueva
gentle-ai upgrade   # Actualiza al último release
```

Después de cualquier actualización o reemplazo manual del binario, ejecute `gentle-ai sync`.

| Situación | Comportamiento |
| --- | --- |
| Terminal interactiva (TTY) | Siempre pregunta `Apply now? [Y/n]`. Un Enter vacío acepta |
| No-TTY (CI, pipe, script) | Rechaza automáticamente. Nunca queda bloqueado |
| `GENTLE_AI_YES=1` | Acepta automáticamente sin preguntar. La variable la heredan los subprocesos, por lo que conviene acotarla a una sola invocación |
| `GENTLE_AI_NO_SELF_UPDATE=1` | Omite por completo el chequeo de auto-actualización |

Si GitHub limita por tasa los chequeos de actualización, exporte `GITHUB_TOKEN` o `GH_TOKEN` antes de ejecutar `update`/`upgrade`.

### `doctor`

```
gentle-ai doctor
```

Diagnóstico de salud de solo lectura: no hace ningún cambio en la configuración.

| Chequeo | Qué verifica |
| --- | --- |
| Binarios de herramientas | Herramientas requeridas presentes en el `PATH`; detección de shadowing (que resuelva primero el binario equivocado) |
| Validez de `state.json` | Parsea `~/.gentle-ai/state.json` y reporta problemas de esquema o corrupción |
| Alcanzabilidad de Engram MCP | Confirma que el servidor MCP de Engram responde |
| Espacio en disco | Avisa cuando el espacio disponible es críticamente bajo |

Cada chequeo reporta **pass**, **warn** o **fail**, con una sugerencia de remedio opcional. Ejecute `doctor` primero cuando algo sea distinto de lo esperado.

### Flujo de trabajo típico

```
# Primera vez: instalar todo
brew install gentleman-programming/tap/gentle-ai
gentle-ai install --agent claude-code,cursor --preset full-gentleman

# Después de un release nuevo: actualizar y sincronizar
brew upgrade gentle-ai
gentle-ai sync

# Quitar solo la config administrada de SDD y persona de un agente
gentle-ai uninstall --agent claude-code --component sdd,persona

# Agregar un agente nuevo más adelante
gentle-ai install --agent windsurf --preset full-gentleman
```

## Backups y rollback

El sistema de backups toma un snapshot de los archivos de configuración antes de cada install, sync y upgrade. Los backups son comprimidos, deduplicados y podados automáticamente.

### Cómo funciona

1. **Calcula un checksum** de todos los archivos que se van a respaldar.
2. **Omite el backup** si sería idéntico al más reciente (deduplicación).
3. **Crea un snapshot comprimido** (`snapshot.tar.gz`) con todos los archivos de config.
4. **Poda los backups viejos**: mantiene los 5 más recientes y borra el resto.

### Contenido del snapshot

- `manifest.json` — metadata: origen, timestamp, cantidad de archivos, checksum, estado de pin.
- `snapshot.tar.gz` — archivo comprimido con todos los archivos respaldados.
- Para rutas que no existían antes de la operación, el manifest registra `existed=false`.

**Alcance del backup**

Los snapshots pre-upgrade y pre-sync cubren únicamente los agentes listados en `state.InstalledAgents` (`~/.gentle-ai/state.json`). Los directorios de config de agentes instalados fuera de Gentle AI no se incluyen.

### Política de retención

| Ajuste | Default | Comportamiento |
| --- | --- | --- |
| Cantidad a mantener | 5 | Se conservan los 5 backups sin pin más recientes |
| Backups con pin | Nunca se borran | Sobreviven a la poda sin importar el conteo |
| Duplicados | Se omiten | Si la config no cambió, no se crea un backup nuevo |
| Compresión | Siempre | Los backups nuevos usan tar.gz (~75% más pequeños) |

### Gestión desde la TUI

| Tecla | Acción |
| --- | --- |
| `j` / `k` | Navegar arriba/abajo |
| `Enter` | Restaurar el backup seleccionado |
| `p` | Pin/unpin (protege de la poda) |
| `r` | Renombrar (agregar una descripción) |
| `d` | Borrar |
| `Esc` | Volver |

### Comportamiento de restauración

- Si `existed=true`: restaura el archivo del snapshot a su ruta original.
- Si `existed=false`: elimina el archivo, revirtiendo archivos creados durante la instalación.
- La restauración es atómica por escritura de archivo: no hay restauraciones parciales.
- Funciona con backups comprimidos (tar.gz) y con los legacy anteriores a v1.16 (directorio `files/` con copias planas).

**Qué NO cubre el rollback**

Los paquetes instalados vía `brew install`, `apt-get install` o `pacman -S` **no** se desinstalan durante el rollback. El sistema de snapshots maneja únicamente archivos de configuración. Para deshacer una instalación de paquete, use el gestor de paquetes de su plataforma.

### Si la verificación falla

1. Revise los chequeos fallidos en el reporte de verificación.
2. Restaure desde el último snapshot vía la TUI o `gentle-ai restore latest`.
3. Vuelva a ejecutar install con `--dry-run` para validar el plan.
4. Vuelva a ejecutar install después de resolver las dependencias externas.

## Verificación de releases

Los archivos oficiales de release para macOS y Linux requieren un `checksums.txt` autenticado. El actualizador integrado verifica su firma Minisign, su binding exacto a `Gentleman-Programming/gentle-ai` más el tag del release, y el checksum del archivo seleccionado **antes** de reemplazar el binario instalado.

**Cambia en v2.5.0-rc.1**

La candidata publica `SHA256SUMS.txt` y **ningún archivo de firma Minisign**. El release estable `v2.4.0` publica `checksums.txt` junto con `checksums.txt.minisig`; la candidata no publica ninguno de los dos. El procedimiento de verificación de abajo, por lo tanto, no tiene contra qué verificar en la candidata, y sus binarios se publican crudos en vez de como archivos `.tar.gz`. Verificado contra los assets del release el 2026-08-26.

Los archivos de release tienen un tope de **128 MiB**, incluidas respuestas por chunks o de longitud desconocida. Material de clave faltante, sobredimensionado, malformado, no confiable o de relleno falla de forma cerrada sin cambiar el binario instalado.

```
minisign -VQm checksums.txt -x checksums.txt.minisig -P "$GENTLE_AI_MINISIGN_PUBLIC_KEY"
# Salida esperada: repo=Gentleman-Programming/gentle-ai;tag=vX.Y.Z
sha256sum --check --strict --ignore-missing checksums.txt
```

**No establezca confianza desde una clave que viene junto a lo que verifica**

Obtenga la clave pública de producción y su huella desde un canal controlado por los mantenedores, y solo después descargue `checksums.txt` y `checksums.txt.minisig` del mismo release.

Los archivos de Windows y la publicación en Scoop siguen omitidos hasta que se provisione firma Authenticode RSA de confianza pública, ambos ejecutables (amd64 y arm64) estén firmados antes de generar archivos y checksums, y la verificación de release falle si alguno de los dos está sin firmar.

**Cambia en v2.5.0-rc.1**

Parcialmente superado en la candidata, que publica un `windows_amd64.exe` de estado de firma desconocido. El ejecutable `arm64` que nombra este párrafo sigue sin publicarse.

## Política de versiones

RDD empezó en `gentle-ai` **v1.47.0** (2026-07-10), con las primeras transacciones de revisión nativa acotada, y se volvió la ruta estable soportada en **v2.2.0**. El contrato público negociado de revisión se publicó en **v2.1.6**.

**La documentación del repositorio está desactualizada respecto de los releases**

El README, `quickstart.md` y `trigger-rules.md` todavía nombran `v2.3.0` como estable y `v2.4.0-rc.1` como prerelease. La lista de releases indica otra cosa: **`v2.4.0` se publicó como estable el 2026-08-17** y dejó atrás toda la serie de candidatas, que llegó hasta `v2.4.0-rc.8` (2026-08-14). Después, el 2026-08-26, se abrió una nueva línea de candidatas con **`v2.5.0-rc.1`**. Esta tabla sigue los releases, no los documentos.

Verificado contra [la página de releases](https://github.com/Gentleman-Programming/gentle-ai/releases) el **2026-08-26**. Las versiones cambian: confirma siempre con `gentle-ai version` y con esa página.

| Canal | Versión | Instalación |
| --- | --- | --- |
| Estable | `v2.4.0` 2026-08-17 | `go install github.com/gentleman-programming/gentle-ai/v2/cmd/gentle-ai@latest` |
| Prerelease | `v2.5.0-rc.1` 2026-08-26 | `go install github.com/gentleman-programming/gentle-ai/v2/cmd/gentle-ai@v2.5.0-rc.1` |
| Desarrollo | `main` | `go install github.com/gentleman-programming/gentle-ai/v2/cmd/gentle-ai@main` |

Hay una línea de candidatas abierta por delante de `v2.4.0`, así que `@latest` y la última RC ya no apuntan a la misma línea: `@latest` sigue resolviendo a estable, y a `v2.5.0-rc.1` se llega solo con su pin exacto. El instalador administrado sigue la última versión del canal y **no acepta un pin arbitrario** de release, así que usa `go install` para correr la candidata, o cuando la reproducibilidad requiera una versión exacta. Usa `@main` solo para probar cambios que no forman parte de ningún release.

El instalador administrado en canal beta sigue `main` y requiere Go 1.25.10+:

```
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/main/scripts/install.sh | bash -s -- --channel beta

# Windows (PowerShell)
$env:GENTLE_AI_CHANNEL="beta"; go install github.com/gentleman-programming/gentle-ai/v2/cmd/gentle-ai@main
```

---

## Glosario

Candidato candidate
:   El conjunto exacto de bytes que se va a revisar. Existe antes de que empiece la revisión y queda congelado en START.

Linaje lineage
:   El identificador de una transacción de revisión. Se captura en START y se replica sin cambios en cada llamada posterior. Un linaje quemado nunca se reutiliza.

Receipt
:   La evidencia terminal de una transacción de revisión completada. Es informativa: nunca autoriza la entrega. Al aprobarse, se quema junto con la autoridad. Retirado en `v2.5.0-rc.1`, donde la revisión cierra en su evento terminal sin publicar ninguno.

Lente lens
:   Un revisor de solo lectura que juzga una sola preocupación y emite un JSON estricto. Las cuatro canónicas son Riesgo, Resiliencia, Legibilidad y Confiabilidad (4R).

Quema burn
:   La eliminación de la autoridad exacta y sus artefactos al aprobarse la revisión. No sobrevive ningún receipt, tombstone, testigo ni espejo.

Proyección projection
:   Qué congela START: `workspace` (todo el espacio de trabajo, default) o `staged` (exactamente el índice de Git).

Gate
:   Un punto de chequeo nombrado — `post-apply`, `pre-commit`, `pre-push`, `pre-pr`, `release`. Son comandos informativos y de compatibilidad: nunca permiten ni bloquean una entrega. Retirado en `v2.5.0-rc.1` junto con los receipts compactos.

Finding causado por el candidato
:   Un hallazgo que el cambio introdujo. Solo los severos de esta clase pueden bloquear. Los preexistentes se convierten en seguimientos.

Presupuesto de corrección
:   El límite de líneas para la única corrección permitida: `min(200, ceil(original_changed_lines / 2))`. Se congela en START y no se recalcula.

Delta-spec
:   La especificación parcial de un cambio en curso. Al archivar, se fusiona con las specs principales del proyecto.

Escalado escalated
:   El estado de un linaje cuya corrección falló con evidencia. No se inicia otro revisor, refutador, corrección ni validador: requiere un sucesor autorizado vía `review recover`.

## Documentación oficial

| Tu tarea | Empieza aquí |
| --- | --- |
| Entender el modelo mental de Gentle AI | [Intended Usage](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/intended-usage.md) |
| Elegir entre ruteo directo, delegado o SDD opcional | [Organic Implementation Routing](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/trigger-rules.md) |
| Entender la arquitectura de RDD | [Organic RDD](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/architecture/organic-rdd.md) |
| Revisar o entregar un cambio de forma segura | [Review Integration Contract](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/review-integration.md) |
| Conocer los límites técnicos de la autoridad de revisión | [Review Authority Threat Model](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/review-authority-threat-model.md) |
| Configurar un agente soportado | [Agents](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/agents.md) |
| Usar el harness de Pi | [Pi Agent](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/pi.md) |
| Versionar artefactos SDD como archivos | [OpenSpec Config](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/openspec-config.md) |
| Encontrar o compartir contexto persistente | [Engram Commands](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/engram.md) |
| Recuperar una instalación | [Backup & Rollback](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/rollback.md) |
| Entender la confianza verificable | [Capítulo 21 — Verifiable Trust](https://the-amazing-gentleman-programming-book.vercel.app/en/book/Chapter21_Verifiable-Trust) |
| Navegar el código fuente | [Gentleman-Programming/gentle-ai](https://github.com/Gentleman-Programming/gentle-ai) |

Esta página resume la documentación oficial de Gentle AI. Ante cualquier diferencia, la fuente de verdad son los documentos del repositorio enlazados arriba. Gentle AI se distribuye bajo licencia MIT.