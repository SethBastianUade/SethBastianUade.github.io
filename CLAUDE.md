# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Reglas de workspace (idioma es_AR, stack vanilla, etc.) están en el `CLAUDE.md` y `AGENTS.md` de `Webs/`. Acá solo va lo propio de este repo.

## Qué es

Portfolio personal de Sebastian Arroyo (Backend Developer) — **no es un proyecto cliente**, es el sitio propio del dueño del workspace freelance. Single-page estático servido por **GitHub Pages**.

## Estructura

Tres archivos planos en la raíz, sin build:

- `index.html` — toda la página (hero, stack, proyectos, contacto). Secciones ancladas por `id` (`#inicio`, `#stack`, `#proyectos`, `#contacto`) que matchean los links del `nav`.
- `styles.css` — design system completo. Tokens en `:root` (paleta dark GitHub-style + acento verde terminal `--accent: #00ff41`). Estética "developer console": ventanas de terminal, tipografía `JetBrains Mono`, grid de fondo.
- `script.js` — solo dos comportamientos: toggle del menú mobile (breakpoint **820px**) y el efecto typing del hero.

## Convenciones de este sitio

- **El efecto typing se controla por data-attribute**, no por JS hardcodeado: el texto vive en `data-text="..."` sobre `.terminal-typing` en el HTML. Para cambiar el texto animado, editá el HTML, no el JS.
- **Agregar un proyecto** = duplicar un `<article class="project-card">` dentro de `.projects-grid`. Badge `CLIENT` o `ACADEMIC`. Mantené el numerado `project_0N` en `.card-title`.
- Acentos del español están **escritos sin tildes a propósito** en buena parte del copy (evita problemas de encoding en algunos contextos). Seguí ese estilo al editar copy existente para no mezclar.
- El CV es `cv.pdf` en la raíz, linkeado desde nav, hero y contacto. Si lo reemplazás, mantené el nombre en minúsculas (`cv.pdf`, no `CV.pdf`) — hubo renames por case-sensitivity en el historial.

## Deploy

Push a `main` → GitHub Pages publica automáticamente. No hay CI ni paso de build.

## Gotchas

- **Ignorá Jekyll.** El `.gitignore` trae patrones de Jekyll/Ruby por la plantilla de GitHub Pages, pero el sitio es HTML plano. No hay `Gemfile`, `_config.yml` ni `_site/`. No agregues toolchain Jekyll.
- **`CNAME` vs dominio:** el archivo `CNAME` apunta a `www.sebastianarroyo.tech`. El historial de commits muestra cambios frecuentes de dominio (incluido `bifrostsoftware.me`) — confirmá el dominio vigente con el usuario antes de tocar `CNAME`, no asumas por los commits viejos.
- Probar local: abrí `index.html` en el navegador directamente (o `python -m http.server` desde la raíz). No requiere servidor para funcionar.
