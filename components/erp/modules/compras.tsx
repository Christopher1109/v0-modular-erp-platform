"use client"

import { ShoppingCart, Truck, Star, Clock, CheckCircle2, AlertTriangle, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const orders = [
  { id: "OC-1092", supplier: "Industrial MX S.A.", items: 12, total: 148500, status: "Recibida", date: "23 Feb 2026", delivery: "A tiempo" },
  { id: "OC-1091", supplier: "TechSupply Corp.", items: 8, total: 234000, status: "En Transito", date: "21 Feb 2026", delivery: "En camino" },
  { id: "OC-1090", supplier: "Papelera del Norte", items: 25, total: 18200, status: "Aprobada", date: "20 Feb 2026", delivery: "Pendiente" },
  { id: "OC-1089", supplier: "Electro Components", items: 15, total: 96800, status: "Recibida", date: "18 Feb 2026", delivery: "A tiempo" },
  { id: "OC-1088", supplier: "Mobiliario Express", items: 6, total: 82400, status: "En Transito", date: "16 Feb 2026", delivery: "Retrasada" },
  { id: "OC-1087", supplier: "Quimicos Industriales", items: 10, total: 42600, status: "Borrador", date: "15 Feb 2026", delivery: "N/A" },
]

const suppliers = [
  { name: "Industrial MX S.A.", rating: 4.8, orders: 42, onTime: 96, total: 1280000, status: "Premium" },
  { name: "TechSupply Corp.", rating: 4.5, orders: 28, onTime: 92, total: 2150000, status: "Activo" },
  { name: "Papelera del Norte", rating: 4.2, orders: 56, onTime: 88, total: 420000, status: "Activo" },
  { name: "Electro Components", rating: 4.6, orders: 35, onTime: 94, total: 1680000, status: "Premium" },
  { name: "Mobiliario Express", rating: 3.8, orders: 15, onTime: 75, total: 580000, status: "En revision" },
]

function statusBadge(status: string) {
  const m: Record<string, string> = { "Recibida": "bg-success/10 text-success border-success/20 hover:bg-success/10", "En Transito": "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10", "Aprobada": "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10", "Borrador": "bg-muted text-muted-foreground hover:bg-muted" }
  return <Badge className={`${m[status] || ""} text-[10px]`}>{status}</Badge>
}

export function ComprasModule() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10"><ShoppingCart className="h-4 w-4 text-violet-600" /></div><div><p className="text-sm font-medium text-foreground">Ordenes de Compra</p><p className="text-xs text-muted-foreground mt-0.5">Flujo completo de adquisicion</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Truck className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-medium text-foreground">Tracking Envios</p><p className="text-xs text-muted-foreground mt-0.5">Seguimiento en tiempo real</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><Star className="h-4 w-4 text-warning" /></div><div><p className="text-sm font-medium text-foreground">Evaluacion Proveedores</p><p className="text-xs text-muted-foreground mt-0.5">Score y cumplimiento</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><Package className="h-4 w-4 text-success" /></div><div><p className="text-sm font-medium text-foreground">Recepcion Automatica</p><p className="text-xs text-muted-foreground mt-0.5">Vinculado a inventario</p></div></div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Ordenes Activas</p><p className="text-2xl font-bold text-foreground mt-2">6</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">En Transito</p><p className="text-2xl font-bold text-primary mt-2">2</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Proveedores</p><p className="text-2xl font-bold text-foreground mt-2">5</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Gasto del Mes</p><p className="text-2xl font-bold text-foreground mt-2">$622K</p></CardContent></Card>
      </div>

      <Tabs defaultValue="ordenes">
        <TabsList><TabsTrigger value="ordenes" className="text-xs">Ordenes de Compra</TabsTrigger><TabsTrigger value="proveedores" className="text-xs">Proveedores</TabsTrigger></TabsList>

        <TabsContent value="ordenes" className="mt-5">
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Ordenes de Compra</CardTitle></CardHeader><CardContent>
            <Table>
              <TableHeader><TableRow><TableHead className="text-xs">ID</TableHead><TableHead className="text-xs">Proveedor</TableHead><TableHead className="text-xs text-center">Items</TableHead><TableHead className="text-xs text-right">Total</TableHead><TableHead className="text-xs">Estado</TableHead><TableHead className="text-xs">Entrega</TableHead></TableRow></TableHeader>
              <TableBody>
                {orders.map(o => (
                  <TableRow key={o.id}>
                    <TableCell className="text-xs font-mono text-primary">{o.id}</TableCell>
                    <TableCell><p className="text-xs font-medium">{o.supplier}</p><p className="text-[10px] text-muted-foreground">{o.date}</p></TableCell>
                    <TableCell className="text-xs text-center">{o.items}</TableCell>
                    <TableCell className="text-xs text-right font-semibold">${o.total.toLocaleString()}</TableCell>
                    <TableCell>{statusBadge(o.status)}</TableCell>
                    <TableCell><Badge variant="outline" className={`text-[10px] ${o.delivery === "Retrasada" ? "border-destructive/30 text-destructive" : ""}`}>{o.delivery}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="proveedores" className="mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suppliers.map(s => (
              <Card key={s.name}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><p className="text-sm font-semibold">{s.name}</p><Badge variant="outline" className="text-[10px] mt-1">{s.status}</Badge></div>
                    <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-warning fill-warning" /><span className="text-sm font-bold">{s.rating}</span></div>
                  </div>
                  <div className="flex flex-col gap-2.5 mt-4">
                    <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Cumplimiento</span><span className="text-xs font-semibold">{s.onTime}%</span></div>
                    <Progress value={s.onTime} className="h-1.5" />
                    <div className="flex items-center justify-between mt-1"><span className="text-xs text-muted-foreground">{s.orders} ordenes</span><span className="text-xs font-semibold">${(s.total / 1000000).toFixed(1)}M total</span></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
