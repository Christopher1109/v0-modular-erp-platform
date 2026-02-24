"use client"

import { ArrowUpRight, ArrowDownRight, DollarSign, Percent, TrendingUp, Wallet, CreditCard, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const monthlyData = [
  { month: "Sep", ingresos: 1800000, egresos: 1350000, margen: 450000 },
  { month: "Oct", ingresos: 2100000, egresos: 1520000, margen: 580000 },
  { month: "Nov", ingresos: 1950000, egresos: 1480000, margen: 470000 },
  { month: "Dic", ingresos: 2600000, egresos: 1890000, margen: 710000 },
  { month: "Ene", ingresos: 2200000, egresos: 1650000, margen: 550000 },
  { month: "Feb", ingresos: 2480000, egresos: 1780000, margen: 700000 },
]

const expensesByCategory = [
  { cat: "Nomina", amount: 680000 },
  { cat: "Proveedores", amount: 520000 },
  { cat: "Operacion", amount: 280000 },
  { cat: "Marketing", amount: 180000 },
  { cat: "Otros", amount: 120000 },
]

const transactions = [
  { id: "TXN-4501", desc: "Pago corporativo TechCorp", type: "Ingreso", amount: 45200, category: "Ventas", date: "23 Feb 2026", status: "Confirmado" },
  { id: "TXN-4500", desc: "Nomina quincenal Feb-2", type: "Egreso", amount: 340000, category: "Nomina", date: "22 Feb 2026", status: "Procesado" },
  { id: "TXN-4499", desc: "Factura proveedor Industrial MX", type: "Egreso", amount: 28400, category: "Proveedores", date: "22 Feb 2026", status: "Pendiente" },
  { id: "TXN-4498", desc: "Contrato servicio mensual GlobalFood", type: "Ingreso", amount: 18500, category: "Ventas", date: "21 Feb 2026", status: "Confirmado" },
  { id: "TXN-4497", desc: "Pago renta oficinas Central", type: "Egreso", amount: 85000, category: "Operacion", date: "20 Feb 2026", status: "Procesado" },
  { id: "TXN-4496", desc: "Campana Google Ads Feb", type: "Egreso", amount: 45000, category: "Marketing", date: "19 Feb 2026", status: "Procesado" },
]

const pendingInvoices = [
  { id: "FAC-2890", client: "Arq. Hernandez & Asoc.", amount: 62800, dueDate: "28 Feb 2026", daysLeft: 5 },
  { id: "FAC-2885", client: "Distribuidora Norte SA", amount: 34500, dueDate: "1 Mar 2026", daysLeft: 6 },
  { id: "FAC-2880", client: "Servicios Delta", amount: 27200, dueDate: "5 Mar 2026", daysLeft: 10 },
]

export function FinanzasModule() {
  return (
    <div className="flex flex-col gap-8">
      {/* Capabilities */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10"><DollarSign className="h-4 w-4 text-emerald-600" /></div><div><p className="text-sm font-medium text-foreground">Flujo de Caja</p><p className="text-xs text-muted-foreground mt-0.5">Ingresos y egresos en vivo</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><CreditCard className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-medium text-foreground">Cuentas x Cobrar</p><p className="text-xs text-muted-foreground mt-0.5">Seguimiento de facturas</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><Percent className="h-4 w-4 text-warning" /></div><div><p className="text-sm font-medium text-foreground">Margenes</p><p className="text-xs text-muted-foreground mt-0.5">Por operacion y periodo</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted"><FileText className="h-4 w-4 text-muted-foreground" /></div><div><p className="text-sm font-medium text-foreground">Reportes Fiscales</p><p className="text-xs text-muted-foreground mt-0.5">Exportacion automatica</p></div></div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-5"><div className="flex items-center gap-1 text-xs text-success"><ArrowUpRight className="h-3.5 w-3.5" />+12.5%</div><p className="text-2xl font-bold text-foreground mt-1">$2.48M</p><p className="text-xs text-muted-foreground">Ingresos del mes</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-1 text-xs text-destructive"><ArrowDownRight className="h-3.5 w-3.5" />+8.2%</div><p className="text-2xl font-bold text-foreground mt-1">$1.78M</p><p className="text-xs text-muted-foreground">Egresos del mes</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-1 text-xs text-success"><TrendingUp className="h-3.5 w-3.5" />28.2%</div><p className="text-2xl font-bold text-primary mt-1">$700K</p><p className="text-xs text-muted-foreground">Margen neto</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-1 text-xs text-warning"><Wallet className="h-3.5 w-3.5" />3 facturas</div><p className="text-2xl font-bold text-warning mt-1">$124.5K</p><p className="text-xs text-muted-foreground">Por cobrar</p></CardContent></Card>
      </div>

      <Tabs defaultValue="transacciones">
        <TabsList><TabsTrigger value="transacciones" className="text-xs">Transacciones</TabsTrigger><TabsTrigger value="cxc" className="text-xs">Cuentas x Cobrar</TabsTrigger><TabsTrigger value="tendencia" className="text-xs">Tendencia</TabsTrigger></TabsList>

        <TabsContent value="transacciones" className="mt-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Transacciones Recientes</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead className="text-xs">ID</TableHead><TableHead className="text-xs">Descripcion</TableHead><TableHead className="text-xs">Tipo</TableHead><TableHead className="text-xs">Categoria</TableHead><TableHead className="text-xs text-right">Monto</TableHead><TableHead className="text-xs">Estado</TableHead></TableRow></TableHeader>
                <TableBody>
                  {transactions.map(t => (
                    <TableRow key={t.id}>
                      <TableCell className="text-xs font-mono text-primary">{t.id}</TableCell>
                      <TableCell><p className="text-xs font-medium">{t.desc}</p><p className="text-[10px] text-muted-foreground">{t.date}</p></TableCell>
                      <TableCell><Badge className={`text-[10px] ${t.type === "Ingreso" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10"}`}>{t.type}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.category}</TableCell>
                      <TableCell className="text-xs text-right font-semibold">${t.amount.toLocaleString()}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{t.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cxc" className="mt-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Facturas Pendientes de Cobro</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {pendingInvoices.map(inv => (
                  <div key={inv.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10"><FileText className="h-5 w-5 text-warning" /></div>
                      <div><p className="text-xs font-semibold">{inv.id} - {inv.client}</p><p className="text-[10px] text-muted-foreground">Vence: {inv.dueDate}</p></div>
                    </div>
                    <div className="text-right"><p className="text-sm font-bold">${inv.amount.toLocaleString()}</p><Badge className={`text-[10px] ${inv.daysLeft <= 5 ? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10" : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10"}`}>{inv.daysLeft} dias</Badge></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendencia" className="mt-5">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Tendencia Mensual</CardTitle></CardHeader><CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={v => `$${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                  <Line type="monotone" dataKey="ingresos" stroke="hsl(162, 63%, 41%)" strokeWidth={2} name="Ingresos" dot={false} />
                  <Line type="monotone" dataKey="egresos" stroke="hsl(0, 72%, 51%)" strokeWidth={2} name="Egresos" dot={false} />
                  <Line type="monotone" dataKey="margen" stroke="hsl(213, 72%, 42%)" strokeWidth={2.5} name="Margen" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Egresos por Categoria</CardTitle></CardHeader><CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expensesByCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(215, 14%, 46%)" tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="cat" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" width={90} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Monto"]} />
                  <Bar dataKey="amount" fill="hsl(0, 72%, 51%)" radius={[0, 4, 4, 0]} name="Monto" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent></Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
