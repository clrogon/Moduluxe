
export const en = {
  "sidebar": {
    "sections": {
      "core": "Core",
      "businessModules": "Business Modules",
      "operationalModules": "Operational Modules",
      "system": "System"
    },
    "myPortal": "My Portal",
    "analytics": "Analytics",
    "users": "Users",
    "leads": "Leads / CRM",
    "houses": "Properties",
    "bookings": "Bookings",
    "payments": "Payments",
    "reconciliation": "Bank Reconciliation",
    "contracts": "Contracts",
    "documents": "Documents",
    "reporting": "Reporting",
    "communications": "Communications",
    "maintenance": "Maintenance",
    "invoices": "Invoices",
    "automations": "Automations",
    "auditLog": "Audit Log",
    "settings": "Settings",
    "signOut": "Sign Out",
    "future": "Future"
  },
  "header": {
    "notifications": "Notifications",
    "markAllRead": "Mark all as read",
    "noNotifications": "No new notifications.",
    "searchPlaceholder": "Search properties, users, contracts..."
  },
  "login": {
    "title": "Sign in to Moduluxe",
    "subtitle": "Manage your real estate portfolio with AI",
    "emailLabel": "Email address",
    "emailPlaceholder": "Enter your email",
    "passwordLabel": "Password",
    "passwordPlaceholder": "Enter your password",
    "signInButton": "Sign In (Use Demo Buttons Below)",
    "demoSeparator": "Or continue with demo role",
    "authenticating": "Authenticating as {role}..."
  },
  "analytics": {
    "totalRevenue": "Total Revenue (YTD)",
    "activeContracts": "Active Contracts",
    "totalUsers": "Total Users",
    "paymentsDue": "Payments Due",
    "revenueOverview": "Revenue Overview",
    "thisYear": "This Year",
    "lastYear": "Last Year",
    "revenueByProperty": "Revenue by Property Type",
    "recentActivity": "Recent Activity",
    "noActivity": "No recent activity.",
    "occupancyRate": "Occupancy Rate",
    "propertiesOccupied": "{occupied} of {total} properties occupied"
  },
  "houses": {
    "tableTitle": "Properties",
    "addProperty": "Add Property",
    "editTitle": "Edit Property",
    "addTitle": "Add New Property",
    "detailsTitle": "Property Details",
    "columns": {
      "address": "Address",
      "type": "Type",
      "rent": "Rent",
      "status": "Status"
    },
    "form": {
      "address": "Address",
      "propertyType": "Property Type",
      "rent": "Monthly Rent ($)",
      "status": "Status",
      "deletePrompt": "Are you sure you want to delete the property \"{address}\"? This action cannot be undone."
    },
    "details": {
      "title": "Property Details",
      "type": "Property Type",
      "rent": "Monthly Rent",
      "id": "Property ID",
      "maintenanceHistory": "Maintenance History",
      "noMaintenance": "No maintenance records found for this property."
    },
    "empty": {
      "title": "No Properties Found",
      "message": "Add your first property to manage it here."
    }
  },
  "users": {
    "title": "User Management",
    "subtitle": "Manage tenants, owners, and administrators.",
    "addUser": "Add User",
    "tableTitle": "Registered Users",
    "editTitle": "Edit User",
    "addTitle": "Add New User",
    "columns": {
      "name": "Name",
      "type": "Type",
      "email": "Email",
      "phone": "Phone",
      "status": "Status"
    },
    "form": {
      "name": "Full Name",
      "email": "Email Address",
      "phone": "Phone Number",
      "role": "Role",
      "accountStatus": "Account Status",
      "deletePrompt": "Are you sure you want to delete the user \"{name}\"? This action cannot be undone."
    },
    "empty": {
      "title": "No Users Found",
      "message": "Add your first tenant, owner, or admin to get started."
    }
  },
  "contracts": {
    "addContract": "Add Contract",
    "tableTitle": "Contracts",
    "editTitle": "Edit Contract",
    "addTitle": "Add New Contract",
    "columns": {
      "id": "Contract ID",
      "house": "House",
      "user": "User",
      "startDate": "Start Date",
      "endDate": "End Date",
      "status": "Status"
    },
    "form": {
      "booking": "Associated Booking",
      "bookingDisabled": "Booking cannot be changed for an existing contract.",
      "startDate": "Start Date",
      "endDate": "End Date",
      "status": "Contract Status",
      "deletePrompt": "Are you sure you want to delete contract \"{id}\"? This action cannot be undone."
    },
    "empty": {
      "title": "No Contracts Found",
      "message": "Add a new contract to manage leases and agreements."
    }
  },
  "payments": {
    "recordPayment": "Record Payment",
    "uploadProof": "Upload Proof",
    "tableTitle": "Payments",
    "editTitle": "Edit Payment",
    "addTitle": "Record New Payment",
    "columns": {
      "contractId": "Contract ID",
      "amount": "Amount",
      "dueDate": "Due Date",
      "paidDate": "Paid Date",
      "status": "Status"
    },
    "form": {
      "contract": "Contract",
      "amount": "Amount ($)",
      "dueDate": "Due Date",
      "paidDate": "Paid Date (Optional)",
      "status": "Payment Status"
    },
    "empty": {
      "title": "No Payments Found",
      "message": "Record your first payment to see it here."
    },
    "proof": {
        "title": "Multicaixa Express Proof Processing",
        "dragDrop": "Drag and drop PDF or Image here",
        "errorSize": "File is too large. Max 5MB.",
        "errorType": "Invalid file type. PDF, JPG or PNG only.",
        "errorParse": "Could not read proof data. Ensure it is a valid Multicaixa Express slip.",
        "errorIbanMismatch": "Security Alert: Payment was made to unauthorized IBAN. Expected: {expected}",
        "securityBlock": "Validation Blocked: IBAN Mismatch.",
        "processButton": "Analyze Proof",
        "successAnalysis": "Data Extracted Successfully",
        "matchFound": "Matching Payment Found",
        "noMatch": "No pending payment matches this amount.",
        "noMatchError": "Cannot confirm without a valid match.",
        "confirmButton": "Confirm & Issue Invoice"
    }
  },
  "reconciliation": {
      "title": "Bank Reconciliation",
      "subtitle": "Process bulk payment files from Multicaixa Express or Bank Exports.",
      "processButton": "Process Matched",
      "uploadTitle": "Upload Bank File",
      "uploadDesc": "Drag and drop a CSV or TXT file to automatically match payments.",
      "colDate": "Date",
      "colRef": "Reference/ID",
      "colDesc": "Description",
      "colAmount": "Amount",
      "colStatus": "Status",
      "statusMatched": "Matched",
      "statusUnmatched": "Unmatched",
      "statusProcessed": "Processed",
      "summary": "{count} transactions found. {matched} matched.",
      "selectPayment": "Select Payment..."
  },
  "bookings": {
    "listView": "List",
    "calendarView": "Calendar",
    "newBooking": "New Booking",
    "tableTitle": "Bookings",
    "editTitle": "Edit Booking",
    "addTitle": "New Booking",
    "columns": {
      "house": "House",
      "user": "User",
      "startDate": "Start Date",
      "endDate": "End Date",
      "status": "Status"
    },
    "form": {
      "property": "Property",
      "tenant": "Tenant",
      "startDate": "Start Date",
      "endDate": "End Date",
      "status": "Booking Status",
      "cancelPrompt": "Are you sure you want to cancel booking #{id} for \"{houseName}\"?"
    },
    "empty": {
      "title": "No Bookings Found",
      "message": "Create your first booking to see it listed here."
    }
  },
  "documents": {
    "title": "Document Management",
    "subtitle": "Upload and manage leases, IDs, and other files.",
    "uploadButton": "Upload Document",
    "tableTitle": "All Documents",
    "modalTitle": "Upload New Document",
    "columns": {
      "name": "Document Name",
      "type": "Type",
      "relatedTo": "Related To",
      "uploadDate": "Upload Date"
    },
    "form": {
      "file": "File",
      "uploadFile": "Upload a file",
      "dragDrop": "or drag and drop",
      "fileTypes": "PDF, PNG, JPG, DOCX up to 10MB",
      "name": "Document Name",
      "type": "Document Type",
      "relatedTo": "Related To",
      "selectPlaceholder": "Select User or Property",
      "optgroupUsers": "Users",
      "optgroupProperties": "Properties"
    },
    "empty": {
      "title": "No Documents Found",
      "message": "Upload your first document to get started."
    }
  },
  "communications": {
    "title": "Inbox",
    "subtitle": "Manage your emails and messages.",
    "unread": "{count} Unread",
    "newMessage": "New Message",
    "detailsTitle": "Message Details",
    "composeTitle": "New Message",
    "form": {
      "type": "Message Type",
      "recipient": "Recipient",
      "subject": "Subject",
      "body": "Message Body"
    },
    "empty": {
      "title": "No messages",
      "message": "Your inbox is completely empty. New messages from tenants and owners will appear here."
    }
  },
  "maintenance": {
    "title": "Maintenance",
    "subtitle": "Track and manage property repairs.",
    "reportIssue": "Report Issue",
    "tableTitle": "Maintenance Requests",
    "editTitle": "Update Maintenance Request",
    "addTitle": "Report Maintenance Issue",
    "columns": {
      "property": "Property",
      "issue": "Issue",
      "priority": "Priority",
      "reported": "Reported",
      "status": "Status"
    },
    "form": {
      "property": "Property",
      "description": "Issue Description",
      "priority": "Priority",
      "status": "Status",
      "deletePrompt": "Are you sure you want to delete the maintenance request for \"{houseName}\"?"
    },
    "empty": {
      "title": "No Maintenance Requests",
      "message": "Report an issue to create a new maintenance request."
    }
  },
  "invoices": {
    "createInvoice": "Create Invoice",
    "tableTitle": "Invoices",
    "editTitle": "Edit Invoice",
    "addTitle": "Create New Invoice",
    "columns": {
      "id": "Invoice #",
      "contract": "Contract",
      "amount": "Amount",
      "dueDate": "Due Date",
      "issued": "Issued",
      "status": "Status"
    },
    "form": {
      "contract": "Contract",
      "amount": "Amount ($)",
      "issuedDate": "Issued Date",
      "dueDate": "Due Date",
      "status": "Invoice Status",
      "deletePrompt": "Are you sure you want to delete invoice \"{id}\"? This action cannot be undone."
    },
    "empty": {
      "title": "No Invoices Found",
      "message": "Create a new invoice for a contract to see it listed here."
    }
  },
  "automations": {
    "title": "Automations",
    "subtitle": "Create rules to automate repetitive tasks.",
    "create": "Create Automation",
    "tableTitle": "Active Automations",
    "editTitle": "Edit Automation",
    "addTitle": "New Automation",
    "columns": {
      "name": "Name",
      "trigger": "Trigger",
      "action": "Action",
      "status": "Status"
    },
    "form": {
      "name": "Automation Name",
      "trigger": "When this happens...",
      "action": "Do this...",
      "status": "Status"
    },
    "empty": {
      "title": "No Automations",
      "message": "Create your first automation rule to save time."
    }
  },
  "auditLog": {
    "title": "System Audit Log",
    "tableTitle": "Recent Activity",
    "columns": {
      "timestamp": "Timestamp",
      "user": "User",
      "action": "Action",
      "details": "Details"
    },
    "empty": {
      "title": "No Logs Found",
      "message": "System activity will be recorded here."
    }
  },
  "reporting": {
    "title": "Reporting",
    "subtitle": "Generate and export detailed financial and occupancy reports.",
    "startDate": "Start Date",
    "endDate": "End Date",
    "propertyType": "Property Type",
    "export": "Export to PDF",
    "totalRevenue": "Total Revenue",
    "paymentsRecorded": "Payments Recorded",
    "newBookings": "New Bookings",
    "tableTitle": "Financial Report ({startDate} to {endDate})",
    "columns": {
      "date": "Payment Date",
      "tenant": "Tenant",
      "property": "Property",
      "type": "Type",
      "amount": "Amount"
    }
  },
  "tenantPortal": {
    "welcome": "Welcome, {name}!",
    "subtitle": "Here's a summary of your tenancy at Moduluxe.",
    "activeContract": "Active Contract",
    "contractEndDate": "Contract End Date",
    "nextPayment": "Next Payment Due",
    "openMaintenance": "Open Maintenance Requests",
    "paymentHistory": "Payment History",
    "maintenanceRequests": "Maintenance Requests"
  },
  "crm": {
      "title": "Lead Pipeline",
      "subtitle": "Track and manage prospective tenants and buyers.",
      "addLead": "Add Lead",
      "editLead": "Edit Lead",
      "deletePrompt": "Are you sure you want to delete lead \"{name}\"?",
      "status": {
          "New": "New",
          "Contacted": "Contacted",
          "Showing": "Showing",
          "Offer": "Offer",
          "Closed": "Closed"
      },
      "form": {
          "name": "Lead Name",
          "email": "Email",
          "phone": "Phone",
          "source": "Source",
          "interest": "Property of Interest",
          "status": "Pipeline Stage",
          "notes": "Notes",
          "selectProperty": "Select a property...",
          "generalInquiry": "General Inquiry"
      }
  },
  "settings": {
    "title": "Settings",
    "subtitle": "Manage your professional profile, security, and application preferences.",
    "saveChanges": "Save Changes",
    "savedMessage": "Preferences saved!",
    "tabs": {
      "account": "Account & Profile",
      "security": "Privacy & Security",
      "notifications": "Notifications",
      "appearance": "Appearance & Display",
      "language": "Language & Localization",
      "listingDefaults": "Listing Defaults",
      "crm": "CRM",
      "transactions": "Transactions",
      "billing": "Billing",
      "integrations": "Integrations",
      "data": "Data",
      "marketing": "Marketing",
      "analytics": "Analytics",
      "team": "Team",
      "legal": "Legal",
      "mobile": "Mobile",
      "advanced": "Advanced",
      "help": "Help"
    },
    "language": {
      "title": "Language & Localization",
      "description": "Set your regional preferences for language, dates, and currency.",
      "displayLanguage": "Display Language",
      "currency": "Currency",
      "dateFormat": "Date Format",
      "timeFormat": "Time Format",
      "timezone": "Timezone",
      "measurementUnits": "Measurement Units"
    },
    "account": {
        "profilePicture": "Profile Picture",
        "profilePictureDesc": "Update your professional headshot.",
        "professionalTitle": "Professional Title",
        "licenseNumber": "License Number",
        "serviceAreas": "Service Areas (Zip codes, comma-separated)",
        "bio": "Professional Bio",
        "bioDesc": "Brief description for your profile. URLs are hyperlinked.",
        "bankDetails": "Banking Details (Receiving Account)",
        "bankDetailsDesc": "These details are used to validate payment proofs.",
        "beneficiary": "Beneficiary Name"
    },
    "appearance": {
        "themes": {
            "nzila_ember": "Nzila Ember (Core)",
            "zen_path": "Zen Path (Organic)",
            "urban_traverse": "Urban Traverse (Mono)",
            "nzila_harmony": "Nzila Harmony (Sky)"
        }
    }
  },
  "common": {
    "actions": "Actions",
    "edit": "Edit",
    "viewDetailsFor": "View details for",
    "search": "Search...",
    "noResults": "No results found for \"{term}\"",
    "noData": "No data available.",
    "cancel": "Cancel",
    "delete": "Delete",
    "save": "Save Changes",
    "add": "Add",
    "create": "Create",
    "update": "Update",
    "submit": "Submit",
    "change": "Change"
  },
  "error": {
    "selectView": "Select a view"
  }
}
