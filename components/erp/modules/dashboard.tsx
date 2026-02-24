"use client"

import { ArrowUpRight, ArrowDownRight, DollarSign, Package, Users, ShoppingCart, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const kpis = [
  { title: "Ingresos del Mes", value: "$2,480,000", change: "+12.5%", trend: "up" as const, icon: DollarSign, detail: "Meta: $2.2M" },
  { title: "Ordenes Activas", value: "184", change: "+23", trend: "up" as const, icon: ShoppingCart, detail: "42 pendientes de entrega" },
  { title: "Productos en Stock", value: "3,842", change: "-18", trend: "down" as const, icon: Package, detail: "12 bajo minimo" },
  { title: "Clientes Activos", value: "1,256", change: "+48", trend: "up" as const, icon: Users, detail: "89% retencion" },
]

const revenueData = [
  { month: "Sep", ingresos: 1800000, egresos: 1350000 },
  { month: "Oct", ingresos: 2100000, egresos: 1520000 },
  { month: "Nov", ingresos: 1950000, egresos: 1480000 },
  { month: "Dic", ingresos: 2600000, egresos: 1890000 },
  { month: "Ene", ingresos: 2200000, egresos: 1650000 },
  { month: "Feb", ingresos: 2480000, egresos: 1780000 },
]

const ordersByStatus = [
  { name: "Completadas", value: 124, color: "hsl(162, 63%, 41%)" },
  { name: "En Proceso", value: 42, color: "hsl(213, 72%, 42%)" },
  { name: "Pendientes", value: 18, color: "hsl(38, 92%, 50%)" },
]

const recentActivity = [
  { id: "ORD-4821", type: "Venta", description: "Pedido corporativo - Suministros Q1", client: "TechCorp S.A.", status: "Completada", amount: "$45,200", date: "Hace 15 min" },
  { id: "ORD-4820", type: "Compra", description: "Reabastecimiento materia prima", client: "Proveedor: Industrial MX", status: "En Proceso", amount: "$28,400", date: "Hace 45 min" },
  { id: "ORD-4819", type: "Venta", description: "Contrato de servicio mensual", client: "GlobalFood Corp.", status: "Completada", amount: "$18,500", date: "Hace 2h" },
  { id: "ORD-4818", type: "Venta", description: "Equipamiento oficina central", client: "Arq. Hernandez & Asoc.", status: "Pendiente", amount: "$62,800", date: "Hace 3h" },
]

const alerts = [
  { type: "warning", message: "12 productos por debajo del stock minimo en Almacen Central", time: "Automatica" },
  { type: "info", message: "3 facturas vencen en los proximos 5 dias por $124,500", time: "Hace 1h" },
  { type: "error", message: "Devolucion pendiente de aprobacion: ORD-4790", time: "Hace 3h" },
  { type: "success", message: "Meta de ventas semanal alcanzada: 108% del objetivo", time: "Hace 5h" },
]

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    "Completada": "bg-success/10 text-success border-success/20 hover:bg-success/10",
    "En Proceso": "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10",
    "Pendiente": "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10",
  }
  return <Badge className={`${styles[status] || ""} text-[10px]`}>{status}</Badge>
}

export function DashboardModule() {
  return (
    <div className="flex flex-col gap-8">
      {/* Capabilities Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><TrendingUp className="h-4 w-4 text-primary" /></div>
          <div><p className="text-sm font-medium text-foreground">Metricas en Vivo</p><p className="text-xs text-muted-foreground mt-0.5">KPIs actualizados al segundo</p></div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><CheckCircle2 className="h-4 w-4 text-success" /></div>
          <div><p className="text-sm font-medium text-foreground">Alertas Inteligentes</p><p className="text-xs text-muted-foreground mt-0.5">Notificaciones proactivas</p></div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><AlertTriangle className="h-4 w-4 text-warning" /></div>
          <div><p className="text-sm font-medium text-foreground">Vision 360</p><p className="text-xs text-muted-foreground mt-0.5">Todos los modulos en una vista</p></div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted"><Clock className="h-4 w-4 text-muted-foreground" /></div>
          <div><p className="text-sm font-medium text-foreground">Historial Completo</p><p className="text-xs text-muted-foreground mt-0.5">Actividad reciente del equipo</p></div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <kpi.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.trend === "up" ? "text-success" : "text-destructive"}`}>
                  {kpi.change}
                  {kpi.trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.title}</p>
              </div>
              <p className="text-[10px] text-muted-foreground/70 mt-2">{kpi.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Ingresos vs Egresos</CardTitle>
            <CardDescription className="text-xs">Tendencia de los ultimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEgresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                <Area type="monotone" dataKey="ingresos" stroke="hsl(213, 72%, 42%)" strokeWidth={2} fill="url(#colorIngresos)" name="Ingresos" />
                <Area type="monotone" dataKey="egresos" stroke="hsl(0, 72%, 51%)" strokeWidth={1.5} fill="url(#colorEgresos)" name="Egresos" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Ordenes por Estado</CardTitle>
            <CardDescription className="text-xs">Distribucion actual</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={ordersByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {ordersByStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2.5 w-full">
              {ordersByStatus.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground flex-1">{item.name}</span>
                  <span className="text-xs font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity + Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Actividad Reciente</CardTitle>
            <CardDescription className="text-xs">Ultimas operaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Descripcion</TableHead>
                  <TableHead className="text-xs">Estado</TableHead>
                  <TableHead className="text-xs text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-xs font-mono font-medium text-primary">{item.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-xs font-medium text-foreground">{item.description}</p>
                        <p className="text-[10px] text-muted-foreground">{item.client} -- {item.date}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-xs font-semibold text-right">{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Alertas del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3">
                  {alert.type === "warning" && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />}
                  {alert.type === "error" && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
                  {alert.type === "info" && <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
                  {alert.type === "success" && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-relaxed text-foreground">{alert.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
