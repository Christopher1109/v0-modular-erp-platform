"use client"

import {
  Building2,
  Globe,
  Bell,
  Database,
  Palette,
  Lock,
  Mail,
  Server,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const branches = [
  { name: "Sucursal Central", address: "Av. Principal #100, Col. Centro", phone: "+52 555 123 4567", status: "Activa", users: 4 },
  { name: "Sucursal Norte", address: "Blvd. Industrial #250, Zona Norte", phone: "+52 555 234 5678", status: "Activa", users: 2 },
  { name: "Sucursal Sur", address: "Calle Reforma #80, Col. Sur", phone: "+52 555 345 6789", status: "Activa", users: 2 },
]

export function ConfiguracionModule() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="empresa" className="w-full">
        <TabsList>
          <TabsTrigger value="empresa" className="text-xs">Empresa</TabsTrigger>
          <TabsTrigger value="sucursales" className="text-xs">Sucursales</TabsTrigger>
          <TabsTrigger value="modulos" className="text-xs">Modulos</TabsTrigger>
          <TabsTrigger value="notificaciones" className="text-xs">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Informacion de la Empresa
              </CardTitle>
              <CardDescription className="text-xs">Configuracion general de tu organizacion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Nombre de la Empresa</Label>
                  <Input defaultValue="Empresa Demo S.A. de C.V." className="text-xs h-9" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">RFC</Label>
                    <Input defaultValue="EDE210101ABC" className="text-xs h-9" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Industria</Label>
                    <Select defaultValue="servicios">
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="servicios">Servicios</SelectItem>
                        <SelectItem value="comercio">Comercio</SelectItem>
                        <SelectItem value="salud">Salud</SelectItem>
                        <SelectItem value="automotriz">Automotriz</SelectItem>
                        <SelectItem value="alimentos">Alimentos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Direccion</Label>
                  <Input defaultValue="Av. Principal #100, Col. Centro, Ciudad, CP 12345" className="text-xs h-9" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Telefono</Label>
                    <Input defaultValue="+52 555 123 4567" className="text-xs h-9" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Email Corporativo</Label>
                    <Input defaultValue="contacto@empresa.com" className="text-xs h-9" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Zona Horaria</Label>
                    <Select defaultValue="cdmx">
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cdmx">America/Mexico_City (GMT-6)</SelectItem>
                        <SelectItem value="monterrey">America/Monterrey (GMT-6)</SelectItem>
                        <SelectItem value="tijuana">America/Tijuana (GMT-8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Moneda</Label>
                    <Select defaultValue="mxn">
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mxn">MXN - Peso Mexicano</SelectItem>
                        <SelectItem value="usd">USD - Dolar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-2">
                  <Button size="sm" className="text-xs">Guardar Cambios</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sucursales" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Gestion de Sucursales</CardTitle>
                  <CardDescription className="text-xs">Administra las localizaciones de tu empresa</CardDescription>
                </div>
                <Button size="sm" className="h-8 text-xs">
                  <Building2 className="mr-1.5 h-3 w-3" />
                  Nueva Sucursal
                </Button>
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
                        <p className="text-xs font-semibold text-foreground">{branch.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{branch.address}</p>
                        <p className="text-[10px] text-muted-foreground">{branch.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/10 text-[10px]">{branch.status}</Badge>
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

        <TabsContent value="modulos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Modulos del Sistema</CardTitle>
              <CardDescription className="text-xs">Activa o desactiva modulos segun las necesidades de tu empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Operaciones</p>
                    <p className="text-[10px] text-muted-foreground">Registro y seguimiento de procesos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Inventario / Almacen</p>
                    <p className="text-[10px] text-muted-foreground">Control de entradas, salidas y mermas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Finanzas</p>
                    <p className="text-[10px] text-muted-foreground">Registro de ingresos y egresos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Reportes y KPIs</p>
                    <p className="text-[10px] text-muted-foreground">Dashboards e indicadores clave</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Preferencias de Notificaciones
              </CardTitle>
              <CardDescription className="text-xs">Configura como recibir alertas del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Stock bajo</p>
                    <p className="text-[10px] text-muted-foreground">Alerta cuando un producto llega al minimo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Operaciones vencidas</p>
                    <p className="text-[10px] text-muted-foreground">Alerta de operaciones fuera de plazo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Mermas detectadas</p>
                    <p className="text-[10px] text-muted-foreground">Notificacion inmediata de mermas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Reportes automaticos</p>
                    <p className="text-[10px] text-muted-foreground">Envio semanal de reportes</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Notificaciones por email</p>
                    <p className="text-[10px] text-muted-foreground">Recibir alertas en el correo corporativo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
