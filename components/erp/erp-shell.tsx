"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/erp/app-sidebar"
import { TopHeader } from "@/components/erp/top-header"
import { DashboardModule } from "@/components/erp/modules/dashboard"
import { OrdenesModule } from "@/components/erp/modules/ordenes"
import { VehiculosModule } from "@/components/erp/modules/vehiculos"
import { RefaccionesModule } from "@/components/erp/modules/refacciones"
import { FinanzasModule } from "@/components/erp/modules/finanzas"
import { ReportesModule } from "@/components/erp/modules/reportes"
import { ActividadModule } from "@/components/erp/modules/actividad"
import { UsuariosModule } from "@/components/erp/modules/usuarios"
import { ConfiguracionModule } from "@/components/erp/modules/configuracion"

const moduleConfig: Record<string, { title: string; description: string }> = {
  dashboard: {
    title: "Dashboard",
    description: "Vision general de la concesionaria",
  },
  actividad: {
    title: "Actividad Reciente",
    description: "Registro automatico de eventos del sistema",
  },
  ordenes: {
    title: "Ordenes",
    description: "Ventas de vehiculos, servicios de taller y pedidos de inventario",
  },
  vehiculos: {
    title: "Inventario de Vehiculos",
    description: "Stock de vehiculos nuevos y seminuevos por sucursal",
  },
  refacciones: {
    title: "Refacciones y Almacen",
    description: "Inventario de partes, autopartes y consumibles por sucursal",
  },
  finanzas: {
    title: "Finanzas",
    description: "Ingresos, costos y margenes por operacion",
  },
  reportes: {
    title: "Reportes y KPIs",
    description: "Indicadores clave y desempeno por sucursal",
  },
  usuarios: {
    title: "Usuarios y Accesos",
    description: "Gestion de usuarios, roles y auditoria",
  },
  roles: {
    title: "Roles y Permisos",
    description: "Configuracion de permisos del sistema",
  },
  sucursales: {
    title: "Sucursales",
    description: "Agencias, talleres y patios",
  },
  configuracion: {
    title: "Configuracion",
    description: "Ajustes generales del sistema",
  },
}

function getModuleComponent(moduleId: string) {
  switch (moduleId) {
    case "dashboard":
      return <DashboardModule />
    case "actividad":
      return <ActividadModule />
    case "ordenes":
      return <OrdenesModule />
    case "vehiculos":
      return <VehiculosModule />
    case "refacciones":
      return <RefaccionesModule />
    case "finanzas":
      return <FinanzasModule />
    case "reportes":
      return <ReportesModule />
    case "usuarios":
    case "roles":
      return <UsuariosModule />
    case "sucursales":
    case "configuracion":
      return <ConfiguracionModule />
    default:
      return <DashboardModule />
  }
}

export function ERPShell() {
  const [activeModule, setActiveModule] = useState("dashboard")

  const config = moduleConfig[activeModule] || moduleConfig.dashboard

  return (
    <SidebarProvider>
      <AppSidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <SidebarInset>
        <TopHeader title={config.title} description={config.description} />
        <div className="flex-1 overflow-auto p-4 lg:p-6">
          {getModuleComponent(activeModule)}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
