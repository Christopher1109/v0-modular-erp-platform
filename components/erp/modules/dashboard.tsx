"use client"

import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Car,
  Wrench,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Percent,
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
    title: "Ventas del Mes",
    value: "$4,850,000",
    change: "+18.3%",
    trend: "up" as const,
    icon: DollarSign,
    description: "vs. mes anterior",
    detail: "12 vehiculos vendidos",
  },
  {
    title: "Ordenes de Servicio",
    value: "68",
    change: "+7",
    trend: "up" as const,
    icon: Wrench,
    description: "activas este mes",
    detail: "23 en taller ahora",
  },
  {
    title: "Vehiculos en Stock",
    value: "94",
    change: "-3",
    trend: "down" as const,
    icon: Car,
    description: "nuevos + seminuevos",
    detail: "6 detenidos +60 dias",
  },
  {
    title: "Margen Promedio",
    value: "14.2%",
    change: "+1.8pp",
    trend: "up" as const,
    icon: Percent,
    description: "sobre ventas cerradas",
    detail: "Meta: 12%",
  },
]

const revenueData = [
  { month: "Sep", ventas: 3200000, servicio: 420000, refacciones: 180000 },
  { month: "Oct", ventas: 4100000, servicio: 480000, refacciones: 210000 },
  { month: "Nov", ventas: 3600000, servicio: 510000, refacciones: 195000 },
  { month: "Dic", ventas: 5200000, servicio: 390000, refacciones: 240000 },
  { month: "Ene", ventas: 4100000, servicio: 460000, refacciones: 220000 },
  { month: "Feb", ventas: 4850000, servicio: 520000, refacciones: 235000 },
]

const ordersByType = [
  { name: "Venta Vehiculo", value: 12, color: "hsl(213, 72%, 42%)" },
  { name: "Servicio Taller", value: 68, color: "hsl(162, 63%, 41%)" },
  { name: "Pedido Refacciones", value: 15, color: "hsl(38, 92%, 50%)" },
]

const ordersByStatus = [
  { name: "Cerradas", value: 48, color: "hsl(162, 63%, 41%)" },
  { name: "En Proceso", value: 32, color: "hsl(213, 72%, 42%)" },
  { name: "Creadas", value: 11, color: "hsl(38, 92%, 50%)" },
  { name: "Canceladas", value: 4, color: "hsl(0, 72%, 51%)" },
]

const branchPerformance = [
  { sucursal: "Agencia Centro", ventas: 7, servicios: 28, ingresos: 2840000, margen: 15.1 },
  { sucursal: "Agencia Norte", ventas: 3, servicios: 22, ingresos: 1450000, margen: 13.8 },
  { sucursal: "Taller Industrial", ventas: 0, servicios: 18, ingresos: 380000, margen: 22.5 },
  { sucursal: "Patio Seminuevos", ventas: 2, servicios: 0, ingresos: 560000, margen: 11.2 },
]

const recentOrders = [
  {
    id: "OV-2026-0089",
    type: "Venta",
    description: "Toyota Camry 2025 - Blanco Perla",
    client: "Ing. Roberto Salinas",
    status: "Cerrada",
    branch: "Agencia Centro",
    amount: "$485,000",
    date: "13 Feb 2026",
  },
  {
    id: "OS-2026-0234",
    type: "Servicio",
    description: "Servicio mayor 40,000 km - Honda Civic 2023",
    client: "Maria Elena Torres",
    status: "En Proceso",
    branch: "Agencia Norte",
    amount: "$8,500",
    date: "13 Feb 2026",
  },
  {
    id: "OS-2026-0233",
    type: "Servicio",
    description: "Cambio de frenos + balatas - Nissan Sentra 2022",
    client: "Carlos Mendoza R.",
    status: "En Proceso",
    branch: "Taller Industrial",
    amount: "$4,200",
    date: "13 Feb 2026",
  },
  {
    id: "PA-2026-0045",
    type: "Pedido",
    description: "Lote filtros + aceite sintetico 5W-30",
    client: "Proveedor: AutoParts MX",
    status: "Creada",
    branch: "Taller Industrial",
    amount: "$32,400",
    date: "12 Feb 2026",
  },
  {
    id: "OV-2026-0088",
    type: "Venta",
    description: "Mazda CX-5 2025 Signature - Rojo Cristal",
    client: "Lic. Fernando Garza",
    status: "Cerrada",
    branch: "Agencia Centro",
    amount: "$628,000",
    date: "12 Feb 2026",
  },
]

