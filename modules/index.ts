export interface ModuleDef {
  id: string
  title: string
  description: string
  category: string
  features: string[]
  component: string
}

export const categories = [
  { key: "general", label: "General" },
  { key: "operaciones", label: "Operaciones" },
  { key: "inventario", label: "Inventario" },
  { key: "finanzas", label: "Finanzas" },
  { key: "admin", label: "Administracion" },
] as const

export const modules: ModuleDef[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Vista general con KPIs, graficas de ingresos, ordenes activas y alertas del sistema.",
    category: "general",
    features: ["KPIs en tiempo real", "Graficas de tendencia", "Alertas activas", "Rendimiento por sucursal"],
    component: "dashboard",
  },
  {
    id: "ordenes",
    title: "Ordenes",
    description: "Gestion de ordenes de venta de vehiculos, servicio de taller y pedidos de abastecimiento.",
    category: "operaciones",
    features: ["Venta de vehiculos", "Servicio de taller", "Pedidos de abastecimiento", "Seguimiento de estados"],
    component: "ordenes",
  },
  {
    id: "vehiculos",
    title: "Vehiculos",
    description: "Inventario de vehiculos nuevos y seminuevos con seguimiento por VIN y dias en piso.",
    category: "inventario",
    features: ["Catalogo por sucursal", "Seguimiento VIN", "Alertas dias en piso", "Nuevos y seminuevos"],
    component: "vehiculos",
  },
  {
    id: "refacciones",
    title: "Refacciones",
    description: "Control de stock de refacciones con consumo automatico vinculado a ordenes de servicio.",
    category: "inventario",
    features: ["Stock por sucursal", "Consumo automatico", "Alertas de stock bajo", "Movimientos de inventario"],
    component: "refacciones",
  },
  {
    id: "finanzas",
    title: "Finanzas",
    description: "Registro de ingresos y egresos con margenes por orden, sucursal y tipo de operacion.",
    category: "finanzas",
    features: ["Ingresos vs egresos", "Margenes por orden", "Analisis por sucursal", "Cuentas por cobrar"],
    component: "finanzas",
  },
  {
    id: "reportes",
    title: "Reportes y KPIs",
    description: "Indicadores clave por operaciones, inventario y finanzas con comparativa por sucursal.",
    category: "finanzas",
    features: ["KPIs por area", "Comparativa entre sucursales", "Top productos", "Exportacion de reportes"],
    component: "reportes",
  },
  {
    id: "actividad",
    title: "Actividad Reciente",
    description: "Timeline automatico de eventos del sistema: ventas, cobros, consumos y alertas.",
    category: "general",
    features: ["Timeline de eventos", "Filtros por tipo", "Trazabilidad completa", "Auditoria de acciones"],
    component: "actividad",
  },
  {
    id: "usuarios",
    title: "Usuarios y Roles",
    description: "Gestion de usuarios, asignacion de roles, permisos y registro de auditoria.",
    category: "admin",
    features: ["Directorio de usuarios", "Roles y permisos", "Auditoria de accesos", "Gestion por sucursal"],
    component: "usuarios",
  },
  {
    id: "configuracion",
    title: "Configuracion",
    description: "Datos de empresa, gestion de sucursales, modulos activos y preferencias del sistema.",
    category: "admin",
    features: ["Datos de empresa", "Gestion de sucursales", "Modulos activos", "Notificaciones"],
    component: "configuracion",
  },
]
