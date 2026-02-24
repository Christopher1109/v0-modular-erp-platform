"use client"

import { useState } from "react"
import { ModuleCatalog } from "@/components/erp/module-catalog"
import { ModuleView } from "@/components/erp/module-view"
import { modules } from "@/modules"

export function ERPShell() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  if (!activeModule) {
    return <ModuleCatalog onSelectModule={(id) => setActiveModule(id)} />
  }

  const moduleDef = modules.find((m) => m.id === activeModule)
  if (!moduleDef) {
    return <ModuleCatalog onSelectModule={(id) => setActiveModule(id)} />
  }

  return (
    <ModuleView
      module={moduleDef}
      onGoHome={() => setActiveModule(null)}
    />
  )
}
