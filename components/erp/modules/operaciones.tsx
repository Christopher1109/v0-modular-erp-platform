"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Clock,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

const operations = [
  {
    id: "OP-2024-0147",
    title: "Servicio de mantenimiento preventivo",
    status: "En Progreso",
    priority: "Alta",
    responsible: "Ana Martinez",
    branch: "Central",
    created: "12 Feb 2026",
    updated: "12 Feb 2026",
    comments: 3,
  },
  {
    id: "OP-2024-0146",
    title: "Entrega de pedido mayorista #4521",
    status: "Completado",
    priority: "Media",
    responsible: "Luis Garcia",
    branch: "Norte",
    created: "11 Feb 2026",
    updated: "12 Feb 2026",
    comments: 5,
  },
  {
    id: "OP-2024-0145",
    title: "Inventario fisico sucursal Norte",
    status: "Pendiente",
    priority: "Alta",
    responsible: "Maria Lopez",
    branch: "Norte",
    created: "11 Feb 2026",
    updated: "11 Feb 2026",
    comments: 1,
  },
  {
    id: "OP-2024-0144",
    title: "Revision de calidad lote #892",
    status: "En Progreso",
    priority: "Critica",
    responsible: "Roberto Diaz",
    branch: "Central",
    created: "10 Feb 2026",
    updated: "11 Feb 2026",
    comments: 8,
  },
  {
    id: "OP-2024-0143",
    title: "Actualizacion de precios Q1 2026",
    status: "Completado",
    priority: "Baja",
    responsible: "Carlos Admin",
    branch: "Central",
    created: "10 Feb 2026",
    updated: "10 Feb 2026",
    comments: 2,
  },
  {
    id: "OP-2024-0142",
    title: "Capacitacion personal nuevo ingreso",
    status: "En Progreso",
    priority: "Media",
    responsible: "Sofia Reyes",
    branch: "Sur",
    created: "9 Feb 2026",
    updated: "11 Feb 2026",
    comments: 4,
  },
  {
    id: "OP-2024-0141",
    title: "Instalacion de equipo refrigeracion",
    status: "Pendiente",
    priority: "Alta",
    responsible: "Pedro Sanchez",
    branch: "Sur",
    created: "9 Feb 2026",
    updated: "9 Feb 2026",
    comments: 0,
  },
  {
    id: "OP-2024-0140",
    title: "Auditoria interna mensual",
    status: "Cancelado",
    priority: "Media",
    responsible: "Ana Martinez",
    branch: "Central",
    created: "8 Feb 2026",
    updated: "9 Feb 2026",
    comments: 6,
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Completado":
      return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10 text-[10px]">{status}</Badge>
    case "En Progreso":
      return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[10px]">{status}</Badge>
    case "Pendiente":
      return <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/10 text-[10px]">{status}</Badge>
    case "Cancelado":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 text-[10px]">{status}</Badge>
    default:
      return <Badge variant="outline" className="text-[10px]">{status}</Badge>
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "Critica":
      return <Badge variant="outline" className="text-[10px] border-destructive/30 text-destructive">{priority}</Badge>
    case "Alta":
      return <Badge variant="outline" className="text-[10px] border-warning/30 text-warning">{priority}</Badge>
    case "Media":
      return <Badge variant="outline" className="text-[10px]">{priority}</Badge>
    case "Baja":
      return <Badge variant="outline" className="text-[10px] text-muted-foreground">{priority}</Badge>
    default:
      return <Badge variant="outline" className="text-[10px]">{priority}</Badge>
  }
}

