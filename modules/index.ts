import {
  LayoutDashboard, Package, DollarSign, ShoppingCart, TrendingUp,
  HeartHandshake, UserCog, FolderKanban, Megaphone, BarChart3, Settings,
  type LucideIcon,
} from "lucide-react"

export interface ModuleDef {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  icon: LucideIcon
  color: string
  features: string[]
  component: string
}

export const categories = [
  { key: "core", label: "Core" },
  { key: "operaciones", label: "Operaciones" },
  { key: "gestion", label: "Gestion" },
  { key: "inteligencia", label: "Inteligencia" },
  { key: "admin", label: "Administracion" },
] as const

export const modules: ModuleDef[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "Vista ejecutiva en tiempo real",
    description: "Panel central con los KPIs mas importantes de tu negocio, tendencias y alertas en un solo lugar.",
    category: "core",
    icon: LayoutDashboard,
    color: "from-blue-500 to-cyan-400",
    features: ["KPIs en tiempo real", "Graficas de tendencia", "Alertas inteligentes"],
    component: "dashboard",
  },
  {
    id: "inventario",
    title: "Inventario",
    subtitle: "Gestiona stock en tiempo real",
    description: "Control completo de productos, materias primas y almacenes con trazabilidad por lote y ubicacion.",
    category: "operaciones",
    icon: Package,
    color: "from-amber-500 to-orange-400",
    features: ["Stock multi-almacen", "Alertas de reorden", "Movimientos automaticos"],
    component: "inventario",
  },
  {
    id: "finanzas",
    title: "Finanzas",
    subtitle: "Controla ingresos y egresos",
    description: "Seguimiento de flujo de caja, cuentas por cobrar/pagar, margenes y proyecciones financieras.",
    category: "operaciones",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-400",
    features: ["Flujo de caja", "Cuentas por cobrar", "Margenes por operacion"],
    component: "finanzas",
  },
  {
    id: "compras",
    title: "Compras",
    subtitle: "Optimiza tus adquisiciones",
    description: "Gestion de proveedores, ordenes de compra, recepcion de mercancia y evaluacion de costos.",
    category: "operaciones",
    icon: ShoppingCart,
    color: "from-violet-500 to-purple-400",
    features: ["Ordenes de compra", "Evaluacion proveedores", "Recepcion automatica"],
    component: "compras",
  },
  {
    id: "ventas",
    title: "Ventas",
    subtitle: "Acelera tu ciclo comercial",
    description: "Pipeline de ventas, cotizaciones, ordenes y seguimiento de comisiones por vendedor y equipo.",
    category: "operaciones",
    icon: TrendingUp,
    color: "from-sky-500 to-blue-400",
    features: ["Pipeline visual", "Cotizaciones rapidas", "Comisiones automaticas"],
    component: "ventas",
  },
  {
    id: "crm",
    title: "CRM",
    subtitle: "Conecta con tus clientes",
    description: "Gestion de leads, oportunidades, historial de interacciones y automatizacion de seguimiento.",
    category: "gestion",
    icon: HeartHandshake,
    color: "from-pink-500 to-rose-400",
    features: ["Pipeline de leads", "Automatizacion de contacto", "Score de oportunidad"],
    component: "crm",
  },
  {
    id: "rrhh",
    title: "Recursos Humanos",
    subtitle: "Gestiona tu equipo",
    description: "Directorio de empleados, control de asistencia, nomina y evaluaciones de desempeno.",
    category: "gestion",
    icon: UserCog,
    color: "from-indigo-500 to-blue-400",
    features: ["Directorio de personal", "Control de asistencia", "Evaluaciones"],
    component: "rrhh",
  },
  {
    id: "proyectos",
    title: "Proyectos",
    subtitle: "Organiza y ejecuta",
    description: "Tableros kanban, asignacion de tareas, cronogramas y seguimiento de avance por proyecto.",
    category: "gestion",
    icon: FolderKanban,
    color: "from-cyan-500 to-teal-400",
    features: ["Tableros kanban", "Cronogramas", "Seguimiento de avance"],
    component: "proyectos",
  },
  {
    id: "marketing",
    title: "Marketing",
    subtitle: "Impulsa tu marca",
    description: "Campanas multicanal, segmentacion de audiencia, metricas de conversion y ROI por campana.",
    category: "inteligencia",
    icon: Megaphone,
    color: "from-fuchsia-500 to-pink-400",
    features: ["Campanas multicanal", "Segmentacion", "ROI por campana"],
    component: "marketing",
  },
  {
    id: "reportes",
    title: "Reportes y Analytics",
    subtitle: "Datos que impulsan decisiones",
    description: "Dashboards personalizados, reportes automaticos, analisis predictivo y exportacion avanzada.",
    category: "inteligencia",
    icon: BarChart3,
    color: "from-blue-600 to-indigo-400",
    features: ["Dashboards custom", "Reportes automaticos", "Analisis predictivo"],
    component: "reportes",
  },
  {
    id: "configuracion",
    title: "Configuracion",
    subtitle: "Personaliza tu plataforma",
    description: "Usuarios, roles, permisos, datos de empresa, sucursales y preferencias del sistema.",
    category: "admin",
    icon: Settings,
    color: "from-slate-500 to-gray-400",
    features: ["Roles y permisos", "Multi-sucursal", "Notificaciones"],
    component: "configuracion",
  },
]
