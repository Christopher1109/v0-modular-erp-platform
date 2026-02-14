"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Car,
  Wrench,
  ShoppingCart,
  Clock,
  User,
  Calendar,
  DollarSign,
  Building2,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const orders = [
  { id: "OV-2026-0089", type: "Venta Vehiculo", title: "Toyota Camry 2025 - Blanco Perla", client: "Ing. Roberto Salinas", status: "Cerrada", branch: "Agencia Centro", responsible: "Miguel Torres", cost: 420000, price: 485000, margin: 15.5, created: "10 Feb 2026", updated: "13 Feb 2026", paymentStatus: "Cobrado" },
  { id: "OV-2026-0088", type: "Venta Vehiculo", title: "Mazda CX-5 2025 Signature - Rojo Cristal", client: "Lic. Fernando Garza", status: "Cerrada", branch: "Agencia Centro", responsible: "Miguel Torres", cost: 548000, price: 628000, margin: 14.6, created: "8 Feb 2026", updated: "12 Feb 2026", paymentStatus: "Cobrado" },
  { id: "OV-2026-0087", type: "Venta Vehiculo", title: "Honda CR-V 2024 Seminuevo - Gris Acero", client: "Sra. Patricia Leal", status: "En Proceso", branch: "Patio Seminuevos", responsible: "Laura Medina", cost: 380000, price: 445000, margin: 17.1, created: "7 Feb 2026", updated: "13 Feb 2026", paymentStatus: "Pendiente" },
  { id: "OS-2026-0234", type: "Servicio Taller", title: "Servicio mayor 40,000 km - Honda Civic 2023", client: "Maria Elena Torres", status: "En Proceso", branch: "Agencia Norte", responsible: "Javier Rios", cost: 3200, price: 8500, margin: 62.4, created: "12 Feb 2026", updated: "13 Feb 2026", paymentStatus: "Pendiente" },
  { id: "OS-2026-0233", type: "Servicio Taller", title: "Cambio de frenos + balatas - Nissan Sentra 2022", client: "Carlos Mendoza R.", status: "En Proceso", branch: "Taller Industrial", responsible: "Pedro Zuniga", cost: 1800, price: 4200, margin: 57.1, created: "12 Feb 2026", updated: "13 Feb 2026", paymentStatus: "Pendiente" },
  { id: "OS-2026-0232", type: "Servicio Taller", title: "Diagnostico electrico + scanner - Ford Explorer 2021", client: "Jorge Villarreal", status: "Creada", branch: "Taller Industrial", responsible: "Pedro Zuniga", cost: 0, price: 2800, margin: 0, created: "13 Feb 2026", updated: "13 Feb 2026", paymentStatus: "Pendiente" },
  { id: "PA-2026-0045", type: "Pedido Inventario", title: "Lote filtros + aceite sintetico 5W-30", client: "Proveedor: AutoParts MX", status: "Creada", branch: "Taller Industrial", responsible: "Ana Fuentes", cost: 32400, price: 0, margin: 0, created: "12 Feb 2026", updated: "12 Feb 2026", paymentStatus: "Pendiente" },
  { id: "PA-2026-0044", type: "Pedido Inventario", title: "Balatas ceramicas Brembo - Kit x20", client: "Proveedor: Brembo MX", status: "En Proceso", branch: "Agencia Norte", responsible: "Ana Fuentes", cost: 28000, price: 0, margin: 0, created: "10 Feb 2026", updated: "13 Feb 2026", paymentStatus: "Pendiente" },
  { id: "OS-2026-0231", type: "Servicio Taller", title: "Alineacion y balanceo - Toyota RAV4 2024", client: "Daniela Herrera", status: "Cerrada", branch: "Agencia Centro", responsible: "Javier Rios", cost: 400, price: 1200, margin: 66.7, created: "11 Feb 2026", updated: "12 Feb 2026", paymentStatus: "Cobrado" },
  { id: "OS-2026-0230", type: "Servicio Taller", title: "Cambio de aceite + revision 20 puntos", client: "Alberto Cantu", status: "Cancelada", branch: "Agencia Norte", responsible: "Javier Rios", cost: 0, price: 1500, margin: 0, created: "10 Feb 2026", updated: "11 Feb 2026", paymentStatus: "N/A" },
]

function getStatusBadge(status: string) {
  const map: Record<string, string> = {
    "Cerrada": "bg-success/10 text-success border-success/20 hover:bg-success/10",
    "En Proceso": "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10",
    "Creada": "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10",
    "Cancelada": "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10",
  }
  return <Badge className={`${map[status] || ""} text-[10px]`}>{status}</Badge>
}

function getTypeBadge(type: string) {
  if (type === "Venta Vehiculo") return <Badge variant="outline" className="text-[10px] border-primary/30 text-primary"><Car className="h-2.5 w-2.5 mr-1" />Venta</Badge>
  if (type === "Servicio Taller") return <Badge variant="outline" className="text-[10px] border-success/30 text-success"><Wrench className="h-2.5 w-2.5 mr-1" />Servicio</Badge>
  return <Badge variant="outline" className="text-[10px] border-warning/30 text-warning"><ShoppingCart className="h-2.5 w-2.5 mr-1" />Pedido</Badge>
}

