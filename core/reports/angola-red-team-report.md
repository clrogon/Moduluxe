# Moduluxe Angola Market Red Team Report

## Mission
Emulate adversarial behavior (fraudster, malicious insider, opportunistic attacker) against business and product workflows relevant to Angola operations.

## Attack Surface Overview
- Property listing lifecycle
- Invoice generation/distribution
- Tenant identity and contact handling
- Payment status transitions
- Internal back-office access patterns

## Adversarial Scenarios

### RT-01: Fake owner listing scam
**Path:** Attacker uploads attractive listing, collects off-platform reservation payments, disappears.

**Observed weakness:** If listing publication is not identity-gated, attacker can weaponize urgency.

**Business impact:** Brand damage, legal complaints, regulator attention.

**Controls:**
- Ownership evidence checks before listing goes live.
- New-account throttling and risk scoring.
- In-app anti-fraud banners discouraging off-platform deposits.

---

### RT-02: Invoice phishing and social engineering
**Path:** Attacker clones invoice format and contacts tenant via WhatsApp/email with changed bank details.

**Observed weakness:** Static invoice identity elements can be imitated.

**Controls:**
- Signed invoice verification link (one-click authenticity check).
- Tenant-facing “known beneficiary account” vault.
- Forced comms policy: payment details only in verified channel.

---

### RT-03: Insider manipulation of payment status
**Path:** Staff account changes payment status without proof, enabling embezzlement or favoritism.

**Observed weakness:** Weak segregation of duties and insufficient audit trail.

**Controls:**
- Dual control for status changes above threshold value.
- Tamper-evident event log with actor, reason code, and attachment.
- Weekly anomaly report on manual overrides.

---

### RT-04: PII leakage through exported documents
**Path:** Invoices/reports containing phone and email are widely shared.

**Observed weakness from current implementation:** invoice PDF includes email and phone directly.

```ts
// SECURITY WARNING: Invoice PDFs expose full tenant contact PII (email/phone) by default; distribute least-data versions and role-gate exports.
```

**Controls:**
- Role-based redacted export mode.
- Watermark with recipient identity.
- DLP policy for bulk exports.

---

### RT-05: Environment misconfiguration denial of service
**Path:** Missing critical env values causes null client paths and downstream failures.

**Observed weakness from current implementation:** client creation can become `null`, requiring defensive checks everywhere.

```ts
// SECURITY WARNING: Null client fallback can lead to unpredictable failure modes; fail-fast with explicit startup validation and health checks.
```

**Controls:**
- Startup configuration validator.
- Health endpoint/boot diagnostics.
- Deployment gate blocking missing env.

## Red Team Severity Register
| Scenario | Likelihood | Impact | Severity |
|---|---:|---:|---:|
| RT-01 Fake listing | High | High | Critical |
| RT-02 Invoice phishing | High | High | Critical |
| RT-03 Insider status abuse | Medium | High | High |
| RT-04 PII document leakage | Medium | Medium/High | High |
| RT-05 Config DoS | Medium | Medium | Medium |

## Priority Countermeasures (First 60 Days)
1. Listing verification + trust signals.
2. Signed invoice authenticity mechanism.
3. Segregation-of-duties for payment overrides.
4. Redacted PDF export profile by role.
5. Mandatory startup config validation.

## Verdict
Primary risk is trust exploitation through social engineering and weak process controls, not purely technical exploitation. Counter-fraud product design is mandatory for Angola scale-up.
