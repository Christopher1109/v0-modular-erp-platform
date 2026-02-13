"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const transactions = [
  { id: "TRX-001", description: "Venta de servicios febrero", type: "Ingreso", category: "Ventas", amount: 45000, branch: "Central", responsible: "Carlos Admin", date: "12 Feb 2026", operation: "OP-2024-0146" },
  { id: "TRX-002", description: "Pago de nomina quincenal", type: "Egreso", category: "Nomina", amount: 68000, branch: "Central", responsible: "Carlos Admin", date: "11 Feb 2026", operation: null },
  { id: "TRX-003", description: "Compra de insumos almacen", type: "Egreso", category: "Insumos", amount: 12500, branch: "Norte", responsible: "Ana Martinez", date: "11 Feb 2026", operation: "OP-2024-0145" },
  { id: "TRX-004", description: "Venta de productos mayoreo", type: "Ingreso", category: "Ventas", amount: 89000, branch: "Norte", responsible: "Luis Garcia", date: "10 Feb 2026", operation: "OP-2024-0146" },
  { id: "TRX-005", description: "Mantenimiento de equipos", type: "Egreso", category: "Mantenimiento", amount: 7800, branch: "Sur", responsible: "Roberto Diaz", date: "10 Feb 2026", operation: "OP-2024-0147" },
  { id: "TRX-006", description: "Merma detectada en producto", type: "Egreso", category: "Merma", amount: 3200, branch: "Sur", responsible: "Pedro Sanchez", date: "9 Feb 2026", operation: null },
  { id: "TRX-007", description: "Venta de refacciones", type: "Ingreso", category: "Ventas", amount: 23500, branch: "Central", responsible: "Sofia Reyes", date: "9 Feb 2026", operation: null },
  { id: "TRX-008", description: "Renta de local sucursal Sur", type: "Egreso", category: "Renta", amount: 15000, branch: "Sur", responsible: "Carlos Admin", date: "8 Feb 2026", operation: null },
]

const monthlyData = [
  { month: "Ene", ingresos: 186000, egresos: 142000, utilidad: 44000 },
  { month: "Feb", ingresos: 205000, egresos: 158000, utilidad: 47000 },
  { month: "Mar", ingresos: 237000, egresos: 171000, utilidad: 66000 },
  { month: "Abr", ingresos: 198000, egresos: 165000, utilidad: 33000 },
  { month: "May", ingresos: 264000, egresos: 179000, utilidad: 85000 },
  { month: "Jun", ingresos: 284500, egresos: 192000, utilidad: 92500 },
]

const expensesByCategory = [
  { category: "Nomina", amount: 68000 },
  { category: "Insumos", amount: 12500 },
  { category: "Mantenimiento", amount: 7800 },
  { category: "Renta", amount: 15000 },
  { category: "Merma", amount: 3200 },
]

