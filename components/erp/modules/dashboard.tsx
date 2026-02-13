"use client"

import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Package,
  ClipboardList,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
} from "recharts"

const kpiCards = [
  {
    title: "Ingresos del Mes",
    value: "$284,500",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    description: "vs. mes anterior",
  },
  {
    title: "Operaciones Activas",
    value: "47",
    change: "+3",
    trend: "up" as const,
    icon: ClipboardList,
    description: "en progreso",
  },
  {
    title: "Productos en Stock",
    value: "1,842",
    change: "-2.1%",
    trend: "down" as const,
    icon: Package,
    description: "unidades totales",
  },
  {
    title: "Usuarios Activos",
    value: "24",
    change: "+2",
    trend: "up" as const,
    icon: Users,
    description: "esta semana",
  },
]

const revenueData = [
  { month: "Ene", ingresos: 186000, egresos: 142000 },
  { month: "Feb", ingresos: 205000, egresos: 158000 },
  { month: "Mar", ingresos: 237000, egresos: 171000 },
  { month: "Abr", ingresos: 198000, egresos: 165000 },
  { month: "May", ingresos: 264000, egresos: 179000 },
  { month: "Jun", ingresos: 284500, egresos: 192000 },
]

const operationsByStatus = [
  { name: "Completadas", value: 42, color: "hsl(162, 63%, 41%)" },
  { name: "En Progreso", value: 28, color: "hsl(213, 72%, 42%)" },
  { name: "Pendientes", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Canceladas", value: 5, color: "hsl(0, 72%, 51%)" },
]

const branchPerformance = [
  { sucursal: "Central", operaciones: 38, ingresos: 142000 },
  { sucursal: "Norte", operaciones: 25, ingresos: 89000 },
  { sucursal: "Sur", operaciones: 19, ingresos: 53500 },
]

const recentActivity = [
  {
    id: "OP-2024-0147",
    description: "Servicio de mantenimiento preventivo",
    status: "En Progreso",
    responsible: "Ana Martinez",
    date: "12 Feb 2026",
  },
  {
    id: "OP-2024-0146",
    description: "Entrega de pedido #4521",
    status: "Completado",
    responsible: "Luis Garcia",
    date: "12 Feb 2026",
  },
  {
    id: "OP-2024-0145",
    description: "Inventario de sucursal Norte",
    status: "Pendiente",
    responsible: "Maria Lopez",
    date: "11 Feb 2026",
  },
  {
    id: "OP-2024-0144",
    description: "Revision de calidad lote #892",
    status: "En Progreso",
    responsible: "Roberto Diaz",
    date: "11 Feb 2026",
  },
  {
    id: "OP-2024-0143",
    description: "Actualizacion de precios Q1",
    status: "Completado",
    responsible: "Carlos Admin",
    date: "10 Feb 2026",
  },
]

const alerts = [
  { type: "warning", message: "Stock bajo: Producto SKU-4521 (12 unidades)", time: "Hace 2h" },
  { type: "info", message: "Reporte semanal generado automaticamente", time: "Hace 5h" },
  { type: "error", message: "Merma detectada en Sucursal Sur: 3 unidades", time: "Hace 8h" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Completado":
      return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10 text-[10px]">{status}</Badge>
    case "En Progreso":
      return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[10px]">{status}</Badge>
    case "Pendiente":
      return <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/10 text-[10px]">{status}</Badge>
    default:
      return <Badge variant="outline" className="text-[10px]">{status}</Badge>
  }
}

export function DashboardModule() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <kpi.icon className="h-4 w-4 text-primary" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${kpi.trend === "up" ? "text-success" : "text-destructive"}`}>
                  {kpi.change}
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Ingresos vs Egresos</CardTitle>
            <CardDescription className="text-xs">Ultimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEgresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(162, 63%, 41%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(162, 63%, 41%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 18%, 89%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                />
                <Area
                  type="monotone"
                  dataKey="ingresos"
                  stroke="hsl(213, 72%, 42%)"
                  strokeWidth={2}
                  fill="url(#colorIngresos)"
                  name="Ingresos"
                />
                <Area
                  type="monotone"
                  dataKey="egresos"
                  stroke="hsl(162, 63%, 41%)"
                  strokeWidth={2}
                  fill="url(#colorEgresos)"
                  name="Egresos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Operations by Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Operaciones por Estado</CardTitle>
            <CardDescription className="text-xs">Distribucion actual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={operationsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {operationsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 18%, 89%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {operationsByStatus.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] text-muted-foreground">{item.name}</span>
                  <span className="ml-auto text-[11px] font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Activity Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Actividad Reciente</CardTitle>
                <CardDescription className="text-xs">Ultimas operaciones registradas</CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px]">
                <Clock className="mr-1 h-3 w-3" />
                Tiempo real
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Descripcion</TableHead>
                  <TableHead className="text-xs">Estado</TableHead>
                  <TableHead className="text-xs">Responsable</TableHead>
                  <TableHead className="text-xs text-right">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="text-xs font-mono font-medium text-primary">{activity.id}</TableCell>
                    <TableCell className="text-xs">{activity.description}</TableCell>
                    <TableCell>{getStatusBadge(activity.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{activity.responsible}</TableCell>
                    <TableCell className="text-xs text-muted-foreground text-right">{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Alerts + Branch Performance */}
        <div className="flex flex-col gap-4">
          {/* Alerts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    {alert.type === "warning" ? (
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                    ) : alert.type === "error" ? (
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs leading-relaxed text-foreground">{alert.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Branch Performance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Rendimiento por Sucursal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {branchPerformance.map((branch) => (
                  <div key={branch.sucursal} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">{branch.sucursal}</span>
                      <span className="text-xs text-muted-foreground">{branch.operaciones} ops</span>
                    </div>
                    <Progress value={(branch.ingresos / 150000) * 100} className="h-1.5" />
                    <p className="text-[10px] text-muted-foreground">${branch.ingresos.toLocaleString()} ingresos</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
