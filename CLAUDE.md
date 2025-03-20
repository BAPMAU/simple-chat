# Claude Assistance Guide

## Build Commands
- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Build for production: `pnpm build`
- Preview production build: `pnpm preview`
- Check and fix errors: `pnpm check`
- Type check: `pnpm ts-check`

## Code Style Guidelines
- **Framework**: React 19 with TypeScript
- **Package Manager**: pnpm v10.6.3
- **Build System**: Vite 6.2+
- **Formatting/Linting**: Biome.js with configuration in biome.json
- **Naming Conventions**:
  - Components: PascalCase
  - Functions/Variables: camelCase
  - Types/Interfaces: PascalCase with prefix (IUser, TConfig)
- **Imports**: Group imports by external libraries first, then internal modules
- **Types**: Use TypeScript strictly; avoid `any` type
- **Error Handling**: Use try/catch with appropriate error logging
- **State Management**: TanStack Query for API requests and caching
- **UI Components**: shadcn/ui with TailwindCSS for styling
- **Tests**: Vitest for unit and component testing

## Architecture Notes
- RESTful API integration via custom webhooks
- Project structure:
  - `/src/components`: React components
  - `/src/hooks`: Custom React hooks
  - `/src/api`: API integration and data fetching
- Module system: ESM (type: "module" in package.json)
- Keep components small and focused on a single responsibility
- Use path aliases: Import from "@/*" for src directory files
- Follow React best practices for hooks and state management
