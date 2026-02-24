// Module definitions for the demo ERP.  Each module contains a set of fields
// that will be rendered dynamically in the demo.  These definitions are
// derived from the Odoo all‑apps page which lists categories such as Sitio web,
// Ventas, Finanzas, Inventario y fabricación, Recursos humanos, Marketing,
// Servicios, Productividad y Personalización【204453613942906†L219-L528】.  The
// descriptions and features are meant to give users a sense of what each
// module would offer while keeping the implementation generic.

export type FieldType = 'text' | 'number' | 'date' | 'select'

export interface ModuleField {
  /**
   * Human‑readable label for the form field.  This appears above the input.
   */
  name: string
  /**
   * The type of input.  Use `text` for freeform strings, `number` for numeric
   * values, `date` for dates, and `select` when a list of options should be
   * presented.  When using `select`, the `options` property must be provided.
   */
  type: FieldType
  /**
   * Optional list of options when `type` is `select`.
   */
  options?: string[]
}

export interface ModuleDef {
  /**
   * Unique identifier used as the slug in the route.  For example, the CRM
   * module will have id `crm` and will be accessible at `/modules/crm`.
   */
  id: string
  /**
   * Display name of the module.  This title appears in the catalog and in the
   * page header when the module is selected.
   */
  title: string
  /**
   * Short description explaining the purpose of the module.  The text is
   * summarised from Odoo’s documentation【204453613942906†L219-L528】.
   */
  description: string
  /**
   * Category key used to group modules in the catalog (e.g. `sales`,
   * `finance`).  See the `categories` array below for valid values.
   */
  category: string
  /**
   * CSS utility class applied to the icon background for the module card.  You
   * can adjust these tailwind classes as desired to theme each card.
   */
  color: string
  /**
   * List of bullet points describing the high‑level features of the module.
   */
  features: string[]
  /**
   * List of fields that should appear in the demo form.  When a user adds a
   * record, these fields will be rendered as inputs and the entered data will
   * be displayed in a table below.
   */
  fields: ModuleField[]
}

export const categories = [
  { key: 'website', label: 'Sitio web' },
  { key: 'sales', label: 'Ventas' },
  { key: 'finance', label: 'Finanzas' },
  { key: 'inventory', label: 'Inventario y fabricación' },
  { key: 'hr', label: 'Recursos humanos' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'services', label: 'Servicios' },
  { key: 'productivity', label: 'Productividad' },
  { key: 'customization', label: 'Personalización' },
] as const

/**
 * List of all modules available in the demo.  You can extend this array with
 * additional modules or update the fields/features to better suit your
 * demonstration.  These modules cover the main categories exposed on the
 * Odoo all‑apps page【204453613942906†L219-L528】.
 */
