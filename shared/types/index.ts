
import React from "react";

export enum AppView {
  ANALYTICS = 'Analytics',
  USERS = 'Users',
  HOUSES = 'Houses',
  BOOKINGS = 'Bookings',
  PAYMENTS = 'Payments',
  CONTRACTS = 'Contracts',
  COMMUNICATIONS = 'Communications',
  MAINTENANCE = 'Maintenance',
  INVOICES = 'Invoices',
  DOCUMENTS = 'Documents',
  REPORTING = 'Reporting',
  SETTINGS = 'Settings',
  TENANT_PORTAL = 'Tenant Portal',
  AUTOMATIONS = 'Automations',
  AUDIT_LOG = 'Audit Log',
  LEADS = 'Leads',
  BANK_RECONCILIATION = 'Bank Reconciliation'
}

export interface ModuleDescriptor {
    key: AppView;
    name: string; 
    icon: React.ReactNode;
    enabled: boolean;
    allowedRoles?: string[];
}

export type HouseStatus = 'Available' | 'Occupied' | 'Maintenance';
export interface House {
  id: string;
  address: string;
  type: 'Apartment' | 'House' | 'Condo';
  rent: number;
  status: HouseStatus;
  imageUrl?: string;
  amenities?: string[];
}

export type UserStatus = 'Active' | 'Inactive';
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  type: 'Tenant' | 'Owner' | 'Admin';
}

export interface UserProfile {
    id: string;
    fullName: string;
    professionalTitle: string;
    licenseNumber: string;
    email: string;
    phone: string;
    profilePictureUrl: string;
    bio: string;
    serviceAreas: string[];
    bankDetails: {
        iban: string;
        beneficiary: string;
    };
}

export type BookingStatus = 'Active' | 'Finished' | 'Cancelled';
export interface Booking {
    id: string;
    houseId: string;
    userId: string;
    houseName: string;
    userName: string;
    startDate: string;
    endDate: string;
    status: BookingStatus;
}

export type ContractStatus = 'Active' | 'Expired' | 'Terminated';
export interface Contract {
  id: string;
  bookingId: string;
  houseName: string;
  userName: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
}

export type PaymentStatus = 'Paid' | 'Due' | 'Late';
export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: PaymentStatus;
  transactionId?: string; // For Multicaixa reference
  proofUrl?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'Lease' | 'ID' | 'Proof of Income' | 'Payment Proof' | 'Other';
  uploadDate: string;
  fileUrl: string;
  relatedTo: {
      type: 'User' | 'House' | 'Payment';
      id: string;
      name: string;
  };
}

export interface Notification {
  id: string;
  timestamp: Date;
  message: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS';
  read: boolean;
}

export interface Communication {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  read: boolean;
  type: 'Email' | 'SMS';
  avatarColor: string;
}

export interface Message {
  id:string;
  text: string;
  sender: 'user' | 'ai';
}

export interface MonthlyRevenue {
    month: string;
    revenue: number;
}

export interface ActivityFeedItem {
    id: string;
    timestamp: Date;
    description: string;
    type: 'payment' | 'contract' | 'user';
}

export type MaintenanceStatus = 'Pending' | 'In Progress' | 'Completed';
export type MaintenancePriority = 'Low' | 'Medium' | 'High';
export interface MaintenanceRequest {
  id: string;
  houseId: string;
  houseName: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  reportedDate: string;
}

export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue';
export interface Invoice {
  id: string;
  contractId: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  issuedDate: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
}

export interface AuditLogEntry {
    id: string;
    action: string;
    userId: string;
    userName: string;
    details: string;
    timestamp: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Showing' | 'Offer' | 'Closed';
export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: LeadStatus;
    source: string;
    interest: string; // e.g., "Apartment in Luanda" or a House ID
    notes: string;
    createdAt: string;
}

export type SettingCategory = 'Account & Profile' | 'Privacy & Security' | 'Notifications' | 'Appearance & Display' | 'Language & Localization' | 'Property Listing Defaults' | 'CRM & Client Management' | 'Transaction Management' | 'Billing & Payments' | 'Integrations' | 'Data & Storage' | 'Marketing & Branding' | 'Analytics & Reporting' | 'Team & Collaboration' | 'Legal & Compliance' | 'Mobile App Settings' | 'Advanced Settings' | 'Help & Support';
export interface AppSetting {
    id: string;
    category: SettingCategory;
    key: string;
    value: string;
}

