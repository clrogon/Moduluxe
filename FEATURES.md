# Modular Feature Specifications

This document outlines the operational capabilities of the **Moduluxe Real Estate Dashboard**, focused on its Strategy-driven features and Domain-driven layers.

---

## ⚡ Multi-Engine Persistence Subsystem (Advanced Tab Settings)
Located under **Settings ➔ Advanced**, the dashboard allows on-the-fly toggling between different persistence strategies. Each strategy operates within its own isolation context:

### 1. In-Memory Sandbox Mode
*   **Target Use-Case**: Transient, isolated client validations or quick sandboxed playground evaluations.
*   **Behavior**: Creates an ephemeral virtual partition in JavaScript memory. Changes to houses, clients, contracts, and payments are lost immediately upon reloading the browser tab.

### 2. Local Web Storage Mode
*   **Target Use-Case**: Standard, non-intrusive local development or single-device staging testing.
*   **Behavior**: Serializes collection streams safely to local storage keys (`moduluxe_strategy_`). Persisted entities survive page reloads, browser crashes, and machine restarts.

### 3. Supabase Cloud Connection Mode
*   **Target Use-Case**: Live multi-user operational sync.
*   **Behavior**: Communicates directly with backend schemas over client-side REST modules. Connects to real tables including `houses`, `profiles`, `bookings`, `contracts`, `payments`, and `maintenance_requests`.

---

## 💸 Bank Statement Parsing & Reconciliation Strategies
Our financial ledger system completely isolates statement formats using the dynamic pattern matching engine:

### 15. Standard CSV (Comma Delimited)
*   **Profile**: Designed for international US Common csv statement formats.
*   **Precision Parsing**: Filters out header labels, cleans decimal separators, or logs transaction ids.

### 2. Regional Semicolon CSV (BFA/BAI Portuguese Layouts)
*   **Profile**: Tailored for Angolan banks such as BFA, BAI, and Millennium.
*   **Formatting Translation**: Resolves Portuguese banking notations where thousands are divided by points and cents are separated by commas (e.g. converting `1.250.500,00` to a parseable float value `1250500.00`).

### 3. Multicaixa Express OCR Text String Parser
*   **Profile**: Allows copy-pasting raw digital ticket extracts into the bank statement pool.
*   **Attributes Parsed**: Instantly matches Transaction ID, IBAN numbers, Transfer Date, Sender name, and numerical Kwanza amounts.

---

## 📅 Contract Safeguards & Automation Rules

### 1. Date Overlap Lock
*   **Safety Trigger**: Activates whenever you save, edit, or append a lease inside `ContractForm`.
*   **Verification Check**: Checks for any non-terminated contracts on the same physical property. If the desired start or end date falls inside another active contract's lease timeline, an amber warning notification is rendered dynamically, describing the conflict (dates and current tenant) to prevent double occupancy.

### 2. 30-Day Expiration Automation Rule
*   **Automation Profile**: Seeded under active system behaviors.
*   **Logic**: Monitors existing leases for an expiration milestone exactly 30 days away. When satisfied, it routes alert payloads, registers audit entries, and advises the property manager to start renewal talks.

---

## 📄 Automated Report Compiler Strategies

Located in the **Reporting View**, users can download structured financial spreadsheets and PDFs using three strategic output modes:

*   **Professional PDF Report**: Compiles a printable, aligned corporate page structured with title parameters, chronological summary values, and automated grid lists.
*   **Spreadsheet CSV Export**: Builds a download link for spreadsheet ingestion.
*   **Machine-Readable JSON Schema**: Serializes the payload into a structured JSON file, including report generation metadata.
