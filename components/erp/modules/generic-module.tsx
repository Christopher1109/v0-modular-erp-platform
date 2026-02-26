"use client"

import dynamic from "next/dynamic"
import { iconMap } from "@/modules"
import type { ModuleDef } from "@/modules"

const moduleComponents: Record<string, React.ComponentType> = {
  dashboard: dynamic(() => import("./dashboard").then((m) => ({ default: m.DashboardModule })), { ssr: false }),
  inventario: dynamic(() => import("./inventario").then((m) => ({ default: m.InventarioModule })), { ssr: false }),
  finanzas: dynamic(() => import("./finanzas").then((m) => ({ default: m.FinanzasModule })), { ssr: false }),
  compras: dynamic(() => import("./compras").then((m) => ({ default: m.ComprasModule })), { ssr: false }),
  ventas: dynamic(() => import("./ventas").then((m) => ({ default: m.VentasModule })), { ssr: false }),
  crm: dynamic(() => import("./crm").then((m) => ({ default: m.CRMModule })), { ssr: false }),
  rrhh: dynamic(() => import("./rrhh").then((m) => ({ default: m.RRHHModule })), { ssr: false }),
  proyectos: dynamic(() => import("./proyectos").then((m) => ({ default: m.ProyectosModule })), { ssr: false }),
  marketing: dynamic(() => import("./marketing").then((m) => ({ default: m.MarketingModule })), { ssr: false }),
  reportes: dynamic(() => import("./reportes").then((m) => ({ default: m.ReportesModule })), { ssr: false }),
  configuracion: dynamic(() => import("./configuracion").then((m) => ({ default: m.ConfiguracionModule })), { ssr: false }),
}

interface GenericModuleProps {
  module: ModuleDef
}

export function GenericModule({ module }: GenericModuleProps) {
  const Component = moduleComponents[module.component]
  const IconComponent = iconMap[module.iconName]

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} text-white mb-4`}>
          {IconComponent && <IconComponent className="h-8 w-8" />}
        </div>
        <p className="text-lg font-semibold text-foreground">Modulo en desarrollo</p>
        <p className="mt-1 text-sm text-muted-foreground max-w-md">
          El modulo &ldquo;{module.title}&rdquo; esta siendo preparado.
          Pronto estara disponible con datos de ejemplo y vista interactiva.
        </p>
      </div>
    )
  }

  return <Component />
}
