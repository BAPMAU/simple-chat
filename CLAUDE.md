# Claude Assistance Guide

## Build Commands
- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Build for production: `pnpm build`
- Preview production build: `pnpm preview`
- Check and fix errors: `pnpm check`
- Type check: `pnpm ts-check`
- Run tests: `pnpm test`
- Run tests in watch mode: `pnpm test:watch`

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
  - Add new components: `pnpm dlx shadcn@latest add <component-name>`
  - Components are added to `src/components/ui/`
  - Customize components through Tailwind classes
- **Tests**: Vitest for unit and component testing
  - Use data-test-id attributes for test selectors instead of relying on roles
  - Example: `<button data-test-id="submit-button">Submit</button>`
  - Access in tests with `screen.getByTestId('submit-button')`

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
