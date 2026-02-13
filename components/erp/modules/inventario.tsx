"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Download,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  AlertTriangle,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const products = [
  { sku: "SKU-1001", name: "Motor electrico 5HP", category: "Motores", stock: 45, minStock: 10, branch: "Central", lastMovement: "12 Feb 2026", price: 8500, status: "Normal" },
  { sku: "SKU-1002", name: "Filtro de aceite industrial", category: "Filtros", stock: 8, minStock: 15, branch: "Norte", lastMovement: "11 Feb 2026", price: 450, status: "Bajo" },
  { sku: "SKU-1003", name: "Banda transportadora 2m", category: "Bandas", stock: 22, minStock: 5, branch: "Central", lastMovement: "11 Feb 2026", price: 12000, status: "Normal" },
  { sku: "SKU-1004", name: "Valvula de presion 3/4", category: "Valvulas", stock: 3, minStock: 10, branch: "Sur", lastMovement: "10 Feb 2026", price: 1200, status: "Critico" },
  { sku: "SKU-1005", name: "Rodamiento 6205-2RS", category: "Rodamientos", stock: 120, minStock: 30, branch: "Central", lastMovement: "10 Feb 2026", price: 180, status: "Normal" },
  { sku: "SKU-1006", name: "Aceite hidraulico 20L", category: "Lubricantes", stock: 35, minStock: 20, branch: "Norte", lastMovement: "9 Feb 2026", price: 950, status: "Normal" },
  { sku: "SKU-1007", name: "Sensor de temperatura PT100", category: "Sensores", stock: 5, minStock: 8, branch: "Sur", lastMovement: "9 Feb 2026", price: 2800, status: "Bajo" },
  { sku: "SKU-1008", name: "Cable electrico calibre 12", category: "Electrico", stock: 200, minStock: 50, branch: "Central", lastMovement: "8 Feb 2026", price: 45, status: "Normal" },
]

const movements = [
  { id: "MOV-001", product: "Motor electrico 5HP", type: "Entrada", quantity: 10, branch: "Central", responsible: "Luis Garcia", date: "12 Feb 2026" },
  { id: "MOV-002", product: "Filtro de aceite industrial", type: "Salida", quantity: 5, branch: "Norte", responsible: "Ana Martinez", date: "11 Feb 2026" },
  { id: "MOV-003", product: "Valvula de presion 3/4", type: "Merma", quantity: 2, branch: "Sur", responsible: "Roberto Diaz", date: "10 Feb 2026" },
  { id: "MOV-004", product: "Banda transportadora 2m", type: "Entrada", quantity: 15, branch: "Central", responsible: "Maria Lopez", date: "10 Feb 2026" },
  { id: "MOV-005", product: "Sensor de temperatura PT100", type: "Salida", quantity: 3, branch: "Sur", responsible: "Pedro Sanchez", date: "9 Feb 2026" },
]

const stockByCategory = [
  { category: "Motores", stock: 45 },
  { category: "Filtros", stock: 8 },
  { category: "Bandas", stock: 22 },
  { category: "Valvulas", stock: 3 },
  { category: "Rodamientos", stock: 120 },
  { category: "Lubricantes", stock: 35 },
]

function getStockBadge(status: string) {
  switch (status) {
    case "Normal":
      return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10 text-[10px]">{status}</Badge>
    case "Bajo":
      return <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/10 text-[10px]">{status}</Badge>
    case "Critico":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 text-[10px]">{status}</Badge>
    default:
      return <Badge variant="outline" className="text-[10px]">{status}</Badge>
  }
}

function getMovementBadge(type: string) {
  switch (type) {
    case "Entrada":
      return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10 text-[10px]"><ArrowUpRight className="h-2.5 w-2.5 mr-1" />{type}</Badge>
    case "Salida":
      return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[10px]"><ArrowDownRight className="h-2.5 w-2.5 mr-1" />{type}</Badge>
    case "Merma":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 text-[10px]"><TrendingDown className="h-2.5 w-2.5 mr-1" />{type}</Badge>
    default:
      return <Badge variant="outline" className="text-[10px]">{type}</Badge>
  }
}