export interface NotificationPreferences {
    email: {
        newLead: boolean;
        showingRequest: boolean;
        offerSubmitted: boolean;
        contractMilestone: boolean;
        documentSigned: boolean;
    };
    sms: {
        urgentOffer: boolean;
        showingConfirmed: boolean;
        closingTimeChange: boolean;
    };
    quietHours: {
        enabled: boolean;
        start: string;
        end: string;
    };
}

export type DashboardCardType = 'totalRevenue' | 'activeContracts' | 'totalUsers' | 'paymentsDue';

export interface AppearancePreferences {
    theme: 'Light' | 'Dark' | 'Auto';
    density: 'Comfortable' | 'Compact';
    fontSize: 'Small' | 'Medium' | 'Large';
    colorTheme: 'Nzila Ember' | 'Zen Path' | 'Urban Traverse' | 'Nzila Harmony';
    dashboardLayout?: DashboardCardType[];
}

export interface LocalizationPreferences {
    language: 'en-US' | 'pt-BR' | 'pt-AO' | 'es-MX';
    dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
    timeFormat: '12-hour' | '24-hour';
    timezone: 'America/New_York' | 'Europe/Lisbon' | 'Asia/Tokyo' | 'Africa/Luanda';
    currency: 'USD' | 'EUR' | 'BRL' | 'AOA';
    measurementUnits: 'Square Feet' | 'Square Meters';
}

export interface PropertyListingDefaults {
    listingType: 'Sale' | 'Rent' | 'Lease';
    commissionRate: number;
    listingDuration: 90 | 180 | 365;
    requireVirtualTour: boolean;
    requireFloorPlan: boolean;
    syndicateToMLS: boolean;
    syndicateToZillow: boolean;
}

export interface CRMSettings {
    defaultLeadStatus: 'New' | 'Contacted' | 'Qualified' | 'Unqualified';
    autoReplyNewInquiries: boolean;
    createTaskOnNewLead: boolean;
    emailSignature: string;
}

export interface TransactionManagementSettings {
    pipelineStages: string[];
    requireBrokerApproval: boolean;
    alertBeforeDeadlineDays: 3 | 5 | 7;
}

export interface Subscription {
    plan: 'Professional' | 'Team' | 'Enterprise';
    price: number;
    currency: 'USD' | 'EUR' | 'AOA';
    renewalDate: string;
}

export interface PaymentMethod {
    id: string;
    type: 'Credit Card' | 'Bank Account';
    details: string; 
    isDefault: boolean;
}

export type BillingInvoiceStatus = 'Paid' | 'Pending' | 'Failed';
export interface BillingInvoice {
    id: string;
    date: string;
    description: string;
    amount: number;
    status: BillingInvoiceStatus;
}

export type IntegrationStatus = 'Active' | 'Disconnected' | 'Error';
export interface Integration {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
    status: IntegrationStatus;
    connectedSince: string | null;
}

export interface AppData {
  houses: House[];
  users: User[];
  contracts: Contract[];
  payments: Payment[];
  bookings: Booking[];
  documents?: Document[];
  notifications: Notification[];
  maintenanceRequests: MaintenanceRequest[];
  invoices: Invoice[];
  automations?: Automation[];
  auditLog?: AuditLogEntry[];
  leads?: Lead[];
  settings?: AppSetting[];
  userProfile?: UserProfile;
  notificationPreferences?: NotificationPreferences;
  appearancePreferences?: AppearancePreferences;
  localizationPreferences?: LocalizationPreferences;
  propertyListingDefaults?: PropertyListingDefaults;
  crmSettings?: CRMSettings;
  transactionManagementSettings?: TransactionManagementSettings;
  subscription?: Subscription;
  paymentMethods?: PaymentMethod[];
  billingInvoices?: BillingInvoice[];
  integrations?: Integration[];
}
