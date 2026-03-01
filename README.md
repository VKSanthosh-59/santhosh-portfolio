# Santhosh

Personal portfolio website for a Data Scientist / Analyst job seeker.

## Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript — no frameworks or build tools required
- Google Fonts: Sora + JetBrains Mono
- Deployed as a static site (GitHub Pages, Netlify, or Vercel)

## Project Structure

```
Portfolio/
├── index.html          # Single-page layout with all sections
├── css/
│   └── style.css       # Full design system (variables, components, responsive)
├── js/
│   └── main.js         # Navbar scroll, hamburger, scroll-reveal, spotlight effects
├── README.md
├── .gitignore
└── LICENSE
```

## Features

- Dark theme with ambient glow effects and grain texture overlay
- Bento grid skills layout with mouse-tracking spotlight on cards
- Scroll-triggered fade-up animations via IntersectionObserver
- Glassmorphic frosted navbar with active-link highlighting
- Responsive: mobile, tablet, desktop
- Custom thin scrollbar styling
- Accessible: ARIA attributes, reduced-motion support, semantic HTML

## Running Locally

Open `index.html` directly in a browser, or serve with any static file server:

```bash
# Python
python -m http.server 3000

# Node (npx)
npx serve .
```

## Deployment (GitHub Pages)

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages → Source: Deploy from a branch**
3. Select `main` branch, root folder `/`
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## License

MIT — see [LICENSE](LICENSE)
