# Moduluxe Angola Market Pre-Mortem Report

## Objective
Assume the Angola launch fails within 12 months. This report identifies likely failure modes, early warning indicators, and prevention controls.

## Scenario Definition
- **Market context:** Luanda-heavy demand concentration, kwanza volatility, variable internet quality, and mixed digital payment adoption.
- **Business model in scope:** property listings, leasing workflows, invoicing, financial reporting, and tenant/landlord communication.

## Top Failure Modes (Pre-Mortem)

### 1) Payment rail mismatch with local behavior
**Failure story:** Users abandon invoices because payment completion flow does not match preferred channels (Multicaixa Express, local transfers, agent-assisted payment confirmation).

**Why plausible in Angola:** Many users rely on mobile-first and domestic rails; friction in reconciliation creates trust loss.

**Early signals:**
- Invoice issued-to-paid conversion drops below 55%.
- >20% of payments marked as pending after 72 hours.
- Support tickets mention “proof of transfer uploaded but not confirmed.”

**Preventive controls:**
- Add payment status state machine with explicit reconciliation states.
- Add operator workflow for transfer proof verification.
- Send payment reminders in Portuguese with local instructions.

---

### 2) Currency/price instability undermines trust
**Failure story:** Rent and reports in AOA are inconsistent across screens, causing dispute between tenant and landlord.

**Why plausible:** FX pressure and frequent repricing can amplify small formatting/rounding issues.

**Early signals:**
- Disputes referencing “different total” across invoice vs report.
- Adjustments/refunds >5% of monthly billed value.

**Preventive controls:**
- Enforce single pricing source-of-truth and rounding policy.
- Store currency + exchange metadata per invoice snapshot.
- Add dispute audit trail with immutable timestamps.

---

### 3) Weak tenant/landlord verification causes fraud listings
**Failure story:** Fake listings or spoofed owners reduce platform credibility.

**Early signals:**
- Sudden growth in listing takedown requests.
- Increase in duplicate properties by address/phone pattern.

**Preventive controls:**
- KYC-lite identity verification and ownership evidence flow.
- Risk scoring for new listings before public publication.
- Manual moderation queue for high-risk listings.

---

### 4) Operational fragility under low-connectivity conditions
**Failure story:** Agents in the field cannot complete workflows reliably; data loss perceived.

**Early signals:**
- Spike in form abandonment on property/contract screens.
- User reports of duplicate submissions and timeout loops.

**Preventive controls:**
- Autosave drafts and optimistic UI with retry queue.
- Lightweight payloads and graceful offline handling.
- Localized error messaging and recovery actions.

---

### 5) Compliance and evidence gaps during dispute resolution
**Failure story:** The platform cannot present defensible record history for payment and occupancy disputes.

**Early signals:**
- Legal escalations requiring manual reconstruction of records.
- Missing invoice/contract linkage in back-office checks.

**Preventive controls:**
- Immutable audit log policy for critical state changes.
- Standardized document templates and retention controls.
- Role-based access with explicit action attribution.

## Risk Matrix (12-month horizon)
| Risk | Probability | Impact | Priority |
|---|---:|---:|---:|
| Payment rail mismatch | High | High | Critical |
| Currency inconsistency | Medium | High | High |
| Fraud listings | Medium | High | High |
| Connectivity fragility | High | Medium | High |
| Compliance evidence gaps | Medium | High | High |

## 90-Day Prevention Plan
1. **Weeks 1–3:** Payment reconciliation workflow + local instruction templates.
2. **Weeks 2–5:** Pricing consistency checks and invoice snapshot metadata.
3. **Weeks 4–8:** Listing trust controls (verification + moderation).
4. **Weeks 6–10:** Offline resilience improvements and retry semantics.
5. **Weeks 8–12:** Audit evidence hardening and dispute runbooks.

## Executive Verdict
Without localization of payment operations, evidence controls, and low-connectivity resilience, Angola expansion is likely to fail due to trust erosion rather than demand shortage.