const alerts = [
  { type: "warning", message: "6 vehiculos detenidos mas de 60 dias en Patio Seminuevos", time: "Alerta automatica" },
  { type: "warning", message: "Stock bajo: Filtro de aceite 5W-30 (4 unidades) - Taller Industrial", time: "Hace 45 min" },
  { type: "error", message: "Merma registrada: 2 bujias danadas en recepcion - Agencia Norte", time: "Hace 2h" },
  { type: "info", message: "Orden OS-2026-0234 completada exitosamente", time: "Hace 3h" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Cerrada":
      return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10 text-[10px]">{status}</Badge>
    case "En Proceso":
      return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[10px]">{status}</Badge>
    case "Creada":
      return <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/10 text-[10px]">{status}</Badge>
    case "Cancelada":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 text-[10px]">{status}</Badge>
    default:
      return <Badge variant="outline" className="text-[10px]">{status}</Badge>
  }
}

function getTypeBadge(type: string) {
  switch (type) {
    case "Venta":
      return <Badge variant="outline" className="text-[10px] border-primary/30 text-primary"><Car className="h-2.5 w-2.5 mr-1" />{type}</Badge>
    case "Servicio":
      return <Badge variant="outline" className="text-[10px] border-success/30 text-success"><Wrench className="h-2.5 w-2.5 mr-1" />{type}</Badge>
    case "Pedido":
      return <Badge variant="outline" className="text-[10px] border-warning/30 text-warning"><ShoppingCart className="h-2.5 w-2.5 mr-1" />{type}</Badge>
    default:
      return <Badge variant="outline" className="text-[10px]">{type}</Badge>
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
              <p className="text-[10px] text-muted-foreground/80 mt-1">{kpi.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue by source */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Ingresos por Linea de Negocio</CardTitle>
            <CardDescription className="text-xs">Ventas de vehiculos, servicios y refacciones - ultimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorServicio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(162, 63%, 41%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(162, 63%, 41%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 18%, 89%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                />
                <Area type="monotone" dataKey="ventas" stroke="hsl(213, 72%, 42%)" strokeWidth={2} fill="url(#colorVentas)" name="Venta Vehiculos" />
                <Area type="monotone" dataKey="servicio" stroke="hsl(162, 63%, 41%)" strokeWidth={2} fill="url(#colorServicio)" name="Servicios Taller" />
                <Area type="monotone" dataKey="refacciones" stroke="hsl(38, 92%, 50%)" strokeWidth={1.5} fill="transparent" name="Refacciones" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Ordenes del Mes</CardTitle>
            <CardDescription className="text-xs">Por tipo y estado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Por Tipo</p>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={ordersByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {ordersByType.map((entry, index) => (
                        <Cell key={`cell-type-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {ordersByType.map((item) => (
                    <div key={item.name} className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] text-muted-foreground">{item.value}</span>
                      </div>
                      <span className="text-[9px] text-muted-foreground/80">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Por Estado</p>
                <div className="flex flex-col gap-2">
                  {ordersByStatus.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-[11px] text-muted-foreground flex-1">{item.name}</span>
                      <span className="text-[11px] font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders + Alerts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Ultimas Ordenes</CardTitle>
                <CardDescription className="text-xs">Ventas, servicios y pedidos recientes</CardDescription>
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
                  <TableHead className="text-xs">Tipo</TableHead>
                  <TableHead className="text-xs">Descripcion</TableHead>
                  <TableHead className="text-xs">Estado</TableHead>
                  <TableHead className="text-xs text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs font-mono font-medium text-primary">{order.id}</TableCell>
                    <TableCell>{getTypeBadge(order.type)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-xs font-medium text-foreground">{order.description}</p>
                        <p className="text-[10px] text-muted-foreground">{order.client}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-xs font-medium text-right text-foreground">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Alerts + Branch */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Alertas del Sistema</CardTitle>
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
                      <span className="text-[10px] font-semibold text-success">{branch.margen}% margen</span>
                    </div>
                    <Progress value={branch.margen * 5} className="h-1.5" />
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span>{branch.ventas} ventas</span>
                      <span>{branch.servicios} servicios</span>
                      <span className="ml-auto font-medium text-foreground">${(branch.ingresos / 1000000).toFixed(1)}M</span>
                    </div>
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
