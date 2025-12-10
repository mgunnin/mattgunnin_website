# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Matt Gunnin built with React 19, Vite, and TypeScript. Features an AI-powered chat interface ("Ella") using Google's Gemini API with function calling capabilities.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server on port 3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Environment Variables

Create `.env.local` with:
```
GEMINI_API_KEY=your_key_here
VITE_PUBLIC_POSTHOG_KEY=your_posthog_key
VITE_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## Architecture

### File Structure
- `index.html` - Entry point with Tailwind CDN config and importmaps
- `index.tsx` - React root with PostHog analytics provider
- `App.tsx` - Main app with hash-based routing and section management
- `types.ts` - All TypeScript interfaces
- `components/` - React components (23 components)
- `services/geminiService.ts` - Gemini AI integration with function calling

### Routing
Uses hash-based routing (`window.location.hash`) for navigation:
- `/` - Home (scrollable sections)
- `/#/book` - Booking page
- `/#/blog` - Blog standalone view
- `/#/case-studies` - Case studies standalone view
- `/#/sitemap` - Sitemap

### Styling
- Tailwind CSS loaded via CDN (configured in `index.html`)
- Custom cyberpunk color theme: `cyber-black`, `cyber-primary` (#00f0ff), `cyber-secondary` (#7000ff), `cyber-accent` (#ff003c)
- Custom animations: `glow`, `float`
- Glass panel effect via `.glass-panel` class

### AI Integration (services/geminiService.ts)
- Uses `@google/genai` SDK
- Three cognitive modes: `STRATEGIC`, `TECHNICAL`, `CASUAL`
- Function declarations for agentic behavior:
  - `navigate_site` - Scroll to sections
  - `download_resume` - Trigger resume download
  - `copy_email` - Copy email to clipboard
  - `book_meeting` - Navigate to booking
  - `generate_image` - AI image generation
- Lab demos: agent architecture generation, prompt optimization, context compression, RAG analysis, esports predictions

### Key Components
- `NeuralInterface.tsx` - AI chat drawer with Ella assistant
- `AIChat.tsx` - Chat interface handling streaming and function calls
- `Lab.tsx` - Interactive AI demos
- `Hero.tsx`, `About.tsx`, `Resume.tsx`, `Projects.tsx` - Portfolio sections

### Path Alias
`@/` maps to project root (configured in `vite.config.ts`)
