# Contributing to Moduluxe

Thank you for your interest in contributing to Moduluxe! We welcome contributions from the community to help improve this real estate dashboard for the Angolan and International markets.

## Code of Conduct

Please be respectful and considerate in your interactions. We strive to maintain a welcoming and inclusive environment.

## How to Contribute

1.  **Fork the Repository**: Create your own copy of the project.
2.  **Create a Branch**: Use a descriptive name (e.g., `feature/add-map-view` or `fix/invoice-typo`).
3.  **Make Changes**: Implement your feature or fix.
4.  **Test**: Ensure your changes work as expected and don't break existing functionality.
5.  **Commit**: Use clear and concise commit messages.
6.  **Push**: Upload your branch to your fork.
7.  **Pull Request**: Submit a PR to the `main` branch of the original repository.

## Coding Standards

*   **TypeScript**: All code must be strictly typed. Avoid `any` wherever possible.
*   **React**: Use Functional Components and Hooks. Avoid Class components.
*   **Tailwind CSS**: Use utility classes for styling. Avoid inline styles or separate CSS files unless necessary for global overrides.
*   **Security**:
    *   Validate all inputs.
    *   Do not hardcode secrets or API keys.
    *   Ensure PII is handled according to GDPR/Angolan Data Protection Law.
*   **Localization**: Do not hardcode text. Use the `useTranslation` hook and add keys to `core/i18n/locales/`.

## Directory Structure

*   `core/`: Main app logic (App.tsx, Auth, Contexts, Shared Components).
*   `modules/`: Feature-specific logic (Analytics, Houses, Payments, etc.).
*   `shared/`: Types and utilities shared across the app.
*   `components/ui/`: Reusable UI atoms (Buttons, Modals, Icons).

## Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub with a detailed description and steps to reproduce.
