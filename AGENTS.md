# AI Agents Configuration

This repository, Moduluxe, is optimized for AI-assisted development. This file provides context and permissions for AI coding agents.

## Project Context
- **Name**: Moduluxe
- **Tech Stack**: TypeScript, Vite
- **Security Surface**: Includes Authentication and Payments. Handle sensitive logic with care.

## Permitted Actions
- **File System**: Read all files and create new files specifically within the `src/` directory.
- **Execution**: Run linting and test commands as defined in the package configuration.

## Prohibited Actions
- **Git Operations**: Do not push directly to the `main` branch.
- **Secrets**: Do not attempt to read, modify, or create secrets or environment configuration files.

## Guidelines
- Always follow the existing TypeScript patterns.
- Ensure all new logic in `src/` is modular and maintainable.
