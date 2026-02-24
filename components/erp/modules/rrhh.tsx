"use client"

import { Users, Clock, Award, CalendarDays, CheckCircle2, XCircle, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const employees = [
  { name: "Ana Martinez", dept: "Ventas", role: "Gerente Comercial", seniority: "4 anos", status: "Activo", attendance: 98, initials: "AM" },
  { name: "Carlos Lopez", dept: "Ventas", role: "Ejecutivo Senior", seniority: "3 anos", status: "Activo", attendance: 95, initials: "CL" },
  { name: "Sofia Ramirez", dept: "Operaciones", role: "Coordinadora", seniority: "2 anos", status: "Activo", attendance: 100, initials: "SR" },
  { name: "Diego Torres", dept: "Ventas", role: "Ejecutivo Jr.", seniority: "1 ano", status: "Activo", attendance: 92, initials: "DT" },
  { name: "Laura Vega", dept: "Finanzas", role: "Contadora", seniority: "5 anos", status: "Vacaciones", attendance: 97, initials: "LV" },
  { name: "Pedro Zuniga", dept: "TI", role: "Desarrollador", seniority: "2 anos", status: "Activo", attendance: 94, initials: "PZ" },
  { name: "Elena Garcia", dept: "RRHH", role: "Especialista", seniority: "3 anos", status: "Activo", attendance: 99, initials: "EG" },
  { name: "Marco Rios", dept: "Operaciones", role: "Almacenista", seniority: "1 ano", status: "Baja medica", attendance: 85, initials: "MR" },
]

const evaluations = [
  { employee: "Carlos Lopez", period: "Q4 2025", score: 92, strengths: "Liderazgo, cierres", areas: "Documentacion" },
  { employee: "Ana Martinez", period: "Q4 2025", score: 88, strengths: "Estrategia, equipo", areas: "Delegacion" },
  { employee: "Sofia Ramirez", period: "Q4 2025", score: 95, strengths: "Organizacion, eficiencia", areas: "Presentaciones" },
  { employee: "Pedro Zuniga", period: "Q4 2025", score: 90, strengths: "Tecnico, autonomo", areas: "Comunicacion" },
]

const departments = [
  { name: "Ventas", count: 3, budget: 420000, headcount: 5 },
  { name: "Operaciones", count: 2, budget: 280000, headcount: 3 },
  { name: "Finanzas", count: 1, budget: 180000, headcount: 2 },
  { name: "TI", count: 1, budget: 220000, headcount: 2 },
  { name: "RRHH", count: 1, budget: 150000, headcount: 2 },
]

export function RRHHModule() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10"><Users className="h-4 w-4 text-indigo-600" /></div><div><p className="text-sm font-medium text-foreground">Directorio</p><p className="text-xs text-muted-foreground mt-0.5">Perfiles completos</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Clock className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-medium text-foreground">Asistencia</p><p className="text-xs text-muted-foreground mt-0.5">Control automatico</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><Award className="h-4 w-4 text-warning" /></div><div><p className="text-sm font-medium text-foreground">Evaluaciones</p><p className="text-xs text-muted-foreground mt-0.5">Desempeno trimestral</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><CalendarDays className="h-4 w-4 text-success" /></div><div><p className="text-sm font-medium text-foreground">Vacaciones</p><p className="text-xs text-muted-foreground mt-0.5">Solicitudes y calendario</p></div></div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Empleados</p><p className="text-2xl font-bold text-foreground mt-2">8</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Departamentos</p><p className="text-2xl font-bold text-foreground mt-2">5</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Asistencia Prom.</p><p className="text-2xl font-bold text-success mt-2">95%</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Nomina Mensual</p><p className="text-2xl font-bold text-foreground mt-2">$1.25M</p></CardContent></Card>
      </div>

      <Tabs defaultValue="directorio">
        <TabsList><TabsTrigger value="directorio" className="text-xs">Directorio</TabsTrigger><TabsTrigger value="evaluaciones" className="text-xs">Evaluaciones</TabsTrigger><TabsTrigger value="departamentos" className="text-xs">Departamentos</TabsTrigger></TabsList>

        <TabsContent value="directorio" className="mt-5">
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Empleados</CardTitle></CardHeader><CardContent>
            <Table>
              <TableHeader><TableRow><TableHead className="text-xs">Empleado</TableHead><TableHead className="text-xs">Departamento</TableHead><TableHead className="text-xs">Puesto</TableHead><TableHead className="text-xs">Antiguedad</TableHead><TableHead className="text-xs text-center">Asistencia</TableHead><TableHead className="text-xs">Estado</TableHead></TableRow></TableHeader>
              <TableBody>
                {employees.map(e => (
                  <TableRow key={e.name}>
                    <TableCell><div className="flex items-center gap-2.5"><Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">{e.initials}</AvatarFallback></Avatar><span className="text-xs font-medium">{e.name}</span></div></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{e.dept}</TableCell>
                    <TableCell className="text-xs">{e.role}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{e.seniority}</TableCell>
                    <TableCell className="text-xs text-center font-semibold">{e.attendance}%</TableCell>
                    <TableCell><Badge className={`text-[10px] ${e.status === "Activo" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : e.status === "Vacaciones" ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10" : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10"}`}>{e.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="evaluaciones" className="mt-5">
          <div className="grid gap-4 md:grid-cols-2">
            {evaluations.map(ev => (
              <Card key={ev.employee}><CardContent className="p-5">
                <div className="flex items-center justify-between mb-3"><p className="text-sm font-semibold">{ev.employee}</p><Badge variant="outline" className="text-[10px]">{ev.period}</Badge></div>
                <div className="flex items-center gap-3 mb-3"><div className="text-2xl font-bold text-primary">{ev.score}</div><span className="text-xs text-muted-foreground">/ 100</span><Progress value={ev.score} className="flex-1 h-2" /></div>
                <div className="flex flex-col gap-1.5"><div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-success shrink-0" /><span className="text-xs text-muted-foreground">Fortalezas: {ev.strengths}</span></div><div className="flex items-center gap-2"><XCircle className="h-3 w-3 text-warning shrink-0" /><span className="text-xs text-muted-foreground">Areas: {ev.areas}</span></div></div>
              </CardContent></Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="departamentos" className="mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departments.map(d => (
              <Card key={d.name}><CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Briefcase className="h-5 w-5 text-primary" /></div><div><p className="text-sm font-semibold">{d.name}</p><p className="text-[10px] text-muted-foreground">{d.count} empleados activos / {d.headcount} posiciones</p></div></div>
                <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Presupuesto mensual</span><span className="text-xs font-bold">${(d.budget / 1000).toFixed(0)}K</span></div>
                <Progress value={(d.count / d.headcount) * 100} className="h-1.5 mt-2" />
              </CardContent></Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
