
export const es = {
  "sidebar": {
    "sections": {
      "core": "Principal",
      "businessModules": "Módulos de Negocio",
      "operationalModules": "Módulos Operativos",
      "system": "Sistema"
    },
    "myPortal": "Mi Portal",
    "analytics": "Análisis",
    "users": "Usuarios",
    "leads": "Leads / CRM",
    "houses": "Propiedades",
    "bookings": "Reservas",
    "payments": "Pagos",
    "contracts": "Contratos",
    "documents": "Documentos",
    "reporting": "Informes",
    "communications": "Comunicaciones",
    "maintenance": "Mantenimiento",
    "invoices": "Facturas",
    "automations": "Automatizaciones",
    "auditLog": "Registro de Auditoría",
    "settings": "Configuración",
    "signOut": "Cerrar Sesión",
    "future": "Futuro"
  },
  "header": {
    "notifications": "Notificaciones",
    "markAllRead": "Marcar todo como leído",
    "noNotifications": "No hay notificaciones nuevas.",
    "searchPlaceholder": "Buscar propiedades, usuarios, contratos..."
  },
  "login": {
    "title": "Inicia sesión en Moduluxe",
    "subtitle": "Gestiona tu cartera de inmuebles con IA",
    "emailLabel": "Dirección de correo electrónico",
    "emailPlaceholder": "Introduce tu correo",
    "passwordLabel": "Contraseña",
    "passwordPlaceholder": "Introduce tu contraseña",
    "signInButton": "Iniciar Sesión (Usa los botones de demostración)",
    "demoSeparator": "O continúa con un rol de demostración",
    "authenticating": "Autenticando como {role}..."
  },
  "analytics": {
    "totalRevenue": "Ingresos Totales (YTD)",
    "activeContracts": "Contratos Activos",
    "totalUsers": "Usuarios Totales",
    "paymentsDue": "Pagos Pendientes",
    "revenueOverview": "Resumen de Ingresos",
    "thisYear": "Este Año",
    "lastYear": "Año Pasado",
    "revenueByProperty": "Ingresos por Tipo de Propiedad",
    "recentActivity": "Actividad Reciente",
    "noActivity": "No hay actividad reciente.",
    "occupancyRate": "Tasa de Ocupación",
    "propertiesOccupied": "{occupied} de {total} propiedades ocupadas"
  },
  "houses": {
    "tableTitle": "Propiedades",
    "addProperty": "Añadir Propiedad",
    "editTitle": "Editar Propiedad",
    "addTitle": "Añadir Nueva Propiedad",
    "detailsTitle": "Detalles de la Propiedad",
    "columns": {
      "address": "Dirección",
      "type": "Tipo",
      "rent": "Alquiler",
      "status": "Estado"
    },
    "form": {
      "address": "Dirección",
      "propertyType": "Tipo de Propiedad",
      "rent": "Alquiler Mensual ($)",
      "status": "Estado",
      "deletePrompt": "¿Estás seguro de que quieres eliminar la propiedad \"{address}\"? Esta acción no se puede deshacer."
    },
    "details": {
      "title": "Detalles de la Propiedad",
      "type": "Tipo de Propiedad",
      "rent": "Alquiler Mensual",
      "id": "ID de Propiedad",
      "maintenanceHistory": "Historial de Mantenimiento",
      "noMaintenance": "No se encontraron registros de mantenimiento para esta propiedad."
    },
    "empty": {
      "title": "No se encontraron propiedades",
      "message": "Añade tu primera propiedad para gestionarla aquí."
    }
  },
  "users": {
    "title": "Gestión de Usuarios",
    "subtitle": "Gestiona inquilinos, propietarios y administradores.",
    "addUser": "Añadir Usuario",
    "tableTitle": "Usuarios Registrados",
    "editTitle": "Editar Usuario",
    "addTitle": "Añadir Nuevo Usuario",
    "columns": {
      "name": "Nombre",
      "type": "Tipo",
      "email": "Correo",
      "phone": "Teléfono",
      "status": "Estado"
    },
    "form": {
      "name": "Nombre Completo",
      "email": "Dirección de Correo",
      "phone": "Número de Teléfono",
      "role": "Rol",
      "accountStatus": "Estado de la Cuenta",
      "deletePrompt": "¿Estás seguro de que quieres eliminar al usuario \"{name}\"? Esta acción no se puede deshacer."
    },
    "empty": {
      "title": "No se encontraron usuarios",
      "message": "Añade tu primer inquilino, propietario o administrador para empezar."
    }
  },
  "contracts": {
    "addContract": "Añadir Contrato",
    "tableTitle": "Contratos",
    "editTitle": "Editar Contrato",
    "addTitle": "Añadir Nuevo Contrato",
    "columns": {
      "id": "ID de Contrato",
      "house": "Propiedad",
      "user": "Usuario",
      "startDate": "Fecha de Inicio",
      "endDate": "Fecha de Fin",
      "status": "Estado"
    },
    "form": {
      "booking": "Reserva Asociada",
      "bookingDisabled": "La reserva no se puede cambiar para un contrato existente.",
      "startDate": "Fecha de Inicio",
      "endDate": "Fecha de Fin",
      "status": "Estado del Contrato",
      "deletePrompt": "¿Estás seguro de que quieres eliminar el contrato \"{id}\"? Esta acción no se puede deshacer."
    },
    "empty": {
      "title": "No se encontraron contratos",
      "message": "Añade un nuevo contrato para gestionar arrendamientos y acuerdos."
    }
  },
  "payments": {
    "recordPayment": "Registrar Pago",
    "uploadProof": "Subir Comprobante",
    "tableTitle": "Pagos",
    "editTitle": "Editar Pago",
    "addTitle": "Registrar Nuevo Pago",
    "columns": {
      "contractId": "ID de Contrato",
      "amount": "Monto",
      "dueDate": "Fecha de Vencimiento",
      "paidDate": "Fecha de Pago",
      "status": "Estado"
    },
    "form": {
      "contract": "Contrato",
      "amount": "Monto ($)",
      "dueDate": "Fecha de Vencimiento",
      "paidDate": "Fecha de Pago (Opcional)",
      "status": "Estado del Pago"
    },
    "empty": {
      "title": "No se encontraron pagos",
      "message": "Registra tu primer pago para verlo aquí."
    },
    "proof": {
        "title": "Procesamiento de Comprobante Multicaixa",
        "dragDrop": "Arrastra y suelta PDF o Imagen aquí",
        "errorSize": "El archivo es demasiado grande. Máximo 5MB.",
        "errorType": "Tipo de archivo inválido. Solo PDF, JPG o PNG.",
        "errorParse": "No se pudieron leer los datos del comprobante. Asegúrate de que sea un comprobante válido de Multicaixa Express.",
        "errorIbanMismatch": "Alerta de Seguridad: El pago se realizó a un IBAN no autorizado. Esperado: {expected}",
        "securityBlock": "Validación Bloqueada: Divergencia de IBAN.",
        "processButton": "Analizar Comprobante",
        "successAnalysis": "Datos Extraídos con Éxito",
        "matchFound": "Pago Coincidente Encontrado",
        "noMatch": "Ningún pago pendiente coincide con este monto.",
        "noMatchError": "No se puede confirmar sin una coincidencia válida.",
        "confirmButton": "Confirmar y Emitir Factura"
    }
  },
  "bookings": {
    "listView": "Lista",
    "calendarView": "Calendario",
    "newBooking": "Nueva Reserva",
    "tableTitle": "Reservas",
    "editTitle": "Editar Reserva",
    "addTitle": "Nueva Reserva",
    "columns": {
      "house": "Propiedad",
      "user": "Usuario",
      "startDate": "Fecha de Inicio",
      "endDate": "Fecha de Fin",
      "status": "Estado"
    },
    "form": {
      "property": "Propiedad",
      "tenant": "Inquilino",
      "startDate": "Fecha de Inicio",
      "endDate": "Fecha de Fin",
      "status": "Estado de la Reserva",
      "cancelPrompt": "¿Estás seguro de que quieres cancelar la reserva #{id} para \"{houseName}\"?"
    },
    "empty": {
      "title": "No se encontraron reservas",
      "message": "Crea tu primera reserva para verla listada aquí."
    }
  },
  "documents": {
    "title": "Gestión de Documentos",
    "subtitle": "Sube y gestiona contratos de arrendamiento, identificaciones y otros archivos.",
    "uploadButton": "Subir Documento",
    "tableTitle": "Todos los Documentos",
    "modalTitle": "Subir Nuevo Documento",
    "columns": {
      "name": "Nombre del Documento",
      "type": "Tipo",
      "relatedTo": "Relacionado Con",
      "uploadDate": "Fecha de Subida"
    },
    "form": {
      "file": "Archivo",
      "uploadFile": "Sube un archivo",
      "dragDrop": "o arrástralo y suéltalo",
      "fileTypes": "PDF, PNG, JPG, DOCX hasta 10MB",
      "name": "Nombre del Documento",
      "type": "Tipo de Documento",
      "relatedTo": "Relacionado Con",
      "selectPlaceholder": "Selecciona Usuario o Propiedad",
      "optgroupUsers": "Usuarios",
      "optgroupProperties": "Propiedades"
    },
    "empty": {
      "title": "No se encontraron documentos",
      "message": "Sube tu primer documento para empezar."
    }
  },
  "communications": {
    "title": "Bandeja de Entrada",
    "subtitle": "Gestiona tus correos y mensajes.",
    "unread": "{count} sin leer",
    "newMessage": "Nuevo Mensaje",
    "detailsTitle": "Detalles del Mensaje",
    "composeTitle": "Nuevo Mensaje",
    "form": {
      "type": "Tipo de Mensaje",
      "recipient": "Destinatario",
      "subject": "Asunto",
      "body": "Cuerpo del Mensaje"
    },
    "empty": {
      "title": "No hay mensajes",
      "message": "Tu bandeja de entrada está completamente vacía. Los nuevos mensajes de inquilinos y propietarios aparecerán aquí."
    }
  },
  "maintenance": {
    "title": "Mantenimiento",
    "subtitle": "Rastrea y gestiona las reparaciones de propiedades.",
    "reportIssue": "Reportar Incidencia",
    "tableTitle": "Solicitudes de Mantenimiento",
    "editTitle": "Actualizar Solicitud",
    "addTitle": "Reportar Incidencia de Mantenimiento",
    "columns": {
      "property": "Propiedad",
      "issue": "Incidencia",
      "priority": "Prioridad",
      "reported": "Reportado",
      "status": "Estado"
    },
    "form": {
      "property": "Propiedad",
      "description": "Descripción de la Incidencia",
      "priority": "Prioridad",
      "status": "Estado",
      "deletePrompt": "¿Estás seguro de que quieres eliminar la solicitud de mantenimiento para \"{houseName}\"?"
    },
    "empty": {
      "title": "No hay solicitudes de mantenimiento",
      "message": "Reporta una incidencia para crear una nueva solicitud de mantenimiento."
    }
  },
  "invoices": {
    "createInvoice": "Crear Factura",
    "tableTitle": "Facturas",
    "editTitle": "Editar Factura",
    "addTitle": "Crear Nueva Factura",
    "columns": {
      "id": "Nº Factura",
      "contract": "Contrato",
      "amount": "Monto",
      "dueDate": "Vencimiento",
      "issued": "Emitida",
      "status": "Estado"
    },
    "form": {
      "contract": "Contrato",
      "amount": "Monto ($)",
      "issuedDate": "Fecha de Emisión",
      "dueDate": "Fecha de Vencimiento",
      "status": "Estado de la Factura",
      "deletePrompt": "¿Estás seguro de que quieres eliminar la factura \"{id}\"? Esta acción no se puede deshacer."
    },
    "empty": {
      "title": "No se encontraron facturas",
      "message": "Crea una nueva factura para un contrato para verla aquí."
    }
  },
  "reporting": {
    "title": "Informes",
    "subtitle": "Genera y exporta informes detallados financieros y de ocupación.",
    "startDate": "Fecha de Inicio",
    "endDate": "Fecha de Fin",
    "propertyType": "Tipo de Propiedad",
    "export": "Exportar a PDF",
    "totalRevenue": "Ingresos Totales",
    "paymentsRecorded": "Pagos Registrados",
    "newBookings": "Nuevas Reservas",
    "tableTitle": "Informe Financiero ({startDate} a {endDate})",
    "columns": {
      "date": "Fecha de Pago",
      "tenant": "Inquilino",
      "property": "Propiedad",
      "type": "Tipo",
      "amount": "Monto"
    }
  },
  "tenantPortal": {
    "welcome": "¡Bienvenido, {name}!",
    "subtitle": "Aquí tienes un resumen de tu arrendamiento en Moduluxe.",
    "activeContract": "Contrato Activo",
    "contractEndDate": "Fin de Contrato",
    "nextPayment": "Próximo Pago",
    "openMaintenance": "Solicitudes de Mantenimiento Abiertas",
    "paymentHistory": "Historial de Pagos",
    "maintenanceRequests": "Solicitudes de Mantenimiento"
  },
  "crm": {
      "title": "Pipeline de Leads",
      "subtitle": "Rastrea y gestiona inquilinos y compradores potenciales.",
      "addLead": "Añadir Lead",
      "editLead": "Editar Lead",
      "deletePrompt": "¿Estás seguro de que quieres eliminar el lead \"{name}\"?",
      "status": {
          "New": "Nuevo",
          "Contacted": "Contactado",
          "Showing": "Visita",
          "Offer": "Oferta",
          "Closed": "Cerrado"
      },
      "form": {
          "name": "Nombre del Lead",
          "email": "Correo",
          "phone": "Teléfono",
          "source": "Fuente",
          "interest": "Propiedad de Interés",
          "status": "Etapa del Pipeline",
          "notes": "Notas",
          "selectProperty": "Selecciona una propiedad...",
          "generalInquiry": "Consulta General"
      }
  },
  "settings": {
    "title": "Configuración",
    "subtitle": "Gestiona tu perfil profesional, seguridad y preferencias de la aplicación.",
    "saveChanges": "Guardar Cambios",
    "savedMessage": "¡Preferencias guardadas!",
    "tabs": {
      "account": "Cuenta y Perfil",
      "security": "Privacidad y Seguridad",
      "notifications": "Notificações",
      "appearance": "Apariencia y Pantalla",
      "language": "Idioma y Localización",
      "listingDefaults": "Valores por Defecto",
      "crm": "CRM",
      "transactions": "Transacciones",
      "billing": "Facturación",
      "integrations": "Integraciones",
      "data": "Datos",
      "marketing": "Marketing",
      "analytics": "Análisis",
      "team": "Equipo",
      "legal": "Legal",
      "mobile": "Móvil",
      "advanced": "Avanzado",
      "help": "Ayuda"
    },
    "language": {
      "title": "Idioma y Localización",
      "description": "Establece tus preferencias regionales de idioma, fechas y moneda.",
      "displayLanguage": "Idioma de Visualización",
      "currency": "Moneda",
      "dateFormat": "Formato de Fecha",
      "timeFormat": "Formato de Hora",
      "timezone": "Zona Horaria",
      "measurementUnits": "Unidades de Medida"
    },
    "account": {
        "profilePicture": "Foto de Perfil",
        "profilePictureDesc": "Actualiza tu foto profesional.",
        "professionalTitle": "Título Profesional",
        "licenseNumber": "Número de Licencia",
        "serviceAreas": "Áreas de Servicio (Códigos postales, separados por coma)",
        "bio": "Biografía Profesional",
        "bioDesc": "Breve descripción para tu perfil. Las URL se enlazan automáticamente.",
        "bankDetails": "Datos Bancarios (Cuenta de Recepción)",
        "bankDetailsDesc": "Estos datos se utilizan para validar comprobantes de pago.",
        "beneficiary": "Nombre del Beneficiario"
    },
    "appearance": {
        "themes": {
            "nzila_ember": "Nzila Ember (Principal)",
            "zen_path": "Zen Path (Orgánico)",
            "urban_traverse": "Urban Traverse (Mono)",
            "nzila_harmony": "Nzila Harmony (Cielo)"
        }
    }
  },
  "common": {
    "actions": "Acciones",
    "edit": "Editar",
    "viewDetailsFor": "Ver detalles de",
    "search": "Buscar...",
    "noResults": "No se encontraron resultados para \"{term}\"",
    "noData": "No hay datos disponibles.",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "save": "Guardar Cambios",
    "add": "Añadir",
    "create": "Crear",
    "update": "Actualizar",
    "submit": "Enviar",
    "change": "Cambiar"
  },
  "error": {
    "selectView": "Selecciona una vista"
  }
}
