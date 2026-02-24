"use client"

import { ArrowLeft, Blocks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface TopHeaderProps {
  title: string
  description?: string
  onGoHome?: () => void
}

export function TopHeader({ title, onGoHome }: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-4 border-b bg-card/80 backdrop-blur-md px-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onGoHome}
        className="gap-2 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Volver al catalogo</span>
      </Button>

      <div className="h-4 w-px bg-border" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={onGoHome}
              className="flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Blocks className="h-3 w-3" />
              Inicio
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs font-medium">{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto">
        <Badge variant="outline" className="text-[10px] px-2.5">
          Vista Demo
        </Badge>
      </div>
    </header>
  )
}
