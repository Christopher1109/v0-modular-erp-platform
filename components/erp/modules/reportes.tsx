"use client"

import {
  Download, BarChart3, Car, Wrench, DollarSign, Package, Clock, FileText, Building2, TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts"

const salesKPIs = [
  { label: "Vehiculos Vendidos", value: 12, target: 15, unit: "" },
  { label: "Ticket Promedio Venta", value: 520000, target: 500000, unit: "$" },
  { label: "Dias Promedio en Piso", value: 28, target: 30, unit: " dias" },
  { label: "Margen Vehiculos", value: 14.2, target: 12, unit: "%" },
]

const serviceKPIs = [
  { label: "Ordenes de Servicio", value: 68, target: 60, unit: "" },
  { label: "Ticket Promedio Servicio", value: 4800, target: 4500, unit: "$" },
  { label: "Margen Taller", value: 58.4, target: 50, unit: "%" },
  { label: "Tasa de Retencion", value: 82, target: 80, unit: "%" },
]

const inventoryKPIs = [
  { label: "Rotacion Vehiculos", value: 2.4, target: 3, unit: "x" },
  { label: "Stock Detenido +60d", value: 6, target: 3, unit: " uds" },
  { label: "Precision Refacciones", value: 96.5, target: 98, unit: "%" },
  { label: "Tasa de Merma", value: 0.8, target: 2, unit: "%" },
]

const monthlyTrend = [
  { month: "Sep", vehiculos: 8, servicios: 52, ingreso: 3800000 },
  { month: "Oct", vehiculos: 11, servicios: 58, ingreso: 4790000 },
  { month: "Nov", vehiculos: 9, servicios: 61, ingreso: 4305000 },
  { month: "Dic", vehiculos: 14, servicios: 48, ingreso: 5830000 },
  { month: "Ene", vehiculos: 10, servicios: 55, ingreso: 4780000 },
  { month: "Feb", vehiculos: 12, servicios: 68, ingreso: 5605000 },
]

const branchComparison = [
  { name: "Agencia Centro", ventas: 7, servicios: 28, margen: 14.8, ingreso: 2840000 },
  { name: "Agencia Norte", ventas: 3, servicios: 22, margen: 13.8, ingreso: 1450000 },
  { name: "Taller Industrial", ventas: 0, servicios: 18, margen: 22.4, ingreso: 380000 },
  { name: "Patio Seminuevos", ventas: 2, servicios: 0, margen: 15.2, ingreso: 560000 },
]

const topVehicles = [
  { name: "Mazda CX-5 2025 Signature", price: 628000, margin: 12.7 },
  { name: "Toyota RAV4 2025", price: 598000, margin: 15.0 },
  { name: "Toyota Camry 2025", price: 485000, margin: 13.4 },
  { name: "Honda CR-V 2024 (Sem.)", price: 445000, margin: 17.1 },
  { name: "Mazda 3 Sedan 2025", price: 435000, margin: 14.5 },
]

const reports = [
  { name: "Reporte de Ventas Semanal", type: "Ventas", date: "13 Feb 2026", status: "Disponible" },
  { name: "Estado Financiero Enero 2026", type: "Finanzas", date: "1 Feb 2026", status: "Disponible" },
  { name: "Inventario Vehiculos Febrero", type: "Inventario", date: "13 Feb 2026", status: "Disponible" },
  { name: "KPIs Mensuales Enero 2026", type: "General", date: "5 Feb 2026", status: "Disponible" },
  { name: "Analisis de Margenes Q4 2025", type: "Finanzas", date: "15 Ene 2026", status: "Disponible" },
]

function KPICard({ label, value, target, unit }: { label: string; value: number; target: number; unit: string }) {
  const isInverse = unit === " dias" || unit === " uds"
  const isOnTarget = isInverse ? value <= target : value >= target
  const percentage = isInverse ? Math.min((target / value) * 100, 100) : Math.min((value / target) * 100, 100)

  const formatValue = () => {
    if (unit === "$") return `$${value.toLocaleString()}`
    return `${value}`
  }

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border bg-card">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <Badge className={`text-[9px] px-1.5 ${isOnTarget ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10"}`}>
          {isOnTarget ? "En meta" : "Bajo meta"}
        </Badge>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-foreground">{formatValue()}</span>
        <span className="text-xs text-muted-foreground">{unit !== "$" ? unit : ""}</span>
      </div>
      <Progress value={percentage} className="h-1" />
      <span className="text-[10px] text-muted-foreground">Meta: {unit === "$" ? `$${target.toLocaleString()}` : `${target}`}{unit !== "$" ? unit : ""}</span>
    </div>
  )
}

export function ReportesModule() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Select defaultValue="feb2026">
            <SelectTrigger className="h-8 w-40 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="feb2026">Febrero 2026</SelectItem>
              <SelectItem value="ene2026">Enero 2026</SelectItem>
              <SelectItem value="dic2025">Diciembre 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-44 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Sucursales</SelectItem>
              <SelectItem value="centro">Agencia Centro</SelectItem>
              <SelectItem value="norte">Agencia Norte</SelectItem>
              <SelectItem value="taller">Taller Industrial</SelectItem>
              <SelectItem value="patio">Patio Seminuevos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs"><Download className="mr-1.5 h-3 w-3" />Exportar Reporte</Button>
      </div>

      {/* KPI Sections */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2"><Car className="h-4 w-4 text-primary" /><CardTitle className="text-sm font-semibold">KPIs de Ventas de Vehiculos</CardTitle></div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{salesKPIs.map((kpi) => <KPICard key={kpi.label} {...kpi} />)}</div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2"><Wrench className="h-4 w-4 text-success" /><CardTitle className="text-sm font-semibold">KPIs de Taller</CardTitle></div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">{serviceKPIs.map((kpi) => <KPICard key={kpi.label} {...kpi} />)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2"><Package className="h-4 w-4 text-warning" /><CardTitle className="text-sm font-semibold">KPIs de Inventario</CardTitle></div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">{inventoryKPIs.map((kpi) => <KPICard key={kpi.label} {...kpi} />)}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Tendencia de 6 Meses</CardTitle>
            <CardDescription className="text-xs">Vehiculos vendidos, servicios e ingresos totales</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="colorIngreso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
                <Area yAxisId="left" type="monotone" dataKey="ingreso" stroke="hsl(213, 72%, 42%)" strokeWidth={2} fill="url(#colorIngreso)" name="Ingresos" />
                <Bar yAxisId="right" dataKey="vehiculos" fill="hsl(162, 63%, 41%)" radius={[2, 2, 0, 0]} name="Vehiculos" barSize={16} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Comparativa por Sucursal</CardTitle>
            <CardDescription className="text-xs">Ventas, servicios y margen por ubicacion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {branchComparison.map((b) => (
                <div key={b.name} className="flex flex-col gap-2 p-3 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1.5"><Building2 className="h-3 w-3" />{b.name}</span>
                    <Badge variant="outline" className={`text-[10px] ${b.margen >= 15 ? "border-success/30 text-success" : ""}`}>{b.margen}% margen</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div><p className="text-[10px] text-muted-foreground">Ventas</p><p className="text-sm font-bold text-foreground">{b.ventas}</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Servicios</p><p className="text-sm font-bold text-foreground">{b.servicios}</p></div>
                    <div><p className="text-[10px] text-muted-foreground">Ingreso</p><p className="text-sm font-bold text-foreground">${(b.ingreso / 1000000).toFixed(1)}M</p></div>
                  </div>
                  <Progress value={b.margen * 4} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Top 5 Vehiculos Vendidos</CardTitle>
            <CardDescription className="text-xs">Por precio de venta este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2.5">
              {topVehicles.map((v, i) => (
                <div key={v.name} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{v.name}</p>
                    <p className="text-[10px] text-muted-foreground">{v.margin}% margen</p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">${v.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Reportes Generados</CardTitle>
            <CardDescription className="text-xs">Disponibles para descarga</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2.5">
              {reports.map((r) => (
                <div key={r.name} className="flex items-center gap-3 p-2.5 rounded-lg border">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted"><FileText className="h-4 w-4 text-muted-foreground" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{r.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[9px] px-1.5">{r.type}</Badge>
                      <span className="text-[10px] text-muted-foreground">{r.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
