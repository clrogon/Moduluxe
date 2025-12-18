
import { useState, useMemo } from 'react';
import { House, User, Contract, Payment, Notification, Booking, MonthlyRevenue, ActivityFeedItem, Communication, MaintenanceRequest, Invoice, AppSetting, UserProfile, NotificationPreferences, AppearancePreferences, LocalizationPreferences, PropertyListingDefaults, CRMSettings, TransactionManagementSettings, Subscription, PaymentMethod, BillingInvoice, Integration, Document, Automation, AuditLogEntry, Lead } from '../../shared/types/index';

const initialHouses: House[] = [
  { 
      id: 'h1', 
      address: 'Rua Rainha Ginga, Luanda, Angola', 
      type: 'Apartment', 
      rent: 500000, 
      status: 'Occupied',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
      amenities: ['AC', 'Wi-Fi', 'Security 24/7']
  },
  { 
      id: 'h2', 
      address: 'Talatona, Condomínio Vereda das Flores', 
      type: 'House', 
      rent: 1200000, 
      status: 'Available',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-6095eb5cae2f?q=80&w=800&auto=format&fit=crop',
      amenities: ['Pool', 'Garden', 'Garage', 'Generator']
  },
  { 
      id: 'h3', 
      address: 'Kilamba, Bloco A, Apartamento 34', 
      type: 'Condo', 
      rent: 150000, 
      status: 'Occupied',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      amenities: ['Elevator', 'Parking', 'Playground']
  },
  { 
      id: 'h4', 
      address: 'Maianga, Rua Amílcar Cabral', 
      type: 'Apartment', 
      rent: 450000, 
      status: 'Maintenance',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
      amenities: ['Balcony', 'Furnished']
  },
];

const initialUsers: User[] = [
  { id: 'u1', name: 'João Baptista', email: 'joao.b@example.com', phone: '+244 923 456 789', status: 'Active', type: 'Tenant' },
  { id: 'u2', name: 'Ana Maria', email: 'ana.m@example.com', phone: '+244 934 567 890', status: 'Active', type: 'Tenant' },
  { id: 'u3', name: 'Carlos Manuel', email: 'carlos.m@example.com', phone: '+244 912 345 678', status: 'Inactive', type: 'Tenant' },
  { id: 'u4', name: 'Empresa Imobiliária Luanda', email: 'admin@imobiliaria.ao', phone: '+244 222 333 444', status: 'Active', type: 'Owner' },
];

const initialUserProfile: UserProfile = {
    id: 'up1',
    fullName: 'Empresa Imobiliária Luanda',
    professionalTitle: 'Gestor Imobiliário',
    licenseNumber: 'AO-9876543',
    email: 'admin@imobiliaria.ao',
    phone: '+244 222 333 444',
    profilePictureUrl: `https://i.pravatar.cc/150?u=diana`,
    bio: 'Especialistas em gestão de propriedades em Luanda e arredores. Comprometidos com a excelência e satisfação dos nossos clientes.',
    serviceAreas: ['Luanda', 'Talatona', 'Kilamba'],
    bankDetails: {
        iban: 'AO06.0000.0000.0000.0000.0000.0', // Fake Data
        beneficiary: 'GESTAO IMOBILIARIA DEMO LDA' // Fake Data
    }
};

const initialNotificationPreferences: NotificationPreferences = {
    email: {
        newLead: true,
        showingRequest: true,
        offerSubmitted: true,
        contractMilestone: false,
        documentSigned: true,
    },
    sms: {
        urgentOffer: true,
        showingConfirmed: false,
        closingTimeChange: true,
    },
    quietHours: {
        enabled: true,
        start: '22:00',
        end: '08:00',
    },
};

const initialAppearancePreferences: AppearancePreferences = {
    theme: 'Auto',
    density: 'Comfortable',
    fontSize: 'Medium',
    colorTheme: 'Nzila Ember',
    dashboardLayout: ['totalRevenue', 'activeContracts', 'totalUsers', 'paymentsDue']
};

const initialLocalizationPreferences: LocalizationPreferences = {
    language: 'pt-AO',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24-hour',
    timezone: 'Africa/Luanda',
    currency: 'AOA',
    measurementUnits: 'Square Meters',
};

