"use client"

import { useState } from "react"
import {
  Plus, Search, MoreHorizontal, Shield, Eye, Edit, Trash2, UserCheck, UserX, Building2, Key,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const users = [
  { id: "USR-001", name: "Ricardo Garza", email: "ricardo@autogestion.com", role: "Gerente General", branch: "Todas", status: "Activo", lastLogin: "13 Feb 2026 08:30", initials: "RG" },
  { id: "USR-002", name: "Miguel Torres", email: "miguel@autogestion.com", role: "Asesor de Ventas", branch: "Agencia Centro", status: "Activo", lastLogin: "13 Feb 2026 09:00", initials: "MT" },
  { id: "USR-003", name: "Javier Rios", email: "javier@autogestion.com", role: "Jefe de Taller", branch: "Agencia Norte", status: "Activo", lastLogin: "13 Feb 2026 07:45", initials: "JR" },
  { id: "USR-004", name: "Laura Medina", email: "laura@autogestion.com", role: "Asesor de Ventas", branch: "Patio Seminuevos", status: "Activo", lastLogin: "12 Feb 2026 17:30", initials: "LM" },
  { id: "USR-005", name: "Pedro Zuniga", email: "pedro@autogestion.com", role: "Tecnico Taller", branch: "Taller Industrial", status: "Activo", lastLogin: "13 Feb 2026 07:00", initials: "PZ" },
  { id: "USR-006", name: "Ana Fuentes", email: "ana@autogestion.com", role: "Almacen / Compras", branch: "Taller Industrial", status: "Activo", lastLogin: "12 Feb 2026 16:00", initials: "AF" },
  { id: "USR-007", name: "Sandra Leal", email: "sandra@autogestion.com", role: "Administracion", branch: "Agencia Centro", status: "Activo", lastLogin: "13 Feb 2026 08:15", initials: "SL" },
  { id: "USR-008", name: "Eduardo Cantu", email: "eduardo@autogestion.com", role: "Tecnico Taller", branch: "Agencia Norte", status: "Inactivo", lastLogin: "5 Feb 2026 14:00", initials: "EC" },
]

const roles = [
  { name: "Gerente General", users: 1, permissions: "Acceso total a todos los modulos y sucursales", color: "bg-destructive/10 text-destructive border-destructive/20" },
  { name: "Asesor de Ventas", users: 2, permissions: "Ordenes de venta, inventario vehiculos (solo su sucursal)", color: "bg-primary/10 text-primary border-primary/20" },
  { name: "Jefe de Taller", users: 1, permissions: "Ordenes de servicio, inventario refacciones, reportes de taller", color: "bg-success/10 text-success border-success/20" },
  { name: "Tecnico Taller", users: 2, permissions: "Ver ordenes de servicio asignadas, registrar avances", color: "bg-success/10 text-success border-success/20" },
  { name: "Almacen / Compras", users: 1, permissions: "Inventario completo, pedidos de abastecimiento", color: "bg-warning/10 text-warning border-warning/20" },
  { name: "Administracion", users: 1, permissions: "Finanzas, reportes, usuarios (sin acceso a operaciones)", color: "bg-primary/10 text-primary border-primary/20" },
]

const auditLog = [
  { action: "Cerro orden OV-2026-0089 (Venta Toyota Camry)", user: "Miguel Torres", date: "13 Feb 2026 11:45", ip: "192.168.1.15", module: "Operaciones" },
  { action: "Registro cobro $485,000 - OV-2026-0089", user: "Sistema", date: "13 Feb 2026 11:45", ip: "Auto", module: "Finanzas" },
  { action: "Consumo refacciones: OS-2026-0234 (3 items)", user: "Sistema", date: "13 Feb 2026 10:30", ip: "Auto", module: "Inventario" },
  { action: "Creo orden OS-2026-0232 (Diagnostico Ford Explorer)", user: "Pedro Zuniga", date: "13 Feb 2026 09:15", ip: "192.168.2.22", module: "Operaciones" },
  { action: "Inicio de sesion", user: "Ricardo Garza", date: "13 Feb 2026 08:30", ip: "192.168.1.10", module: "Sistema" },
  { action: "Registro merma: 2 bujias NGK Iridium", user: "Javier Rios", date: "11 Feb 2026 15:00", ip: "192.168.2.5", module: "Inventario" },
  { action: "Cancelo orden OS-2026-0230", user: "Javier Rios", date: "11 Feb 2026 10:00", ip: "192.168.2.5", module: "Operaciones" },
  { action: "Creo pedido PA-2026-0045 (Filtros + aceite)", user: "Ana Fuentes", date: "12 Feb 2026 17:30", ip: "192.168.3.8", module: "Operaciones" },
  { action: "Exporto reporte de ventas semanal", user: "Sandra Leal", date: "12 Feb 2026 14:00", ip: "192.168.1.20", module: "Reportes" },
  { action: "Desactivo usuario USR-008 (Eduardo Cantu)", user: "Ricardo Garza", date: "10 Feb 2026 14:00", ip: "192.168.1.10", module: "Usuarios" },
]

function getRoleBadge(role: string) {
  const map: Record<string, string> = {
    "Gerente General": "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10",
    "Asesor de Ventas": "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10",
    "Jefe de Taller": "bg-success/10 text-success border-success/20 hover:bg-success/10",
    "Tecnico Taller": "bg-success/10 text-success border-success/20 hover:bg-success/10",
    "Almacen / Compras": "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10",
    "Administracion": "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10",
  }
  return <Badge className={`${map[role] || ""} text-[10px]`}>{role}</Badge>
}

export function UsuariosModule() {
  const [showNewDialog, setShowNewDialog] = useState(false)
  const activeUsers = users.filter(u => u.status === "Activo").length
  const inactiveUsers = users.filter(u => u.status === "Inactivo").length

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-success" /><p className="text-xs text-muted-foreground">Activos</p></div><p className="text-2xl font-bold text-foreground mt-1">{activeUsers}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><UserX className="h-4 w-4 text-muted-foreground" /><p className="text-xs text-muted-foreground">Inactivos</p></div><p className="text-2xl font-bold text-foreground mt-1">{inactiveUsers}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /><p className="text-xs text-muted-foreground">Roles</p></div><p className="text-2xl font-bold text-foreground mt-1">{roles.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /><p className="text-xs text-muted-foreground">Sucursales</p></div><p className="text-2xl font-bold text-foreground mt-1">4</p></CardContent></Card>
      </div>

      <Tabs defaultValue="usuarios" className="w-full">
        <TabsList>
          <TabsTrigger value="usuarios" className="text-xs">Usuarios</TabsTrigger>
          <TabsTrigger value="roles" className="text-xs">Roles y Permisos</TabsTrigger>
          <TabsTrigger value="auditoria" className="text-xs">Auditoria</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-sm font-semibold">Directorio de Usuarios</CardTitle>
                <Button size="sm" className="h-8 text-xs" onClick={() => setShowNewDialog(true)}><Plus className="mr-1.5 h-3 w-3" />Nuevo Usuario</Button>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
                <div className="relative flex-1"><Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Buscar por nombre o email..." className="h-8 pl-8 text-xs" /></div>
                <Select defaultValue="all"><SelectTrigger className="h-8 w-40 text-xs"><SelectValue placeholder="Rol" /></SelectTrigger><SelectContent><SelectItem value="all">Todos los roles</SelectItem><SelectItem value="gerente">Gerente General</SelectItem><SelectItem value="ventas">Asesor de Ventas</SelectItem><SelectItem value="jefe-taller">Jefe de Taller</SelectItem><SelectItem value="tecnico">Tecnico Taller</SelectItem><SelectItem value="almacen">Almacen / Compras</SelectItem><SelectItem value="admin">Administracion</SelectItem></SelectContent></Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead className="text-xs">Usuario</TableHead><TableHead className="text-xs">Rol</TableHead><TableHead className="text-xs">Sucursal</TableHead><TableHead className="text-xs">Estado</TableHead><TableHead className="text-xs text-right">Ultimo Acceso</TableHead><TableHead className="w-10"></TableHead></TableRow></TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell><div className="flex items-center gap-2.5"><Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">{user.initials}</AvatarFallback></Avatar><div><p className="text-xs font-medium text-foreground">{user.name}</p><p className="text-[10px] text-muted-foreground">{user.email}</p></div></div></TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{user.branch}</TableCell>
                      <TableCell><Badge className={`text-[10px] ${user.status === "Activo" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-muted text-muted-foreground hover:bg-muted"}`}>{user.status}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground text-right">{user.lastLogin}</TableCell>
                      <TableCell>
                        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Eye className="mr-2 h-3.5 w-3.5" />Ver Perfil</DropdownMenuItem><DropdownMenuItem><Edit className="mr-2 h-3.5 w-3.5" />Editar</DropdownMenuItem><DropdownMenuItem><Key className="mr-2 h-3.5 w-3.5" />Resetear Contrasena</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" />Desactivar</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Shield className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-semibold text-foreground">{role.name}</p><p className="text-xs text-muted-foreground">{role.users} usuario{role.users !== 1 ? "s" : ""}</p></div></div>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                  </div>
                  <Separator className="my-3" />
                  <p className="text-xs text-muted-foreground">{role.permissions}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="auditoria" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Registro de Auditoria</CardTitle>
              <CardDescription className="text-xs">Historial completo de acciones del sistema - generado automaticamente</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead className="text-xs">Accion</TableHead><TableHead className="text-xs">Usuario</TableHead><TableHead className="text-xs">Modulo</TableHead><TableHead className="text-xs">IP</TableHead><TableHead className="text-xs text-right">Fecha y Hora</TableHead></TableRow></TableHeader>
                <TableBody>
                  {auditLog.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs font-medium text-foreground">{log.action}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{log.user}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{log.module}</Badge></TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{log.ip}</TableCell>
                      <TableCell className="text-xs text-muted-foreground text-right">{log.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle className="text-base">Nuevo Usuario</DialogTitle><DialogDescription className="text-xs">Agrega un usuario al sistema de la concesionaria.</DialogDescription></DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Nombre</Label><Input placeholder="Nombre completo" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Email</Label><Input type="email" placeholder="email@autogestion.com" className="text-xs h-9" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Rol</Label><Select><SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Seleccionar" /></SelectTrigger><SelectContent><SelectItem value="ventas">Asesor de Ventas</SelectItem><SelectItem value="jefe-taller">Jefe de Taller</SelectItem><SelectItem value="tecnico">Tecnico Taller</SelectItem><SelectItem value="almacen">Almacen / Compras</SelectItem><SelectItem value="admin">Administracion</SelectItem></SelectContent></Select></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Sucursal</Label><Select><SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Seleccionar" /></SelectTrigger><SelectContent><SelectItem value="centro">Agencia Centro</SelectItem><SelectItem value="norte">Agencia Norte</SelectItem><SelectItem value="taller">Taller Industrial</SelectItem><SelectItem value="patio">Patio Seminuevos</SelectItem></SelectContent></Select></div>
            </div>
            <div className="flex flex-col gap-1.5"><Label className="text-xs">Contrasena Temporal</Label><Input type="password" placeholder="Contrasena inicial" className="text-xs h-9" /><p className="text-[10px] text-muted-foreground">El usuario debera cambiarla en su primer inicio de sesion.</p></div>
          </div>
          <DialogFooter><Button variant="outline" size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Cancelar</Button><Button size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Crear Usuario</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
