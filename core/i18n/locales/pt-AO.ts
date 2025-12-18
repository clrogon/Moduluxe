
export const ptAO = {
  "sidebar": {
    "sections": {
      "core": "Principal",
      "businessModules": "Módulos de Negócio",
      "operationalModules": "Módulos Operacionais",
      "system": "Sistema"
    },
    "myPortal": "Meu Portal",
    "analytics": "Análises",
    "users": "Utentes",
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
    "auditLog": "Registo de Auditoria",
    "settings": "Definições",
    "signOut": "Terminar Sessão",
    "future": "Futuro"
  },
  "header": {
    "notifications": "Notificações",
    "markAllRead": "Marcar tudo como lido",
    "noNotifications": "Nenhuma notificação nova.",
    "searchPlaceholder": "Pesquisar imóveis, utentes, contratos..."
  },
  "login": {
    "title": "Aceda à Moduluxe",
    "subtitle": "Gerira o seu portfólio de imóveis com IA",
    "emailLabel": "Endereço de e-mail",
    "emailPlaceholder": "Insira o seu e-mail",
    "passwordLabel": "Palavra-passe",
    "passwordPlaceholder": "Insira a sua palavra-passe",
    "signInButton": "Entrar (Use os botões de demonstração)",
    "demoSeparator": "Ou continue com um perfil de demonstração",
    "authenticating": "A autenticar como {role}..."
  },
  "analytics": {
    "totalRevenue": "Receita Total (YTD)",
    "activeContracts": "Contratos Activos",
    "totalUsers": "Total de Utentes",
    "paymentsDue": "Pagamentos Pendentes",
    "revenueOverview": "Visão Geral da Receita",
    "thisYear": "Este Ano",
    "lastYear": "Ano Passado",
    "revenueByProperty": "Receita por Tipo de Imóvel",
    "recentActivity": "Actividade Recente",
    "noActivity": "Nenhuma actividade recente.",
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
      "rent": "Renda",
      "status": "Estado"
    },
    "form": {
      "address": "Endereço",
      "propertyType": "Tipo de Imóvel",
      "rent": "Renda Mensal (AOA)",
      "status": "Estado",
      "deletePrompt": "Tem a certeza de que deseja eliminar o imóvel \"{address}\"? Esta acção não pode ser desfeita."
    },
    "details": {
      "title": "Detalhes do Imóvel",
      "type": "Tipo de Imóvel",
      "rent": "Renda Mensal",
      "id": "ID do Imóvel",
      "maintenanceHistory": "Histórico de Manutenção",
      "noMaintenance": "Nenhum registo de manutenção encontrado para este imóvel."
    },
    "empty": {
      "title": "Nenhum imóvel encontrado",
      "message": "Adicione o seu primeiro imóvel para geri-lo aqui."
    }
  },
  "users": {
    "title": "Gestão de Utentes",
    "subtitle": "Gerira inquilinos, proprietários e administradores.",
    "addUser": "Adicionar Utente",
    "tableTitle": "Utentes Registados",
    "editTitle": "Editar Utente",
    "addTitle": "Adicionar Novo Utente",
    "columns": {
      "name": "Nome",
      "type": "Tipo",
      "email": "E-mail",
      "phone": "Telefone",
      "status": "Estado"
    },
    "form": {
      "name": "Nome Completo",
      "email": "Endereço de E-mail",
      "phone": "Número de Telefone",
      "role": "Função",
      "accountStatus": "Estado da Conta",
      "deletePrompt": "Tem a certeza de que deseja eliminar o utente \"{name}\"? Esta acção não pode ser desfeita."
    },
    "empty": {
      "title": "Nenhum utente encontrado",
      "message": "Adicione o seu primeiro inquilino, proprietário ou administrador para começar."
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
      "user": "Utente",
      "startDate": "Data de Início",
      "endDate": "Data de Fim",
      "status": "Estado"
    },
    "form": {
      "booking": "Reserva Associada",
      "bookingDisabled": "A reserva não pode ser alterada para um contrato existente.",
      "startDate": "Data de Início",
      "endDate": "Data de Fim",
      "status": "Estado do Contrato",
      "deletePrompt": "Tem a certeza de que deseja eliminar o contrato \"{id}\"? Esta acção não pode ser desfeita."
    },
    "empty": {
      "title": "Nenhum contrato encontrado",
      "message": "Adicione um novo contrato para gerir arrendamentos e acordos."
    }
  },
  "payments": {
    "recordPayment": "Registar Pagamento",
    "uploadProof": "Carregar Comprovativo",
    "tableTitle": "Pagamentos",
    "editTitle": "Editar Pagamento",
    "addTitle": "Registar Novo Pagamento",
    "columns": {
      "contractId": "ID do Contrato",
      "amount": "Valor",
      "dueDate": "Data de Vencimento",
      "paidDate": "Data de Pagamento",
      "status": "Estado"
    },
    "form": {
      "contract": "Contrato",
      "amount": "Valor (AOA)",
      "dueDate": "Data de Vencimento",
      "paidDate": "Data de Pagamento (Opcional)",
      "status": "Estado do Pagamento"
    },
    "empty": {
      "title": "Nenhum pagamento encontrado",
      "message": "Registe o seu primeiro pagamento para vê-lo aqui."
    },
    "proof": {
        "title": "Processamento de Comprovativo Multicaixa",
        "dragDrop": "Arraste e solte o PDF ou Imagem aqui",
        "errorSize": "O ficheiro é demasiado grande. Máximo 5MB.",
        "errorType": "Tipo de ficheiro inválido. Apenas PDF, JPG ou PNG.",
        "errorParse": "Não foi possível ler os dados do comprovativo. Verifique se é um talão Multicaixa Express válido.",
        "errorIbanMismatch": "Alerta de Segurança: O pagamento foi efectuado para um IBAN não autorizado. Esperado: {expected}",
        "securityBlock": "Validação Bloqueada: Divergência de IBAN.",
        "processButton": "Analisar Comprovativo",
        "successAnalysis": "Dados Extraídos com Sucesso",
        "matchFound": "Pagamento Correspondente Encontrado",
        "noMatch": "Nenhum pagamento pendente corresponde a este valor.",
        "noMatchError": "Não é possível confirmar sem uma correspondência válida.",
        "confirmButton": "Confirmar e Emitir Factura"
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
      "summary": "{count} transações encontradas. {matched} correspondidas.",
      "selectPayment": "Seleccionar Pagamento..."
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
      "user": "Utente",
      "startDate": "Data de Início",
      "endDate": "Data de Fim",
      "status": "Estado"
    },
    "form": {
      "property": "Imóvel",
      "tenant": "Inquilino",
      "startDate": "Data de Início",
      "endDate": "Data de Fim",
      "status": "Estado da Reserva",
      "cancelPrompt": "Tem a certeza de que deseja cancelar a reserva #{id} para \"{houseName}\"?"
    },
    "empty": {
      "title": "Nenhuma reserva encontrada",
      "message": "Crie a sua primeira reserva para vê-la listada aqui."
    }
  },
  "documents": {
    "title": "Gestão de Documentos",
    "subtitle": "Faça upload e gerira contratos, identidades e outros ficheiros.",
    "uploadButton": "Carregar",
    "tableTitle": "Todos os Documentos",
    "modalTitle": "Carregar Novo Documento",
    "columns": {
      "name": "Nome do Documento",
      "type": "Tipo",
      "relatedTo": "Relacionado a",
      "uploadDate": "Data de Carregamento"
    },
    "form": {
      "file": "Ficheiro",
      "uploadFile": "Carregar um ficheiro",
      "dragDrop": "ou arraste e solte",
      "fileTypes": "PDF, PNG, JPG, DOCX até 10MB",
      "name": "Nome do Documento",
      "type": "Tipo de Documento",
      "relatedTo": "Relacionado a",
      "selectPlaceholder": "Seleccione Utente ou Imóvel",
      "optgroupUsers": "Utentes",
      "optgroupProperties": "Imóveis"
    },
    "empty": {
      "title": "Nenhum documento encontrado",
      "message": "Carregue o seu primeiro documento para começar."
    }
  },
  "communications": {
    "title": "Caixa de Entrada",
    "subtitle": "Gerira os seus e-mails e mensagens.",
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
      "message": "A sua caixa de entrada está vazia. Novas mensagens de inquilinos e proprietários aparecerão aqui."
    }
  },
  "maintenance": {
    "title": "Manutenção",
    "subtitle": "Acompanhe e gerira as reparações dos imóveis.",
    "reportIssue": "Reportar Problema",
    "tableTitle": "Solicitações de Manutenção",
    "editTitle": "Actualizar Solicitação",
    "addTitle": "Reportar Problema de Manutenção",
    "columns": {
      "property": "Imóvel",
      "issue": "Problema",
      "priority": "Prioridade",
      "reported": "Reportado em",
      "status": "Estado"
    },
    "form": {
      "property": "Imóvel",
      "description": "Descrição do Problema",
      "priority": "Prioridade",
      "status": "Estado",
      "deletePrompt": "Tem a certeza de que deseja eliminar a solicitação de manutenção para \"{houseName}\"?"
    },
    "empty": {
      "title": "Nenhuma solicitação de manutenção",
      "message": "Relate um problema para criar uma nova solicitação de manutenção."
    }
  },
  "invoices": {
    "createInvoice": "Criar Factura",
    "tableTitle": "Facturas",
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
      "amount": "Valor (AOA)",
      "issuedDate": "Data de Emissão",
      "dueDate": "Data de Vencimento",
      "status": "Status da Fatura",
      "deletePrompt": "Tem a certeza de que deseja eliminar a factura \"{id}\"? Esta acção não pode ser desfeita."
    },
    "empty": {
      "title": "Nenhuma factura encontrada",
      "message": "Crie uma nova factura para um contrato para vê-la aqui."
    }
  },
  "automations": {
    "title": "Automações",
    "subtitle": "Crie regras para automatizar tarefas repetitivas.",
    "create": "Criar Automação",
    "tableTitle": "Automações Activas",
    "editTitle": "Editar Automação",
    "addTitle": "Nova Automação",
    "columns": {
      "name": "Nome",
      "trigger": "Gatilho",
      "action": "Acção",
      "status": "Estado"
    },
    "form": {
      "name": "Nome da Automação",
      "trigger": "Quando isto acontecer...",
      "action": "Faça isto...",
      "status": "Estado"
    },
    "empty": {
      "title": "Nenhuma Automação",
      "message": "Crie a sua primeira regra de automação para poupar tempo."
    }
  },
  "auditLog": {
    "title": "Registo de Auditoria",
    "tableTitle": "Actividade Recente",
    "columns": {
      "timestamp": "Data/Hora",
      "user": "Utente",
      "action": "Acção",
      "details": "Detalhes"
    },
    "empty": {
      "title": "Nenhum Registo",
      "message": "A actividade do sistema será registada aqui."
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
    "paymentsRecorded": "Pagamentos Registados",
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
    "subtitle": "Aqui está um resumo do seu arrendamento na Moduluxe.",
    "activeContract": "Contrato Ativo",
    "contractEndDate": "Fim do Contrato",
    "nextPayment": "Próximo Pagamento",
    "openMaintenance": "Manutenções Abertas",
    "paymentHistory": "Histórico de Pagamentos",
    "maintenanceRequests": "Solicitações de Manutenção"
  },
  "crm": {
      "title": "Pipeline de Leads",
      "subtitle": "Acompanhe e gerira potenciais inquilinos e compradores.",
      "addLead": "Adicionar Lead",
      "editLead": "Editar Lead",
      "deletePrompt": "Tem a certeza de que deseja eliminar o lead \"{name}\"?",
      "status": {
          "New": "Novo",
          "Contacted": "Contactado",
          "Showing": "Visita",
          "Offer": "Proposta",
          "Closed": "Fechado"
      },
      "form": {
          "name": "Nome do Lead",
          "email": "E-mail",
          "phone": "Telefone",
          "source": "Origem",
          "interest": "Imóvel de Interesse",
          "status": "Fase do Pipeline",
          "notes": "Notas",
          "selectProperty": "Seleccione um imóvel...",
          "generalInquiry": "Consulta Geral"
      }
  },
  "settings": {
    "title": "Definições",
    "subtitle": "Gerira o seu perfil profissional, segurança e preferências da aplicação.",
    "saveChanges": "Guardar Alterações",
    "savedMessage": "Preferências guardadas!",
    "tabs": {
      "account": "Conta e Perfil",
      "security": "Privacidade e Segurança",
      "notifications": "Notificações",
      "appearance": "Aparência e Ecrã",
      "language": "Idioma e Localização",
      "listingDefaults": "Padrões de Anúncio",
      "crm": "CRM",
      "transactions": "Transacções",
      "billing": "Facturação",
      "integrations": "Integrações",
      "data": "Dados",
      "marketing": "Marketing",
      "analytics": "Análises",
      "team": "Equipa",
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
        "profilePictureDesc": "Actualize a sua foto profissional.",
        "professionalTitle": "Título Profissional",
        "licenseNumber": "Número da Licença",
        "serviceAreas": "Áreas de Serviço (Códigos postais, separados por vírgula)",
        "bio": "Biografia Profissional",
        "bioDesc": "Breve descrição para o seu perfil. URLs são ligados automaticamente.",
        "bankDetails": "Dados Bancários (Conta de Recepção)",
        "bankDetailsDesc": "Estes dados são usados para validar comprovativos de pagamento.",
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
    "actions": "Acções",
    "edit": "Editar",
    "viewDetailsFor": "Ver detalhes de",
    "search": "Pesquisar...",
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
    "selectView": "Seleccione uma vista"
  }
}
