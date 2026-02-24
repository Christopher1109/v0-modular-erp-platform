"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { modules, categories } from "@/modules"
import {
  Search, ArrowRight, Blocks, ChevronRight, Sparkles,
} from "lucide-react"

interface ModuleCatalogProps {
  onSelectModule: (id: string) => void
}

export function ModuleCatalog({ onSelectModule }: ModuleCatalogProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredModules = useMemo(() => {
    return modules.filter((mod) => {
      const matchesSearch =
        mod.title.toLowerCase().includes(search.toLowerCase()) ||
        mod.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !activeCategory || mod.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Blocks className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight text-foreground">NexusERP</h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Plataforma Modular</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden text-xs sm:flex gap-1.5 px-3 py-1 border-primary/20">
              <Sparkles className="h-3 w-3 text-primary" />
              Demo Interactiva
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4 text-xs px-3 py-1">
              {modules.length} modulos disponibles
            </Badge>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
              Todo lo que tu empresa necesita, en una sola plataforma
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
              Explora cada modulo de forma interactiva. Descubre como NexusERP se adapta a
              cualquier industria con vistas realistas, datos de ejemplo y flujos completos.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar modulo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 pl-10 text-sm bg-background border-border/60"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(null)}
                className="h-9 text-xs"
              >
                Todos
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={activeCategory === cat.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.key)}
                  className="h-9 text-xs"
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module Grid */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        {filteredModules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">No se encontraron modulos</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Intenta con otro termino de busqueda o cambia el filtro.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-left transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/20"
              >
                {/* Gradient accent bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${mod.color}`} />

                <div className="flex flex-1 flex-col p-6">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${mod.color} text-white shadow-sm`}>
                      <mod.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{mod.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {mod.description}
                  </p>

                  {/* Features */}
                  <div className="mt-4 flex flex-col gap-2">
                    {mod.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <ChevronRight className="h-3 w-3 text-primary shrink-0" />
                        <span className="text-xs text-foreground/80">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                    <span>Explorar modulo</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <p className="text-xs text-muted-foreground">
            NexusERP - Plataforma demostrativa. Ningun dato es real ni se persiste.
          </p>
          <Badge variant="outline" className="text-[10px]">v1.0 Demo</Badge>
        </div>
      </footer>
    </div>
  )
}
