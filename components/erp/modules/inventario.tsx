"use client"

import { Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Search, Download, MoreHorizontal, Warehouse, RefreshCw, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const products = [
  { sku: "PRD-001", name: "Laptop Dell Inspiron 15", category: "Electronica", stock: 45, minStock: 20, warehouse: "Almacen Central", price: 18500, status: "Normal" },
  { sku: "PRD-002", name: "Monitor Samsung 27\" 4K", category: "Electronica", stock: 8, minStock: 15, warehouse: "Almacen Central", price: 8900, status: "Bajo" },
  { sku: "PRD-003", name: "Teclado mecanico Logitech", category: "Accesorios", stock: 120, minStock: 30, warehouse: "Almacen Norte", price: 2400, status: "Normal" },
  { sku: "PRD-004", name: "Resma papel bond A4 (500h)", category: "Oficina", stock: 3, minStock: 25, warehouse: "Almacen Central", price: 180, status: "Critico" },
  { sku: "PRD-005", name: "Silla ergonomica ejecutiva", category: "Mobiliario", stock: 22, minStock: 10, warehouse: "Almacen Sur", price: 6800, status: "Normal" },
  { sku: "PRD-006", name: "Cable HDMI 2.1 (2m)", category: "Accesorios", stock: 5, minStock: 40, warehouse: "Almacen Norte", price: 350, status: "Critico" },
  { sku: "PRD-007", name: "Impresora multifuncional HP", category: "Electronica", stock: 15, minStock: 8, warehouse: "Almacen Central", price: 12500, status: "Normal" },
  { sku: "PRD-008", name: "Mouse inalambrico Logitech", category: "Accesorios", stock: 85, minStock: 25, warehouse: "Almacen Norte", price: 890, status: "Normal" },
]

const stockByCategory = [
  { category: "Electronica", stock: 68, value: 1840000 },
  { category: "Accesorios", stock: 210, value: 198000 },
  { category: "Oficina", stock: 3, value: 540 },
  { category: "Mobiliario", stock: 22, value: 149600 },
]

const movements = [
  { id: "MOV-301", product: "Laptop Dell Inspiron 15", type: "Salida", qty: 5, reference: "ORD-4821", warehouse: "Almacen Central", date: "23 Feb 2026" },
  { id: "MOV-300", product: "Resma papel bond A4", type: "Salida", qty: 22, reference: "ORD-4815", warehouse: "Almacen Central", date: "22 Feb 2026" },
  { id: "MOV-299", product: "Monitor Samsung 27\"", type: "Entrada", qty: 20, reference: "OC-1089", warehouse: "Almacen Central", date: "21 Feb 2026" },
  { id: "MOV-298", product: "Cable HDMI 2.1", type: "Salida", qty: 35, reference: "ORD-4810", warehouse: "Almacen Norte", date: "20 Feb 2026" },
  { id: "MOV-297", product: "Silla ergonomica ejecutiva", type: "Entrada", qty: 12, reference: "OC-1088", warehouse: "Almacen Sur", date: "19 Feb 2026" },
]

function stockBadge(status: string) {
  const m: Record<string, string> = { Normal: "bg-success/10 text-success border-success/20 hover:bg-success/10", Bajo: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10", Critico: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10" }
  return <Badge className={`${m[status] || ""} text-[10px]`}>{status}</Badge>
}

export function InventarioModule() {
  const totalProducts = products.length
  const lowStock = products.filter(p => p.status !== "Normal").length
  const totalUnits = products.reduce((a, p) => a + p.stock, 0)
  const totalValue = products.reduce((a, p) => a + p.stock * p.price, 0)

  return (
    <div className="flex flex-col gap-8">
      {/* Capabilities */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10"><Package className="h-4 w-4 text-amber-600" /></div>
          <div><p className="text-sm font-medium text-foreground">Multi-Almacen</p><p className="text-xs text-muted-foreground mt-0.5">Control por ubicacion</p></div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10"><AlertTriangle className="h-4 w-4 text-destructive" /></div>
          <div><p className="text-sm font-medium text-foreground">Alertas de Reorden</p><p className="text-xs text-muted-foreground mt-0.5">Stock bajo automatico</p></div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><RefreshCw className="h-4 w-4 text-primary" /></div>
          <div><p className="text-sm font-medium text-foreground">Movimientos Auto</p><p className="text-xs text-muted-foreground mt-0.5">Vinculados a ordenes</p></div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><BarChart3 className="h-4 w-4 text-success" /></div>
          <div><p className="text-sm font-medium text-foreground">Analytics de Stock</p><p className="text-xs text-muted-foreground mt-0.5">Rotacion y tendencias</p></div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-5"><div className="flex items-center gap-2"><Package className="h-4 w-4 text-primary" /><p className="text-xs text-muted-foreground">Productos</p></div><p className="text-2xl font-bold text-foreground mt-2">{totalProducts}</p><p className="text-[10px] text-muted-foreground">SKUs unicos</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" /><p className="text-xs text-muted-foreground">Alertas Stock</p></div><p className="text-2xl font-bold text-destructive mt-2">{lowStock}</p><p className="text-[10px] text-muted-foreground">Requieren atencion</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Unidades Totales</p><p className="text-2xl font-bold text-foreground mt-2">{totalUnits.toLocaleString()}</p><p className="text-[10px] text-muted-foreground">En todos los almacenes</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Valor en Almacen</p><p className="text-2xl font-bold text-foreground mt-2">${(totalValue / 1000000).toFixed(1)}M</p><p className="text-[10px] text-muted-foreground">A costo unitario</p></CardContent></Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="catalogo" className="w-full">
        <TabsList><TabsTrigger value="catalogo" className="text-xs">Catalogo</TabsTrigger><TabsTrigger value="movimientos" className="text-xs">Movimientos</TabsTrigger><TabsTrigger value="analisis" className="text-xs">Analisis</TabsTrigger></TabsList>

        <TabsContent value="catalogo" className="mt-5">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-sm font-semibold">Catalogo de Productos</CardTitle>
                <div className="flex gap-2"><Button variant="outline" size="sm" className="h-8 text-xs"><Download className="mr-1.5 h-3 w-3" />Exportar</Button><Button size="sm" className="h-8 text-xs">Nuevo Producto</Button></div>
              </div>
              <div className="relative mt-2 max-w-md"><Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Buscar por SKU o nombre..." className="h-8 pl-8 text-xs" /></div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead className="text-xs">SKU</TableHead><TableHead className="text-xs">Producto</TableHead><TableHead className="text-xs">Categoria</TableHead><TableHead className="text-xs text-center">Stock</TableHead><TableHead className="text-xs">Estado</TableHead><TableHead className="text-xs">Almacen</TableHead><TableHead className="text-xs text-right">Precio</TableHead></TableRow></TableHeader>
                <TableBody>
                  {products.map(p => (
                    <TableRow key={p.sku}>
                      <TableCell className="text-xs font-mono font-medium text-primary">{p.sku}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{p.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.category}</TableCell>
                      <TableCell className="text-xs text-center font-semibold">{p.stock}</TableCell>
                      <TableCell>{stockBadge(p.status)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.warehouse}</TableCell>
                      <TableCell className="text-xs text-right font-medium">${p.price.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimientos" className="mt-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Movimientos de Almacen</CardTitle><CardDescription className="text-xs">Entradas, salidas y ajustes recientes</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead className="text-xs">ID</TableHead><TableHead className="text-xs">Producto</TableHead><TableHead className="text-xs">Tipo</TableHead><TableHead className="text-xs text-center">Cant.</TableHead><TableHead className="text-xs">Referencia</TableHead><TableHead className="text-xs text-right">Fecha</TableHead></TableRow></TableHeader>
                <TableBody>
                  {movements.map(m => (
                    <TableRow key={m.id}>
                      <TableCell className="text-xs font-mono">{m.id}</TableCell>
                      <TableCell className="text-xs font-medium">{m.product}</TableCell>
                      <TableCell><Badge className={`text-[10px] ${m.type === "Entrada" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"}`}><span className="mr-1">{m.type === "Entrada" ? <ArrowUpRight className="inline h-2.5 w-2.5" /> : <ArrowDownRight className="inline h-2.5 w-2.5" />}</span>{m.type}</Badge></TableCell>
                      <TableCell className="text-xs text-center font-semibold">{m.qty}</TableCell>
                      <TableCell className="text-xs font-mono text-primary">{m.reference}</TableCell>
                      <TableCell className="text-xs text-right text-muted-foreground">{m.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analisis" className="mt-5">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Stock por Categoria</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={stockByCategory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                    <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="stock" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="Unidades" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Salud del Inventario</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col gap-5">
                  {[{ label: "Electronica", val: 68, max: 100 }, { label: "Accesorios", val: 210, max: 250 }, { label: "Oficina", val: 3, max: 50 }, { label: "Mobiliario", val: 22, max: 30 }].map(c => (
                    <div key={c.label} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between"><span className="text-xs font-medium">{c.label}</span><span className="text-xs text-muted-foreground">{c.val}/{c.max}</span></div>
                      <Progress value={(c.val / c.max) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
