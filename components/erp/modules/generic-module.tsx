"use client"

import dynamic from "next/dynamic"
import type { ModuleDef } from "@/modules"

const moduleComponents: Record<string, React.ComponentType> = {
  dashboard: dynamic(() => import("./dashboard").then((m) => ({ default: m.DashboardModule })), { ssr: false }),
  ordenes: dynamic(() => import("./ordenes").then((m) => ({ default: m.OrdenesModule })), { ssr: false }),
  vehiculos: dynamic(() => import("./vehiculos").then((m) => ({ default: m.VehiculosModule })), { ssr: false }),
  refacciones: dynamic(() => import("./refacciones").then((m) => ({ default: m.RefaccionesModule })), { ssr: false }),
  finanzas: dynamic(() => import("./finanzas").then((m) => ({ default: m.FinanzasModule })), { ssr: false }),
  reportes: dynamic(() => import("./reportes").then((m) => ({ default: m.ReportesModule })), { ssr: false }),
  actividad: dynamic(() => import("./actividad").then((m) => ({ default: m.ActividadModule })), { ssr: false }),
  usuarios: dynamic(() => import("./usuarios").then((m) => ({ default: m.UsuariosModule })), { ssr: false }),
  configuracion: dynamic(() => import("./configuracion").then((m) => ({ default: m.ConfiguracionModule })), { ssr: false }),
}

interface GenericModuleProps {
  module: ModuleDef
}

export function GenericModule({ module }: GenericModuleProps) {
  const Component = moduleComponents[module.component]

  if (!Component) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-foreground">Modulo no disponible</p>
          <p className="text-sm text-muted-foreground">
            El modulo &ldquo;{module.title}&rdquo; aun no ha sido implementado.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <Component />
    </div>
  )
}