export function FinanzasModule() {
  const [showNewDialog, setShowNewDialog] = useState(false)

  const totalIngresos = transactions.filter(t => t.type === "Ingreso").reduce((acc, t) => acc + t.amount, 0)
  const totalEgresos = transactions.filter(t => t.type === "Egreso").reduce((acc, t) => acc + t.amount, 0)
  const balance = totalIngresos - totalEgresos
  const mermas = transactions.filter(t => t.category === "Merma").reduce((acc, t) => acc + t.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-success" />
              <p className="text-xs text-muted-foreground">Ingresos</p>
            </div>
            <p className="text-2xl font-bold text-success mt-1">${totalIngresos.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowDownRight className="h-4 w-4 text-destructive" />
              <p className="text-xs text-muted-foreground">Egresos</p>
            </div>
            <p className="text-2xl font-bold text-destructive mt-1">${totalEgresos.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Balance</p>
            </div>
            <p className={`text-2xl font-bold mt-1 ${balance >= 0 ? "text-success" : "text-destructive"}`}>${balance.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-warning" />
              <p className="text-xs text-muted-foreground">Mermas</p>
            </div>
            <p className="text-2xl font-bold text-warning mt-1">${mermas.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transacciones" className="w-full">
        <TabsList>
          <TabsTrigger value="transacciones" className="text-xs">Transacciones</TabsTrigger>
          <TabsTrigger value="analisis" className="text-xs">Analisis</TabsTrigger>
        </TabsList>

        <TabsContent value="transacciones" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-sm font-semibold">Registro de Transacciones</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Download className="mr-1.5 h-3 w-3" />
                    Exportar
                  </Button>
                  <Button size="sm" className="h-8 text-xs" onClick={() => setShowNewDialog(true)}>
                    <Plus className="mr-1.5 h-3 w-3" />
                    Nueva Transaccion
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar por ID, descripcion..." className="h-8 pl-8 text-xs" />
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-28 text-xs">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="ingreso">Ingresos</SelectItem>
                      <SelectItem value="egreso">Egresos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-36 text-xs">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="nomina">Nomina</SelectItem>
                      <SelectItem value="insumos">Insumos</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="merma">Merma</SelectItem>
                      <SelectItem value="renta">Renta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">ID</TableHead>
                    <TableHead className="text-xs">Descripcion</TableHead>
                    <TableHead className="text-xs">Tipo</TableHead>
                    <TableHead className="text-xs">Categoria</TableHead>
                    <TableHead className="text-xs text-right">Monto</TableHead>
                    <TableHead className="text-xs">Sucursal</TableHead>
                    <TableHead className="text-xs">Operacion</TableHead>
                    <TableHead className="text-xs text-right">Fecha</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((trx) => (
                    <TableRow key={trx.id}>
                      <TableCell className="text-xs font-mono font-medium">{trx.id}</TableCell>
                      <TableCell className="text-xs font-medium text-foreground">{trx.description}</TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] ${trx.type === "Ingreso" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10"}`}>
                          {trx.type === "Ingreso" ? <ArrowUpRight className="h-2.5 w-2.5 mr-1" /> : <ArrowDownRight className="h-2.5 w-2.5 mr-1" />}
                          {trx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{trx.category}</TableCell>
                      <TableCell className={`text-xs text-right font-medium ${trx.type === "Ingreso" ? "text-success" : "text-destructive"}`}>
                        {trx.type === "Ingreso" ? "+" : "-"}${trx.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{trx.branch}</TableCell>
                      <TableCell className="text-xs">
                        {trx.operation ? (
                          <span className="font-mono text-primary">{trx.operation}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground text-right">{trx.date}</TableCell>
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

        <TabsContent value="analisis" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Tendencia Mensual</CardTitle>
                <CardDescription className="text-xs">Ingresos, egresos y utilidad</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={monthlyData}>
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
                    <Line type="monotone" dataKey="ingresos" stroke="hsl(162, 63%, 41%)" strokeWidth={2} name="Ingresos" dot={false} />
                    <Line type="monotone" dataKey="egresos" stroke="hsl(0, 72%, 51%)" strokeWidth={2} name="Egresos" dot={false} />
                    <Line type="monotone" dataKey="utilidad" stroke="hsl(213, 72%, 42%)" strokeWidth={2} name="Utilidad" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Egresos por Categoria</CardTitle>
                <CardDescription className="text-xs">Distribucion del gasto</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={expensesByCategory} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                    <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <YAxis type="category" dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(214, 18%, 89%)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Monto"]}
                    />
                    <Bar dataKey="amount" fill="hsl(0, 72%, 51%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Transaction Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Nueva Transaccion</DialogTitle>
            <DialogDescription className="text-xs">Registra un ingreso o egreso.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Tipo</Label>
                <Select defaultValue="ingreso">
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ingreso">Ingreso</SelectItem>
                    <SelectItem value="egreso">Egreso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Categoria</Label>
                <Select>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="nomina">Nomina</SelectItem>
                    <SelectItem value="insumos">Insumos</SelectItem>
                    <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    <SelectItem value="merma">Merma</SelectItem>
                    <SelectItem value="renta">Renta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Descripcion</Label>
              <Input placeholder="Descripcion de la transaccion" className="text-xs h-9" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Monto</Label>
                <Input type="number" placeholder="$0.00" className="text-xs h-9" />
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
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Operacion Relacionada (opcional)</Label>
              <Select>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Sin operacion relacionada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin operacion</SelectItem>
                  <SelectItem value="op147">OP-2024-0147</SelectItem>
                  <SelectItem value="op146">OP-2024-0146</SelectItem>
                  <SelectItem value="op145">OP-2024-0145</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Notas</Label>
              <Textarea placeholder="Notas adicionales..." className="text-xs min-h-[60px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Cancelar</Button>
            <Button size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Registrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
