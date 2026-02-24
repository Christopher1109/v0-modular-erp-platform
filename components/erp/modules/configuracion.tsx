"use client"

import { Building2, Bell, Users, Shield, Key, Settings2, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const branches = [
  { name: "Oficina Central", type: "Corporativo", address: "Av. Reforma #1200, Col. Centro, CDMX", phone: "+52 55 1234 5678", status: "Activa", users: 12 },
  { name: "Sucursal Norte", type: "Operativa", address: "Blvd. Industrial #800, Monterrey, NL", phone: "+52 81 2345 6789", status: "Activa", users: 8 },
  { name: "Sucursal Occidente", type: "Operativa", address: "Av. Americas #450, Guadalajara, JAL", phone: "+52 33 3456 7890", status: "Activa", users: 6 },
  { name: "Almacen Central", type: "Almacen", address: "Parque Industrial Lerma, Edo. Mex.", phone: "+52 55 4567 8901", status: "Activa", users: 4 },
]

const users = [
  { name: "Carlos Martinez", email: "carlos@empresa.com", role: "Administrador", branch: "Todas", status: "Activo", initials: "CM" },
  { name: "Ana Lopez", email: "ana@empresa.com", role: "Gerente de Ventas", branch: "Oficina Central", status: "Activo", initials: "AL" },
  { name: "Roberto Sanchez", email: "roberto@empresa.com", role: "Jefe de Almacen", branch: "Almacen Central", status: "Activo", initials: "RS" },
  { name: "Maria Gonzalez", email: "maria@empresa.com", role: "Contadora", branch: "Oficina Central", status: "Activo", initials: "MG" },
  { name: "Luis Hernandez", email: "luis@empresa.com", role: "Vendedor", branch: "Sucursal Norte", status: "Activo", initials: "LH" },
  { name: "Patricia Ruiz", email: "patricia@empresa.com", role: "RRHH", branch: "Oficina Central", status: "Inactivo", initials: "PR" },
]

const roles = [
  { name: "Administrador", users: 1, permissions: "Acceso total a todos los modulos y configuracion", color: "bg-destructive/10 text-destructive" },
  { name: "Gerente de Ventas", users: 1, permissions: "Ventas, CRM, reportes comerciales y comisiones", color: "bg-primary/10 text-primary" },
  { name: "Jefe de Almacen", users: 1, permissions: "Inventario completo, compras y recepciones", color: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" },
  { name: "Contadora", users: 1, permissions: "Finanzas, reportes financieros, cierres mensuales", color: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" },
  { name: "Vendedor", users: 1, permissions: "Ventas y CRM (solo su cartera de clientes)", color: "bg-primary/10 text-primary" },
  { name: "RRHH", users: 1, permissions: "Recursos Humanos, directorio de empleados, nomina", color: "bg-primary/10 text-primary" },
]

const erpModules = [
  { name: "Dashboard", desc: "Panel ejecutivo con KPIs" },
  { name: "Inventario", desc: "Control de stock multi-almacen" },
  { name: "Finanzas", desc: "Flujo de caja y contabilidad" },
  { name: "Compras", desc: "Ordenes de compra y proveedores" },
  { name: "Ventas", desc: "Pipeline comercial y cotizaciones" },
  { name: "CRM", desc: "Gestion de clientes y leads" },
  { name: "Recursos Humanos", desc: "Directorio y nomina" },
  { name: "Proyectos", desc: "Tableros kanban y cronogramas" },
  { name: "Marketing", desc: "Campanas y metricas" },
  { name: "Reportes", desc: "Dashboards y analisis avanzado" },
]

export function ConfiguracionModule() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="empresa" className="w-full">
        <TabsList>
          <TabsTrigger value="empresa" className="text-xs">Empresa</TabsTrigger>
          <TabsTrigger value="sucursales" className="text-xs">Sucursales</TabsTrigger>
          <TabsTrigger value="usuarios" className="text-xs">Usuarios</TabsTrigger>
          <TabsTrigger value="roles" className="text-xs">Roles</TabsTrigger>
          <TabsTrigger value="modulos" className="text-xs">Modulos</TabsTrigger>
          <TabsTrigger value="notificaciones" className="text-xs">Alertas</TabsTrigger>
        </TabsList>

        {/* Empresa */}
        <TabsContent value="empresa" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2"><Globe className="h-4 w-4 text-primary" />Datos de la Empresa</CardTitle>
              <CardDescription className="text-xs">Informacion general de tu organizacion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex flex-col gap-1.5"><Label className="text-xs">Razon Social</Label><Input defaultValue="NexusERP Solutions S.A. de C.V." className="text-xs h-9" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">RFC / ID Fiscal</Label><Input defaultValue="NES210401XYZ" className="text-xs h-9" /></div>
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Industria</Label><Select defaultValue="tecnologia"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tecnologia">Tecnologia</SelectItem><SelectItem value="manufactura">Manufactura</SelectItem><SelectItem value="retail">Retail</SelectItem><SelectItem value="servicios">Servicios</SelectItem></SelectContent></Select></div>
                </div>
                <div className="flex flex-col gap-1.5"><Label className="text-xs">Direccion Fiscal</Label><Input defaultValue="Av. Reforma #1200, Col. Centro, CDMX, CP 06600" className="text-xs h-9" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Telefono</Label><Input defaultValue="+52 55 1234 5678" className="text-xs h-9" /></div>
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Email</Label><Input defaultValue="admin@nexuserp.com" className="text-xs h-9" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Zona Horaria</Label><Select defaultValue="cdmx"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="cdmx">America/Mexico_City (GMT-6)</SelectItem><SelectItem value="monterrey">America/Monterrey (GMT-6)</SelectItem><SelectItem value="tijuana">America/Tijuana (GMT-8)</SelectItem></SelectContent></Select></div>
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Moneda</Label><Select defaultValue="mxn"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="mxn">MXN - Peso Mexicano</SelectItem><SelectItem value="usd">USD - Dolar</SelectItem></SelectContent></Select></div>
                </div>
                <div className="pt-2"><Button size="sm" className="text-xs">Guardar Cambios</Button></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sucursales */}
        <TabsContent value="sucursales" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div><CardTitle className="text-sm font-semibold">Sucursales y Almacenes</CardTitle><CardDescription className="text-xs">Administra las ubicaciones de la organizacion</CardDescription></div>
                <Button size="sm" className="h-8 text-xs"><Building2 className="mr-1.5 h-3 w-3" />Nueva Sucursal</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {branches.map((branch) => (
                  <div key={branch.name} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2"><p className="text-xs font-semibold text-foreground">{branch.name}</p><Badge variant="outline" className="text-[9px]">{branch.type}</Badge></div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{branch.address}</p>
                        <p className="text-[10px] text-muted-foreground">{branch.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20 hover:bg-[hsl(var(--success))]/10 text-[10px]">{branch.status}</Badge>
                        <p className="text-[10px] text-muted-foreground mt-1">{branch.users} usuarios</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuarios */}
        <TabsContent value="usuarios" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Directorio de Usuarios</CardTitle>
                <Button size="sm" className="h-8 text-xs"><Users className="mr-1.5 h-3 w-3" />Nuevo Usuario</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead className="text-xs">Usuario</TableHead><TableHead className="text-xs">Rol</TableHead><TableHead className="text-xs">Sucursal</TableHead><TableHead className="text-xs">Estado</TableHead></TableRow></TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">{user.initials}</AvatarFallback></Avatar>
                          <div><p className="text-xs font-medium text-foreground">{user.name}</p><p className="text-[10px] text-muted-foreground">{user.email}</p></div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{user.role}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{user.branch}</TableCell>
                      <TableCell><Badge className={`text-[10px] ${user.status === "Activo" ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/10" : "bg-muted text-muted-foreground hover:bg-muted"}`}>{user.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles */}
        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Shield className="h-4 w-4 text-primary" /></div>
                    <div><p className="text-sm font-semibold text-foreground">{role.name}</p><p className="text-xs text-muted-foreground">{role.users} usuario{role.users !== 1 ? "s" : ""}</p></div>
                  </div>
                  <Separator className="my-3" />
                  <p className="text-xs text-muted-foreground">{role.permissions}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Modulos */}
        <TabsContent value="modulos" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Settings2 className="h-4 w-4 text-primary" />Modulos del Sistema</CardTitle><CardDescription className="text-xs">Activa o desactiva los modulos disponibles</CardDescription></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                {erpModules.map((mod) => (
                  <div key={mod.name} className="flex items-center justify-between p-3 rounded-lg border">
                    <div><p className="text-xs font-semibold text-foreground">{mod.name}</p><p className="text-[10px] text-muted-foreground">{mod.desc}</p></div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificaciones */}
        <TabsContent value="notificaciones" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bell className="h-4 w-4 text-primary" />Alertas Automaticas</CardTitle><CardDescription className="text-xs">Configura las notificaciones del sistema</CardDescription></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Stock bajo</p><p className="text-[10px] text-muted-foreground">Alerta cuando un producto alcanza el minimo de reorden</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Facturas vencidas</p><p className="text-[10px] text-muted-foreground">Notificacion de cuentas por cobrar vencidas</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Ordenes de compra pendientes</p><p className="text-[10px] text-muted-foreground">Alerta de ordenes sin confirmar por mas de 48h</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Cierre de ventas</p><p className="text-[10px] text-muted-foreground">Notificacion al confirmar una venta</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Reportes semanales automaticos</p><p className="text-[10px] text-muted-foreground">Envio de resumen semanal por email</p></div><Switch /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Alertas criticas por email</p><p className="text-[10px] text-muted-foreground">Recibir alertas criticas del sistema por correo</p></div><Switch defaultChecked /></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
