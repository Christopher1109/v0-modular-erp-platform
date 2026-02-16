"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  ClipboardList,
  Car,
  Wrench,
  DollarSign,
  BarChart3,
  Users,
  Settings,
  Activity,
  Search,
  ChevronRight,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ModuleDef {
  id: string
  title: string
  description: string
  icon: LucideIcon
  category: string
  color: string
  features: string[]
  badge?: string
}

const modules: ModuleDef[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Vision general en tiempo real de toda la concesionaria. KPIs de ventas, servicios, inventario y finanzas consolidados.",
    icon: LayoutDashboard,
    category: "General",
    color: "bg-primary",
    features: [
      "KPIs de ventas, servicios e inventario",
      "Ingresos cobrados vs pendientes",
      "Grafica de ingresos y egresos mensuales",
      "Alertas activas del sistema",
    ],
  },
  {
    id: "actividad",
    title: "Actividad Reciente",
    description: "Timeline automatico de todos los eventos del sistema. Cada accion queda registrada con usuario, hora y sucursal.",
    icon: Activity,
    category: "General",
    color: "bg-[hsl(215,25%,20%)]",
    features: [
      "Registro automatico event-driven",
      "Filtro por tipo de evento y sucursal",
      "Cadena de acciones por orden",
      "Trazabilidad completa de operaciones",
    ],
  },
  {
    id: "ordenes",
    title: "Ordenes",
    description: "Unidad operativa central. Gestiona ventas de vehiculos, servicios de taller y pedidos de abastecimiento con margenes automaticos.",
    icon: ClipboardList,
    category: "Operaciones",
    color: "bg-primary",
    badge: "12",
    features: [
      "Venta de vehiculos (nuevos y seminuevos)",
      "Ordenes de servicio de taller",
      "Pedidos de abastecimiento",
      "Calculo automatico de margen y cobro",
    ],
  },
  {
    id: "vehiculos",
    title: "Inventario de Vehiculos",
    description: "Stock completo de vehiculos nuevos y seminuevos por sucursal. Seguimiento por VIN, dias en piso y alertas automaticas.",
    icon: Car,
    category: "Inventario",
    color: "bg-[hsl(162,63%,41%)]",
    features: [
      "Catalogo por sucursal y estado",
      "Tracking de dias en piso por VIN",
      "Alerta de vehiculos detenidos (+60 dias)",
      "Historial de movimientos por unidad",
    ],
  },
  {
    id: "refacciones",
    title: "Refacciones y Almacen",
    description: "Inventario de autopartes, refacciones y consumibles. Consumo automatico vinculado a ordenes de servicio.",
    icon: Wrench,
    category: "Inventario",
    color: "bg-[hsl(38,92%,50%)]",
    features: [
      "Stock por sucursal y categoria",
      "Consumo automatico desde ordenes",
      "Alertas de stock critico y minimo",
      "Registro de mermas y ajustes",
    ],
  },
  {
    id: "finanzas",
    title: "Finanzas",
    description: "Ingresos, costos y margenes por operacion. El ingreso se reconoce al momento del cobro. Sin funciones fiscales.",
    icon: DollarSign,
    category: "Finanzas",
    color: "bg-[hsl(162,63%,41%)]",
    features: [
      "Margen por orden individual",
      "Consolidado por sucursal y tipo",
      "Ingresos cobrados vs pendientes",
      "Tendencia mensual de resultados",
    ],
  },
  {
    id: "reportes",
    title: "Reportes y KPIs",
    description: "Indicadores clave de desempeno por operacion, inventario y finanzas. Comparativa entre sucursales y periodos.",
    icon: BarChart3,
    category: "Finanzas",
    color: "bg-primary",
    features: [
      "KPIs por tipo de operacion",
      "Comparativa entre sucursales",
      "Top vehiculos y refacciones vendidas",
      "Exportacion de reportes",
    ],
  },
  {
    id: "usuarios",
    title: "Usuarios y Accesos",
    description: "Gestion de usuarios del sistema, asignacion de roles por sucursal y registro completo de auditoria.",
    icon: Users,
    category: "Administracion",
    color: "bg-[hsl(215,25%,20%)]",
    features: [
      "Directorio de usuarios por sucursal",
      "Roles: Admin, Gerente, Vendedor, Tecnico",
      "Log de auditoria por usuario",
      "Permisos granulares por modulo",
    ],
  },
  {
    id: "configuracion",
    title: "Configuracion",
    description: "Ajustes generales del sistema, gestion de sucursales, activacion de modulos y preferencias de notificaciones.",
    icon: Settings,
    category: "Administracion",
    color: "bg-muted-foreground",
    features: [
      "Datos de la empresa y sucursales",
      "Activacion/desactivacion de modulos",
      "Preferencias de notificaciones",
      "Parametros del sistema",
    ],
  },
]

