# AGENTS.md

This is a Hugo static site migrated from WordPress using the Bookworm Light theme.

## Build Commands

### Development
```bash
# Start development server (hot reload)
hugo server

# Preview production build locally
hugo server --disableFastRender --minify -e production

# From theme directory
cd themes/bookworm-light && npm run dev:example
```

### Build/Deploy
```bash
# Production build with minification
hugo --gc --minify --templateMetrics

# Format code (from theme directory)
cd themes/bookworm-light && npm run format

# Theme-specific build commands
cd themes/bookworm-light && npm run build
```

### GitHub Actions
Deployment is automated via `.github/workflows/deploy.yaml`:
- Triggers: push to main, daily cron (8:00 UTC), manual
- Build: `hugo --minify`
- Deploy: GitHub Pages

## Code Style Guidelines

### Content Files (Markdown)
- **Frontmatter**: YAML format enclosed in `---`
- **Required fields**: title, type, date, url, featured_image (optional), categories
- **Date format**: ISO 8601: `2027-11-26T07:59:24+00:00`
- **Images**: Always reference from `/wp-content/uploads/` - don't change paths
- **Permalinks**: Posts use `/:slug/` format (configured in hugo.yaml)
- **Language**: Spanish content (languageCode: es-es)

### HTML Templates (Hugo)
- **Syntax**: Go template language (`{{ variable }}`, `{{ partial "file.html" . }}`)
- **Conditionals**: `{{ if condition }}{{ else }}{{ end }}`
- **Comments**: `{{/* comment text */}}`
- **Partials**: Store reusable components in `layouts/partials/`
- **Cached partials**: Use `{{ partialCached "partial.html" . }}` for production
- **Production checks**: `{{ if hugo.IsProduction }}{{ else }}{{ end }}`

### JavaScript
- **Structure**: IIFE wrapper: `(function () { 'use strict'; ... })();`
- **Events**: Use `addEventListener` with specific event types
- **Selectors**: Prefer `querySelector` and `getElementById`
- **No jQuery**: Vanilla JS only (theme ships Bootstrap bundle)
- **Placement**: Scripts in `static/` or theme's `assets/js/`
- **Defer loading**: Use `defer` attribute for non-critical scripts

### Formatting
- **HTML**: Prettier with go-template parser (configured in themes/bookworm-light/.prettierrc)
- **JavaScript**: Prettier with semicolons, single quotes, strict mode
- **Markdown**: markdownlint rules MD033/MD034/MD013 disabled (inline HTML, blank lines)
- **YAML**: 2-space indentation for frontmatter

### File Organization
```
content/              # Markdown posts (date-slug.md format)
layouts/              # Override theme templates
  partials/          # Reusable HTML components
  _default/          # Default page layouts
static/              # Static files (CSS, JS, images, consent.js, ads.txt)
themes/bookworm-light/  # Theme files (don't edit unless necessary)
archetypes/          # Content templates
data/                # Data files (currently empty)
```

### Hugo Configuration
- **Config file**: `hugo.yaml` (YAML format)
- **Theme**: bookworm-light
- **Permalinks**: `/posts/:slug/`
- **Images**: `/wp-content/uploads/` (preserved from WordPress migration)
- **RSS**: Enabled for homepage output

### SEO & Meta Tags
- **Canonical links**: `<link rel="canonical" href="{{ .Permalink }}">`
- **Meta descriptions**: In head partial or page params
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: In `static/robots.txt`
- **OpenGraph**: Configured via theme params

### AdSense Integration
- **Consent script**: `static/consent.js` (GDPR compliant)
- **AdSense script**: In `layouts/partials/head.html`
- **Consent management**: gtag API with localStorage persistence
- **ads.txt**: Required in `static/ads.txt`

### Git Workflow
- **Branch**: main
- **Deploy**: Automatic on push to main
- **Scheduled builds**: Daily at 8:00 UTC for future posts
- **Commit format**: Follow conventional commits when committing

### Important Constraints
- **Never change**: Image paths in `/wp-content/uploads/`
- **Never change**: Post URLs (permalinks) - affects SEO
- **No database**: Content is static Markdown
- **No plugins**: Use theme features or custom code
- **Language**: Spanish - maintain consistency

### Common Patterns
- **Include partials**: `{{ partial "partial-name.html" . }}`
- **Iterate**: `{{ range .Pages }}{{ end }}`
- **Variable assignment**: `{{ $variable := value }}`
- **Safe HTML**: `{{ .Content | safeHTML }}` (use carefully)
- **RelURL**: `{{ "path/to/file" | relURL }}`
