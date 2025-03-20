# Simple Chat

Simple Chat is a lightweight and intuitive AI-powered chat application. It allows users to connect with AI models through webhooks, such as n8n or other providers, to generate responses in real-time.

## Features

- **Modern Frontend**: Built with [React](https://react.dev/) and [shadcn/ui](https://ui.shadcn.com/) for a clean and accessible UI.
- **Fast Build System**: Uses [Vite](https://vitejs.dev/) for efficient bundling and hot module replacement.
- **State Management**: Powered by [TanStack Query](https://tanstack.com/query/latest) for managing API requests and caching.
- **Type Safety**: Written in [TypeScript](https://www.typescriptlang.org/) for a robust development experience.
- **Styling**: TailwindCSS is used for styling, making UI customization easy and scalable.
- **Linting & Formatting**: [Biome.js](https://biomejs.dev/) ensures a clean and consistent codebase.
- **Testing**: Uses [Vitest](https://vitest.dev/) for fast and reliable unit testing.
- **Extensible AI Integration**: Connects to AI models via webhooks, making it easy to integrate with automation tools like n8n.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation
```sh
pnpm install  # or npm install / yarn install
```

### Development
Run the development server:
```sh
pnpm dev  # or npm run dev / yarn dev
```

### Build for Production
```sh
pnpm build  # or npm run build / yarn build
```

### Run Tests
```sh
pnpm test  # or npm run test / yarn test
```

## API Integration
Simple Chat works by sending messages to AI webhooks. You can configure different webhook endpoints to interact with various AI models. Example request:
```ts
fetch('https://your-ai-webhook.com/process', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello, AI!' })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.
