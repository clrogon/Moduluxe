# Changelog

All notable changes to the Moduluxe project will be documented in this file.

## [1.0.0] - 2024-05-22

### Added
- **Angola Localization**: Added `pt-AO` locale, Kwanza (AOA) currency formatting, and Africa/Luanda timezone defaults.
- **Multicaixa Parser**: Implemented regex-based OCR logic to extract data from Angolan bank transfer proofs.
- **Payment Proof Modal**: Interface for uploading and reconciling payment receipts.
- **PDF Export**: Integrated `jspdf` for generating professional Invoices and Financial Reports.
- **Automations Module**: Workflow builder for triggered actions (e.g., Late Payment -> SMS).
- **Audit Log**: System-wide tracking of user actions for security.
- **Global Search**: Header bar search finding Properties, Users, and Contracts.
- **Dark Mode**: Full theme support across all components.
- **Tenant Portal**: Dedicated view for Tenant role with filtered data.

### Fixed
- **i18n Architecture**: Refactored from dynamic imports to static TypeScript files to resolve module loading errors in browser environments.
- **Navigation**: Fixed mobile sidebar behavior and routing consistency.
- **Data Models**: Aligned `Payment`, `Contract`, and `User` types for strict TypeScript compliance.

### Security
- **Input Validation**: Added file size (5MB) and type checks for document uploads.
- **Data Minimization**: OCR processing happens client-side; raw files are not stored in mock backend.
- **RBAC**: Enforced role-based visibility in Sidebar and Action buttons.