export const modules: ModuleDef[] = [
  {
    id: 'website',
    title: 'Sitio web',
    description: 'Creador de sitios web empresariales para presentar tu negocio en línea',
    category: 'website',
    color: 'bg-blue-200',
    features: ['Constructor visual', 'Blog', 'Foro', 'Eventos'],
    fields: [
      { name: 'Título de la página', type: 'text' },
      { name: 'Contenido', type: 'text' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'Comercio electrónico',
    description: 'Vende tus productos en línea con un carrito de compras integrado',
    category: 'website',
    color: 'bg-purple-200',
    features: ['Carrito de compras', 'Pasarela de pago', 'Gestión de catálogo'],
    fields: [
      { name: 'Nombre del producto', type: 'text' },
      { name: 'Precio', type: 'number' },
      { name: 'Stock', type: 'number' },
    ],
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Publica entradas, anuncios y noticias',
    category: 'website',
    color: 'bg-orange-200',
    features: ['Editor de texto', 'Categorías', 'Comentarios'],
    fields: [
      { name: 'Título de la entrada', type: 'text' },
      { name: 'Autor', type: 'text' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'forum',
    title: 'Foro',
    description: 'Gestiona un foro para preguntas frecuentes y discusiones',
    category: 'website',
    color: 'bg-teal-200',
    features: ['Hilos de discusión', 'Moderación', 'Etiquetas'],
    fields: [
      { name: 'Título del hilo', type: 'text' },
      { name: 'Usuario', type: 'text' },
      { name: 'Contenido', type: 'text' },
    ],
  },
  {
    id: 'elearning',
    title: 'eLearning',
    description: 'Gestiona y publica tus cursos de formación online',
    category: 'website',
    color: 'bg-indigo-200',
    features: ['Cursos', 'Lecciones', 'Evaluaciones'],
    fields: [
      { name: 'Nombre del curso', type: 'text' },
      { name: 'Instructor', type: 'text' },
      { name: 'Duración (horas)', type: 'number' },
    ],
  },
  {
    id: 'crm',
    title: 'CRM',
    description: 'Gestiona tus leads y cierra oportunidades de venta',
    category: 'sales',
    color: 'bg-green-200',
    features: ['Leads', 'Oportunidades', 'Pipeline'],
    fields: [
      { name: 'Nombre del lead', type: 'text' },
      { name: 'Empresa', type: 'text' },
      { name: 'Valor potencial', type: 'number' },
    ],
  },
  {
    id: 'sales',
    title: 'Ventas',
    description: 'De cotizaciones a facturas, gestiona todo el ciclo de ventas',
    category: 'sales',
    color: 'bg-lime-200',
    features: ['Cotizaciones', 'Pedidos de venta', 'Facturas'],
    fields: [
      { name: 'Cliente', type: 'text' },
      { name: 'Producto', type: 'text' },
      { name: 'Cantidad', type: 'number' },
      { name: 'Precio unitario', type: 'number' },
    ],
  },
  {
    id: 'pos',
    title: 'Punto de venta',
    description: 'Interfaz para ventas en tiendas físicas y restaurantes',
    category: 'sales',
    color: 'bg-yellow-200',
    features: ['Interfaz táctil', 'Cobros rápidos', 'Impresión de tickets'],
    fields: [
      { name: 'Producto', type: 'text' },
      { name: 'Cantidad', type: 'number' },
      { name: 'Total', type: 'number' },
    ],
  },
  {
    id: 'subscriptions',
    title: 'Suscripciones',
    description: 'Facturas recurrentes y renovaciones automáticas',
    category: 'sales',
    color: 'bg-pink-200',
    features: ['Planes recurrentes', 'Renovación', 'Historial de pagos'],
    fields: [
      { name: 'Cliente', type: 'text' },
      { name: 'Plan', type: 'select', options: ['Mensual', 'Trimestral', 'Anual'] },
      { name: 'Fecha de inicio', type: 'date' },
    ],
  },
  {
    id: 'rental',
    title: 'Alquiler',
    description: 'Gestiona contratos de alquiler, entregas y devoluciones',
    category: 'sales',
    color: 'bg-red-200',
    features: ['Contratos', 'Entregas', 'Devoluciones'],
    fields: [
      { name: 'Producto', type: 'text' },
      { name: 'Cliente', type: 'text' },
      { name: 'Fecha de inicio', type: 'date' },
      { name: 'Fecha de devolución', type: 'date' },
    ],
  },
  {
    id: 'accounting',
    title: 'Contabilidad',
    description: 'Gestiona tu contabilidad financiera y analítica',
    category: 'finance',
    color: 'bg-green-300',
    features: ['Diarios', 'Asientos', 'Reportes financieros'],
    fields: [
      { name: 'Cuenta', type: 'text' },
      { name: 'Debe', type: 'number' },
      { name: 'Haber', type: 'number' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'invoicing',
    title: 'Facturación',
    description: 'Crea facturas y gestiona pagos',
    category: 'finance',
    color: 'bg-blue-300',
    features: ['Facturas', 'Pagos', 'Recordatorios'],
    fields: [
      { name: 'Cliente', type: 'text' },
      { name: 'Monto', type: 'number' },
      { name: 'Fecha de vencimiento', type: 'date' },
    ],
  },
  {
    id: 'expenses',
    title: 'Gastos',
    description: 'Registra y aprueba gastos de tus empleados',
    category: 'finance',
    color: 'bg-indigo-300',
    features: ['Informe de gastos', 'Reembolsos', 'Aprobaciones'],
    fields: [
      { name: 'Empleado', type: 'text' },
      { name: 'Concepto', type: 'text' },
      { name: 'Monto', type: 'number' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'documents',
    title: 'Documentos',
    description: 'Gestión de documentos y archivos',
    category: 'finance',
    color: 'bg-purple-300',
    features: ['Carga de archivos', 'Versionado', 'Compartición'],
    fields: [
      { name: 'Nombre del documento', type: 'text' },
      { name: 'Propietario', type: 'text' },
      { name: 'Fecha de subida', type: 'date' },
    ],
  },
  {
    id: 'spreadsheets',
    title: 'Hojas de cálculo',
    description: 'Crea y colabora en hojas de cálculo',
    category: 'finance',
    color: 'bg-yellow-300',
    features: ['Tablas', 'Fórmulas', 'Colaboración'],
    fields: [
      { name: 'Nombre de la hoja', type: 'text' },
      { name: 'Descripción', type: 'text' },
      { name: 'Fecha de creación', type: 'date' },
    ],
  },
  {
    id: 'esign',
    title: 'Firma electrónica',
    description: 'Firma documentos en línea de manera segura',
    category: 'finance',
    color: 'bg-pink-300',
    features: ['Firmas legales', 'Plantillas', 'Seguimiento'],
    fields: [
      { name: 'Documento', type: 'text' },
      { name: 'Firmante', type: 'text' },
      { name: 'Fecha de firma', type: 'date' },
    ],
  },
  {
    id: 'inventory',
    title: 'Inventario',
    description: 'Gestiona tu inventario y actividades de logística',
    category: 'inventory',
    color: 'bg-green-400',
    features: ['Almacenes', 'Existencias', 'Reorden'],
    fields: [
      { name: 'Producto', type: 'text' },
      { name: 'Cantidad', type: 'number' },
      { name: 'Ubicación', type: 'text' },
    ],
  },
  {
    id: 'manufacturing',
    title: 'Manufactura',
    description: 'Órdenes de fabricación y listas de materiales',
    category: 'inventory',
    color: 'bg-blue-400',
    features: ['Órdenes de fabricación', 'Listas de materiales', 'Planificación'],
    fields: [
      { name: 'Producto', type: 'text' },
      { name: 'Cantidad a producir', type: 'number' },
      { name: 'Fecha de inicio', type: 'date' },
    ],
  },
  {
    id: 'plm',
    title: 'Gestión del ciclo de vida del producto',
    description: 'Gestiona el ciclo de vida de tus productos',
    category: 'inventory',
    color: 'bg-red-400',
    features: ['Versionado', 'Cambios de ingeniería', 'Aprobaciones'],
    fields: [
      { name: 'Producto', type: 'text' },
      { name: 'Versión', type: 'text' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'purchasing',
    title: 'Compras',
    description: 'Órdenes de compra, licitaciones y contratos',
    category: 'inventory',
    color: 'bg-indigo-400',
    features: ['Órdenes de compra', 'Proveedores', 'Licitaciones'],
    fields: [
      { name: 'Proveedor', type: 'text' },
      { name: 'Producto', type: 'text' },
      { name: 'Cantidad', type: 'number' },
      { name: 'Fecha de entrega', type: 'date' },
    ],
  },
  {
    id: 'maintenance',
    title: 'Mantenimiento',
    description: 'Monitorea tus equipos y gestiona solicitudes de mantenimiento',
    category: 'inventory',
    color: 'bg-teal-400',
    features: ['Solicitudes', 'Programación', 'Historial'],
    fields: [
      { name: 'Equipo', type: 'text' },
      { name: 'Tipo de mantenimiento', type: 'text' },
      { name: 'Fecha programada', type: 'date' },
    ],
  },
  {
    id: 'quality',
    title: 'Calidad',
    description: 'Controla la calidad de tus productos',
    category: 'inventory',
    color: 'bg-yellow-400',
    features: ['Inspecciones', 'Checks', 'Informes'],
    fields: [
      { name: 'Producto', type: 'text' },
      { name: 'Resultado', type: 'text' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'employees',
    title: 'Empleados',
    description: 'Centraliza la información de tus empleados',
    category: 'hr',
    color: 'bg-green-500',
    features: ['Datos personales', 'Contratos', 'Historial'],
    fields: [
      { name: 'Nombre', type: 'text' },
      { name: 'Puesto', type: 'text' },
      { name: 'Fecha de contratación', type: 'date' },
    ],
  },
  {
    id: 'recruitment',
    title: 'Reclutamiento',
    description: 'Monitorea tu flujo de reclutamiento',
    category: 'hr',
    color: 'bg-blue-500',
    features: ['Vacantes', 'Candidatos', 'Entrevistas'],
    fields: [
      { name: 'Puesto', type: 'text' },
      { name: 'Candidato', type: 'text' },
      { name: 'Estado', type: 'select', options: ['Aplicado', 'Entrevista', 'Contratado'] },
    ],
  },
  {
    id: 'timeoff',
    title: 'Vacaciones',
    description: 'Asigna y da seguimiento a las solicitudes de tiempo personal',
    category: 'hr',
    color: 'bg-purple-500',
    features: ['Solicitudes', 'Aprobaciones', 'Calendario'],
    fields: [
      { name: 'Empleado', type: 'text' },
      { name: 'Desde', type: 'date' },
      { name: 'Hasta', type: 'date' },
    ],
  },
  {
    id: 'appraisals',
    title: 'Evaluaciones',
    description: 'Evalúa el desempeño de tus empleados',
    category: 'hr',
    color: 'bg-red-500',
    features: ['Metas', 'Competencias', 'Informe'],
    fields: [
      { name: 'Empleado', type: 'text' },
      { name: 'Periodo', type: 'text' },
      { name: 'Calificación', type: 'number' },
    ],
  },
  {
    id: 'fleet',
    title: 'Flotilla',
    description: 'Gestiona tu flotilla y monitorea el costo de tus vehículos',
    category: 'hr',
    color: 'bg-indigo-500',
    features: ['Vehículos', 'Contratos', 'Costos'],
    fields: [
      { name: 'Vehículo', type: 'text' },
      { name: 'Placas', type: 'text' },
      { name: 'Costo mensual', type: 'number' },
    ],
  },
  {
    id: 'marketing_automation',
    title: 'Automatización de marketing',
    description: 'Crea campañas de correo automatizadas',
    category: 'marketing',
    color: 'bg-green-600',
    features: ['Workflows', 'Segmentación', 'Reportes'],
    fields: [
      { name: 'Nombre de la campaña', type: 'text' },
      { name: 'Fecha de inicio', type: 'date' },
      { name: 'Fecha de fin', type: 'date' },
    ],
  },
  {
    id: 'email_marketing',
    title: 'Marketing por correo',
    description: 'Diseña, envía y monitorea correos electrónicos',
    category: 'marketing',
    color: 'bg-blue-600',
    features: ['Plantillas', 'Listas de destinatarios', 'Estadísticas'],
    fields: [
      { name: 'Nombre de la campaña', type: 'text' },
      { name: 'Asunto', type: 'text' },
      { name: 'Fecha de envío', type: 'date' },
    ],
  },
  {
    id: 'sms_marketing',
    title: 'Marketing por SMS',
    description: 'Diseña, envía y monitorea campañas SMS',
    category: 'marketing',
    color: 'bg-purple-600',
    features: ['Plantillas', 'Segmentación', 'Reportes'],
    fields: [
      { name: 'Nombre de la campaña', type: 'text' },
      { name: 'Mensaje', type: 'text' },
      { name: 'Fecha de envío', type: 'date' },
    ],
  },
  {
    id: 'social_marketing',
    title: 'Redes sociales',
    description: 'Gestiona tus redes sociales y los visitantes de tu sitio web',
    category: 'marketing',
    color: 'bg-red-600',
    features: ['Publicaciones', 'Programación', 'Estadísticas'],
    fields: [
      { name: 'Red social', type: 'select', options: ['Facebook', 'Twitter', 'Instagram'] },
      { name: 'Contenido', type: 'text' },
      { name: 'Fecha de publicación', type: 'date' },
    ],
  },
  {
    id: 'events',
    title: 'Eventos',
    description: 'Publica eventos y vende boletos',
    category: 'marketing',
    color: 'bg-yellow-600',
    features: ['Gestión de eventos', 'Tickets', 'Asistentes'],
    fields: [
      { name: 'Nombre del evento', type: 'text' },
      { name: 'Fecha', type: 'date' },
      { name: 'Ubicación', type: 'text' },
    ],
  },
  {
    id: 'surveys',
    title: 'Encuestas',
    description: 'Envía encuestas o compártelas en eventos',
    category: 'marketing',
    color: 'bg-teal-600',
    features: ['Preguntas', 'Respuestas', 'Resultados'],
    fields: [
      { name: 'Nombre de la encuesta', type: 'text' },
      { name: 'Descripción', type: 'text' },
      { name: 'Fecha de lanzamiento', type: 'date' },
    ],
  },
  {
    id: 'projects',
    title: 'Proyectos',
    description: 'Organiza y planea tus proyectos',
    category: 'services',
    color: 'bg-green-700',
    features: ['Tareas', 'Fases', 'Calendario'],
    fields: [
      { name: 'Nombre del proyecto', type: 'text' },
      { name: 'Responsable', type: 'text' },
      { name: 'Fecha de entrega', type: 'date' },
    ],
  },
  {
    id: 'timesheets',
    title: 'Registro de horas',
    description: 'Monitorea el tiempo que los empleados invierten en tareas',
    category: 'services',
    color: 'bg-blue-700',
    features: ['Registros', 'Proyectos', 'Aprobaciones'],
    fields: [
      { name: 'Empleado', type: 'text' },
      { name: 'Proyecto', type: 'text' },
      { name: 'Horas', type: 'number' },
    ],
  },
  {
    id: 'field_service',
    title: 'Servicio externo',
    description: 'Programa y monitorea operaciones externas, el tiempo y el material',
    category: 'services',
    color: 'bg-purple-700',
    features: ['Órdenes', 'Ubicaciones', 'Material'],
    fields: [
      { name: 'Cliente', type: 'text' },
      { name: 'Servicio', type: 'text' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'helpdesk',
    title: 'Soporte al cliente',
    description: 'Monitorea, prioriza y soluciona los tickets de tus clientes',
    category: 'services',
    color: 'bg-red-700',
    features: ['Tickets', 'Prioridades', 'SLA'],
    fields: [
      { name: 'Número de ticket', type: 'text' },
      { name: 'Cliente', type: 'text' },
      { name: 'Estado', type: 'select', options: ['Nuevo', 'En progreso', 'Cerrado'] },
    ],
  },
  {
    id: 'planning',
    title: 'Planeación',
    description: 'Gestiona el horario de tus empleados',
    category: 'services',
    color: 'bg-yellow-700',
    features: ['Calendario', 'Turnos', 'Asignaciones'],
    fields: [
      { name: 'Empleado', type: 'text' },
      { name: 'Desde', type: 'date' },
      { name: 'Hasta', type: 'date' },
    ],
  },
  {
    id: 'appointments',
    title: 'Citas',
    description: 'Permite que otras personas agenden reuniones contigo',
    category: 'services',
    color: 'bg-teal-700',
    features: ['Reservas', 'Disponibilidad', 'Recordatorios'],
    fields: [
      { name: 'Cliente', type: 'text' },
      { name: 'Fecha de la cita', type: 'date' },
      { name: 'Hora', type: 'text' },
    ],
  },
  {
    id: 'chat',
    title: 'Conversaciones',
    description: 'Chat, pasarela de correos electrónicos y canales privados',
    category: 'productivity',
    color: 'bg-green-800',
    features: ['Chats', 'Canales', 'Integración de correo'],
    fields: [
      { name: 'Remitente', type: 'text' },
      { name: 'Mensaje', type: 'text' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'approvals',
    title: 'Aprobaciones',
    description: 'Crea y valida solicitudes de aprobación',
    category: 'productivity',
    color: 'bg-blue-800',
    features: ['Solicitudes', 'Flujos de trabajo', 'Aprobadores'],
    fields: [
      { name: 'Nombre de la solicitud', type: 'text' },
      { name: 'Solicitante', type: 'text' },
      { name: 'Estado', type: 'select', options: ['Pendiente', 'Aprobado', 'Rechazado'] },
    ],
  },
  {
    id: 'iot',
    title: 'Internet de las cosas',
    description: 'Modelos básicos y asistentes para IoT',
    category: 'productivity',
    color: 'bg-purple-800',
    features: ['Dispositivos', 'Acciones', 'Alertas'],
    fields: [
      { name: 'Dispositivo', type: 'text' },
      { name: 'Acción', type: 'text' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'voip',
    title: 'VOIP',
    description: 'Haz y recibe llamadas a través de internet',
    category: 'productivity',
    color: 'bg-red-800',
    features: ['Llamadas', 'Grabación', 'Contactos'],
    fields: [
      { name: 'Número', type: 'text' },
      { name: 'Duración (min)', type: 'number' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'knowledge',
    title: 'Artículos',
    description: 'Gestiona tu biblioteca de información',
    category: 'productivity',
    color: 'bg-yellow-800',
    features: ['Artículos', 'Categorías', 'Búsqueda'],
    fields: [
      { name: 'Título', type: 'text' },
      { name: 'Autor', type: 'text' },
      { name: 'Fecha', type: 'date' },
    ],
  },
  {
    id: 'studio',
    title: 'Studio',
    description: 'Crea y personaliza tus propias aplicaciones de Odoo',
    category: 'customization',
    color: 'bg-green-900',
    features: ['Constructor de aplicaciones', 'Campos personalizados', 'Integraciones'],
    fields: [
      { name: 'Nombre de la app', type: 'text' },
      { name: 'Descripción', type: 'text' },
      { name: 'Fecha de creación', type: 'date' },
    ],
  },
] as const