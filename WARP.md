# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Matt Gunnin's personal portfolio website - a React-based single-page application with an AI-powered neural interface (Ella). Built with Vite, React 19, TypeScript, and Google's Gemini AI.

**Live App:** https://ai.studio/apps/drive/1LqYprB_MVMtCsUJHZTkhcFBfaPRWdrBZ

## Development Commands

### Setup
```bash
npm install
```

### Environment Configuration
Create `.env.local` in the root with:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development Server
```bash
npm run dev
```
Runs on `http://localhost:3000` (configured in vite.config.ts)

### Production Build
```bash
npm run build
```
Output goes to `dist/`

### Preview Production Build
```bash
npm preview
```

## Architecture

### Core Application Flow

**App.tsx** is the main orchestrator managing:
- **Routing modes:** `home`, `booking`, `blog`, `case-studies`, `sitemap` via hash routing (`window.location.hash`)
- **Section scrolling:** Smooth scroll to sections using element IDs
- **Mobile menu:** Responsive overlay navigation
- **Page state:** Tracks current section for navigation highlighting

### Key Architectural Patterns

1. **Single Page Application with Hash Routing**
   - Uses `window.location.hash` for routing in restricted/sandboxed environments (Blob URLs, AI Studio)
   - Fallback to pathname for standard environments
   - All routes handled client-side without server routing

2. **Component Structure**
   - **Layout Components:** `Background`, `Navigation`, `Cursor`, `Footer`
   - **Section Components:** Each major section is a standalone component (`Hero`, `About`, `Resume`, `Projects`, etc.)
   - **Standalone Pages:** `Booking`, `Blog` (has both embedded and standalone modes), `CaseStudies` (standalone mode), `Sitemap`
   - **AI Interface:** `NeuralInterface` (Ella - the AI assistant), `AIChat`

3. **AI Integration (Gemini)**
   - **Service Layer:** `services/geminiService.ts` manages all Gemini API interactions
   - **Agentic Behavior:** Function calling tools enable AI to:
     - Navigate site sections (`navigate_site`)
     - Download resume (`download_resume`)
     - Copy email (`copy_email`)
     - Book meetings (`book_meeting`)
     - Generate images (`generate_image`)
   - **Cognitive Modes:** Three distinct AI personalities:
     - `STRATEGIC` - Business/VC focused (uses `gemini-3-pro-preview` with thinking)
     - `TECHNICAL` - Engineering/CTO focused (uses `gemini-3-pro-preview` with thinking)
     - `CASUAL` - Conversational (uses `gemini-2.5-flash`)
   - **Session Management:** Chat history persists across mode switches

4. **Type System**
   - **Central types file:** `types.ts` contains all shared interfaces
   - Key types: `Project`, `CaseStudy`, `Resource`, `BlogPost`, `SpeakingEngagement`, `ChatMessage`, `AgentNode`, lab demo result types
   - Strict TypeScript configuration in `tsconfig.json`

### Environment Variables

The app uses Vite's environment variable system:
- API key is read from `process.env.GEMINI_API_KEY` (set in `.env.local`)
- Vite config defines both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` for backwards compatibility

### Styling & Design

- **Tailwind CSS:** All styling uses utility classes (no separate CSS files)
- **Theme:** Cyberpunk/futuristic aesthetic with custom color classes like `cyber-primary`, `cyber-black`
- **Animations:** Framer Motion for smooth transitions
- **Custom Cursor:** Desktop-only custom cursor implementation
- **Responsive:** Mobile-first design with breakpoint utilities

### Component Conventions

- All major sections use an `id` attribute matching their route name (e.g., `<section id="projects">`)
- Standalone mode components accept props like `standalone={true}` to adapt layout
- Components that need to navigate use hash-based routing: `window.location.hash = '/path'`

## Critical Implementation Notes

### When Adding New Sections
1. Add section to `navItems` array in App.tsx
2. Create component in `components/` directory
3. Import and render in main section of App.tsx
4. Add section ID to scroll tracking in `handleScroll` function
5. Ensure section has proper `id` attribute for scroll targeting

### When Modifying AI Behavior
- Update system instructions in `getSystemInstruction()` in geminiService.ts
- Add new function tools to the function declarations array
- Update cognitive mode logic if adding new modes
- Test across all three modes (STRATEGIC, TECHNICAL, CASUAL)

### When Adding New Routes
1. Add route handling in `checkRoute()` function in App.tsx
2. Add new page mode to the `pageMode` type union
3. Create conditional render in main return statement
4. Use hash-based routing: `window.location.hash = '/new-route'`

### Path Alias
- `@/` resolves to project root (configured in vite.config.ts and tsconfig.json)
- Use for imports: `import { Type } from '@/types'`

## Dependencies

**Core:**
- React 19.2.1 with React DOM
- TypeScript ~5.8.2
- Vite 6.2.0

**Key Libraries:**
- `@google/genai` - Google Gemini AI SDK
- `framer-motion` - Animation library
- `lucide-react` - Icon library

## Testing

No test framework is currently configured. When adding tests:
- Install testing library of choice (recommend Vitest + React Testing Library)
- Add test scripts to package.json
- Create test files adjacent to components: `ComponentName.test.tsx`

## Deployment

This app is designed to run in AI Studio's environment but can be deployed anywhere that supports static React apps:
- Build with `npm run build`
- Serve the `dist/` directory
- Ensure environment variable `GEMINI_API_KEY` is set in deployment environment
- No server-side rendering required
