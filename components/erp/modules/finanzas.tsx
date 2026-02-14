"use client"

import {
  ArrowUpRight, ArrowDownRight, DollarSign, TrendingDown, TrendingUp, Percent,
  Car, Wrench, ShoppingCart, Download, Search, Building2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const financialOrders = [
  { id: "OV-2026-0089", type: "Venta", description: "Toyota Camry 2025", branch: "Agencia Centro", cost: 420000, price: 485000, margin: 65000, marginPct: 13.4, payment: "Cobrado", date: "13 Feb 2026" },
  { id: "OV-2026-0088", type: "Venta", description: "Mazda CX-5 2025 Signature", branch: "Agencia Centro", cost: 548000, price: 628000, margin: 80000, marginPct: 12.7, payment: "Cobrado", date: "12 Feb 2026" },
  { id: "OS-2026-0231", type: "Servicio", description: "Alineacion y balanceo - RAV4", branch: "Agencia Centro", cost: 400, price: 1200, margin: 800, marginPct: 66.7, payment: "Cobrado", date: "12 Feb 2026" },
  { id: "OS-2026-0234", type: "Servicio", description: "Servicio mayor 40k km - Civic", branch: "Agencia Norte", cost: 3200, price: 8500, margin: 5300, marginPct: 62.4, payment: "Pendiente", date: "13 Feb 2026" },
  { id: "OS-2026-0233", type: "Servicio", description: "Frenos + balatas - Sentra", branch: "Taller Industrial", cost: 1800, price: 4200, margin: 2400, marginPct: 57.1, payment: "Pendiente", date: "13 Feb 2026" },
  { id: "OV-2026-0087", type: "Venta", description: "Honda CR-V 2024 Seminuevo", branch: "Patio Seminuevos", cost: 380000, price: 445000, margin: 65000, marginPct: 14.6, payment: "Pendiente", date: "13 Feb 2026" },
  { id: "PA-2026-0045", type: "Pedido", description: "Lote filtros + aceite", branch: "Taller Industrial", cost: 32400, price: 0, margin: 0, marginPct: 0, payment: "Pendiente", date: "12 Feb 2026" },
]

const monthlyData = [
  { month: "Sep", ingresos: 3800000, costos: 3200000, margen: 600000 },
  { month: "Oct", ingresos: 4790000, costos: 4050000, margen: 740000 },
  { month: "Nov", ingresos: 4305000, costos: 3620000, margen: 685000 },
  { month: "Dic", ingresos: 5830000, costos: 4900000, margen: 930000 },
  { month: "Ene", ingresos: 4780000, costos: 4020000, margen: 760000 },
  { month: "Feb", ingresos: 5605000, costos: 4700000, margen: 905000 },
]

const marginByType = [
  { tipo: "Vehiculos Nuevos", margen: 13.2 },
  { tipo: "Seminuevos", margen: 14.6 },
  { tipo: "Servicio Taller", margen: 58.4 },
  { tipo: "Refacciones", margen: 42.1 },
]

const branchFinance = [
  { branch: "Agencia Centro", ingresos: 2840000, costos: 2420000, margen: 420000, marginPct: 14.8 },
  { branch: "Agencia Norte", ingresos: 1450000, costos: 1250000, margen: 200000, marginPct: 13.8 },
  { branch: "Taller Industrial", ingresos: 380000, costos: 295000, margen: 85000, marginPct: 22.4 },
  { branch: "Patio Seminuevos", ingresos: 560000, costos: 475000, margen: 85000, marginPct: 15.2 },
]

export function FinanzasModule() {
  const cobrado = financialOrders.filter(o => o.payment === "Cobrado")
  const totalIngresoCobrado = cobrado.reduce((acc, o) => acc + o.price, 0)
  const totalCostoCobrado = cobrado.reduce((acc, o) => acc + o.cost, 0)
  const totalMargenCobrado = totalIngresoCobrado - totalCostoCobrado
  const marginPctCobrado = totalIngresoCobrado > 0 ? ((totalMargenCobrado / totalIngresoCobrado) * 100).toFixed(1) : "0"

  const pendiente = financialOrders.filter(o => o.payment === "Pendiente" && o.price > 0)
  const totalPendiente = pendiente.reduce((acc, o) => acc + o.price, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2"><ArrowUpRight className="h-4 w-4 text-success" /><p className="text-xs text-muted-foreground">Ingresos Cobrados</p></div>
            <p className="text-2xl font-bold text-success mt-1">${(totalIngresoCobrado / 1000000).toFixed(2)}M</p>
            <p className="text-[10px] text-muted-foreground">Solo ordenes con cobro confirmado</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2"><ArrowDownRight className="h-4 w-4 text-destructive" /><p className="text-xs text-muted-foreground">Costos</p></div>
            <p className="text-2xl font-bold text-destructive mt-1">${(totalCostoCobrado / 1000000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2"><Percent className="h-4 w-4 text-primary" /><p className="text-xs text-muted-foreground">Margen Neto</p></div>
            <p className="text-2xl font-bold text-primary mt-1">{marginPctCobrado}%</p>
            <p className="text-[10px] text-muted-foreground">${(totalMargenCobrado / 1000).toFixed(0)}k utilidad</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-warning" /><p className="text-xs text-muted-foreground">Por Cobrar</p></div>
            <p className="text-2xl font-bold text-warning mt-1">${(totalPendiente / 1000).toFixed(0)}k</p>
            <p className="text-[10px] text-muted-foreground">{pendiente.length} ordenes pendientes</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 border rounded-lg px-4 py-3">
        <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Regla de reconocimiento:</span> Los ingresos se reconocen unicamente al momento del cobro. Las ordenes pendientes no se reflejan en ingresos hasta que su estado de pago cambie a &quot;Cobrado&quot;.</p>
      </div>

      <Tabs defaultValue="ordenes" className="w-full">
        <TabsList>
          <TabsTrigger value="ordenes" className="text-xs">Por Orden</TabsTrigger>
          <TabsTrigger value="sucursal" className="text-xs">Por Sucursal</TabsTrigger>
          <TabsTrigger value="tendencia" className="text-xs">Tendencia</TabsTrigger>
        </TabsList>

        <TabsContent value="ordenes" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-sm font-semibold">Detalle Financiero por Orden</CardTitle>
                <Button variant="outline" size="sm" className="h-8 text-xs"><Download className="mr-1.5 h-3 w-3" />Exportar</Button>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar por ID u orden..." className="h-8 pl-8 text-xs" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-32 text-xs"><SelectValue placeholder="Cobro" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="cobrado">Cobrado</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Orden</TableHead>
                    <TableHead className="text-xs">Tipo</TableHead>
                    <TableHead className="text-xs">Descripcion</TableHead>
                    <TableHead className="text-xs text-right">Costo</TableHead>
                    <TableHead className="text-xs text-right">Precio</TableHead>
                    <TableHead className="text-xs text-right">Margen</TableHead>
                    <TableHead className="text-xs">Cobro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialOrders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="text-xs font-mono font-medium text-primary">{o.id}</TableCell>
                      <TableCell>
                        {o.type === "Venta" && <Badge variant="outline" className="text-[10px] border-primary/30 text-primary"><Car className="h-2.5 w-2.5 mr-1" />{o.type}</Badge>}
                        {o.type === "Servicio" && <Badge variant="outline" className="text-[10px] border-success/30 text-success"><Wrench className="h-2.5 w-2.5 mr-1" />{o.type}</Badge>}
                        {o.type === "Pedido" && <Badge variant="outline" className="text-[10px] border-warning/30 text-warning"><ShoppingCart className="h-2.5 w-2.5 mr-1" />{o.type}</Badge>}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-xs font-medium text-foreground">{o.description}</p>
                          <p className="text-[10px] text-muted-foreground">{o.branch}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-right text-muted-foreground">${o.cost.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-right font-medium">{o.price > 0 ? `$${o.price.toLocaleString()}` : "-"}</TableCell>
                      <TableCell className="text-xs text-right">
                        {o.margin > 0 ? (
                          <div>
                            <span className={`font-medium ${o.marginPct >= 15 ? "text-success" : "text-foreground"}`}>${o.margin.toLocaleString()}</span>
                            <p className="text-[10px] text-muted-foreground">{o.marginPct}%</p>
                          </div>
                        ) : <span className="text-muted-foreground">-</span>}
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] ${o.payment === "Cobrado" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10"}`}>
                          <DollarSign className="h-2.5 w-2.5 mr-0.5" />{o.payment}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sucursal" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Resultado por Sucursal</CardTitle>
                <CardDescription className="text-xs">Ingresos, costos y margen por ubicacion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {branchFinance.map((b) => (
                    <div key={b.branch} className="flex flex-col gap-2 p-3 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground flex items-center gap-1.5"><Building2 className="h-3 w-3" />{b.branch}</span>
                        <Badge variant="outline" className={`text-[10px] ${b.marginPct >= 15 ? "border-success/30 text-success" : "border-foreground/20"}`}>{b.marginPct}% margen</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div><p className="text-[10px] text-muted-foreground">Ingresos</p><p className="text-sm font-bold text-success">${(b.ingresos / 1000000).toFixed(2)}M</p></div>
                        <div><p className="text-[10px] text-muted-foreground">Costos</p><p className="text-sm font-bold text-destructive">${(b.costos / 1000000).toFixed(2)}M</p></div>
                        <div><p className="text-[10px] text-muted-foreground">Utilidad</p><p className="text-sm font-bold text-foreground">${(b.margen / 1000).toFixed(0)}k</p></div>
                      </div>
                      <Progress value={b.marginPct * 4} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Margen por Tipo de Operacion</CardTitle>
                <CardDescription className="text-xs">Promedio de margen por linea de negocio</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={marginByType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                    <XAxis dataKey="tipo" tick={{ fontSize: 10 }} stroke="hsl(215, 14%, 46%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Margen"]} />
                    <Bar dataKey="margen" fill="hsl(213, 72%, 42%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tendencia" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Tendencia Mensual</CardTitle>
              <CardDescription className="text-xs">Ingresos cobrados, costos y margen - ultimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                  <Line type="monotone" dataKey="ingresos" stroke="hsl(162, 63%, 41%)" strokeWidth={2} name="Ingresos" dot={false} />
                  <Line type="monotone" dataKey="costos" stroke="hsl(0, 72%, 51%)" strokeWidth={2} name="Costos" dot={false} />
                  <Line type="monotone" dataKey="margen" stroke="hsl(213, 72%, 42%)" strokeWidth={2.5} name="Margen" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
