"use client"

import {
  Car, Wrench, ShoppingCart, Package, DollarSign, AlertTriangle, User, Settings,
  CheckCircle2, XCircle, Clock, ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const activityEvents = [
  { time: "13 Feb 2026 11:45", type: "order_closed", icon: CheckCircle2, color: "text-success", title: "Orden de venta cerrada: OV-2026-0089", detail: "Toyota Camry 2025 - Blanco Perla vendido a Ing. Roberto Salinas", branch: "Agencia Centro", user: "Miguel Torres", module: "Operaciones" },
  { time: "13 Feb 2026 11:45", type: "inventory_out", icon: Car, color: "text-primary", title: "Vehiculo dado de baja del inventario", detail: "Toyota Camry 2025 (VIN: ...044896) retirado automaticamente por venta OV-2026-0089", branch: "Agencia Centro", user: "Sistema", module: "Inventario" },
  { time: "13 Feb 2026 11:45", type: "income", icon: DollarSign, color: "text-success", title: "Ingreso registrado: $485,000", detail: "Cobro confirmado por venta OV-2026-0089 - Margen: 13.4%", branch: "Agencia Centro", user: "Sistema", module: "Finanzas" },
  { time: "13 Feb 2026 10:30", type: "service_progress", icon: Wrench, color: "text-primary", title: "Orden de servicio en proceso: OS-2026-0234", detail: "Servicio mayor 40,000 km - Honda Civic 2023 ingresado a taller", branch: "Agencia Norte", user: "Javier Rios", module: "Operaciones" },
  { time: "13 Feb 2026 10:30", type: "parts_consumed", icon: ArrowDownRight, color: "text-warning", title: "Consumo de refacciones: OS-2026-0234", detail: "3x Filtro aceite 5W-30, 4L Aceite sintetico Mobil 1, 1x Filtro aire - consumo automatico", branch: "Agencia Norte", user: "Sistema", module: "Inventario" },
  { time: "13 Feb 2026 09:15", type: "order_created", icon: Clock, color: "text-warning", title: "Nueva orden de servicio: OS-2026-0232", detail: "Diagnostico electrico + scanner - Ford Explorer 2021, cliente: Jorge Villarreal", branch: "Taller Industrial", user: "Pedro Zuniga", module: "Operaciones" },
  { time: "13 Feb 2026 08:00", type: "alert", icon: AlertTriangle, color: "text-destructive", title: "Alerta: Stock critico de Filtro de aceite 5W-30", detail: "Solo 4 unidades en Taller Industrial (minimo: 10). Se recomienda generar pedido de abastecimiento.", branch: "Taller Industrial", user: "Sistema", module: "Inventario" },
  { time: "12 Feb 2026 17:30", type: "order_created", icon: ShoppingCart, color: "text-warning", title: "Pedido de inventario creado: PA-2026-0045", detail: "Lote filtros + aceite sintetico 5W-30 - Proveedor: AutoParts MX", branch: "Taller Industrial", user: "Ana Fuentes", module: "Operaciones" },
  { time: "12 Feb 2026 16:00", type: "order_closed", icon: CheckCircle2, color: "text-success", title: "Orden de venta cerrada: OV-2026-0088", detail: "Mazda CX-5 2025 Signature - Rojo Cristal vendido a Lic. Fernando Garza", branch: "Agencia Centro", user: "Miguel Torres", module: "Operaciones" },
  { time: "12 Feb 2026 16:00", type: "income", icon: DollarSign, color: "text-success", title: "Ingreso registrado: $628,000", detail: "Cobro confirmado por venta OV-2026-0088 - Margen: 12.7%", branch: "Agencia Centro", user: "Sistema", module: "Finanzas" },
  { time: "12 Feb 2026 14:20", type: "service_closed", icon: CheckCircle2, color: "text-success", title: "Orden de servicio completada: OS-2026-0231", detail: "Alineacion y balanceo - Toyota RAV4 2024. Cobro: $1,200", branch: "Agencia Centro", user: "Javier Rios", module: "Operaciones" },
  { time: "11 Feb 2026 15:00", type: "merma", icon: XCircle, color: "text-destructive", title: "Merma registrada: 2 bujias NGK Iridium", detail: "Ajuste manual por dano en recepcion. Auditado por supervisor.", branch: "Agencia Norte", user: "Javier Rios", module: "Inventario" },
  { time: "11 Feb 2026 10:00", type: "cancel", icon: XCircle, color: "text-destructive", title: "Orden de servicio cancelada: OS-2026-0230", detail: "Cambio de aceite + revision 20 puntos - Alberto Cantu. Motivo: cliente no se presento.", branch: "Agencia Norte", user: "Javier Rios", module: "Operaciones" },
  { time: "10 Feb 2026 14:00", type: "supply_progress", icon: ShoppingCart, color: "text-primary", title: "Pedido en transito: PA-2026-0044", detail: "Balatas ceramicas Brembo - Kit x20. Estimado de arribo: 14 Feb 2026.", branch: "Agencia Norte", user: "Ana Fuentes", module: "Operaciones" },
  { time: "10 Feb 2026 09:30", type: "user_action", icon: User, color: "text-muted-foreground", title: "Inicio de sesion: Ricardo Garza", detail: "Acceso desde 192.168.1.10 - Rol: Gerente General", branch: "Agencia Centro", user: "Ricardo Garza", module: "Sistema" },
]

export function ActividadModule() {
  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-40 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los modulos</SelectItem>
            <SelectItem value="operaciones">Operaciones</SelectItem>
            <SelectItem value="inventario">Inventario</SelectItem>
            <SelectItem value="finanzas">Finanzas</SelectItem>
            <SelectItem value="sistema">Sistema</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-branch">
          <SelectTrigger className="h-8 w-44 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all-branch">Todas las sucursales</SelectItem>
            <SelectItem value="centro">Agencia Centro</SelectItem>
            <SelectItem value="norte">Agencia Norte</SelectItem>
            <SelectItem value="taller">Taller Industrial</SelectItem>
            <SelectItem value="patio">Patio Seminuevos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-muted/50 border rounded-lg px-4 py-3">
        <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Registro automatico:</span> Todas las acciones del sistema se registran automaticamente. Creacion/cierre de ordenes, consumo de inventario, ajustes manuales, cierres de periodo e inicios de sesion.</p>
      </div>

      {/* Event Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Linea de Tiempo</CardTitle>
          <CardDescription className="text-xs">Eventos registrados automaticamente por el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {activityEvents.map((event, index) => (
              <div key={index} className="flex gap-4 pb-6 last:pb-0 relative">
                {/* Timeline line */}
                {index < activityEvents.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
                )}
                {/* Icon */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-card z-10 ${event.color}`}>
                  <event.icon className="h-3.5 w-3.5" />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{event.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{event.detail}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-1 sm:mt-0">
                      <Badge variant="outline" className="text-[9px] px-1.5">{event.module}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                    <span>{event.time}</span>
                    <span className="text-border">|</span>
                    <span>{event.branch}</span>
                    <span className="text-border">|</span>
                    <span>{event.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
