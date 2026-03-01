# Non-Negotiable Rules for AI Agents

These rules must be followed at all times without exception. Any deviation may result in build failures or security risks.

## 1. Commit Style
- All commits must follow the **Conventional Commits** specification (e.g., `feat:`, `fix:`, `docs:`, `chore:`).

## 2. Branch Management
- Direct pushes to the `main` branch are strictly forbidden. All changes must be proposed via pull requests or feature branches.

## 3. Secret & Credential Safety
- Do not modify, log, or expose secrets, API keys, or `.env` files. If a task requires secret configuration, request human intervention.

## 4. File Creation Scope
- AI-generated files should be localized to the `src/` directory. Do not add files to the root or configuration directories unless explicitly instructed.
