# flagship-website

Site institucional da Flagship Viagens — landing page boutique para aprovação Apple Developer e presença web da agência.

## Stack
- Next.js 16 + React 19, App Router, JavaScript (sem TypeScript, sem Tailwind)
- CSS global em `app/globals.css` (custom properties, sem framework)
- Deploy: Railway via Dockerfile multi-stage (`railway.toml`)

## Estrutura
- `app/page.jsx` — landing page principal (client component, tem scroll/parallax/IntersectionObserver)
- `app/termos/page.jsx` — Termos de Uso
- `app/privacidade/page.jsx` — Política de Privacidade
- `app/globals.css` — todo o CSS: design tokens, nav, hero, seções, legal pages
- `public/` — logos e imagens locais (hero, CTA)

## Padrões
- Todo CSS é custom properties — não usar Tailwind
- Imagens externas (Unsplash) usam `<img>` normal, sem `next/image`
- Animações via `useEffect` + `IntersectionObserver` em `page.jsx`
- WhatsApp: trocar `5511999999999` pelo número real nos três lugares em `page.jsx`
- Fontes carregadas via Google Fonts link tag no `layout.js`

## Deploy Railway
- Builder: Dockerfile
- Healthcheck: `/`
- Start: `node server.js` (Next.js standalone)
