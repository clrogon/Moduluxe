# Moduluxe Real Estate Dashboard

**Moduluxe** is a modern, modular property management platform designed specifically for the Angolan real estate market, with support for international standards. It features a robust dashboard for managing properties, tenants, contracts, and payments, integrated with **Gemini AI** for intelligent assistance and automated data processing.

## 🚀 Key Features

*   **Angola-First Localization**: Native support for Kwanza (AOA), West Africa Time, and Portuguese (Angola/Brasil).
*   **Multicaixa Express Integration**: Automated OCR parsing of payment proof PDFs/Images to reconcile payments instantly.
*   **AI Assistant**: Integrated Gemini 2.5 Flash for natural language queries about your portfolio.
*   **Role-Based Access Control (RBAC)**: Distinct views for Admins, Owners, and Tenants.
*   **Tenant Portal**: Dedicated interface for tenants to view contracts, pay rent, and report issues.
*   **Financial Reporting**: Automated PDF generation for invoices and financial summaries.
*   **Modular Architecture**: Scalable codebase separated into Core, Business, Operational, and System modules.

## 🛠️ Tech Stack

*   **Frontend**: React 18, TypeScript
*   **Styling**: Tailwind CSS
*   **AI**: Google Gemini API (`@google/genai`)
*   **PDF Generation**: `jspdf`, `jspdf-autotable`
*   **Icons**: Heroicons
*   **State Management**: Custom Hooks & React Context

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-org/moduluxe.git
    cd moduluxe
    ```

2.  **Install dependencies** (if using a local bundler like Vite/Next.js, though this project runs directly in browser-based environments via ES Modules):
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file (or configure your environment variables) with your Gemini API Key:
    ```env
    API_KEY=your_google_gemini_api_key
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

## 🌍 Localization

The app supports dynamic language switching via the `LanguageContext`.
*   **pt-AO** (Português Angola) - *Default*
*   **pt-BR** (Português Brasil)
*   **en-US** (English)
*   **es-MX** (Español)

## 🛡️ Security

*   **Input Validation**: Strict types and file validation (size/mime-type).
*   **Audit Logs**: Tracks critical system actions.
*   **Privacy**: PII is handled securely within the client context.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
