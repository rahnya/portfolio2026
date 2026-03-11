# Portfolio V1 — Rahnya Lanyeri

A modern, dark-themed developer portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Home page (Hero, About, Skills, Experience)
│   ├── projects/
│   │   ├── page.tsx            # Projects grid with filters
│   │   └── [slug]/page.tsx     # Project detail page
│   ├── lab/
│   │   ├── page.tsx            # Lab experiments (Pinterest grid)
│   │   └── [slug]/page.tsx     # Lab entry detail
│   ├── appearances/
│   │   ├── page.tsx            # Appearances moodboard (grayscale → color hover)
│   │   └── [slug]/page.tsx     # Appearance detail
│   ├── contact/page.tsx        # Contact form + direct links
│   └── recommendations/page.tsx # Recommendation letters download
│
├── components/
│   ├── LangContext.tsx         # EN/FR language context + hook
│   ├── Navbar.tsx              # Responsive navbar with language switcher
│   └── Footer.tsx              # Footer with nav, socials, downloads
│
├── data/
│   ├── translations.json       # All text content (EN + FR)
│   ├── projects.json           # Projects data (easily editable)
│   ├── lab.json                # Lab experiments data
│   ├── appearances.json        # Media appearances data
│   └── recommendations.json   # Recommendation letters metadata
│
├── public/
│   └── cv/                     # Place CV and recommendation PDFs here
│       ├── cv.pdf
│       ├── recommendation-laurent.pdf
│       └── recommendation-mercier.pdf
│
└── styles/
    └── globals.css             # Global styles, animations, fonts
```

## 🎨 Design System

**Color Palette:**
- `#0D1B2A` — Deep background
- `#183153` — Navy (card backgrounds)
- `#373750` — Dark purple
- `#FF3B8D` — Hot pink (primary accent)
- `#FF96B3` — Light pink
- `#D0A8BC` — Muted rose
- `#8A6F9B` — Purple
- `#FFC72C` — Yellow (highlight)

**Fonts (via Google Fonts):**
- **Syne** — Display/headings (bold, geometric)
- **DM Sans** — Body text (clean, readable)
- **DM Mono** — Code, labels, tags

## ✏️ Customization

### Add a Project
Edit `data/projects.json` — add an object following the existing schema.

### Add a Lab Entry
Edit `data/lab.json` — add an object with `slug`, `color`, `en`, and `fr` fields.

### Add an Appearance
Edit `data/appearances.json` — add an object with `slug`, `type`, `en`, and `fr` fields.

### Change Personal Info
Edit `data/translations.json` — update name, title, description, etc.

### Add CV/PDFs
Place files in `public/cv/`. The `cv.pdf` file is linked from the CV download buttons throughout the site.

## 🌍 Language System

The site supports **English** (default) and **French**. Language is managed via React Context (`LangContext.tsx`). All text content lives in `data/translations.json`.

## 📱 Responsive

Fully responsive for mobile, tablet, and desktop.

## 🚢 Deployment

Deploy instantly to Vercel:
```bash
npx vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com).
