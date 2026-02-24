"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { modules, categories, ModuleDef } from "@/modules"

interface ModuleCatalogProps {
  /** Called when a module is selected.  Passes the module id to the parent. */
  onSelectModule: (id: string) => void
}

/**
 * The ModuleCatalog component displays all available modules grouped by category.  It
 * provides search and category filters to help users find a module of interest.
 */
export function ModuleCatalog({ onSelectModule }: ModuleCatalogProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filter modules based on search text and active category.
  const filteredModules = useMemo(() => {
    return modules.filter((module) => {
      const matchesSearch = module.title
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesCategory = !activeCategory || module.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  return (
    <div className="p-4 space-y-4">
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === null ? "secondary" : "ghost"}
          onClick={() => setActiveCategory(null)}
        >
          Todos
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={activeCategory === cat.key ? "secondary" : "ghost"}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </Button>
        ))}
      </div>
      {/* Search input */}
      <Input
        placeholder="Buscar módulo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Separator className="my-2" />
      {/* Grid of modules */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((module) => (
          <div key={module.id} onClick={() => onSelectModule(module.id)}>
            <Card className="cursor-pointer hover:bg-accent/40">
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {module.features.slice(0, 3).map((feature) => (
                    <Badge key={feature}>{feature}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        {filteredModules.length === 0 && (
          <p className="text-muted-foreground">No se encontraron módulos.</p>
        )}
      </div>
    </div>
  )
}