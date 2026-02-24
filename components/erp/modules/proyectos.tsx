"use client"

import { FolderKanban, Clock, CheckCircle2, AlertTriangle, Users, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const projects = [
  { name: "Rediseno Plataforma Web", client: "Interno", progress: 72, status: "En Progreso", tasks: { total: 24, done: 17 }, team: ["AM", "PZ", "DT"], deadline: "15 Mar 2026", priority: "Alta" },
  { name: "Implementacion CRM v2", client: "Interno", progress: 45, status: "En Progreso", tasks: { total: 32, done: 14 }, team: ["SR", "CL"], deadline: "30 Abr 2026", priority: "Alta" },
  { name: "Migracion Base de Datos", client: "TechCorp", progress: 90, status: "En Revision", tasks: { total: 18, done: 16 }, team: ["PZ"], deadline: "28 Feb 2026", priority: "Critica" },
  { name: "App Movil Empleados", client: "Interno", progress: 20, status: "Planificacion", tasks: { total: 40, done: 8 }, team: ["PZ", "DT", "AM"], deadline: "30 Jun 2026", priority: "Media" },
  { name: "Integracion API Proveedores", client: "GlobalFood", progress: 100, status: "Completado", tasks: { total: 12, done: 12 }, team: ["PZ", "SR"], deadline: "10 Feb 2026", priority: "Alta" },
]

const kanbanColumns = [
  { title: "Por Hacer", count: 8, color: "bg-muted-foreground", tasks: ["Wireframes app movil", "Definir endpoints API", "Revisar seguridad DB"] },
  { title: "En Proceso", count: 6, color: "bg-primary", tasks: ["Frontend dashboard CRM", "Migrar tablas legacy", "Testing integracion"] },
  { title: "En Revision", count: 3, color: "bg-warning", tasks: ["Deploy staging DB", "Docs API v2", "UX review plataforma"] },
  { title: "Completado", count: 12, color: "bg-success", tasks: ["Setup CI/CD", "Schema DB v3", "Auth OAuth2"] },
]

function priorityBadge(p: string) {
  const m: Record<string, string> = { "Critica": "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10", "Alta": "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10", "Media": "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10" }
  return <Badge className={`${m[p] || ""} text-[10px]`}>{p}</Badge>
}

export function ProyectosModule() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10"><FolderKanban className="h-4 w-4 text-cyan-600" /></div><div><p className="text-sm font-medium text-foreground">Tableros Kanban</p><p className="text-xs text-muted-foreground mt-0.5">Visualiza el flujo de tareas</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Calendar className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-medium text-foreground">Cronogramas</p><p className="text-xs text-muted-foreground mt-0.5">Deadlines y milestones</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><Users className="h-4 w-4 text-warning" /></div><div><p className="text-sm font-medium text-foreground">Equipos</p><p className="text-xs text-muted-foreground mt-0.5">Asignacion inteligente</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><CheckCircle2 className="h-4 w-4 text-success" /></div><div><p className="text-sm font-medium text-foreground">Avance</p><p className="text-xs text-muted-foreground mt-0.5">Tracking de progreso</p></div></div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Proyectos Activos</p><p className="text-2xl font-bold text-foreground mt-2">4</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Tareas Pendientes</p><p className="text-2xl font-bold text-warning mt-2">59</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Completadas</p><p className="text-2xl font-bold text-success mt-2">67</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Progreso Global</p><p className="text-2xl font-bold text-primary mt-2">65%</p></CardContent></Card>
      </div>

      {/* Kanban Board */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Tablero Kanban</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {kanbanColumns.map(col => (
              <div key={col.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-2"><div className={`h-2 w-2 rounded-full ${col.color}`} /><span className="text-xs font-semibold">{col.title}</span><Badge variant="outline" className="text-[9px] ml-auto">{col.count}</Badge></div>
                <div className="flex flex-col gap-2">
                  {col.tasks.map(task => (
                    <div key={task} className="rounded-lg border bg-muted/30 p-3"><p className="text-xs font-medium">{task}</p></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project List */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Proyectos</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {projects.map(p => (
              <div key={p.name} className="flex items-center gap-4 p-4 rounded-lg border">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap"><p className="text-sm font-semibold">{p.name}</p>{priorityBadge(p.priority)}<Badge variant="outline" className="text-[9px]">{p.status}</Badge></div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Cliente: {p.client} -- Deadline: {p.deadline}</p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <Progress value={p.progress} className="flex-1 h-1.5" />
                    <span className="text-xs font-semibold text-foreground shrink-0">{p.progress}%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{p.tasks.done}/{p.tasks.total} tareas</p>
                </div>
                <div className="flex -space-x-1.5 shrink-0">
                  {p.team.map(m => <Avatar key={m} className="h-6 w-6 border-2 border-card"><AvatarFallback className="bg-primary/10 text-primary text-[8px] font-bold">{m}</AvatarFallback></Avatar>)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
