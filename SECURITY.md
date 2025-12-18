# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability in Moduluxe, please do **not** open a public issue.

Instead, please contact the maintainers directly via email at security@moduluxe.ao (mock email).

## Security Design Principles

This application follows **Security by Design** principles:

1.  **Data Minimization**: We only process the data strictly necessary for the business function (e.g., extracting only Transaction ID and Amount from payment proofs).
2.  **Input Validation**: All forms and file uploads are validated on the client side using strict Zod schemas (in a real backend scenario, this would be duplicated on the server).
3.  **RBAC**: Access control is enforced at the view layer.
4.  **Dependencies**: We regularly audit our dependencies (e.g., `@google/genai`, `jspdf`) for known vulnerabilities.
5.  **No Secrets in Code**: API Keys must be provided via Environment Variables.

## File Upload Security

*   **Allowed Types**: PDF (`application/pdf`), JPEG (`image/jpeg`), PNG (`image/png`).
*   **Max Size**: 5MB.
*   **Processing**: Files are processed in memory for OCR/Parsing and are not persisted in the mock environment to prevent storage of malicious payloads.