const categories = ["Todos", "General", "Operaciones", "Inventario", "Finanzas", "Administracion"]

interface ModuleCatalogProps {
  onModuleSelect: (moduleId: string) => void
}

export function ModuleCatalog({ onModuleSelect }: ModuleCatalogProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [previewModule, setPreviewModule] = useState<ModuleDef | null>(null)

  const filtered = modules.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === "Todos" || m.category === activeCategory
    return matchesSearch && matchesCategory
  })

  if (previewModule) {
    return (
      <ModulePreview
        module={previewModule}
        onBack={() => setPreviewModule(null)}
        onOpen={() => onModuleSelect(previewModule.id)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-foreground">
                AutoGestion
              </span>
              <span className="ml-2 text-xs text-muted-foreground">ERP</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar modulos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-64 bg-background pl-9 text-sm"
              />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              RG
            </div>
          </div>
        </div>
      </header>

      {/* Hero area */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Modulos del Sistema
          </h1>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            Selecciona un modulo para ver su descripcion y funcionalidades, o accede directamente para empezar a trabajar.
          </p>

          {/* Mobile search */}
          <div className="relative mt-6 sm:hidden">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar modulos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 bg-background pl-9"
            />
          </div>

          {/* Category filter chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Module grid */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              onPreview={() => setPreviewModule(mod)}
              onOpen={() => onModuleSelect(mod.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-4 text-sm text-muted-foreground">
              No se encontraron modulos con ese criterio.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

/* ---- Module Card ---- */
function ModuleCard({
  module: mod,
  onPreview,
  onOpen,
}: {
  module: ModuleDef
  onPreview: () => void
  onOpen: () => void
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
      {/* Color bar top */}
      <div className={`h-1.5 w-full ${mod.color}`} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${mod.color} text-primary-foreground`}
            >
              <mod.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-semibold text-card-foreground">
                  {mod.title}
                </h3>
                {mod.badge && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                    {mod.badge}
                  </Badge>
                )}
              </div>
              <span className="text-[11px] text-muted-foreground">{mod.category}</span>
            </div>
          </div>
        </div>

        <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
          {mod.description}
        </p>

        {/* Feature list (first 3) */}
        <ul className="mt-4 flex flex-col gap-1.5">
          {mod.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`h-1 w-1 shrink-0 rounded-full ${mod.color}`} />
              {f}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2">
          <Button
            size="sm"
            onClick={onOpen}
            className="flex-1 text-xs"
          >
            Acceder
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onPreview}
            className="text-xs"
          >
            Vista previa
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ---- Module Preview Page ---- */
function ModulePreview({
  module: mod,
  onBack,
  onOpen,
}: {
  module: ModuleDef
  onBack: () => void
  onOpen: () => void
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Volver al catalogo
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Left: info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${mod.color} text-primary-foreground`}
              >
                <mod.icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {mod.title}
                </h1>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {mod.category}
                </Badge>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              {mod.description}
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground">Funcionalidades incluidas</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {mod.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${mod.color}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={onOpen} className="mt-8 w-full text-sm" size="lg">
              Acceder al modulo
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>

          {/* Right: visual preview */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                </div>
                <span className="ml-2 text-[11px] text-muted-foreground">
                  AutoGestion / {mod.title}
                </span>
              </div>
              <div className="p-6">
                <ModulePreviewContent moduleId={mod.id} mod={mod} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Inline preview content for each module ---- */
function ModulePreviewContent({ moduleId, mod }: { moduleId: string; mod: ModuleDef }) {
  switch (moduleId) {
    case "dashboard":
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Ventas del Mes", value: "$2.4M" },
              { label: "Ordenes Activas", value: "34" },
              { label: "Vehiculos en Stock", value: "87" },
              { label: "Margen Promedio", value: "18.5%" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-lg border bg-background p-3">
                <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
                <p className="mt-1 font-serif text-lg font-bold text-foreground">{kpi.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs font-medium text-foreground">Ingresos vs Egresos</p>
              <div className="mt-3 flex items-end gap-1">
                {[40, 55, 35, 65, 50, 70, 60].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div className="w-full rounded-sm bg-primary/20" style={{ height: `${h}px` }}>
                      <div className="w-full rounded-sm bg-primary" style={{ height: `${h * 0.65}px` }} />
                    </div>
                    <span className="text-[8px] text-muted-foreground">
                      {["L", "M", "X", "J", "V", "S", "D"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs font-medium text-foreground">Ordenes por Estado</p>
              <div className="mt-3 flex flex-col gap-2">
                {[
                  { label: "Completadas", pct: 65, color: "bg-[hsl(162,63%,41%)]" },
                  { label: "En Proceso", pct: 25, color: "bg-primary" },
                  { label: "Pendientes", pct: 10, color: "bg-[hsl(38,92%,50%)]" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="w-16 text-[10px] text-muted-foreground">{s.label}</span>
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className={`h-2 rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                    </div>
                    <span className="w-8 text-right text-[10px] font-medium text-foreground">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    case "ordenes":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["Todas", "Venta", "Servicio", "Abastecimiento"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-3 py-1 text-[10px] font-medium ${
                    i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Folio</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Tipo</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Cliente</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Total</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { folio: "OV-2026-0089", tipo: "Venta", cliente: "Carlos Mendez", total: "$485,000", estado: "Completada" },
                  { folio: "OS-2026-0234", tipo: "Servicio", cliente: "Maria Lopez", total: "$12,500", estado: "En Proceso" },
                  { folio: "PA-2026-0045", tipo: "Abastecimiento", cliente: "Proveedor ABC", total: "$78,000", estado: "Pendiente" },
                  { folio: "OV-2026-0090", tipo: "Venta", cliente: "Roberto Juarez", total: "$620,000", estado: "Pendiente" },
                ].map((row) => (
                  <tr key={row.folio} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium text-foreground">{row.folio}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.tipo}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.cliente}</td>
                    <td className="px-3 py-2 font-medium text-foreground">{row.total}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                          row.estado === "Completada"
                            ? "bg-[hsl(162,63%,41%)]/10 text-[hsl(162,63%,41%)]"
                            : row.estado === "En Proceso"
                            ? "bg-primary/10 text-primary"
                            : "bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)]"
                        }`}
                      >
                        {row.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    case "vehiculos":
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "En Stock", value: "87", sub: "Nuevos: 54 | Semi: 33" },
              { label: "Dias Prom. en Piso", value: "28", sub: "Meta: < 45 dias" },
              { label: "Detenidos +60d", value: "5", sub: "Requiere atencion" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border bg-background p-3">
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-serif text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-[9px] text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">VIN</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Vehiculo</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Sucursal</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Dias</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { vin: "...A7K3F", vehiculo: "Toyota Camry 2026", sucursal: "Agencia Centro", dias: "12" },
                  { vin: "...B2M9R", vehiculo: "Honda CR-V 2025", sucursal: "Patio Seminuevos", dias: "67" },
                  { vin: "...C5N1T", vehiculo: "Nissan Sentra 2026", sucursal: "Agencia Norte", dias: "5" },
                ].map((row) => (
                  <tr key={row.vin} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-[10px] text-muted-foreground">{row.vin}</td>
                    <td className="px-3 py-2 font-medium text-foreground">{row.vehiculo}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.sucursal}</td>
                    <td className="px-3 py-2">
                      <span className={`font-medium ${Number(row.dias) > 60 ? "text-destructive" : "text-foreground"}`}>
                        {row.dias}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    case "refacciones":
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total SKUs", value: "1,240" },
              { label: "Stock Critico", value: "8" },
              { label: "Valor Total", value: "$3.2M" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border bg-background p-3">
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-serif text-lg font-bold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-xs font-medium text-foreground">Stock por Categoria</p>
            <div className="mt-3 flex flex-col gap-2">
              {[
                { cat: "Filtros", pct: 85 },
                { cat: "Frenos", pct: 62 },
                { cat: "Aceites", pct: 45 },
                { cat: "Suspension", pct: 78 },
                { cat: "Electricos", pct: 30 },
              ].map((c) => (
                <div key={c.cat} className="flex items-center gap-2">
                  <span className="w-16 text-[10px] text-muted-foreground">{c.cat}</span>
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${c.pct < 40 ? "bg-destructive" : c.pct < 60 ? "bg-[hsl(38,92%,50%)]" : "bg-[hsl(162,63%,41%)]"}`}
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[10px] font-medium text-foreground">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    case "finanzas":
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Ingresos Cobrados", value: "$1.8M" },
              { label: "Pendientes de Cobro", value: "$620K" },
              { label: "Costos Totales", value: "$1.4M" },
              { label: "Margen Neto", value: "22.4%" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-lg border bg-background p-3">
                <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
                <p className="mt-1 font-serif text-lg font-bold text-foreground">{kpi.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-xs font-medium text-foreground">Margen por Tipo de Operacion</p>
            <div className="mt-3 flex items-end gap-6 justify-center">
              {[
                { tipo: "Ventas", margen: 18, h: 60 },
                { tipo: "Servicio", margen: 42, h: 90 },
                { tipo: "Refacciones", margen: 35, h: 75 },
              ].map((t) => (
                <div key={t.tipo} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-foreground">{t.margen}%</span>
                  <div className="w-12 rounded-t-md bg-primary" style={{ height: `${t.h}px` }} />
                  <span className="text-[10px] text-muted-foreground">{t.tipo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    case "reportes":
      return (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border bg-background p-4">
            <p className="text-xs font-medium text-foreground">Comparativa por Sucursal</p>
            <div className="mt-3 flex flex-col gap-2">
              {[
                { name: "Agencia Centro", revenue: "$980K", pct: 100 },
                { name: "Agencia Norte", revenue: "$720K", pct: 73 },
                { name: "Taller Industrial", revenue: "$340K", pct: 35 },
                { name: "Patio Seminuevos", revenue: "$280K", pct: 29 },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="w-28 text-[10px] text-muted-foreground">{s.name}</span>
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="w-12 text-right text-[10px] font-medium text-foreground">{s.revenue}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Top Vehiculo", value: "Toyota Camry", sub: "23 unidades vendidas" },
              { label: "Top Refaccion", value: "Filtro 5W-30", sub: "187 unidades" },
              { label: "Mejor Sucursal", value: "Agencia Centro", sub: "Margen 24.1%" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border bg-background p-3">
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.value}</p>
                <p className="text-[9px] text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )
    case "actividad":
      return (
        <div className="flex flex-col gap-3">
          {[
            { time: "10:34", event: "Venta cerrada", detail: "Toyota Camry 2025 - OV-2026-0089", user: "Carlos M.", type: "venta" },
            { time: "10:32", event: "Refaccion consumida", detail: "Filtro 5W-30 x2 - OS-2026-0234", user: "Sistema", type: "inventario" },
            { time: "09:45", event: "Orden creada", detail: "Servicio Frenos - OS-2026-0235", user: "Ana R.", type: "servicio" },
            { time: "09:12", event: "Cobro registrado", detail: "$485,000 - OV-2026-0088", user: "Laura G.", type: "cobro" },
            { time: "08:30", event: "Inicio de sesion", detail: "Ricardo Garza - Agencia Centro", user: "Sistema", type: "sistema" },
          ].map((ev, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border bg-background p-3">
              <span className="mt-0.5 text-[10px] font-mono text-muted-foreground">{ev.time}</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">{ev.event}</p>
                <p className="text-[10px] text-muted-foreground">{ev.detail}</p>
              </div>
              <span className="text-[10px] text-muted-foreground">{ev.user}</span>
            </div>
          ))}
        </div>
      )
    case "usuarios":
      return (
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Usuario</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Rol</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Sucursal</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Ricardo Garza", role: "Admin", branch: "Todas", status: "Activo" },
                  { name: "Ana Rodriguez", role: "Gerente", branch: "Agencia Centro", status: "Activo" },
                  { name: "Carlos Mendez", role: "Vendedor", branch: "Agencia Norte", status: "Activo" },
                  { name: "Miguel Torres", role: "Tecnico", branch: "Taller Industrial", status: "Inactivo" },
                ].map((row) => (
                  <tr key={row.name} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium text-foreground">{row.name}</td>
                    <td className="px-3 py-2">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">
                        {row.role}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{row.branch}</td>
                    <td className="px-3 py-2">
                      <span className={`text-[10px] font-medium ${row.status === "Activo" ? "text-[hsl(162,63%,41%)]" : "text-muted-foreground"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    case "configuracion":
      return (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border bg-background p-4">
            <p className="text-xs font-medium text-foreground">Datos de la Empresa</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: "Razon Social", value: "AutoGestion S.A. de C.V." },
                { label: "RFC", value: "AGE260101XXX" },
                { label: "Sucursales", value: "4 activas" },
                { label: "Usuarios", value: "24 registrados" },
              ].map((f) => (
                <div key={f.label}>
                  <p className="text-[10px] text-muted-foreground">{f.label}</p>
                  <p className="text-xs font-medium text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="text-xs font-medium text-foreground">Modulos Activos</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Dashboard", "Ordenes", "Vehiculos", "Refacciones", "Finanzas", "Reportes", "Usuarios"].map((m) => (
                <span key={m} className="rounded-full bg-[hsl(162,63%,41%)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[hsl(162,63%,41%)]">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <mod.icon className="mx-auto h-12 w-12 text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">Vista previa del modulo {mod.title}</p>
          </div>
        </div>
      )
  }
}
