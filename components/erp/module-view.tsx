"use client"

import { TopHeader } from "@/components/erp/top-header"
import { GenericModule } from "@/components/erp/modules/generic-module"
import type { ModuleDef } from "@/modules"

interface ModuleViewProps {
  module: ModuleDef
  onGoHome: () => void
}

export function ModuleView({ module, onGoHome }: ModuleViewProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopHeader title={module.title} onGoHome={onGoHome} />

      {/* Module Hero */}
      <section className="relative overflow-hidden border-b bg-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:py-12">
          <div className="flex items-start gap-5">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} text-white shadow-lg`}>
              <module.icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                {module.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground lg:text-base">{module.subtitle}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {module.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="mx-auto w-full max-w-7xl px-6 py-8 lg:py-10">
        <GenericModule module={module} />
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <p className="text-[11px] text-muted-foreground">
            NexusERP - Los datos mostrados son ficticios con fines demostrativos.
          </p>
          <button
            onClick={onGoHome}
            className="text-[11px] font-medium text-primary hover:underline"
          >
            Volver al catalogo
          </button>
        </div>
      </footer>
    </div>
  )
}
