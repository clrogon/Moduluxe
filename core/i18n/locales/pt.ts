
export const pt = {
  "sidebar": {
    "sections": {
      "core": "Principal",
      "businessModules": "Módulos de Negócio",
      "operationalModules": "Módulos Operacionais",
      "system": "Sistema"
    },
    "myPortal": "Meu Portal",
    "analytics": "Análises",
    "users": "Usuários",
    "leads": "Leads / CRM",
    "houses": "Imóveis",
    "bookings": "Reservas",
    "payments": "Pagamentos",
    "reconciliation": "Reconciliação Bancária",
    "contracts": "Contratos",
    "documents": "Documentos",
    "reporting": "Relatórios",
    "communications": "Comunicações",
    "maintenance": "Manutenção",
    "invoices": "Faturas",
    "automations": "Automações",
    "auditLog": "Log de Auditoria",
    "settings": "Configurações",
    "signOut": "Sair",
    "future": "Futuro"
  },
  "header": {
    "notifications": "Notificações",
    "markAllRead": "Marcar tudo como lido",
    "noNotifications": "Nenhuma notificação nova.",
    "searchPlaceholder": "Buscar imóveis, usuários, contratos..."
  },
  "login": {
    "title": "Acesse a Moduluxe",
    "subtitle": "Gerencie seu portfólio de imóveis com IA",
    "emailLabel": "Endereço de e-mail",
    "emailPlaceholder": "Digite seu e-mail",
    "passwordLabel": "Senha",
    "passwordPlaceholder": "Digite sua senha",
    "signInButton": "Entrar (Use os botões de demonstração)",
    "demoSeparator": "Ou continue com um papel de demonstração",
    "authenticating": "Autenticando como {role}..."
  },
  "analytics": {
    "totalRevenue": "Receita Total (YTD)",
    "activeContracts": "Contratos Ativos",
    "totalUsers": "Total de Usuários",
    "paymentsDue": "Pagamentos Pendentes",
    "revenueOverview": "Visão Geral da Receita",
    "thisYear": "Este Ano",
    "lastYear": "Ano Passado",
    "revenueByProperty": "Receita por Tipo de Imóvel",
    "recentActivity": "Atividade Recente",
    "noActivity": "Nenhuma atividade recente.",
    "occupancyRate": "Taxa de Ocupação",
    "propertiesOccupied": "{occupied} de {total} imóveis ocupados"
  },
  "houses": {
    "tableTitle": "Imóveis",
    "addProperty": "Adicionar Imóvel",
    "editTitle": "Editar Imóvel",
    "addTitle": "Adicionar Novo Imóvel",
    "detailsTitle": "Detalhes do Imóvel",
    "columns": {
      "address": "Endereço",
      "type": "Tipo",
      "rent": "Aluguel",
      "status": "Status"
    },
    "form": {
      "address": "Endereço",
      "propertyType": "Tipo de Imóvel",
      "rent": "Aluguel Mensal (R$)",
      "status": "Status",
      "deletePrompt": "Tem certeza de que deseja excluir o imóvel \"{address}\"? Esta ação não pode ser desfeita."
    },
    "details": {
      "title": "Detalhes do Imóvel",
      "type": "Tipo de Imóvel",
      "rent": "Aluguel Mensal",
      "id": "ID do Imóvel",
      "maintenanceHistory": "Histórico de Manutenção",
      "noMaintenance": "Nenhum registro de manutenção encontrado para este imóvel."
    },
    "empty": {
      "title": "Nenhum imóvel encontrado",
      "message": "Adicione seu primeiro imóvel para gerenciá-lo aqui."
    }
  },
  "users": {
    "title": "Gerenciamento de Usuários",
    "subtitle": "Gerencie inquilinos, proprietários e administradores.",
    "addUser": "Adicionar Usuário",
    "tableTitle": "Usuários Registrados",
    "editTitle": "Editar Usuário",
    "addTitle": "Adicionar Novo Usuário",
    "columns": {
      "name": "Nome",
      "type": "Tipo",
      "email": "E-mail",
      "phone": "Telefone",
      "status": "Status"
    },
    "form": {
      "name": "Nome Completo",
      "email": "Endereço de E-mail",
      "phone": "Número de Telefone",
      "role": "Função",
      "accountStatus": "Status da Conta",
      "deletePrompt": "Tem certeza de que deseja excluir o usuário \"{name}\"? Esta ação não pode ser desfeita."
    },
    "empty": {
      "title": "Nenhum usuário encontrado",
      "message": "Adicione seu primeiro inquilino, proprietário ou administrador para começar."
    }
  },
  "contracts": {
    "addContract": "Adicionar Contrato",
    "tableTitle": "Contratos",
    "editTitle": "Editar Contrato",
    "addTitle": "Adicionar Novo Contrato",
    "columns": {
      "id": "ID do Contrato",
      "house": "Imóvel",
      "user": "Usuário",
      "startDate": "Data de Início",
      "endDate": "Data de Fim",
      "status": "Status"
    },
    "form": {
      "booking": "Reserva Associada",
      "bookingDisabled": "A reserva não pode ser alterada para um contrato existente.",
      "startDate": "Data de Início",
      "endDate": "Data de Fim",
      "status": "Status do Contrato",
      "deletePrompt": "Tem certeza de que deseja excluir o contrato \"{id}\"? Esta ação não pode ser desfeita."
    },
    "empty": {
      "title": "Nenhum contrato encontrado",
      "message": "Adicione um novo contrato para gerenciar arrendamentos e acordos."
    }
  },
  "payments": {
    "recordPayment": "Registrar Pagamento",
    "uploadProof": "Carregar Comprovante",
    "tableTitle": "Pagamentos",
    "editTitle": "Editar Pagamento",
    "addTitle": "Registrar Novo Pagamento",
    "columns": {
      "contractId": "ID do Contrato",
      "amount": "Valor",
      "dueDate": "Data de Vencimento",
      "paidDate": "Data de Pagamento",
      "status": "Status"
    },
    "form": {
      "contract": "Contrato",
      "amount": "Valor (R$)",
      "dueDate": "Data de Vencimento",
      "paidDate": "Data de Pagamento (Opcional)",
      "status": "Status do Pagamento"
    },
    "empty": {
      "title": "Nenhum pagamento encontrado",
      "message": "Registre seu primeiro pagamento para vê-lo aqui."
    },
    "proof": {
        "title": "Processamento de Comprovante Multicaixa",
        "dragDrop": "Arraste e solte o PDF ou Imagem aqui",
        "errorSize": "O arquivo é muito grande. Máximo 5MB.",
        "errorType": "Tipo de arquivo inválido. Apenas PDF, JPG ou PNG.",
        "errorParse": "Não foi possível ler os dados do comprovante. Verifique se é um talão Multicaixa Express válido.",
        "errorIbanMismatch": "Alerta de Segurança: O pagamento foi feito para um IBAN não autorizado. Esperado: {expected}",
        "securityBlock": "Validação Bloqueada: Divergência de IBAN.",
        "processButton": "Analisar Comprovante",
        "successAnalysis": "Dados Extraídos com Sucesso",
        "matchFound": "Pagamento Correspondente Encontrado",
        "noMatch": "Nenhum pagamento pendente corresponde a este valor.",
        "noMatchError": "Não é possível confirmar sem uma correspondência válida.",
        "confirmButton": "Confirmar e Emitir Fatura"
    }
  },
  "reconciliation": {
      "title": "Reconciliação Bancária",
      "subtitle": "Processe arquivos de pagamento em massa do Multicaixa Express ou Exportações Bancárias.",
      "processButton": "Processar Correspondências",
      "uploadTitle": "Carregar Arquivo Bancário",
      "uploadDesc": "Arraste e solte um arquivo CSV ou TXT para corresponder pagamentos automaticamente.",
      "colDate": "Data",
      "colRef": "Referência/ID",
      "colDesc": "Descrição",
      "colAmount": "Valor",
      "colStatus": "Status",
      "statusMatched": "Correspondido",
      "statusUnmatched": "Não Correspondido",
      "statusProcessed": "Processado",
      "summary": "{count} transações encontradas. {matched} correspondidas."
  },
  "bookings": {
    "listView": "Lista",
    "calendarView": "Calendário",
    "newBooking": "Nova Reserva",
    "tableTitle": "Reservas",
    "editTitle": "Editar Reserva",
    "addTitle": "Nova Reserva",
    "columns": {
      "house": "Imóvel",
      "user": "Usuário",
      "startDate": "Data de Início",
      "endDate": "Data de Fim",
      "status": "Status"
    },
    "form": {
      "property": "Imóvel",
      "tenant": "Inquilino",
      "startDate": "Data de Início",
      "endDate": "Data de Fim",
      "status": "Status da Reserva",
      "cancelPrompt": "Tem certeza de que deseja cancelar a reserva #{id} para \"{houseName}\"?"
    },
    "empty": {
      "title": "Nenhuma reserva encontrada",
      "message": "Crie sua primeira reserva para vê-la listada aqui."
    }
  },
  "documents": {
    "title": "Gerenciamento de Documentos",
    "subtitle": "Faça upload e gerencie contratos, identidades e outros arquivos.",
    "uploadButton": "Fazer Upload",
    "tableTitle": "Todos os Documentos",
    "modalTitle": "Fazer Upload de Novo Documento",
    "columns": {
      "name": "Nome do Documento",
      "type": "Tipo",
      "relatedTo": "Relacionado a",
      "uploadDate": "Data de Upload"
    },
    "form": {
      "file": "Arquivo",
      "uploadFile": "Faça upload de um arquivo",
      "dragDrop": "ou arraste e solte",
      "fileTypes": "PDF, PNG, JPG, DOCX até 10MB",
      "name": "Nome do Documento",
      "type": "Tipo de Documento",
      "relatedTo": "Relacionado a",
      "selectPlaceholder": "Selecione Usuário ou Imóvel",
      "optgroupUsers": "Usuários",
      "optgroupProperties": "Imóveis"
    },
    "empty": {
      "title": "Nenhum documento encontrado",
      "message": "Faça o upload do seu primeiro documento para começar."
    }
  },
  "communications": {
    "title": "Caixa de Entrada",
    "subtitle": "Gerencie seus e-mails e mensagens.",
    "unread": "{count} não lidas",
    "newMessage": "Nova Mensagem",
    "detailsTitle": "Detalhes da Mensagem",
    "composeTitle": "Nova Mensagem",
    "form": {
      "type": "Tipo de Mensagem",
      "recipient": "Destinatário",
      "subject": "Assunto",
      "body": "Corpo da Mensagem"
    },
    "empty": {
      "title": "Nenhuma mensagem",
      "message": "Sua caixa de entrada está vazia. Novas mensagens de inquilinos e proprietários aparecerão aqui."
    }
  },
  "maintenance": {
    "title": "Manutenção",
    "subtitle": "Acompanhe e gerencie os reparos dos imóveis.",
    "reportIssue": "Relatar Problema",
    "tableTitle": "Solicitações de Manutenção",
    "editTitle": "Atualizar Solicitação",
    "addTitle": "Relatar Problema de Manutenção",
    "columns": {
      "property": "Imóvel",
      "issue": "Problema",
      "priority": "Prioridade",
      "reported": "Relatado em",
      "status": "Status"
    },
    "form": {
      "property": "Imóvel",
      "description": "Descrição do Problema",
      "priority": "Prioridade",
      "status": "Status",
      "deletePrompt": "Tem certeza de que deseja excluir a solicitação de manutenção para \"{houseName}\"?"
    },
    "empty": {
      "title": "Nenhuma solicitação de manutenção",
      "message": "Relate um problema para criar uma nova solicitação de manutenção."
    }
  },
  "invoices": {
    "createInvoice": "Criar Fatura",
    "tableTitle": "Faturas",
    "editTitle": "Editar Fatura",
    "addTitle": "Criar Nova Fatura",
    "columns": {
      "id": "Nº Fatura",
      "contract": "Contrato",
      "amount": "Valor",
      "dueDate": "Vencimento",
      "issued": "Emitida em",
      "status": "Status"
    },
    "form": {
      "contract": "Contrato",
      "amount": "Valor (R$)",
      "issuedDate": "Data de Emissão",
      "dueDate": "Data de Vencimento",
      "status": "Status da Fatura",
      "deletePrompt": "Tem certeza de que deseja excluir a fatura \"{id}\"? Esta ação não pode ser desfeita."
    },
    "empty": {
      "title": "Nenhuma fatura encontrada",
      "message": "Crie uma nova fatura para um contrato para vê-la aqui."
    }
  },
  "reporting": {
    "title": "Relatórios",
    "subtitle": "Gere e exporte relatórios financeiros e de ocupação detalhados.",
    "startDate": "Data de Início",
    "endDate": "Data de Fim",
    "propertyType": "Tipo de Imóvel",
    "export": "Exportar para PDF",
    "totalRevenue": "Receita Total",
    "paymentsRecorded": "Pagamentos Registrados",
    "newBookings": "Novas Reservas",
    "tableTitle": "Relatório Financeiro ({startDate} a {endDate})",
    "columns": {
      "date": "Data do Pagamento",
      "tenant": "Inquilino",
      "property": "Imóvel",
      "type": "Tipo",
      "amount": "Valor"
    }
  },
  "tenantPortal": {
    "welcome": "Bem-vindo, {name}!",
    "subtitle": "Aqui está um resumo da sua locação na Moduluxe.",
    "activeContract": "Contrato Ativo",
    "contractEndDate": "Fim do Contrato",
    "nextPayment": "Próximo Pagamento",
    "openMaintenance": "Manutenções Abertas",
    "paymentHistory": "Histórico de Pagamentos",
    "maintenanceRequests": "Solicitações de Manutenção"
  },
  "settings": {
    "title": "Configurações",
    "subtitle": "Gerencie seu perfil profissional, segurança e preferências do aplicativo.",
    "saveChanges": "Salvar Alterações",
    "savedMessage": "Preferências salvas!",
    "tabs": {
      "account": "Conta e Perfil",
      "security": "Privacidade e Segurança",
      "notifications": "Notificações",
      "appearance": "Aparência e Tela",
      "language": "Idioma e Localização",
      "listingDefaults": "Padrões de Anúncio",
      "crm": "CRM",
      "transactions": "Transações",
      "billing": "Faturamento",
      "integrations": "Integrações",
      "data": "Dados",
      "marketing": "Marketing",
      "analytics": "Análises",
      "team": "Equipe",
      "legal": "Jurídico",
      "mobile": "Móvel",
      "advanced": "Avançado",
      "help": "Ajuda"
    },
    "language": {
      "title": "Idioma e Localização",
      "description": "Defina as suas preferências regionais de idioma, datas e moeda.",
      "displayLanguage": "Idioma de Exibição",
      "currency": "Moeda",
      "dateFormat": "Formato de Data",
      "timeFormat": "Formato de Hora",
      "timezone": "Fuso Horário",
      "measurementUnits": "Unidades de Medida"
    },
    "account": {
        "profilePicture": "Foto de Perfil",
        "profilePictureDesc": "Atualize sua foto profissional.",
        "professionalTitle": "Título Profissional",
        "licenseNumber": "Número da Licença",
        "serviceAreas": "Áreas de Serviço (Códigos postais, separados por vírgula)",
        "bio": "Biografia Profissional",
        "bioDesc": "Breve descrição para o seu perfil. URLs são ligados automaticamente.",
        "bankDetails": "Dados Bancários (Conta de Recebimento)",
        "bankDetailsDesc": "Estes dados são usados para validar comprovantes de pagamento.",
        "beneficiary": "Nome do Beneficiário"
    },
    "appearance": {
        "themes": {
            "nzila_ember": "Nzila Ember (Principal)",
            "zen_path": "Zen Path (Orgânico)",
            "urban_traverse": "Urban Traverse (Mono)",
            "nzila_harmony": "Nzila Harmony (Céu)"
        }
    }
  },
  "common": {
    "actions": "Ações",
    "edit": "Editar",
    "viewDetailsFor": "Ver detalhes de",
    "search": "Buscar...",
    "noResults": "Nenhum resultado encontrado para \"{term}\"",
    "noData": "Nenhum dado disponível.",
    "cancel": "Cancelar",
    "delete": "Excluir",
    "save": "Salvar Alterações",
    "add": "Adicionar",
    "create": "Criar",
    "update": "Atualizar",
    "submit": "Enviar",
    "change": "Alterar"
  },
  "error": {
    "selectView": "Selecione uma visão"
  }
}
