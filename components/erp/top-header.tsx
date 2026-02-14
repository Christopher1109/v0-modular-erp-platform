"use client"

import { Search, Bell, Building2 } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TopHeaderProps {
  title: string
  description?: string
}

export function TopHeader({ title, description }: TopHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />

      <div className="flex flex-1 items-center gap-4">
        <div>
          <h1 className="text-sm font-semibold leading-none text-foreground">{title}</h1>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar ordenes, vehiculos, clientes..."
            className="h-8 w-64 pl-8 text-xs bg-background"
          />
        </div>

        <Select defaultValue="agencia-centro">
          <SelectTrigger className="h-8 w-48 text-xs hidden lg:flex">
            <Building2 className="mr-1.5 h-3.5 w-3.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agencia-centro">Agencia Centro</SelectItem>
            <SelectItem value="agencia-norte">Agencia Norte</SelectItem>
            <SelectItem value="taller-industrial">Taller Industrial</SelectItem>
            <SelectItem value="patio-seminuevos">Patio Seminuevos</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                5
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-semibold">Notificaciones</p>
            </div>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-2.5">
              <span className="text-xs font-medium">Venta cerrada: Toyota Camry 2025 - OV-2026-0089</span>
              <span className="text-[10px] text-muted-foreground">Hace 10 minutos - Agencia Centro</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-2.5">
              <span className="text-xs font-medium">Stock bajo: Filtro de aceite 5W-30 (4 unidades)</span>
              <span className="text-[10px] text-muted-foreground">Hace 45 minutos - Taller Industrial</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-2.5">
              <span className="text-xs font-medium">Orden de servicio completada: OS-2026-0234</span>
              <span className="text-[10px] text-muted-foreground">Hace 2 horas - Agencia Norte</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-2.5">
              <span className="text-xs font-medium">Pedido de refacciones recibido: PA-2026-0045</span>
              <span className="text-[10px] text-muted-foreground">Hace 3 horas - Taller Industrial</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-2.5">
              <span className="text-xs font-medium">Vehiculo detenido +60 dias: Honda CR-V 2024</span>
              <span className="text-[10px] text-muted-foreground">Alerta automatica - Patio Seminuevos</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