const initialPropertyListingDefaults: PropertyListingDefaults = {
    listingType: 'Rent',
    commissionRate: 5.0,
    listingDuration: 90,
    requireVirtualTour: false,
    requireFloorPlan: true,
    syndicateToMLS: false,
    syndicateToZillow: false,
};

const initialCRMSettings: CRMSettings = {
    defaultLeadStatus: 'New',
    autoReplyNewInquiries: true,
    createTaskOnNewLead: true,
    emailSignature: `Atenciosamente,\n\nGestão Imobiliária\nModuluxe Angola`,
};

const initialTransactionManagementSettings: TransactionManagementSettings = {
    pipelineStages: ['Lead', 'Visita', 'Proposta', 'Contrato', 'Fechado'],
    requireBrokerApproval: false,
    alertBeforeDeadlineDays: 3,
};

const initialSubscription: Subscription = {
    plan: 'Professional',
    price: 50000,
    currency: 'AOA',
    renewalDate: '2025-02-15',
};

const initialPaymentMethods: PaymentMethod[] = [
    { id: 'pm_1', type: 'Bank Account', details: 'BAI **** 1234', isDefault: true },
    { id: 'pm_2', type: 'Credit Card', details: 'Visa **** 5678', isDefault: false },
];

const initialBillingInvoices: BillingInvoice[] = [
    { id: 'inv_b1', date: '2024-01-15', description: 'Subscrição Mensal', amount: 50000, status: 'Paid' },
    { id: 'inv_b2', date: '2023-12-15', description: 'Subscrição Mensal', amount: 50000, status: 'Paid' },
    { id: 'inv_b3', date: '2023-11-15', description: 'Subscrição Mensal', amount: 50000, status: 'Paid' },
];

