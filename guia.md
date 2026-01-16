📘 GUÍA MAESTRA DEFINITIVA
WordPress → Hugo + GitHub Pages
Theme: Bookworm Light

(2000+ posts · SEO intacto · imágenes intactas · publicación automática)

🧠 CONCEPTO GENERAL (léelo una vez)

WordPress se usa solo como origen

Hugo genera archivos HTML

GitHub Pages publica esos archivos

Google ve las mismas URLs

Las imágenes no se mueven ni cambian

Los posts futuros se publican solos

🧰 PASO 0 — PREPARACIÓN TOTAL
0.1 Requisitos obligatorios

Confirma que tu WordPress cumple:

Enlaces permanentes:

/%postname%/


Imágenes en:

/wp-content/uploads/


Acceso a:

WordPress admin

GitHub

Google AdSense

Google Search Console

0.2 Instalar herramientas (una por una)
A. VS Code

Ve a https://code.visualstudio.com

Descarga

Instala con valores por defecto

B. Git

Ve a https://git-scm.com

Descarga

Instala pulsando Next en todo

C. Hugo (motor del sitio)
Windows

Abre PowerShell

Ejecuta:

winget install Hugo.Hugo.Extended

macOS
brew install hugo

Verificación
hugo version


Debe mostrar una versión.

📦 PASO 1 — EXPORTAR WORDPRESS (MUDANZA)
1.1 Instalar exportador

WordPress → Plugins → Añadir nuevo

Busca:

WordPress to Hugo Exporter


Autor: SchumacherFM

Instala y activa

1.2 Exportar contenido

WordPress → Herramientas → Export to Hugo

Pulsa Export

Descarga el archivo .zip

NO lo abras aún

Guárdalo

1.3 Guardar ads.txt

Entra a Google AdSense

Descarga ads.txt

Guárdalo

🗂️ PASO 2 — CREAR PROYECTO HUGO
2.1 Crear carpeta base

Escritorio

Crea carpeta:

mi-blog

2.2 Abrir en VS Code

Abre VS Code

Arrastra mi-blog dentro

2.3 Abrir terminal integrada

Menú:

Terminal → New Terminal

2.4 Crear sitio Hugo

Ejecuta uno por uno:

hugo new site . --force --format yaml

2.5 Inicializar Git
git init

2.6 Instalar theme Bookworm Light
git clone git@github.com:gethugothemes/bookworm-light-hugo.git themes/bookworm-light

🪑 PASO 3 — COLOCAR CONTENIDO
3.1 Descomprimir exportación

Localiza el ZIP de WordPress

Descomprímelo

Verás:

posts

wp-content

3.2 Copiar posts

Abre:

posts/


Copia todos los .md

Pégalos en:

mi-blog/content/posts/

3.3 Copiar imágenes (CASO REAL)

Todas las imágenes están en una sola carpeta.

Acción:

Copia:

wp-content


Pega en:

mi-blog/static/


Resultado:

static/wp-content/uploads/

3.4 Copiar ads.txt

Copia ads.txt

Pégalo en:

static/ads.txt

⚙️ PASO 4 — CONFIGURACIÓN GLOBAL (hugo.yaml)
4.1 Abrir archivo

Abre:

hugo.yaml

4.2 BORRAR TODO y pegar:
baseURL: "https://TU_DOMINIO.com/"
languageCode: "es-es"
title: "TU TITULO DEL BLOG"

theme: "bookworm-light"

paginate: 10
enableRobotsTXT: true
buildFuture: false

permalinks:
  posts: /:slug/

outputs:
  home:
    - HTML
    - RSS

params:
  description: "DESCRIPCIÓN GENERAL DEL BLOG"
  author: "TU NOMBRE"

🔍 PASO 5 — SEO TÉCNICO COMPLETO
5.1 Canonical y meta description
Crear archivo:
layouts/_default/baseof.html

Copiar contenido original

Abre:

themes/bookworm-light/layouts/_default/baseof.html


Copia todo

Pega en:

layouts/_default/baseof.html

Dentro del <head> añade:
<link rel="canonical" href="{{ .Permalink }}">

{{ if .IsPage }}
<meta name="description"
content="{{ with .Params.description }}{{ . }}{{ else }}{{ .Summary | plainify | truncate 160 }}{{ end }}">
{{ end }}

5.2 Robots.txt

Crear:

static/robots.txt


Contenido:

User-agent: *
Allow: /

Sitemap: https://TU_DOMINIO.com/sitemap.xml

5.3 Sitemap

✔ Hugo lo genera automáticamente
URL:

/sitemap.xml

💰 PASO 6 — ADSENSE + CONSENTIMIENTO
6.1 Script de consentimiento

Crear:

static/consent.js


Contenido:

if (!localStorage.getItem("consentGranted")) {
  const banner = document.createElement("div");
  banner.innerHTML = `
    <div style="position:fixed;bottom:0;left:0;right:0;
    background:#111;color:#fff;padding:15px;text-align:center;z-index:9999">
    Usamos cookies para anuncios.
    <button id="acceptCookies">Aceptar</button>
    </div>`;
  document.body.appendChild(banner);

  document.getElementById("acceptCookies").onclick = () => {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    localStorage.setItem("consentGranted", "true");
    banner.remove();
  };
}

6.2 Insertar scripts en el HEAD
Crear archivo:
layouts/partials/head.html

Copiar original

Abre:

themes/bookworm-light/layouts/partials/head.html


Copia todo

Pega en:

layouts/partials/head.html

Añadir al final del <head>:
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
</script>

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-TU_ID"
crossorigin="anonymous"></script>

<script src="/consent.js" defer></script>

🤖 PASO 7 — AUTOMATIZACIÓN (POSTS PROGRAMADOS)
7.1 Crear workflow

Ruta:

.github/workflows/deploy.yaml


Contenido:

name: Publicar Web

on:
  push:
    branches: ["main"]
  schedule:
    - cron: "0 8 * * *"
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: latest
          extended: true

      - run: hugo --minify

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4

🚀 PASO 8 — SUBIR A GITHUB
8.1 Crear repositorio

GitHub → New repository

Nombre: blog-hugo

Público

Crear

8.2 Subir código
git add .
git commit -m "Primera subida"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/blog-hugo.git
git push -u origin main

🌍 PASO 9 — ACTIVAR WEB

Repo → Settings → Pages

Source: GitHub Actions

Espera 1 minuto

Aparece la URL

Dominio propio

Pages → Custom domain

Introduce dominio

Configura DNS

Activa HTTPS

✍️ PASO 10 — USO DIARIO
Crear post
content/posts/mi-post.md

Programar publicación
date: 2026-12-31

Publicar
git add .
git commit -m "Nuevo post"
git push

🖼️ IMÁGENES (CLARO Y DEFINITIVO)

Todas en:

/wp-content/uploads/


No cambian

No se renombran

Se usan igual en posts antiguos y nuevos

Ejemplo:

![Texto alt](/wp-content/uploads/imagen.jpg)

🧪 PASO 11 — CHECKLIST POST-MIGRACIÓN

 URLs idénticas a WordPress

 Sitemap accesible

 Robots correcto

 Canonical correcto

 Meta description presente

 Imágenes cargan

 Ads.txt accesible

 Consentimiento funciona

🔍 PASO 12 — SEARCH CONSOLE

Añadir propiedad dominio

Enviar sitemap

Inspeccionar URLs clave

Monitorizar 14–30 días

🧰 PASO 13 — MANTENIMIENTO A LARGO PLAZO

GitHub = backup

No plugins

No base de datos

Actualizar theme 1–2 veces/año

No tocar URLs nunca