export function OrdenesModule() {
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)
  const [filterType, setFilterType] = useState("all")

  const filtered = filterType === "all" ? orders : orders.filter(o => {
    if (filterType === "venta") return o.type === "Venta Vehiculo"
    if (filterType === "servicio") return o.type === "Servicio Taller"
    if (filterType === "pedido") return o.type === "Pedido Inventario"
    return true
  })

  const counts = {
    total: orders.length,
    ventas: orders.filter(o => o.type === "Venta Vehiculo").length,
    servicios: orders.filter(o => o.type === "Servicio Taller").length,
    pedidos: orders.filter(o => o.type === "Pedido Inventario").length,
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Order Type Counters */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className={`cursor-pointer transition-colors ${filterType === "all" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`} onClick={() => setFilterType("all")}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Todas las Ordenes</p>
            <p className="text-2xl font-bold text-foreground">{counts.total}</p>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-colors ${filterType === "venta" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`} onClick={() => setFilterType("venta")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Ventas Vehiculos</p>
            </div>
            <p className="text-2xl font-bold text-primary">{counts.ventas}</p>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-colors ${filterType === "servicio" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`} onClick={() => setFilterType("servicio")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-success" />
              <p className="text-xs text-muted-foreground">Servicios Taller</p>
            </div>
            <p className="text-2xl font-bold text-success">{counts.servicios}</p>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-colors ${filterType === "pedido" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`} onClick={() => setFilterType("pedido")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-warning" />
              <p className="text-xs text-muted-foreground">Pedidos Inventario</p>
            </div>
            <p className="text-2xl font-bold text-warning">{counts.pedidos}</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-sm font-semibold">Registro de Ordenes</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Download className="mr-1.5 h-3 w-3" />
                Exportar
              </Button>
              <Button size="sm" className="h-8 text-xs" onClick={() => setShowNewDialog(true)}>
                <Plus className="mr-1.5 h-3 w-3" />
                Nueva Orden
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por ID, vehiculo, cliente..." className="h-8 pl-8 text-xs" />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all-status">
                <SelectTrigger className="h-8 w-32 text-xs"><SelectValue placeholder="Estado" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">Todos</SelectItem>
                  <SelectItem value="creada">Creada</SelectItem>
                  <SelectItem value="proceso">En Proceso</SelectItem>
                  <SelectItem value="cerrada">Cerrada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-branch">
                <SelectTrigger className="h-8 w-40 text-xs"><SelectValue placeholder="Sucursal" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-branch">Todas</SelectItem>
                  <SelectItem value="centro">Agencia Centro</SelectItem>
                  <SelectItem value="norte">Agencia Norte</SelectItem>
                  <SelectItem value="taller">Taller Industrial</SelectItem>
                  <SelectItem value="patio">Patio Seminuevos</SelectItem>
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
                <TableHead className="text-xs">Tipo</TableHead>
                <TableHead className="text-xs">Descripcion</TableHead>
                <TableHead className="text-xs">Estado</TableHead>
                <TableHead className="text-xs">Sucursal</TableHead>
                <TableHead className="text-xs text-right">Precio</TableHead>
                <TableHead className="text-xs text-right">Margen</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id} className="cursor-pointer" onClick={() => { setSelectedOrder(order); setShowDetailDialog(true) }}>
                  <TableCell className="text-xs font-mono font-medium text-primary">{order.id}</TableCell>
                  <TableCell>{getTypeBadge(order.type)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-xs font-medium text-foreground">{order.title}</p>
                      <p className="text-[10px] text-muted-foreground">{order.client}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{order.branch}</TableCell>
                  <TableCell className="text-xs text-right font-medium">{order.price > 0 ? `$${order.price.toLocaleString()}` : "-"}</TableCell>
                  <TableCell className="text-xs text-right">
                    {order.margin > 0 ? (
                      <span className={`font-medium ${order.margin >= 15 ? "text-success" : order.margin >= 10 ? "text-foreground" : "text-warning"}`}>
                        {order.margin}%
                      </span>
                    ) : <span className="text-muted-foreground">-</span>}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setSelectedOrder(order); setShowDetailDialog(true) }}><Eye className="mr-2 h-3.5 w-3.5" />Ver Detalle</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="mr-2 h-3.5 w-3.5" />Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><ArrowRight className="mr-2 h-3.5 w-3.5" />Avanzar Estado</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Order Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Nueva Orden</DialogTitle>
            <DialogDescription className="text-xs">Crea una orden de venta, servicio o pedido de inventario.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Tipo de Orden</Label>
              <Select defaultValue="venta">
                <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="venta">Venta de Vehiculo</SelectItem>
                  <SelectItem value="servicio">Orden de Servicio (Taller)</SelectItem>
                  <SelectItem value="pedido">Pedido de Inventario / Abastecimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Descripcion</Label>
              <Input placeholder="Ej: Toyota Camry 2025 - Blanco Perla" className="text-xs h-9" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Cliente / Proveedor</Label>
                <Input placeholder="Nombre del cliente" className="text-xs h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Sucursal</Label>
                <Select defaultValue="centro">
                  <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centro">Agencia Centro</SelectItem>
                    <SelectItem value="norte">Agencia Norte</SelectItem>
                    <SelectItem value="taller">Taller Industrial</SelectItem>
                    <SelectItem value="patio">Patio Seminuevos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Costo</Label>
                <Input type="number" placeholder="$0.00" className="text-xs h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Precio de Venta</Label>
                <Input type="number" placeholder="$0.00" className="text-xs h-9" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Responsable</Label>
              <Select>
                <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Asignar responsable" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="miguel">Miguel Torres</SelectItem>
                  <SelectItem value="javier">Javier Rios</SelectItem>
                  <SelectItem value="laura">Laura Medina</SelectItem>
                  <SelectItem value="pedro">Pedro Zuniga</SelectItem>
                  <SelectItem value="ana">Ana Fuentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Notas</Label>
              <Textarea placeholder="Detalles adicionales de la orden..." className="text-xs min-h-[60px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Cancelar</Button>
            <Button size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Crear Orden</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <span className="font-mono text-primary text-sm">{selectedOrder?.id}</span>
            </DialogTitle>
            <DialogDescription className="text-xs">{selectedOrder?.title}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <Tabs defaultValue="detalle" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="detalle" className="flex-1 text-xs">Detalle</TabsTrigger>
                <TabsTrigger value="financiero" className="flex-1 text-xs">Financiero</TabsTrigger>
                <TabsTrigger value="historial" className="flex-1 text-xs">Historial</TabsTrigger>
              </TabsList>
              <TabsContent value="detalle" className="mt-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Tipo</span>
                    {getTypeBadge(selectedOrder.type)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Estado</span>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedOrder.status)}
                      {selectedOrder.status !== "Cerrada" && selectedOrder.status !== "Cancelada" && (
                        <Button variant="outline" size="sm" className="h-6 text-[10px] px-2">
                          <ArrowRight className="h-2.5 w-2.5 mr-1" />Avanzar
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Cliente</span>
                    <span className="text-xs font-medium flex items-center gap-1.5"><User className="h-3 w-3" />{selectedOrder.client}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Responsable</span>
                    <span className="text-xs font-medium">{selectedOrder.responsible}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Sucursal</span>
                    <span className="text-xs font-medium flex items-center gap-1.5"><Building2 className="h-3 w-3" />{selectedOrder.branch}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Creada</span>
                    <span className="text-xs flex items-center gap-1.5"><Calendar className="h-3 w-3" />{selectedOrder.created}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Actualizada</span>
                    <span className="text-xs flex items-center gap-1.5"><Clock className="h-3 w-3" />{selectedOrder.updated}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="financiero" className="mt-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Costo</span>
                    <span className="text-xs font-medium">${selectedOrder.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Precio de Venta</span>
                    <span className="text-xs font-bold text-foreground">{selectedOrder.price > 0 ? `$${selectedOrder.price.toLocaleString()}` : "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-xs text-muted-foreground font-semibold">Margen</span>
                    <span className={`text-sm font-bold ${selectedOrder.margin >= 15 ? "text-success" : selectedOrder.margin >= 10 ? "text-foreground" : "text-warning"}`}>
                      {selectedOrder.margin > 0 ? `${selectedOrder.margin}% ($${(selectedOrder.price - selectedOrder.cost).toLocaleString()})` : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Estado de Cobro</span>
                    <Badge className={`text-[10px] ${selectedOrder.paymentStatus === "Cobrado" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10"}`}>
                      <DollarSign className="h-2.5 w-2.5 mr-0.5" />{selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground bg-muted/50 p-2 rounded">El ingreso se reconoce al momento del cobro. Solo las ordenes con estado &quot;Cobrado&quot; se reflejan en los ingresos financieros.</p>
                </div>
              </TabsContent>
              <TabsContent value="historial" className="mt-3">
                <div className="flex flex-col gap-3">
                  {selectedOrder.status === "Cerrada" && (
                    <div className="flex items-start gap-2.5 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-success mt-1.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Orden cerrada y cobrada</p>
                        <p className="text-muted-foreground text-[10px]">{selectedOrder.updated} - {selectedOrder.responsible}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Estado cambiado a &quot;{selectedOrder.status}&quot;</p>
                      <p className="text-muted-foreground text-[10px]">{selectedOrder.updated} - {selectedOrder.responsible}</p>
                    </div>
                  </div>
                  {selectedOrder.type === "Servicio Taller" && (
                    <div className="flex items-start gap-2.5 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Consumo de refacciones registrado automaticamente</p>
                        <p className="text-muted-foreground text-[10px]">{selectedOrder.created} - Sistema</p>
                      </div>
                    </div>
                  )}
                  {selectedOrder.type === "Venta Vehiculo" && (
                    <div className="flex items-start gap-2.5 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Vehiculo reservado - inventario actualizado</p>
                        <p className="text-muted-foreground text-[10px]">{selectedOrder.created} - Sistema</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Orden creada</p>
                      <p className="text-muted-foreground text-[10px]">{selectedOrder.created} - {selectedOrder.responsible}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