export function InventarioModule() {
  const [showNewDialog, setShowNewDialog] = useState(false)

  const totalProducts = products.length
  const lowStockCount = products.filter(p => p.status === "Bajo" || p.status === "Critico").length
  const totalUnits = products.reduce((acc, p) => acc + p.stock, 0)
  const totalValue = products.reduce((acc, p) => acc + (p.stock * p.price), 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Productos</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <p className="text-xs text-muted-foreground">Stock Bajo</p>
            </div>
            <p className="text-2xl font-bold text-warning mt-1">{lowStockCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Unidades</p>
            <p className="text-2xl font-bold text-foreground mt-1">{totalUnits.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Valor Total</p>
            <p className="text-2xl font-bold text-foreground mt-1">${totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="productos" className="w-full">
        <TabsList>
          <TabsTrigger value="productos" className="text-xs">Productos</TabsTrigger>
          <TabsTrigger value="movimientos" className="text-xs">Movimientos</TabsTrigger>
          <TabsTrigger value="analisis" className="text-xs">Analisis</TabsTrigger>
        </TabsList>

        <TabsContent value="productos" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-sm font-semibold">Catalogo de Productos</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Download className="mr-1.5 h-3 w-3" />
                    Exportar
                  </Button>
                  <Button size="sm" className="h-8 text-xs" onClick={() => setShowNewDialog(true)}>
                    <Plus className="mr-1.5 h-3 w-3" />
                    Nuevo Producto
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar por SKU, nombre o categoria..." className="h-8 pl-8 text-xs" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-32 text-xs">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
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
                    <TableHead className="text-xs">Producto</TableHead>
                    <TableHead className="text-xs">Categoria</TableHead>
                    <TableHead className="text-xs text-center">Stock</TableHead>
                    <TableHead className="text-xs">Estado</TableHead>
                    <TableHead className="text-xs">Sucursal</TableHead>
                    <TableHead className="text-xs text-right">Precio Unit.</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.sku}>
                      <TableCell className="text-xs font-mono font-medium text-primary">{product.sku}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{product.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{product.category}</TableCell>
                      <TableCell className="text-xs text-center font-medium">{product.stock}</TableCell>
                      <TableCell>{getStockBadge(product.status)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{product.branch}</TableCell>
                      <TableCell className="text-xs text-right">${product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="mr-2 h-3.5 w-3.5" />Ver Detalle</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="mr-2 h-3.5 w-3.5" />Editar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" />Eliminar</DropdownMenuItem>
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
              <CardTitle className="text-sm font-semibold">Historial de Movimientos</CardTitle>
              <CardDescription className="text-xs">Registro de entradas, salidas y mermas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">ID</TableHead>
                    <TableHead className="text-xs">Producto</TableHead>
                    <TableHead className="text-xs">Tipo</TableHead>
                    <TableHead className="text-xs text-center">Cantidad</TableHead>
                    <TableHead className="text-xs">Sucursal</TableHead>
                    <TableHead className="text-xs">Responsable</TableHead>
                    <TableHead className="text-xs text-right">Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movements.map((mov) => (
                    <TableRow key={mov.id}>
                      <TableCell className="text-xs font-mono font-medium">{mov.id}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{mov.product}</TableCell>
                      <TableCell>{getMovementBadge(mov.type)}</TableCell>
                      <TableCell className="text-xs text-center font-medium">{mov.quantity}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{mov.branch}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{mov.responsible}</TableCell>
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
              <CardDescription className="text-xs">Distribucion de unidades en inventario</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 18%, 89%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="stock" fill="hsl(213, 72%, 42%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Product Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Nuevo Producto</DialogTitle>
            <DialogDescription className="text-xs">Agrega un nuevo producto al inventario.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">SKU</Label>
                <Input placeholder="SKU-XXXX" className="text-xs h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Categoria</Label>
                <Select>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motores">Motores</SelectItem>
                    <SelectItem value="filtros">Filtros</SelectItem>
                    <SelectItem value="bandas">Bandas</SelectItem>
                    <SelectItem value="valvulas">Valvulas</SelectItem>
                    <SelectItem value="rodamientos">Rodamientos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Nombre del Producto</Label>
              <Input placeholder="Nombre descriptivo" className="text-xs h-9" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Stock Inicial</Label>
                <Input type="number" placeholder="0" className="text-xs h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Stock Minimo</Label>
                <Input type="number" placeholder="0" className="text-xs h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Precio Unit.</Label>
                <Input type="number" placeholder="$0.00" className="text-xs h-9" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Sucursal</Label>
              <Select defaultValue="central">
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="norte">Norte</SelectItem>
                  <SelectItem value="sur">Sur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Cancelar</Button>
            <Button size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Agregar Producto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
