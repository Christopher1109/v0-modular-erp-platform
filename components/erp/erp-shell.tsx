"use client"

import { useState } from "react"
import { ModuleCatalog } from "@/components/erp/module-catalog"
import { GenericModule } from "@/components/erp/modules/generic-module"
import { modules } from "@/modules"
import { TopHeader } from "@/components/erp/top-header"

/**
 * ERPShell is the top‑level component for the demo application.  It displays
 * either the catalog of available modules or a selected module using the
 * GenericModule component.  When a module is active, a header is shown with
 * a “Inicio” button that returns to the catalog.
 */
export function ERPShell() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  // When no module is selected, show the catalog
  if (!activeModule) {
    return <ModuleCatalog onSelectModule={(id) => setActiveModule(id)} />
  }

  const moduleDef = modules.find((m) => m.id === activeModule)
  if (!moduleDef) {
    return <ModuleCatalog onSelectModule={(id) => setActiveModule(id)} />
  }

  return (
    <div className="flex flex-col h-full">
      <TopHeader
        title={moduleDef.title}
        description={moduleDef.description}
        onGoHome={() => setActiveModule(null)}
      />
      <GenericModule module={moduleDef} />
    </div>
  )
}
