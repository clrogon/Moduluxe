# AGENTS.md — Moduluxe
> Read this file first. Every AI coding agent working on this repository must follow these rules. Detailed rule sets are in `.agents/rules/` — load them on demand as instructed below.

---

## Project Identity

**Moduluxe** is a modular TypeScript application built with Vite, featuring integrated authentication and payment systems.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Vite |
| Language | TypeScript |
| Package manager | **npm** |

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server
npm run build        # production build
npm run lint         # linting
npm test             # testing
```

---

## Mandatory Pre-Task Rules

Before writing a single line of code, load the relevant rule files:

| Task type | Load this rule file |
|---|---|
| ANY task | `.agents/rules/NON_NEGOTIABLE.md` — always load first |
| Auth or Payments | `.agents/rules/NON_NEGOTIABLE.md` — check security section |

---

## Permissions

### ✅ Allowed without asking
- Run tests
- Run lint
- Read all files
- Create files in src/

### ⚠️ Ask first
- Any action not explicitly listed in 'Allowed'
- Adding new dependencies
- Significant architectural changes

### 🚫 Never do
- Push to main
- Modify secrets
- Hardcode credentials

---

## PR Format

Title: `<type>(<scope>): <description>`
Examples: `feat(auth): add login validation`, `fix(ui): resolve button alignment` (Uses Conventional Commits)

Every PR must confirm:
- [ ] Linter passes
- [ ] Type checks pass (`tsc --noEmit`)
- [ ] Relevant tests pass
- [ ] `CHANGELOG.md` updated under `[Unreleased]`
- [ ] Docs updated if any public behavior changed

---

*This file is version-controlled. Add a new rule here the second time you correct the same agent mistake — not the first.*
