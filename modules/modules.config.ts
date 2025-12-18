
import React from 'react';
import { AppView, ModuleDescriptor } from '../shared/types/index';
import {
    ChartPieIcon,
    UsersIcon,
    BuildingIcon,
    CalendarDaysIcon,
    CreditCardIcon,
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    WrenchScrewdriverIcon,
    DocumentChartBarIcon,
    DocumentDuplicateIcon,
    CogIcon,
    UserCircleIcon,
    ChartBarIcon,
    FunnelIcon,
    ArrowDownTrayIcon
} from '../components/ui/icons/Icons';

type ModuleConfig = {
    [key: string]: ModuleDescriptor[];
}

// RBAC Configuration & i18n keys
// Names are now keys that will be looked up in translation files.
// e.g., "sidebar.analytics" will become "Analytics" in English.

export const moduleConfig: ModuleConfig = {
    "core": [
        { 
            key: AppView.TENANT_PORTAL, 
            name: "sidebar.myPortal", 
            icon: React.createElement(UserCircleIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Tenant']
        },
        { 
            key: AppView.ANALYTICS, 
            name: "sidebar.analytics", 
            icon: React.createElement(ChartPieIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner']
        },
    ],
    "businessModules": [
        { 
            key: AppView.LEADS, 
            name: "sidebar.leads", 
            icon: React.createElement(FunnelIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner']
        },
        { 
            key: AppView.USERS, 
            name: "sidebar.users", 
            icon: React.createElement(UsersIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin']
        },
        { 
            key: AppView.HOUSES, 
            name: "sidebar.houses", 
            icon: React.createElement(BuildingIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner']
        },
        { 
            key: AppView.BOOKINGS, 
            name: "sidebar.bookings", 
            icon: React.createElement(CalendarDaysIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner']
        },
        { 
            key: AppView.PAYMENTS, 
            name: "sidebar.payments", 
            icon: React.createElement(CreditCardIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner', 'Tenant']
        },
        { 
            key: AppView.BANK_RECONCILIATION, 
            name: "sidebar.reconciliation", 
            icon: React.createElement(ArrowDownTrayIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner']
        },
        { 
            key: AppView.CONTRACTS, 
            name: "sidebar.contracts", 
            icon: React.createElement(DocumentTextIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner', 'Tenant']
        },
        { 
            key: AppView.DOCUMENTS, 
            name: "sidebar.documents", 
            icon: React.createElement(DocumentDuplicateIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner']
        },
         { 
            key: AppView.REPORTING, 
            name: "sidebar.reporting", 
            icon: React.createElement(ChartBarIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner']
        },
    ],
    "operationalModules": [
        { 
            key: AppView.COMMUNICATIONS, 
            name: "sidebar.communications", 
            icon: React.createElement(ChatBubbleLeftRightIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner', 'Tenant']
        }, 
        { 
            key: AppView.MAINTENANCE, 
            name: "sidebar.maintenance", 
            icon: React.createElement(WrenchScrewdriverIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner', 'Tenant']
        },
        { 
            key: AppView.INVOICES, 
            name: "sidebar.invoices", 
            icon: React.createElement(DocumentChartBarIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner']
        },
    ],
    "system": [
        { 
            key: AppView.SETTINGS, 
            name: "sidebar.settings", 
            icon: React.createElement(CogIcon, { className: "h-6 w-6" }), 
            enabled: true,
            allowedRoles: ['Admin', 'Owner', 'Tenant']
        },
    ]
};
