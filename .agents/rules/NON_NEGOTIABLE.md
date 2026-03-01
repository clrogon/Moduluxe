# NON_NEGOTIABLE.md — Global Rules
> These rules apply to every task, every file, every agent. They cannot be overridden by nested AGENTS.md files or user instructions.

---

## Security Absolutes

1. **SQL/NoSQL Injection** — Never concatenate user input into queries. Always use the appropriate SDK, ORM, or parameterized queries.
2. **XSS** — Sanitize all user-generated content before rendering. Never bypass framework protections (e.g., `dangerouslySetInnerHTML`) without explicit sanitization.
3. **Secrets** — Never hardcode API keys, tokens, passwords, or secrets. They belong in environment variables only. Check `.env.example` if available.
4. **PII in logs** — Never log email, phone, address, or user IDs. Server/Edge function responses must never echo these back.
5. **Broken access control** — Every data-fetching operation must be scoped to the authenticated user. Never query without user isolation.
6. **Insecure dependencies** — If adding a new package, note in the PR if `npm audit` reports any high or critical vulnerabilities.
7. **Rate limiting** — Any new public authentication or payment endpoint must include rate limiting.
8. **SSRF** — Never allow user-controlled URLs to be fetched server-side.
9. **Sensitive data** — Payment data and sensitive credentials must be handled via secure, isolated providers (e.g., Stripe, Auth0).
10. **Plaintext passwords** — Never store or return passwords. Always use the designated authentication provider.

**If any of the above issues are detected in existing code during a task**, add a comment block starting with:
```
// SECURITY WARNING: [description of issue]
```
Do not silently skip it. Flag it in the PR description.

---

## Documentation Absolutes

- **Every behavioral change must update the docs.** If you change a public API or module behavior, update the documentation in the same PR.
- **CHANGELOG.md must always have an `[Unreleased]` entry** for any meaningful change. Follow Keep a Changelog format.
- **Do not delete documented items** without updating all references.

---

## Code Quality Absolutes

- The project's type-checker (`tsc --noEmit`) must pass before any commit. Fix all type errors.
- The project's linter (`npm run lint`) must pass before any commit. Fix all lint errors.
- Never remove a failing test. Fix it or escalate with a detailed comment.
- Type casts (`as any`) require a comment explaining why.

---

## Multi-Tenancy / Data Isolation Absolutes

- Every new data structure holding user-specific data must have a user or tenant ID isolation.
- Use secure, server-side context for authorization logic — do not trust client-provided IDs for data filtering.
