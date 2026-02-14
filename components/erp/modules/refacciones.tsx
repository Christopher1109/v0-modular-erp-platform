"use client"

import { useState } from "react"
import {
  Search, Download, MoreHorizontal, Eye, Edit, Plus, AlertTriangle, Wrench,
  ArrowUpRight, ArrowDownRight, TrendingDown, Package,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const parts = [
  { sku: "REF-001", name: "Filtro de aceite 5W-30", category: "Filtros", stock: 4, minStock: 10, branch: "Taller Industrial", price: 185, cost: 95, status: "Critico" },
  { sku: "REF-002", name: "Balatas ceramicas Brembo delanteras", category: "Frenos", stock: 18, minStock: 8, branch: "Agencia Centro", price: 1400, cost: 780, status: "Normal" },
  { sku: "REF-003", name: "Aceite sintetico Mobil 1 5W-30 (4L)", category: "Lubricantes", stock: 32, minStock: 15, branch: "Taller Industrial", price: 650, cost: 380, status: "Normal" },
  { sku: "REF-004", name: "Bujias NGK Iridium (juego x4)", category: "Motor", stock: 6, minStock: 10, branch: "Agencia Norte", price: 890, cost: 520, status: "Bajo" },
  { sku: "REF-005", name: "Amortiguador Monroe delantero", category: "Suspension", stock: 12, minStock: 6, branch: "Agencia Centro", price: 2200, cost: 1350, status: "Normal" },
  { sku: "REF-006", name: "Banda de accesorios Gates", category: "Motor", stock: 8, minStock: 5, branch: "Taller Industrial", price: 450, cost: 280, status: "Normal" },
  { sku: "REF-007", name: "Filtro de aire cabina", category: "Filtros", stock: 3, minStock: 8, branch: "Agencia Norte", price: 320, cost: 150, status: "Critico" },
  { sku: "REF-008", name: "Liquido de frenos DOT 4 (500ml)", category: "Liquidos", stock: 24, minStock: 10, branch: "Taller Industrial", price: 180, cost: 90, status: "Normal" },
  { sku: "REF-009", name: "Disco de freno ventilado delantero", category: "Frenos", stock: 10, minStock: 4, branch: "Agencia Centro", price: 1800, cost: 1100, status: "Normal" },
  { sku: "REF-010", name: "Bomba de agua Toyota/Honda", category: "Motor", stock: 2, minStock: 3, branch: "Agencia Norte", price: 3500, cost: 2100, status: "Critico" },
]

const movements = [
  { id: "MOV-101", part: "Filtro de aceite 5W-30", type: "Consumo", quantity: 3, order: "OS-2026-0234", branch: "Taller Industrial", responsible: "Pedro Zuniga", date: "13 Feb 2026" },
  { id: "MOV-100", part: "Balatas ceramicas Brembo", type: "Consumo", quantity: 2, order: "OS-2026-0233", branch: "Taller Industrial", responsible: "Pedro Zuniga", date: "13 Feb 2026" },
  { id: "MOV-099", part: "Aceite sintetico Mobil 1", type: "Entrada", quantity: 20, order: "PA-2026-0043", branch: "Taller Industrial", responsible: "Ana Fuentes", date: "12 Feb 2026" },
  { id: "MOV-098", part: "Bujias NGK Iridium", type: "Merma", quantity: 2, order: null, branch: "Agencia Norte", responsible: "Javier Rios", date: "11 Feb 2026" },
  { id: "MOV-097", part: "Amortiguador Monroe", type: "Consumo", quantity: 2, order: "OS-2026-0228", branch: "Agencia Centro", responsible: "Javier Rios", date: "10 Feb 2026" },
  { id: "MOV-096", part: "Filtro de aire cabina", type: "Consumo", quantity: 4, order: "OS-2026-0225", branch: "Agencia Norte", responsible: "Javier Rios", date: "9 Feb 2026" },
]

const stockByCategory = [
  { category: "Filtros", stock: 7 },
  { category: "Frenos", stock: 28 },
  { category: "Lubricantes", stock: 32 },
  { category: "Motor", stock: 16 },
  { category: "Suspension", stock: 12 },
  { category: "Liquidos", stock: 24 },
]

function getStockBadge(status: string) {
  const map: Record<string, string> = {
    "Normal": "bg-success/10 text-success border-success/20 hover:bg-success/10",
    "Bajo": "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10",
    "Critico": "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10",
  }
  return <Badge className={`${map[status] || ""} text-[10px]`}>{status}</Badge>
}

function getMovementBadge(type: string) {
  if (type === "Entrada") return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10 text-[10px]"><ArrowUpRight className="h-2.5 w-2.5 mr-1" />{type}</Badge>
  if (type === "Consumo") return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[10px]"><ArrowDownRight className="h-2.5 w-2.5 mr-1" />{type}</Badge>
  return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 text-[10px]"><TrendingDown className="h-2.5 w-2.5 mr-1" />{type}</Badge>
}

export function RefaccionesModule() {
  const [showNewDialog, setShowNewDialog] = useState(false)

  const totalParts = parts.length
  const lowStock = parts.filter(p => p.status === "Bajo" || p.status === "Critico").length
  const totalUnits = parts.reduce((acc, p) => acc + p.stock, 0)
  const totalValue = parts.reduce((acc, p) => acc + (p.stock * p.cost), 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2"><Package className="h-4 w-4 text-primary" /><p className="text-xs text-muted-foreground">Refacciones</p></div>
            <p className="text-2xl font-bold text-foreground mt-1">{totalParts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" /><p className="text-xs text-muted-foreground">Stock Bajo/Critico</p></div>
            <p className="text-2xl font-bold text-destructive mt-1">{lowStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Piezas</p>
            <p className="text-2xl font-bold text-foreground mt-1">{totalUnits}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Valor en Almacen</p>
            <p className="text-2xl font-bold text-foreground mt-1">${totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalogo" className="w-full">
        <TabsList>
          <TabsTrigger value="catalogo" className="text-xs">Catalogo</TabsTrigger>
          <TabsTrigger value="movimientos" className="text-xs">Movimientos</TabsTrigger>
          <TabsTrigger value="analisis" className="text-xs">Analisis</TabsTrigger>
        </TabsList>

        <TabsContent value="catalogo" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-sm font-semibold">Catalogo de Refacciones</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs"><Download className="mr-1.5 h-3 w-3" />Exportar</Button>
                  <Button size="sm" className="h-8 text-xs" onClick={() => setShowNewDialog(true)}><Plus className="mr-1.5 h-3 w-3" />Nueva Refaccion</Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar por SKU, nombre o categoria..." className="h-8 pl-8 text-xs" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-32 text-xs"><SelectValue placeholder="Estado" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="bajo">Bajo</SelectItem>
                    <SelectItem value="critico">Critico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">SKU</TableHead>
                    <TableHead className="text-xs">Refaccion</TableHead>
                    <TableHead className="text-xs">Categoria</TableHead>
                    <TableHead className="text-xs text-center">Stock</TableHead>
                    <TableHead className="text-xs">Estado</TableHead>
                    <TableHead className="text-xs">Sucursal</TableHead>
                    <TableHead className="text-xs text-right">Costo</TableHead>
                    <TableHead className="text-xs text-right">Precio</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parts.map((part) => (
                    <TableRow key={part.sku}>
                      <TableCell className="text-xs font-mono font-medium text-primary">{part.sku}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{part.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{part.category}</TableCell>
                      <TableCell className="text-xs text-center font-medium">{part.stock}</TableCell>
                      <TableCell>{getStockBadge(part.status)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{part.branch}</TableCell>
                      <TableCell className="text-xs text-right text-muted-foreground">${part.cost.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-right font-medium">${part.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="mr-2 h-3.5 w-3.5" />Ver Detalle</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="mr-2 h-3.5 w-3.5" />Editar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimientos" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Movimientos de Almacen</CardTitle>
              <CardDescription className="text-xs">Consumos automaticos por ordenes de servicio, entradas por pedidos y ajustes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">ID</TableHead>
                    <TableHead className="text-xs">Refaccion</TableHead>
                    <TableHead className="text-xs">Tipo</TableHead>
                    <TableHead className="text-xs text-center">Cant.</TableHead>
                    <TableHead className="text-xs">Orden</TableHead>
                    <TableHead className="text-xs">Sucursal</TableHead>
                    <TableHead className="text-xs text-right">Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movements.map((mov) => (
                    <TableRow key={mov.id}>
                      <TableCell className="text-xs font-mono font-medium">{mov.id}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{mov.part}</TableCell>
                      <TableCell>{getMovementBadge(mov.type)}</TableCell>
                      <TableCell className="text-xs text-center font-medium">{mov.quantity}</TableCell>
                      <TableCell className="text-xs">{mov.order ? <span className="font-mono text-primary">{mov.order}</span> : <span className="text-muted-foreground">Ajuste manual</span>}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{mov.branch}</TableCell>
                      <TableCell className="text-xs text-muted-foreground text-right">{mov.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analisis" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Stock por Categoria</CardTitle>
              <CardDescription className="text-xs">Distribucion de piezas en almacen</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="stock" fill="hsl(213, 72%, 42%)" radius={[4, 4, 0, 0]} name="Piezas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Part Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Nueva Refaccion</DialogTitle>
            <DialogDescription className="text-xs">Agrega una refaccion al inventario del almacen.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs">SKU</Label><Input placeholder="REF-XXX" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Categoria</Label>
                <Select><SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Seleccionar" /></SelectTrigger><SelectContent><SelectItem value="filtros">Filtros</SelectItem><SelectItem value="frenos">Frenos</SelectItem><SelectItem value="motor">Motor</SelectItem><SelectItem value="suspension">Suspension</SelectItem><SelectItem value="lubricantes">Lubricantes</SelectItem><SelectItem value="liquidos">Liquidos</SelectItem></SelectContent></Select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5"><Label className="text-xs">Nombre</Label><Input placeholder="Nombre de la refaccion" className="text-xs h-9" /></div>
            <div className="grid grid-cols-4 gap-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Stock</Label><Input type="number" placeholder="0" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Minimo</Label><Input type="number" placeholder="0" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Costo</Label><Input type="number" placeholder="$0" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Precio</Label><Input type="number" placeholder="$0" className="text-xs h-9" /></div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Sucursal</Label>
              <Select defaultValue="taller"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="centro">Agencia Centro</SelectItem><SelectItem value="norte">Agencia Norte</SelectItem><SelectItem value="taller">Taller Industrial</SelectItem></SelectContent></Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Cancelar</Button>
            <Button size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
