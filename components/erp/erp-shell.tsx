"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/erp/app-sidebar"
import { TopHeader } from "@/components/erp/top-header"
import { DashboardModule } from "@/components/erp/modules/dashboard"
import { OperacionesModule } from "@/components/erp/modules/operaciones"
import { InventarioModule } from "@/components/erp/modules/inventario"
import { FinanzasModule } from "@/components/erp/modules/finanzas"
import { ReportesModule } from "@/components/erp/modules/reportes"
import { UsuariosModule } from "@/components/erp/modules/usuarios"
import { ConfiguracionModule } from "@/components/erp/modules/configuracion"

const moduleConfig: Record<string, { title: string; description: string }> = {
  dashboard: {
    title: "Dashboard",
    description: "Vista general de la empresa",
  },
  operaciones: {
    title: "Operaciones",
    description: "Registro y seguimiento de procesos operativos",
  },
  inventario: {
    title: "Inventario / Almacen",
    description: "Control de entradas, salidas y stock",
  },
  finanzas: {
    title: "Finanzas",
    description: "Registro de ingresos, egresos y costos",
  },
  reportes: {
    title: "Reportes y KPIs",
    description: "Indicadores clave y analisis",
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
    description: "Gestion de localizaciones de la empresa",
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
    case "operaciones":
      return <OperacionesModule />
    case "inventario":
      return <InventarioModule />
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
