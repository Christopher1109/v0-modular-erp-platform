"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Shield,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Building2,
  Clock,
  Key,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Separator } from "@/components/ui/separator"

const users = [
  { id: "USR-001", name: "Carlos Admin", email: "carlos@empresa.com", role: "Super Administrador", branch: "Central", status: "Activo", lastLogin: "12 Feb 2026 09:30", initials: "CA" },
  { id: "USR-002", name: "Ana Martinez", email: "ana@empresa.com", role: "Administrador", branch: "Central", status: "Activo", lastLogin: "12 Feb 2026 08:15", initials: "AM" },
  { id: "USR-003", name: "Luis Garcia", email: "luis@empresa.com", role: "Operativo", branch: "Norte", status: "Activo", lastLogin: "11 Feb 2026 17:45", initials: "LG" },
  { id: "USR-004", name: "Maria Lopez", email: "maria@empresa.com", role: "Operativo", branch: "Norte", status: "Activo", lastLogin: "12 Feb 2026 10:00", initials: "ML" },
  { id: "USR-005", name: "Roberto Diaz", email: "roberto@empresa.com", role: "Operativo", branch: "Central", status: "Activo", lastLogin: "11 Feb 2026 14:30", initials: "RD" },
  { id: "USR-006", name: "Sofia Reyes", email: "sofia@empresa.com", role: "Operativo", branch: "Sur", status: "Activo", lastLogin: "12 Feb 2026 07:50", initials: "SR" },
  { id: "USR-007", name: "Pedro Sanchez", email: "pedro@empresa.com", role: "Operativo", branch: "Sur", status: "Inactivo", lastLogin: "5 Feb 2026 16:20", initials: "PS" },
  { id: "USR-008", name: "Laura Torres", email: "laura@empresa.com", role: "Solo Lectura", branch: "Central", status: "Activo", lastLogin: "10 Feb 2026 11:00", initials: "LT" },
]

const roles = [
  { name: "Super Administrador", users: 1, permissions: "Acceso total al sistema", color: "bg-destructive/10 text-destructive border-destructive/20" },
  { name: "Administrador", users: 1, permissions: "Gestion de modulos, usuarios y reportes", color: "bg-primary/10 text-primary border-primary/20" },
  { name: "Operativo", users: 4, permissions: "Registro y seguimiento de operaciones", color: "bg-success/10 text-success border-success/20" },
  { name: "Solo Lectura", users: 1, permissions: "Visualizacion de datos sin edicion", color: "bg-muted text-muted-foreground border-border" },
]

const auditLog = [
  { action: "Inicio de sesion", user: "Carlos Admin", date: "12 Feb 2026 09:30", ip: "192.168.1.10", module: "Sistema" },
  { action: "Creo operacion OP-2024-0147", user: "Ana Martinez", date: "12 Feb 2026 08:45", ip: "192.168.1.15", module: "Operaciones" },
  { action: "Edito producto SKU-1001", user: "Luis Garcia", date: "11 Feb 2026 17:30", ip: "192.168.2.5", module: "Inventario" },
  { action: "Registro transaccion TRX-001", user: "Carlos Admin", date: "11 Feb 2026 16:00", ip: "192.168.1.10", module: "Finanzas" },
  { action: "Exporto reporte mensual", user: "Ana Martinez", date: "11 Feb 2026 15:00", ip: "192.168.1.15", module: "Reportes" },
  { action: "Cambio contrasena", user: "Maria Lopez", date: "11 Feb 2026 10:20", ip: "192.168.2.8", module: "Sistema" },
  { action: "Desactivo usuario USR-007", user: "Carlos Admin", date: "10 Feb 2026 14:00", ip: "192.168.1.10", module: "Usuarios" },
  { action: "Creo producto SKU-1008", user: "Roberto Diaz", date: "10 Feb 2026 11:30", ip: "192.168.1.22", module: "Inventario" },
]

function getRoleBadge(role: string) {
  switch (role) {
    case "Super Administrador":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 text-[10px]">{role}</Badge>
    case "Administrador":
      return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[10px]">{role}</Badge>
    case "Operativo":
      return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10 text-[10px]">{role}</Badge>
    case "Solo Lectura":
      return <Badge variant="outline" className="text-[10px]">{role}</Badge>
    default:
      return <Badge variant="outline" className="text-[10px]">{role}</Badge>
  }
}