const initialIntegrations: Integration[] = [
    { id: 'integ_1', name: 'Google Calendar', description: 'Sincronize visitas e datas importantes diretamente no seu calendário.', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg', status: 'Active', connectedSince: '2023-01-20' },
    { id: 'integ_2', name: 'Multicaixa Express', description: 'Integração para pagamentos automáticos via Multicaixa.', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/1024px-Red_X.svg.png', status: 'Disconnected', connectedSince: null }, 
];


const initialBookings: Booking[] = [
    { id: 'b1', houseId: 'h1', userId: 'u1', houseName: 'Rua Rainha Ginga', userName: 'João Baptista', startDate: '2023-01-01', endDate: '2023-12-31', status: 'Active' },
    { id: 'b2', houseId: 'h3', userId: 'u2', houseName: 'Kilamba, Bloco A', userName: 'Ana Maria', startDate: '2022-06-01', endDate: '2023-05-31', status: 'Finished' },
];

const initialContracts: Contract[] = [
  { id: 'c1', bookingId: 'b1', houseName: 'Rua Rainha Ginga', userName: 'João Baptista', startDate: '2023-01-01', endDate: '2023-12-31', status: 'Active' },
  { id: 'c2', bookingId: 'b2', houseName: 'Kilamba, Bloco A', userName: 'Ana Maria', startDate: '2022-06-01', endDate: '2023-05-31', status: 'Expired' },
];

const initialPayments: Payment[] = [
  { id: 'pay1', contractId: 'c1', amount: 500000, dueDate: '2023-08-01', paidDate: '2023-07-28', status: 'Paid' },
  { id: 'pay2', contractId: 'c1', amount: 500000, dueDate: '2023-09-01', paidDate: null, status: 'Late' },
  { id: 'pay3', contractId: 'c2', amount: 150000, dueDate: '2023-05-01', paidDate: '2023-05-01', status: 'Paid' },
  { id: 'pay4', contractId: 'c1', amount: 500000, dueDate: '2023-10-01', paidDate: null, status: 'Due' },
];

const initialNotifications: Notification[] = [
    {id: 'n1', message: 'Evento: Contrato criado para Rua Rainha Ginga', read: true, timestamp: new Date(Date.now() - 86400000 * 3), type: 'INFO' },
    {id: 'n2', message: 'Alerta: Pagamento em atraso para o contrato c1', read: false, timestamp: new Date(Date.now() - 86400000), type: 'WARNING' },
];

const initialCommunications: Communication[] = [
  { 
    id: 'com1', 
    sender: 'João Baptista', 
    subject: 'Renovação de Contrato', 
    preview: 'Olá, gostaria de saber sobre a renovação do meu contrato...', 
    body: 'Olá,\n\nGostaria de saber quando posso renovar meu contrato para o próximo ano. Gosto muito de morar aqui.\n\nAguardo retorno,\nJoão',
    timestamp: '2 horas atrás', 
    read: false, 
    type: 'Email', 
    avatarColor: 'bg-blue-500' 
  },
];

const initialMaintenanceRequests: MaintenanceRequest[] = [
    { id: 'm1', houseId: 'h4', houseName: 'Maianga, Rua Amílcar Cabral', description: 'Infiltração no teto da sala', status: 'In Progress', priority: 'High', reportedDate: '2023-10-20' },
    { id: 'm2', houseId: 'h1', houseName: 'Rua Rainha Ginga', description: 'Ar condicionado com falha', status: 'Pending', priority: 'Low', reportedDate: '2023-10-25' },
];

const initialInvoices: Invoice[] = [
    { id: 'inv1', contractId: 'c1', amount: 500000, dueDate: '2023-11-01', status: 'Unpaid', issuedDate: '2023-10-15' },
    { id: 'inv2', contractId: 'c1', amount: 500000, dueDate: '2023-10-01', status: 'Overdue', issuedDate: '2023-09-15' },
];

const initialDocuments: Document[] = [
    { id: 'doc1', name: 'Contrato - h1.pdf', type: 'Lease', uploadDate: '2023-01-01', fileUrl: '#', relatedTo: { type: 'House', id: 'h1', name: 'Rua Rainha Ginga' } },
    { id: 'doc2', name: 'BI - João Baptista.pdf', type: 'ID', uploadDate: '2023-01-02', fileUrl: '#', relatedTo: { type: 'User', id: 'u1', name: 'João Baptista' } },
];

const initialSettings: AppSetting[] = [
    { id: 's4', category: 'Privacy & Security', key: 'MFA Enabled', value: 'Yes' },
    { id: 's5', category: 'Privacy & Security', key: 'Session Timeout', value: '30 mins' },
];

const initialAutomations: Automation[] = [
    { id: 'a1', name: 'Lembrete de Pagamento Atrasado', trigger: 'Payment is Late', action: 'Send SMS', active: true },
];

const initialLeads: Lead[] = [
    { id: 'l1', name: 'Maria Fernandes', email: 'maria.f@gmail.com', phone: '923 111 222', status: 'New', source: 'Facebook', interest: 'Talatona, Vereda das Flores', notes: 'Procura casa com 3 quartos.', createdAt: new Date().toISOString() },
    { id: 'l2', name: 'Paulo Silva', email: 'paulo.s@outlook.com', phone: '945 333 444', status: 'Contacted', source: 'Website', interest: 'Kilamba', notes: 'Orçamento até 200.000 Kz', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'l3', name: 'Jorge Costa', email: 'jorge.c@yahoo.com', phone: '912 555 666', status: 'Showing', source: 'Referral', interest: 'Maianga', notes: 'Agendada visita para próxima terça.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
];

const initialMonthlyRevenue: MonthlyRevenue[] = [
    { month: 'Jan', revenue: 1150000 }, { month: 'Fev', revenue: 1150000 }, { month: 'Mar', revenue: 1150000 },
    { month: 'Abr', revenue: 1150000 }, { month: 'Mai', revenue: 1150000 }, { month: 'Jun', revenue: 1150000 },
    { month: 'Jul', revenue: 1150000 }, { month: 'Ago', revenue: 1150000 },
];

export const useMockData = () => {
  const [houses, setHouses] = useState<House[]>(initialHouses);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(initialNotificationPreferences);
  const [appearancePreferences, setAppearancePreferences] = useState<AppearancePreferences>(initialAppearancePreferences);
  const [localizationPreferences, setLocalizationPreferences] = useState<LocalizationPreferences>(initialLocalizationPreferences);
  const [propertyListingDefaults, setPropertyListingDefaults] = useState<PropertyListingDefaults>(initialPropertyListingDefaults);
  const [crmSettings, setCrmSettings] = useState<CRMSettings>(initialCRMSettings);
  const [transactionManagementSettings, setTransactionManagementSettings] = useState<TransactionManagementSettings>(initialTransactionManagementSettings);
  const [subscription] = useState<Subscription>(initialSubscription);
  const [paymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [billingInvoices] = useState<BillingInvoice[]>(initialBillingInvoices);
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [communications, setCommunications] = useState<Communication[]>(initialCommunications);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(initialMaintenanceRequests);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [settings, setSettings] = useState<AppSetting[]>(initialSettings);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const monthlyRevenue = initialMonthlyRevenue;

  const logAction = (action: string, details: string) => {
      const entry: AuditLogEntry = {
          id: `log-${Date.now()}`,
          action,
          userId: 'current-user-id',
          userName: 'Current User',
          details,
          timestamp: new Date().toISOString()
      };
      setAuditLog(prev => [entry, ...prev]);
  };

  const addHouse = (house: House) => {
    setHouses(prev => [house, ...prev]);
    logAction('Create House', `Created property at ${house.address}`);
  };
  
  const updateHouse = (updatedHouse: House) => {
      setHouses(prev => prev.map(h => h.id === updatedHouse.id ? updatedHouse : h));
      logAction('Update House', `Updated property ${updatedHouse.id}`);
  };

  const deleteHouse = (id: string) => {
      setHouses(prev => prev.filter(h => h.id !== id));
      logAction('Delete House', `Deleted property ${id}`);
  };

  const addUser = (user: User) => {
    setUsers(prev => [user, ...prev]);
    logAction('Create User', `Created user ${user.name}`);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    logAction('Update User', `Updated user ${updatedUser.name}`);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    logAction('Delete User', `Deleted user ${id}`);
  };
  
  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    logAction('Update Profile', 'Updated user profile');
  };

  const updateNotificationPreferences = (prefs: NotificationPreferences) => {
    setNotificationPreferences(prefs);
    logAction('Update Settings', 'Updated notification preferences');
  };

  const updateAppearancePreferences = (prefs: AppearancePreferences) => {
    setAppearancePreferences(prefs);
    logAction('Update Settings', 'Updated appearance preferences');
  };

  const updateLocalizationPreferences = (prefs: LocalizationPreferences) => {
    setLocalizationPreferences(prefs);
    logAction('Update Settings', 'Updated localization preferences');
  };

  const updatePropertyListingDefaults = (defaults: PropertyListingDefaults) => {
    setPropertyListingDefaults(defaults);
    logAction('Update Settings', 'Updated property listing defaults');
  };

  const updateCrmSettings = (settings: CRMSettings) => {
    setCrmSettings(settings);
    logAction('Update Settings', 'Updated CRM settings');
  };

  const updateTransactionManagementSettings = (settings: TransactionManagementSettings) => {
    setTransactionManagementSettings(settings);
    logAction('Update Settings', 'Updated transaction settings');
  };
  
  const connectIntegration = (id: string) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, status: 'Active', connectedSince: new Date().toISOString().split('T')[0] } : i));
    logAction('Connect Integration', `Connected integration ${id}`);
  };

  const disconnectIntegration = (id: string) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, status: 'Disconnected', connectedSince: null } : i));
    logAction('Disconnect Integration', `Disconnected integration ${id}`);
  };

  const addContract = (contract: Contract) => {
    setContracts(prev => [contract, ...prev]);
    logAction('Create Contract', `Created contract ${contract.id}`);
  };

  const updateContract = (updatedContract: Contract) => {
    setContracts(prev => prev.map(c => c.id === updatedContract.id ? updatedContract : c));
    logAction('Update Contract', `Updated contract ${updatedContract.id}`);
  };

  const deleteContract = (id: string) => {
    setContracts(prev => prev.filter(c => c.id !== id));
    logAction('Delete Contract', `Deleted contract ${id}`);
  };
  
  const addBooking = (booking: Booking) => {
      setBookings(prev => [booking, ...prev]);
      logAction('Create Booking', `Created booking for ${booking.houseName}`);
  };
  
  const updateBooking = (updatedBooking: Booking) => {
      setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
      logAction('Update Booking', `Updated booking ${updatedBooking.id}`);
  };
  
  const cancelBooking = (id: string) => {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
      logAction('Cancel Booking', `Cancelled booking ${id}`);
  };
  
  const addCommunication = (comm: Communication) => {
    setCommunications(prev => [comm, ...prev]);
    logAction('Send Message', `Sent message to ${comm.sender}`);
  };

  const addInvoice = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...prev]);
    logAction('Create Invoice', `Created invoice ${invoice.id}`);
  };

  const addPayment = (payment: Payment) => {
      setPayments(prev => [payment, ...prev]);
      logAction('Record Payment', `Recorded payment of ${payment.amount}`);
  };
  
  const updatePayment = (updatedPayment: Payment) => {
      setPayments(prev => prev.map(p => p.id === updatedPayment.id ? updatedPayment : p));
      logAction('Update Payment', `Updated payment ${updatedPayment.id}`);
  };

  // SPECIAL HANDLER FOR MULTICAIXA PROOFS
  const processPaymentProof = (paymentId: string, proofData: { transactionId: string; date: string; amount: number }) => {
      const payment = payments.find(p => p.id === paymentId);
      if (payment) {
          // 1. Update Payment
          const updatedPayment = {
              ...payment,
              status: 'Paid' as 'Paid',
              paidDate: proofData.date.split(' ')[0], // Extract YYYY-MM-DD
              transactionId: proofData.transactionId
          };
          updatePayment(updatedPayment);
          logAction('Process Proof', `Multicaixa Proof processed for ${paymentId}. ID: ${proofData.transactionId}`);
          
          // 2. Generate Invoice
          const invoice: Invoice = {
              id: `inv-auto-${Date.now()}`,
              contractId: payment.contractId,
              amount: payment.amount,
              dueDate: payment.dueDate,
              status: 'Paid',
              issuedDate: new Date().toISOString().split('T')[0]
          };
          addInvoice(invoice);

          // 3. Send Notification to User
          // Find the contract to get user details
          const contract = contracts.find(c => c.id === payment.contractId);
          if (contract) {
              addCommunication({
                  id: `auto-msg-${Date.now()}`,
                  sender: 'Moduluxe System',
                  subject: `Pagamento Confirmado - Transacção ${proofData.transactionId}`,
                  preview: `O seu pagamento de ${proofData.amount} AOA foi recebido com sucesso.`,
                  body: `Prezado(a) ${contract.userName},\n\nConfirmamos a recepção do seu pagamento referente ao contrato ${contract.id}.\n\nValor: ${proofData.amount.toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'})}\nData: ${proofData.date}\nID Transacção: ${proofData.transactionId}\n\nA sua factura foi gerada e está disponível na secção de Facturas.\n\nObrigado,\nEquipa Moduluxe`,
                  timestamp: 'Agora mesmo',
                  read: false,
                  type: 'Email',
                  avatarColor: 'bg-green-600'
              });
          }
      }
  };

  const addDocument = (doc: Document) => {
    setDocuments(prev => [doc, ...prev]);
    logAction('Upload Document', `Uploaded document ${doc.name}`);
  };

  const deleteDocument = (id: string) => {
      setDocuments(prev => prev.filter(d => d.id !== id));
      logAction('Delete Document', `Deleted document ${id}`);
  };

  const markCommunicationAsRead = (id: string) => {
    setCommunications(prev => prev.map(c => c.id === id ? { ...c, read: true } : c));
  };
  
  const markAllNotificationsAsRead = () => {
      setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  const addMaintenanceRequest = (req: MaintenanceRequest) => {
    setMaintenanceRequests(prev => [req, ...prev]);
    logAction('Create Maintenance Request', `Reported issue for ${req.houseName}`);
  };

  const updateMaintenanceRequest = (updatedReq: MaintenanceRequest) => {
    setMaintenanceRequests(prev => prev.map(r => r.id === updatedReq.id ? updatedReq : r));
    logAction('Update Maintenance Request', `Updated request ${updatedReq.id}`);
  };

  const deleteMaintenanceRequest = (id: string) => {
    setMaintenanceRequests(prev => prev.filter(r => r.id !== id));
    logAction('Delete Maintenance Request', `Deleted request ${id}`);
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(prev => prev.map(i => i.id === updatedInvoice.id ? updatedInvoice : i));
    logAction('Update Invoice', `Updated invoice ${updatedInvoice.id}`);
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
    logAction('Delete Invoice', `Deleted invoice ${id}`);
  };

  const addAutomation = (automation: Automation) => {
      setAutomations(prev => [automation, ...prev]);
      logAction('Create Automation', `Created automation ${automation.name}`);
  };

  const updateAutomation = (updatedAutomation: Automation) => {
      setAutomations(prev => prev.map(a => a.id === updatedAutomation.id ? updatedAutomation : a));
      logAction('Update Automation', `Updated automation ${updatedAutomation.name}`);
  };

  const deleteAutomation = (id: string) => {
      setAutomations(prev => prev.filter(a => a.id !== id));
      logAction('Delete Automation', `Deleted automation ${id}`);
  };

  const addLead = (lead: Lead) => {
      setLeads(prev => [lead, ...prev]);
      logAction('Create Lead', `Created lead ${lead.name}`);
  };

  const updateLead = (updatedLead: Lead) => {
      setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
      logAction('Update Lead', `Updated lead ${updatedLead.name} status to ${updatedLead.status}`);
  };

  const deleteLead = (id: string) => {
      setLeads(prev => prev.filter(l => l.id !== id));
      logAction('Delete Lead', `Deleted lead ${id}`);
  };

  const addSetting = (setting: AppSetting) => {
    setSettings(prev => [...prev, setting]);
  };

  const updateSetting = (updatedSetting: AppSetting) => {
    setSettings(prev => prev.map(s => s.id === updatedSetting.id ? updatedSetting : s));
  };

  const deleteSetting = (id: string) => {
    setSettings(prev => prev.filter(s => s.id !== id));
  };

  const activityFeed = useMemo(() => {
    const feed: ActivityFeedItem[] = [];
    payments.forEach(p => {
        if (p.paidDate) {
            feed.push({
                id: `act-pay-${p.id}`,
                timestamp: new Date(p.paidDate),
                description: `Pagamento de AOA ${p.amount.toLocaleString()} recebido para o contrato ${p.contractId}.`,
                type: 'payment'
            });
        }
    });
    contracts.forEach(c => {
        feed.push({
            id: `act-con-${c.id}`,
            timestamp: new Date(c.startDate),
            description: `Contrato iniciado para ${c.houseName} com ${c.userName}.`,
            type: 'contract'
        });
    });
    users.forEach(u => {
        feed.push({
            id: `act-user-${u.id}`,
            timestamp: new Date(Date.now() - Math.random() * 30 * 86400000),
            description: `Novo ${u.type} registrado: ${u.name}.`,
            type: 'user'
        })
    })
    return feed.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);
  }, [payments, contracts, users]);

  return { 
    houses, addHouse, updateHouse, deleteHouse,
    users, addUser, updateUser, deleteUser,
    userProfile, updateUserProfile,
    notificationPreferences, updateNotificationPreferences,
    appearancePreferences, updateAppearancePreferences,
    localizationPreferences, updateLocalizationPreferences,
    propertyListingDefaults, updatePropertyListingDefaults,
    crmSettings, updateCrmSettings,
    transactionManagementSettings, updateTransactionManagementSettings,
    subscription, paymentMethods, billingInvoices,
    integrations, connectIntegration, disconnectIntegration,
    contracts, addContract, updateContract, deleteContract,
    bookings, addBooking, updateBooking, cancelBooking,
    payments, addPayment, updatePayment, processPaymentProof,
    documents, addDocument, deleteDocument,
    notifications, markAllNotificationsAsRead,
    communications, addCommunication, markCommunicationAsRead,
    maintenanceRequests, addMaintenanceRequest, updateMaintenanceRequest, deleteMaintenanceRequest,
    invoices, addInvoice, updateInvoice, deleteInvoice,
    automations, addAutomation, updateAutomation, deleteAutomation,
    auditLog,
    leads, addLead, updateLead, deleteLead,
    monthlyRevenue, activityFeed,
    settings, addSetting, updateSetting, deleteSetting
  };
};
