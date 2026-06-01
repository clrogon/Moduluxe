# Moduluxe Real Estate Dashboard

**Moduluxe** is a high-performance, Domain-Driven Design (DDD) property management platform designed originally for the Angolan real estate market with global extensibility. It utilizes a robust, decoupled **Strategy Pattern** across multiple subdomains to handle data persistence, financial report generation, and bank transactions reconciliation without hard-coding specific database engines or document structure logic.

---

## 🎨 System Design & Architecture Overview

The system adheres strictly to the principles of **Domain-Driven Design (DDD)** and the GoF **Strategy Pattern**. This ensures complete decoupling of the Domain Model from external infrastructures (such as databases, file parsers, and template renderers).

```
          [ Admin Panel / CRM Views / Reporting UI ]
                               |
                               v
                     [ Domain Engine Core ]
                               |
        +----------------------+----------------------+
        |                      |                      |
        v                      v                      v
[ Persistence Strategy ] [ Parsing Strategy ]  [ Export Strategy ]
  - In-Memory Sandbox     - Standard CSV        - Professional PDF
  - LocalStorage Cache    - Regional Semicolon  - Spreadsheet CSV
  - Supabase Live Cloud   - Multicaixa OCR      - Structural JSON
```

---

## 🧠 Domain-Driven Subdomains & Strategy Contexts

Our domain boundaries are mapped systematically to guarantee complete extensibility and client adaptability:

### 16. Persistence Subdomain (`core/domain/persistence`)
Governed by the `IPersistenceStrategy` contract, the application isolates core entity states from raw network layers. The workspace can run in three different database profiles without any UI impact:
*   **In-Memory Sandbox Strategy**: Stores all parameters inside transient JavaScript maps. Updates survive view changes but are wiped upon page refresh. Useful for zero-touch client validation.
*   **Local Web Storage Strategy**: Default persistence profile. Encodes real estate entities safely into client-side browser storage, preserving state across sessions.
*   **Supabase PostgreSQL Cloud Strategy**: Connects to live production databases. Translates local entity updates into secure relational commands over client-side REST APIs.

### 2. Reconciliation & Parsing Subdomain (`core/domain/reconciliation`)
Translates bank statements into standardised transactional lists using `IReconciliationStrategy`:
*   **Standard CSV Parsing Strategy**: Interprets comma-delimited numeric records.
*   **Regional Semicolon CSV Strategy**: Specially calibrated for Angolan and European banking systems (BAI, BFA, Millennium). Accurately translates regional Portuguese-style floating-point numbers (e.g., swapping dots and decimal commas).
*   **Multicaixa Slip OCR Strategy**: Converts raw digital receipt OCR strings into standardized transaction nodes dynamically.

### 3. Reporting & Export Subdomain (`core/domain/reporting`)
Standardizes document compiler routines through `IExportStrategy`, mapping financial data points into custom file types:
*   **Professional PDF Strategy**: Renders high-fidelity, printable PDF tables.
*   **Spreadsheet CSV Strategy**: Translates columns into standard UTF-8 CSV downloads.
*   **Structured JSON Strategy**: Extracted into readable machine-schema formats.

---

## 🔒 Lease Validation & Automation Guards

Moduluxe implements automated protection policies directly within the contracts domain:

### 🛡️ Real-Time Contract Overlap Guard
When generating or modifying a lease inside `ContractForm`, the domain engine verifies overlapping reservation ranges. If a conflict occurs (i.e. another active or pending contract is already assigned to the same property during the selected dates), a visual overlapping alert card is displayed and the system prompts for explicit confirmation before committing.

### ⚡ 30-Day Lease Expiration Proactive Reminder Rule
Configured under the Automations workspace, this event-driven handler constantly checks for leases concluding in exactly 30 days. When triggered, it logs a system notification and dispatches an automated reminder instruction to the property manager to coordinate renewal opportunities.

---

## 🚀 Technical Directory Roadmap

```
├── core/
│   ├── domain/               <-- Absolute Domain Separation Layer
│   │   ├── persistence/      <-- Database Strategy Implementations
│   │   ├── reconciliation/   <-- Statement Parsing Strategy Contexts
│   │   └── reporting/        <-- Financial Document Strategy Registry
│   ├── hooks/                <-- Rehydrated state handlers
│   └── i18n/                 <-- Multi-regional Language Context
├── modules/
│   ├── automations/          <-- Rules engine & Expiry checkers
│   └── bank-reconciliation/  <-- Transaction allocation boards
```

---

## 📄 License & Compliance

Licensed under the standard MIT License. Designed with enterprise-grade modular decoupling in compliance with the Clean Architecture paradigm.