export function OperacionesModule() {
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedOp, setSelectedOp] = useState<typeof operations[0] | null>(null)

  const statusCounts = {
    total: operations.length,
    progreso: operations.filter(o => o.status === "En Progreso").length,
    pendiente: operations.filter(o => o.status === "Pendiente").length,
    completado: operations.filter(o => o.status === "Completado").length,
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">{statusCounts.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">En Progreso</p>
            <p className="text-2xl font-bold text-primary">{statusCounts.progreso}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pendientes</p>
            <p className="text-2xl font-bold text-warning">{statusCounts.pendiente}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Completadas</p>
            <p className="text-2xl font-bold text-success">{statusCounts.completado}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-sm font-semibold">Registro de Operaciones</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Download className="mr-1.5 h-3 w-3" />
                Exportar
              </Button>
              <Button size="sm" className="h-8 text-xs" onClick={() => setShowNewDialog(true)}>
                <Plus className="mr-1.5 h-3 w-3" />
                Nueva Operacion
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por ID, titulo o responsable..." className="h-8 pl-8 text-xs" />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-32 text-xs">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="progreso">En Progreso</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-32 text-xs">
                  <SelectValue placeholder="Sucursal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="norte">Norte</SelectItem>
                  <SelectItem value="sur">Sur</SelectItem>
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
                <TableHead className="text-xs">Operacion</TableHead>
                <TableHead className="text-xs">Estado</TableHead>
                <TableHead className="text-xs">Prioridad</TableHead>
                <TableHead className="text-xs">Responsable</TableHead>
                <TableHead className="text-xs">Sucursal</TableHead>
                <TableHead className="text-xs text-right">Actualizado</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operations.map((op) => (
                <TableRow key={op.id} className="cursor-pointer" onClick={() => { setSelectedOp(op); setShowDetailDialog(true) }}>
                  <TableCell className="text-xs font-mono font-medium text-primary">{op.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-xs font-medium text-foreground">{op.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                          <MessageSquare className="h-2.5 w-2.5" />
                          {op.comments}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(op.status)}</TableCell>
                  <TableCell>{getPriorityBadge(op.priority)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{op.responsible}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{op.branch}</TableCell>
                  <TableCell className="text-xs text-muted-foreground text-right">{op.updated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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

      {/* New Operation Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Nueva Operacion</DialogTitle>
            <DialogDescription className="text-xs">Registra una nueva operacion en el sistema.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Titulo</Label>
              <Input placeholder="Descripcion breve de la operacion" className="text-xs h-9" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Prioridad</Label>
                <Select defaultValue="media">
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critica">Critica</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
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
              <Label className="text-xs">Responsable</Label>
              <Select>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Seleccionar responsable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ana">Ana Martinez</SelectItem>
                  <SelectItem value="luis">Luis Garcia</SelectItem>
                  <SelectItem value="maria">Maria Lopez</SelectItem>
                  <SelectItem value="roberto">Roberto Diaz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Comentarios</Label>
              <Textarea placeholder="Detalles adicionales..." className="text-xs min-h-[80px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>
              Cancelar
            </Button>
            <Button size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>
              Crear Operacion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <span className="font-mono text-primary text-sm">{selectedOp?.id}</span>
            </DialogTitle>
            <DialogDescription className="text-xs">{selectedOp?.title}</DialogDescription>
          </DialogHeader>
          {selectedOp && (
            <Tabs defaultValue="detalle" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="detalle" className="flex-1 text-xs">Detalle</TabsTrigger>
                <TabsTrigger value="historial" className="flex-1 text-xs">Historial</TabsTrigger>
              </TabsList>
              <TabsContent value="detalle" className="mt-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Estado</span>
                    {getStatusBadge(selectedOp.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Prioridad</span>
                    {getPriorityBadge(selectedOp.priority)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Responsable</span>
                    <span className="text-xs font-medium flex items-center gap-1.5"><User className="h-3 w-3" />{selectedOp.responsible}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Sucursal</span>
                    <span className="text-xs font-medium">{selectedOp.branch}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Creado</span>
                    <span className="text-xs flex items-center gap-1.5"><Calendar className="h-3 w-3" />{selectedOp.created}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Actualizado</span>
                    <span className="text-xs flex items-center gap-1.5"><Clock className="h-3 w-3" />{selectedOp.updated}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="historial" className="mt-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Estado cambiado a &quot;{selectedOp.status}&quot;</p>
                      <p className="text-muted-foreground text-[10px]">{selectedOp.updated} - {selectedOp.responsible}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Operacion creada</p>
                      <p className="text-muted-foreground text-[10px]">{selectedOp.created} - Carlos Admin</p>
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
