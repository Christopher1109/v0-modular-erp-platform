"use client"

import { useState } from "react"
import {
  Search, Download, MoreHorizontal, Eye, Edit, Car, AlertTriangle, Clock, Plus,
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const vehicles = [
  { vin: "1HGCG5655WA044896", brand: "Toyota", model: "Camry", year: 2025, color: "Blanco Perla", type: "Nuevo", branch: "Agencia Centro", cost: 420000, price: 485000, daysInStock: 18, status: "Disponible" },
  { vin: "3CZRZ1H36PM700123", brand: "Honda", model: "CR-V", year: 2024, color: "Gris Acero", type: "Seminuevo", branch: "Patio Seminuevos", cost: 380000, price: 445000, daysInStock: 72, status: "Detenido" },
  { vin: "JM1BN2F78R0100456", brand: "Mazda", model: "3 Sedan", year: 2025, color: "Rojo Cristal", type: "Nuevo", branch: "Agencia Centro", cost: 380000, price: 435000, daysInStock: 25, status: "Disponible" },
  { vin: "5N1AT3CA5PC700789", brand: "Nissan", model: "X-Trail", year: 2025, color: "Negro Obsidiana", type: "Nuevo", branch: "Agencia Norte", cost: 510000, price: 589000, daysInStock: 12, status: "Disponible" },
  { vin: "1G1YY22G465109012", brand: "Chevrolet", model: "Equinox", year: 2024, color: "Plata Brillante", type: "Seminuevo", brand2: "Chevrolet", branch: "Patio Seminuevos", cost: 320000, price: 385000, daysInStock: 85, status: "Detenido" },
  { vin: "JTDBR32E760035345", brand: "Toyota", model: "Corolla Cross", year: 2025, color: "Blanco Perla", type: "Nuevo", branch: "Agencia Centro", cost: 445000, price: 515000, daysInStock: 8, status: "Disponible" },
  { vin: "1FMCU9J97RUB06678", brand: "Ford", model: "Escape", year: 2024, color: "Azul Metalico", type: "Seminuevo", branch: "Agencia Norte", cost: 350000, price: 415000, daysInStock: 45, status: "Reservado" },
  { vin: "5YFEPRAE1LP023901", brand: "Toyota", model: "RAV4", year: 2025, color: "Gris Titanio", type: "Nuevo", branch: "Agencia Centro", cost: 520000, price: 598000, daysInStock: 5, status: "Disponible" },
  { vin: "KNAGN4A78G5100234", brand: "Kia", model: "Sportage", year: 2025, color: "Blanco Nieve", type: "Nuevo", branch: "Agencia Norte", cost: 460000, price: 530000, daysInStock: 32, status: "Disponible" },
  { vin: "2HGFE2F55NH500567", brand: "Honda", model: "Civic", year: 2024, color: "Negro", type: "Seminuevo", branch: "Patio Seminuevos", cost: 290000, price: 345000, daysInStock: 58, status: "Disponible" },
]

const stockByBranch = [
  { branch: "Agencia Centro", nuevos: 4, seminuevos: 0 },
  { branch: "Agencia Norte", nuevos: 2, seminuevos: 1 },
  { branch: "Patio Seminuevos", nuevos: 0, seminuevos: 3 },
]

function getVehicleStatus(status: string) {
  const map: Record<string, string> = {
    "Disponible": "bg-success/10 text-success border-success/20 hover:bg-success/10",
    "Reservado": "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10",
    "Detenido": "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10",
  }
  return <Badge className={`${map[status] || ""} text-[10px]`}>{status}</Badge>
}

export function VehiculosModule() {
  const [showNewDialog, setShowNewDialog] = useState(false)

  const totalVehicles = vehicles.length
  const nuevos = vehicles.filter(v => v.type === "Nuevo").length
  const seminuevos = vehicles.filter(v => v.type === "Seminuevo").length
  const detenidos = vehicles.filter(v => v.status === "Detenido").length
  const totalValue = vehicles.reduce((acc, v) => acc + v.price, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Total Stock</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{totalVehicles}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Nuevos</p>
            <p className="text-2xl font-bold text-primary mt-1">{nuevos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Seminuevos</p>
            <p className="text-2xl font-bold text-foreground mt-1">{seminuevos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <p className="text-xs text-muted-foreground">Detenidos +60d</p>
            </div>
            <p className="text-2xl font-bold text-destructive mt-1">{detenidos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Valor en Piso</p>
            <p className="text-xl font-bold text-foreground mt-1">${(totalValue / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Stock por Sucursal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stockByBranch} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis type="category" dataKey="branch" tick={{ fontSize: 10 }} stroke="hsl(215, 14%, 46%)" width={100} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "11px" }} />
                <Bar dataKey="nuevos" fill="hsl(213, 72%, 42%)" radius={[0, 2, 2, 0]} stackId="a" name="Nuevos" />
                <Bar dataKey="seminuevos" fill="hsl(38, 92%, 50%)" radius={[0, 2, 2, 0]} stackId="a" name="Seminuevos" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-primary" /><span className="text-[10px] text-muted-foreground">Nuevos</span></div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-warning" /><span className="text-[10px] text-muted-foreground">Seminuevos</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-sm font-semibold">Inventario de Vehiculos</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs"><Download className="mr-1.5 h-3 w-3" />Exportar</Button>
                <Button size="sm" className="h-8 text-xs" onClick={() => setShowNewDialog(true)}><Plus className="mr-1.5 h-3 w-3" />Registrar Vehiculo</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar por VIN, marca, modelo..." className="h-8 pl-8 text-xs" />
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="h-8 w-32 text-xs"><SelectValue placeholder="Tipo" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="nuevo">Nuevos</SelectItem>
                    <SelectItem value="seminuevo">Seminuevos</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-branch">
                  <SelectTrigger className="h-8 w-40 text-xs"><SelectValue placeholder="Sucursal" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-branch">Todas</SelectItem>
                    <SelectItem value="centro">Agencia Centro</SelectItem>
                    <SelectItem value="norte">Agencia Norte</SelectItem>
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
                  <TableHead className="text-xs">Vehiculo</TableHead>
                  <TableHead className="text-xs">Tipo</TableHead>
                  <TableHead className="text-xs">Sucursal</TableHead>
                  <TableHead className="text-xs">Estado</TableHead>
                  <TableHead className="text-xs text-center">
                    <div className="flex items-center gap-1 justify-center"><Clock className="h-3 w-3" />Dias</div>
                  </TableHead>
                  <TableHead className="text-xs text-right">Costo</TableHead>
                  <TableHead className="text-xs text-right">Precio</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((v) => (
                  <TableRow key={v.vin}>
                    <TableCell>
                      <div>
                        <p className="text-xs font-medium text-foreground">{v.brand} {v.model} {v.year}</p>
                        <p className="text-[10px] text-muted-foreground">{v.color} - {v.vin.slice(-6)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${v.type === "Nuevo" ? "border-primary/30 text-primary" : "border-warning/30 text-warning"}`}>{v.type}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{v.branch}</TableCell>
                    <TableCell>{getVehicleStatus(v.status)}</TableCell>
                    <TableCell className="text-xs text-center">
                      <span className={`font-medium ${v.daysInStock > 60 ? "text-destructive" : v.daysInStock > 30 ? "text-warning" : "text-foreground"}`}>
                        {v.daysInStock}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-right text-muted-foreground">${v.cost.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-right font-medium">${v.price.toLocaleString()}</TableCell>
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
      </div>

      {/* New Vehicle Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Registrar Vehiculo</DialogTitle>
            <DialogDescription className="text-xs">Agrega un vehiculo nuevo o seminuevo al inventario.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">VIN</Label>
              <Input placeholder="Numero de identificacion vehicular" className="text-xs h-9" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Marca</Label><Input placeholder="Toyota" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Modelo</Label><Input placeholder="Camry" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Ano</Label><Input type="number" placeholder="2025" className="text-xs h-9" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Color</Label><Input placeholder="Blanco Perla" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Tipo</Label>
                <Select defaultValue="nuevo"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="nuevo">Nuevo</SelectItem><SelectItem value="seminuevo">Seminuevo</SelectItem></SelectContent></Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Costo</Label><Input type="number" placeholder="$0" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5"><Label className="text-xs">Precio</Label><Input type="number" placeholder="$0" className="text-xs h-9" /></div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Sucursal</Label>
                <Select defaultValue="centro"><SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="centro">Agencia Centro</SelectItem><SelectItem value="norte">Agencia Norte</SelectItem><SelectItem value="patio">Patio Seminuevos</SelectItem></SelectContent></Select>
              </div>
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
