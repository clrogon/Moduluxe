# Feature Specifications

Moduluxe is built on a modular architecture. Below is a breakdown of the capabilities available in the current version.

## Core Modules

### 📊 Analytics Dashboard
*   **Real-time Metrics**: Total Revenue (YTD), Active Contracts, Occupancy Rate.
*   **Visualizations**: Bar charts for monthly revenue, Donut charts for revenue by property type.
*   **Activity Feed**: Recent system events (payments, new users).
*   **Customization**: Drag-and-drop reordering of dashboard cards.

### 🤖 AI Assistant
*   **Context-Aware**: Has read-access to the entire application state (Mock Data).
*   **Natural Language**: Answers questions like "Which tenants are late on payments?" or "Show me revenue for March."
*   **Powered by**: Google Gemini 2.5 Flash.

### 🌍 Tenant Portal
*   **Personalized Dashboard**: Shows only data relevant to the logged-in tenant.
*   **Payment History**: View past and upcoming payments.
*   **Maintenance**: Submit and track repair requests.

## Business Modules

### 🏠 Property Management
*   **CRUD Operations**: Add, Edit, Delete properties.
*   **Status Tracking**: Available, Occupied, Maintenance.
*   **Listing Defaults**: Configure default rent, commission rates, and requirements.

### 👥 User Management
*   **Roles**: Tenant, Owner, Admin.
*   **Profiles**: Contact info, account status.

### 📝 Contract Management
*   **Lease Lifecycle**: Active, Expired, Terminated.
*   **Booking Association**: Links tenants to properties for specific dates.

### 💳 Payments & Finance
*   **Multicaixa Express OCR**: Upload a PDF/Image of a bank slip; the system extracts the Transaction ID, Date, and Amount to verify payment automatically.
*   **Status Tracking**: Paid, Due, Late.
*   **Invoicing**: Auto-generate PDF invoices based on payment records.

## Operational Modules

### 🛠️ Maintenance
*   **Ticketing System**: Priority levels (Low, Medium, High).
*   **Workflow**: Pending -> In Progress -> Completed.

### 📨 Communications
*   **Inbox**: Internal messaging system.
*   **Notifications**: Real-time alerts for system events (configurable via Settings).

### 📂 Document Management
*   **Digital Filing**: Upload Leases, IDs, and Proof of Income.
*   **Association**: Link documents to specific Users or Properties.

## System Modules

### ⚙️ Settings
*   **Localization**: Region presets (Angola/USA), Currency, Timezone.
*   **Appearance**: Dark Mode (System/Manual), Density.
*   **Security**: 2FA toggles, Session management.

### ⚡ Automations
*   **Rules Engine**: "If Payment is Late -> Send SMS".
*   **Status**: Enable/Disable specific workflows.

### 🔒 Audit Log
*   **Traceability**: Records User, Action, Details, and Timestamp for all data mutations.
