# Moduluxe Angola-Focused Code Audit Report

## Scope
Targeted review of key files related to data access and financial document generation:
- `core/lib/supabaseClient.ts`
- `core/services/pdfService.ts`
- `modules/houses/houses.service.ts`

## Method
- Static review for security, reliability, and market fitness (Angola operations).
- Focus on authentication boundaries, PII handling, and payment-document integrity.

## Findings

### 1) Startup config resilience is weak (Medium)
**File:** `core/lib/supabaseClient.ts`

The client is exported as `null` when env vars are absent. This avoids crash but shifts failure downstream unpredictably.

**Risk:** Runtime null dereference paths, partial app behavior, harder incident diagnosis.

**Recommendation:** Fail fast on boot in production with explicit actionable error and health diagnostics.

---

### 2) PII overexposure in invoice PDF defaults (High)
**File:** `core/services/pdfService.ts`

Invoice generation includes tenant name, email, and phone in plaintext by default.

**Risk in Angola context:** Documents are frequently forwarded in informal channels; unnecessary PII propagation raises privacy and fraud risk.

**Recommendation:**
- Add `redacted` export mode by role.
- Mask phone/email unless explicit legal/accounting need.
- Add document watermark and access policy.

```ts
// SECURITY WARNING: Default invoice export includes unnecessary tenant PII; implement least-privilege redaction and role checks.
```

---

### 3) Mock house service has no authorization or persistence semantics (Low currently, High if reused in prod)
**File:** `modules/houses/houses.service.ts`

Service methods return mocked values with no user/tenant scoping.

**Risk:** If pattern is copied into production endpoint logic, creates broken access control exposure.

**Recommendation:** Document as test-only/mock-only and enforce server-side tenant isolation in real implementations.

```ts
// SECURITY WARNING: Any production adaptation must enforce authenticated tenant scoping for all house CRUD operations.
```

---

## Strengths Observed
- Currency rendering already uses `pt-AO` and `AOA` formatting in report/invoice outputs, which aligns with Angola localization expectations.
- Code comments indicate intent to avoid crash on missing env, showing reliability awareness.

## Remediation Backlog
| Priority | Action | Owner |
|---|---|---|
| P0 | Implement startup env validation and fail-fast strategy | Full-stack |
| P0 | Add role-based redacted invoice export and watermarking | Full-stack + Compliance |
| P1 | Define payment override workflow with immutable audit trail | Audit/Operations |
| P1 | Add secure production data service contract for houses with tenant scoping | Backend |
| P2 | Add automated tests for PII redaction and config validation | QA/Engineering |

## Compliance/Audit Conclusion
Current code is suitable as an early-stage foundation, but requires privacy-by-default exports and stronger configuration controls before high-volume Angola deployment.
