# Static site cleaned to avoid third-party libraries/CDNs

This copy removes automatic loading of third-party libraries/CDNs from the uploaded HTML/CSS files.

Removed/replaced:
- Polyfill.io
- MathJax CDN
- p5.js CDN and p5.sound CDN
- Font Awesome CDN
- Google Fonts / W3CSS imports
- Google Slides iframes now load only if a visitor clicks the replacement links
- Inline `onclick` menu handlers were replaced with `site.js`, a small first-party vanilla JavaScript file

Notes:
- External GitHub/LinkedIn/reference links remain, but they are normal links. They do not load code until clicked.
- Image paths were preserved, but image files were not included unless they were uploaded separately.
- `p5.js` and `p5.sound.min.js` were intentionally excluded from this cleaned version.
- `_headers` contains a starter Content Security Policy for Netlify/Cloudflare Pages-style hosts.

After deploying:
1. View the live page source and search for `polyfill`, `cdnjs`, `jsdelivr`, `googleapis`, `w3schools`, and `iframe`.
2. Open DevTools > Network > JS and confirm the only JS loaded is from your own domain.
3. Purge your host/CDN cache.
