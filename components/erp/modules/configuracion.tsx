"use client"

import { Building2, Bell, Car, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const branches = [
  { name: "Agencia Centro", type: "Agencia", address: "Av. Constitucion #1500, Col. Centro, Monterrey", phone: "+52 81 1234 5678", status: "Activa", users: 3 },
  { name: "Agencia Norte", type: "Agencia", address: "Blvd. Rogelio Cantu #800, Zona Norte, San Pedro", phone: "+52 81 2345 6789", status: "Activa", users: 2 },
  { name: "Taller Industrial", type: "Taller", address: "Calle Industrial #250, Parque Industrial, Apodaca", phone: "+52 81 3456 7890", status: "Activa", users: 2 },
  { name: "Patio Seminuevos", type: "Patio", address: "Av. Universidad #300, Col. Cumbres, Monterrey", phone: "+52 81 4567 8901", status: "Activa", users: 1 },
]

export function ConfiguracionModule() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="empresa" className="w-full">
        <TabsList>
          <TabsTrigger value="empresa" className="text-xs">Concesionaria</TabsTrigger>
          <TabsTrigger value="sucursales" className="text-xs">Sucursales</TabsTrigger>
          <TabsTrigger value="modulos" className="text-xs">Modulos</TabsTrigger>
          <TabsTrigger value="notificaciones" className="text-xs">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2"><Car className="h-4 w-4 text-primary" />Informacion de la Concesionaria</CardTitle>
              <CardDescription className="text-xs">Datos generales del grupo automotriz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex flex-col gap-1.5"><Label className="text-xs">Nombre del Grupo</Label><Input defaultValue="AutoGestion Motors S.A. de C.V." className="text-xs h-9" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">RFC</Label><Input defaultValue="AGM210401XYZ" className="text-xs h-9" /></div>
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Giro</Label><Select defaultValue="automotriz"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="automotriz">Concesionaria Automotriz</SelectItem></SelectContent></Select></div>
                </div>
                <div className="flex flex-col gap-1.5"><Label className="text-xs">Direccion Fiscal</Label><Input defaultValue="Av. Constitucion #1500, Col. Centro, Monterrey, NL, CP 64000" className="text-xs h-9" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Telefono</Label><Input defaultValue="+52 81 1234 5678" className="text-xs h-9" /></div>
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Email</Label><Input defaultValue="admin@autogestion.com" className="text-xs h-9" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Zona Horaria</Label><Select defaultValue="monterrey"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="monterrey">America/Monterrey (GMT-6)</SelectItem><SelectItem value="cdmx">America/Mexico_City (GMT-6)</SelectItem></SelectContent></Select></div>
                  <div className="flex flex-col gap-1.5"><Label className="text-xs">Moneda</Label><Select defaultValue="mxn"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="mxn">MXN - Peso Mexicano</SelectItem><SelectItem value="usd">USD - Dolar</SelectItem></SelectContent></Select></div>
                </div>
                <div className="pt-2"><Button size="sm" className="text-xs">Guardar Cambios</Button></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sucursales" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div><CardTitle className="text-sm font-semibold">Agencias, Talleres y Patios</CardTitle><CardDescription className="text-xs">Administra las ubicaciones del grupo automotriz</CardDescription></div>
                <Button size="sm" className="h-8 text-xs"><Building2 className="mr-1.5 h-3 w-3" />Nueva Sucursal</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {branches.map((branch) => (
                  <div key={branch.name} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        {branch.type === "Taller" ? <Wrench className="h-5 w-5 text-primary" /> : branch.type === "Patio" ? <Car className="h-5 w-5 text-primary" /> : <Building2 className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2"><p className="text-xs font-semibold text-foreground">{branch.name}</p><Badge variant="outline" className="text-[9px]">{branch.type}</Badge></div>
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
            <CardHeader><CardTitle className="text-sm font-semibold">Modulos del Sistema</CardTitle><CardDescription className="text-xs">Activa o desactiva modulos de la concesionaria</CardDescription></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Ordenes (Ventas + Servicios + Pedidos)</p><p className="text-[10px] text-muted-foreground">Modulo principal de operaciones</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Inventario de Vehiculos</p><p className="text-[10px] text-muted-foreground">Control de stock de vehiculos nuevos y seminuevos</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Refacciones y Almacen</p><p className="text-[10px] text-muted-foreground">Inventario de partes con consumo automatico</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Finanzas</p><p className="text-[10px] text-muted-foreground">Ingresos, costos y margenes por operacion</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Reportes y KPIs</p><p className="text-[10px] text-muted-foreground">Indicadores de desempeno por sucursal</p></div><Switch defaultChecked /></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bell className="h-4 w-4 text-primary" />Alertas Automaticas</CardTitle><CardDescription className="text-xs">Configura las alertas del sistema para la concesionaria</CardDescription></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Stock bajo de refacciones</p><p className="text-[10px] text-muted-foreground">Alerta cuando una pieza alcanza el minimo</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Vehiculo detenido +60 dias</p><p className="text-[10px] text-muted-foreground">Alerta de vehiculos sin movimiento en piso</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Mermas detectadas</p><p className="text-[10px] text-muted-foreground">Notificacion inmediata de ajustes por merma</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Orden cerrada / cobro confirmado</p><p className="text-[10px] text-muted-foreground">Notificacion al cerrar ventas o servicios</p></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Reportes automaticos semanales</p><p className="text-[10px] text-muted-foreground">Envio de resumen semanal por email</p></div><Switch /></div>
                <div className="flex items-center justify-between p-3 rounded-lg border"><div><p className="text-xs font-semibold text-foreground">Alertas por email</p><p className="text-[10px] text-muted-foreground">Recibir alertas criticas por correo</p></div><Switch defaultChecked /></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