export function UsuariosModule() {
  const [showNewDialog, setShowNewDialog] = useState(false)

  const activeUsers = users.filter(u => u.status === "Activo").length
  const inactiveUsers = users.filter(u => u.status === "Inactivo").length

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-success" />
              <p className="text-xs text-muted-foreground">Activos</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{activeUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserX className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Inactivos</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{inactiveUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Roles</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{roles.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Sucursales</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">3</p>
          </CardContent>
        </Card>
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
                <Button size="sm" className="h-8 text-xs" onClick={() => setShowNewDialog(true)}>
                  <Plus className="mr-1.5 h-3 w-3" />
                  Nuevo Usuario
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar por nombre o email..." className="h-8 pl-8 text-xs" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-36 text-xs">
                    <SelectValue placeholder="Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los roles</SelectItem>
                    <SelectItem value="super">Super Admin</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="operativo">Operativo</SelectItem>
                    <SelectItem value="lectura">Solo Lectura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Usuario</TableHead>
                    <TableHead className="text-xs">Rol</TableHead>
                    <TableHead className="text-xs">Sucursal</TableHead>
                    <TableHead className="text-xs">Estado</TableHead>
                    <TableHead className="text-xs text-right">Ultimo Acceso</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-medium text-foreground">{user.name}</p>
                            <p className="text-[10px] text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{user.branch}</TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] ${user.status === "Activo" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-muted text-muted-foreground hover:bg-muted"}`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground text-right">{user.lastLogin}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="mr-2 h-3.5 w-3.5" />Ver Perfil</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="mr-2 h-3.5 w-3.5" />Editar</DropdownMenuItem>
                            <DropdownMenuItem><Key className="mr-2 h-3.5 w-3.5" />Resetear Contrasena</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" />Desactivar</DropdownMenuItem>
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

        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{role.name}</p>
                        <p className="text-xs text-muted-foreground">{role.users} usuario{role.users !== 1 ? "s" : ""}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Separator className="my-3" />
                  <p className="text-xs text-muted-foreground">{role.permissions}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {role.name === "Super Administrador" && (
                      <>
                        <Badge variant="outline" className="text-[9px]">Todos los modulos</Badge>
                        <Badge variant="outline" className="text-[9px]">Gestion de usuarios</Badge>
                        <Badge variant="outline" className="text-[9px]">Configuracion</Badge>
                      </>
                    )}
                    {role.name === "Administrador" && (
                      <>
                        <Badge variant="outline" className="text-[9px]">Operaciones</Badge>
                        <Badge variant="outline" className="text-[9px]">Inventario</Badge>
                        <Badge variant="outline" className="text-[9px]">Finanzas</Badge>
                        <Badge variant="outline" className="text-[9px]">Reportes</Badge>
                        <Badge variant="outline" className="text-[9px]">Usuarios</Badge>
                      </>
                    )}
                    {role.name === "Operativo" && (
                      <>
                        <Badge variant="outline" className="text-[9px]">Operaciones</Badge>
                        <Badge variant="outline" className="text-[9px]">Inventario</Badge>
                        <Badge variant="outline" className="text-[9px]">Solo su sucursal</Badge>
                      </>
                    )}
                    {role.name === "Solo Lectura" && (
                      <>
                        <Badge variant="outline" className="text-[9px]">Dashboard</Badge>
                        <Badge variant="outline" className="text-[9px]">Reportes</Badge>
                        <Badge variant="outline" className="text-[9px]">Sin edicion</Badge>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="auditoria" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Registro de Auditoria</CardTitle>
              <CardDescription className="text-xs">Historial completo de acciones del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Accion</TableHead>
                    <TableHead className="text-xs">Usuario</TableHead>
                    <TableHead className="text-xs">Modulo</TableHead>
                    <TableHead className="text-xs">IP</TableHead>
                    <TableHead className="text-xs text-right">Fecha y Hora</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLog.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs font-medium text-foreground">{log.action}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{log.module}</Badge>
                      </TableCell>
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

      {/* New User Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Nuevo Usuario</DialogTitle>
            <DialogDescription className="text-xs">Agrega un usuario al sistema.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Nombre</Label>
                <Input placeholder="Nombre completo" className="text-xs h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Email</Label>
                <Input type="email" placeholder="email@empresa.com" className="text-xs h-9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Rol</Label>
                <Select>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="operativo">Operativo</SelectItem>
                    <SelectItem value="lectura">Solo Lectura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Sucursal</Label>
                <Select>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Seleccionar" />
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
              <Label className="text-xs">Contrasena Temporal</Label>
              <Input type="password" placeholder="Contrasena inicial" className="text-xs h-9" />
              <p className="text-[10px] text-muted-foreground">El usuario debera cambiarla en su primer inicio de sesion.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Cancelar</Button>
            <Button size="sm" className="text-xs" onClick={() => setShowNewDialog(false)}>Crear Usuario</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
