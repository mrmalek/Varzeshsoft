# Horizon Properties — Real Estate Website

## Overview
A premium, production-quality real estate agency website built with React + Vite.
Brand: HORIZON PROPERTIES — luxury homes and investment properties.

## Tech Stack
- **Framework:** React 18 + Vite 6
- **Routing:** React Router DOM v6
- **Animations:** Framer Motion (subtle, premium motion)
- **Icons:** Lucide React
- **Fonts:** Outfit (headings) + Inter (body) via Google Fonts
- **Styling:** Single global CSS file with CSS custom properties (design tokens)

## Architecture
```
src/
  main.jsx          — React entry
  App.jsx           — Router + layout (Header, Footer, ScrollToTop)
  index.css         — Design system: tokens, base styles, all component styles
  data/
    properties.js   — Property dataset (8+ properties with full details)
  components/
    Header.jsx      — Sticky transparent→solid nav, mobile menu
    Footer.jsx      — Premium footer with newsletter
    Button.jsx       — Reusable button (primary/outline/gold variants)
    PropertyCard.jsx — Reusable property card
    SectionLabel.jsx — Small gold uppercase label
    ScrollToTop.jsx  — Scroll restoration on route change
    FavoritesContext.jsx — Favorites state via localStorage
  sections/
    Hero.jsx
    About.jsx
    FeaturedProperties.jsx  — Horizontal scroll carousel
    Services.jsx
    WhyChooseUs.jsx
    Team.jsx
    CTA.jsx
  pages/
    Home.jsx
    Properties.jsx         — Browse + filter + search
    PropertyDetail.jsx     — Gallery, details, agent, similar properties
```

## Running Locally
```bash
npm install
npm run dev
```
App served on http://localhost:5173

## Docker (Base44 sandbox)
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
Web entry point mapped to host port 3000.

## Design System
- **Navy:** #0a1929 (deep architectural blue — header, hero, footer, dark sections)
- **Champagne/Gold:** #c9a96e (accents, labels, fine borders, selected states)
- **Ivory:** #faf8f5 (warm off-white backgrounds)
- **Typography:** Outfit for headings (300–800), Inter for body (300–700)
- **Spacing:** Consistent rem-based scale
- **Animations:** Subtle fade-up entrances, image zoom on hover, smooth carousel

## Key Features
- Sticky header with transparent→solid transition on scroll
- Hero with entrance animations and image scale
- Property carousel with drag/swipe + nav arrows + scroll snapping
- Properties page with search, filters (location, type, price, beds, baths), sort
- Property detail pages with image gallery, fullscreen viewer, agent info
- Favorites (saved to localStorage)
- Fully responsive (320px–1440px+)
- Accessible (semantic HTML, keyboard nav, ARIA labels, focus states)
