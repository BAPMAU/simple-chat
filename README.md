# Simple Chat

Simple Chat is a lightweight and intuitive chat application for IA conversation. It allows users to connect with AI models through webhooks, such as n8n or other providers, to generate responses in real-time.

![screenshot](https://github.com/BAPMAU/simple-chat/blob/main/example.png?raw=true)

## Next Steps
- Dockerize the application for easy deployment.
- Implement user authentication and authorization.
- Documentation for API endpoints and usage.
- Any ideas ?

## Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation
```sh
pnpm install
```

### Development
Run the development server:
```sh
pnpm dev
```

### Build for Production
```sh
pnpm build
```

### Run Tests
```sh
pnpm test
```

## Stack

- **Modern Frontend**: Built with [React](https://react.dev/) and [shadcn/ui](https://ui.shadcn.com/) for a clean and accessible UI.
- **Fast Build System**: Uses [Vite](https://vitejs.dev/) for efficient bundling and hot module replacement.
- **State Management**: Powered by [TanStack Query](https://tanstack.com/query/latest) for managing API requests and caching.
- **Type Safety**: Written in [TypeScript](https://www.typescriptlang.org/) for a robust development experience.
- **Styling**: TailwindCSS is used for styling, making UI customization easy and scalable.
- **Linting & Formatting**: [Biome.js](https://biomejs.dev/) ensures a clean and consistent codebase.
- **Testing**: Uses [Vitest](https://vitest.dev/) for fast and reliable unit testing.


## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.
