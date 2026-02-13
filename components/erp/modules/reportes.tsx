"use client"

import {
  Download,
  BarChart3,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  Clock,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts"

const operationsKPIs = [
  { label: "Tasa de Completitud", value: 87, target: 90, unit: "%" },
  { label: "Tiempo Promedio", value: 4.2, target: 3.5, unit: " dias" },
  { label: "Operaciones/Semana", value: 12, target: 15, unit: "" },
  { label: "Satisfaccion", value: 92, target: 85, unit: "%" },
]

const inventoryKPIs = [
  { label: "Rotacion de Inventario", value: 6.8, target: 8, unit: "x" },
  { label: "Precision de Inventario", value: 96.5, target: 98, unit: "%" },
  { label: "Dias de Stock", value: 45, target: 30, unit: " dias" },
  { label: "Tasa de Merma", value: 1.2, target: 2, unit: "%" },
]

const financeKPIs = [
  { label: "Margen Operativo", value: 32.5, target: 30, unit: "%" },
  { label: "ROI", value: 24.8, target: 20, unit: "%" },
  { label: "Costo por Operacion", value: 4500, target: 5000, unit: "" },
  { label: "Indice de Liquidez", value: 2.1, target: 1.5, unit: "x" },
]

const monthlyTrend = [
  { month: "Sep", ops: 35, revenue: 168000 },
  { month: "Oct", ops: 42, revenue: 198000 },
  { month: "Nov", ops: 38, revenue: 215000 },
  { month: "Dic", ops: 45, revenue: 245000 },
  { month: "Ene", ops: 41, revenue: 237000 },
  { month: "Feb", ops: 47, revenue: 284500 },
]

const branchComparison = [
  { name: "Central", ops: 38, revenue: 142000, efficiency: 92 },
  { name: "Norte", ops: 25, revenue: 89000, efficiency: 85 },
  { name: "Sur", ops: 19, revenue: 53500, efficiency: 78 },
]

const topProducts = [
  { name: "Motor electrico 5HP", sold: 23, revenue: 195500 },
  { name: "Banda transportadora 2m", sold: 15, revenue: 180000 },
  { name: "Aceite hidraulico 20L", sold: 42, revenue: 39900 },
  { name: "Sensor PT100", sold: 12, revenue: 33600 },
  { name: "Rodamiento 6205-2RS", sold: 85, revenue: 15300 },
]

const recentReports = [
  { name: "Reporte Operativo Semanal", type: "Operaciones", date: "12 Feb 2026", status: "Disponible" },
  { name: "Estado Financiero Enero 2026", type: "Finanzas", date: "1 Feb 2026", status: "Disponible" },
  { name: "Inventario Mensual Enero", type: "Inventario", date: "31 Ene 2026", status: "Disponible" },
  { name: "KPIs Trimestrales Q4 2025", type: "General", date: "15 Ene 2026", status: "Disponible" },
]

function KPICard({ label, value, target, unit }: { label: string; value: number; target: number; unit: string }) {
  const isOnTarget = unit === " dias" ? value <= target : value >= target
  const percentage = unit === " dias" ? Math.min((target / value) * 100, 100) : Math.min((value / target) * 100, 100)

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border bg-card">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <Badge
          className={`text-[9px] px-1.5 ${isOnTarget ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10"}`}
        >
          {isOnTarget ? "En meta" : "Bajo meta"}
        </Badge>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-foreground">
          {unit === "" && value > 100 ? `$${value.toLocaleString()}` : value}
        </span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <Progress value={percentage} className="h-1" />
      <span className="text-[10px] text-muted-foreground">
        Meta: {unit === "" && target > 100 ? `$${target.toLocaleString()}` : target}{unit}
      </span>
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
            <SelectTrigger className="h-8 w-40 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feb2026">Febrero 2026</SelectItem>
              <SelectItem value="ene2026">Enero 2026</SelectItem>
              <SelectItem value="dic2025">Diciembre 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Sucursales</SelectItem>
              <SelectItem value="central">Central</SelectItem>
              <SelectItem value="norte">Norte</SelectItem>
              <SelectItem value="sur">Sur</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          <Download className="mr-1.5 h-3 w-3" />
          Exportar Reporte
        </Button>
      </div>

      {/* KPI Sections */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">KPIs de Operaciones</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {operationsKPIs.map((kpi) => (
                <KPICard key={kpi.label} {...kpi} />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold">KPIs de Inventario</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {inventoryKPIs.map((kpi) => (
                  <KPICard key={kpi.label} {...kpi} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold">KPIs Financieros</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {financeKPIs.map((kpi) => (
                  <KPICard key={kpi.label} {...kpi} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Tendencia de 6 Meses</CardTitle>
            <CardDescription className="text-xs">Operaciones e ingresos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 18%, 89%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(213, 72%, 42%)" strokeWidth={2} fill="url(#colorRevenue)" name="Ingresos" />
                <Bar yAxisId="right" dataKey="ops" fill="hsl(162, 63%, 41%)" radius={[2, 2, 0, 0]} name="Operaciones" barSize={20} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Comparativa por Sucursal</CardTitle>
            <CardDescription className="text-xs">Operaciones, ingresos y eficiencia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {branchComparison.map((branch) => (
                <div key={branch.name} className="flex flex-col gap-2 p-3 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">{branch.name}</span>
                    <Badge variant="outline" className="text-[10px]">{branch.efficiency}% eficiencia</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Operaciones</p>
                      <p className="text-sm font-bold text-foreground">{branch.ops}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Ingresos</p>
                      <p className="text-sm font-bold text-foreground">${branch.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <Progress value={branch.efficiency} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Top 5 Productos</CardTitle>
            <CardDescription className="text-xs">Por ingresos generados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2.5">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground">{product.sold} unidades vendidas</p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">${product.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Reportes Generados</CardTitle>
            <CardDescription className="text-xs">Disponibles para descarga</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2.5">
              {recentReports.map((report) => (
                <div key={report.name} className="flex items-center gap-3 p-2.5 rounded-lg border">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{report.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[9px] px-1.5">{report.type}</Badge>
                      <span className="text-[10px] text-muted-foreground">{report.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
