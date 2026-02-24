"use client"

import { TrendingUp, Target, Users, Award, DollarSign, ArrowRight, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const pipeline = [
  { stage: "Prospecto", count: 24, value: 1250000, color: "bg-muted-foreground" },
  { stage: "Calificado", count: 18, value: 980000, color: "bg-primary" },
  { stage: "Propuesta", count: 12, value: 720000, color: "bg-warning" },
  { stage: "Negociacion", count: 6, value: 480000, color: "bg-success" },
  { stage: "Cerrado", count: 8, value: 640000, color: "bg-emerald-500" },
]

const sellers = [
  { name: "Ana Martinez", initials: "AM", sales: 12, revenue: 285000, target: 300000, commission: 14250 },
  { name: "Carlos Lopez", initials: "CL", sales: 18, revenue: 342000, target: 300000, commission: 17100 },
  { name: "Sofia Ramirez", initials: "SR", sales: 9, revenue: 198000, target: 250000, commission: 9900 },
  { name: "Diego Torres", initials: "DT", sales: 15, revenue: 310000, target: 300000, commission: 15500 },
]

const quotes = [
  { id: "COT-3401", client: "TechCorp S.A.", desc: "Equipamiento Q2 2026", amount: 145000, validity: "5 dias", status: "Enviada", seller: "Carlos Lopez" },
  { id: "COT-3400", client: "GlobalFood Corp.", desc: "Renovacion contrato anual", amount: 222000, validity: "10 dias", status: "Borrador", seller: "Ana Martinez" },
  { id: "COT-3399", client: "LogiTrans MX", desc: "Suministros operativos", amount: 68500, validity: "3 dias", status: "Aprobada", seller: "Diego Torres" },
  { id: "COT-3398", client: "Arq. Hernandez", desc: "Proyecto mobiliario oficina", amount: 95200, validity: "Vencida", status: "Vencida", seller: "Sofia Ramirez" },
]

const monthlyRevenue = [
  { month: "Sep", revenue: 420000 }, { month: "Oct", revenue: 580000 }, { month: "Nov", revenue: 510000 },
  { month: "Dic", revenue: 720000 }, { month: "Ene", revenue: 640000 }, { month: "Feb", revenue: 680000 },
]

export function VentasModule() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10"><TrendingUp className="h-4 w-4 text-sky-600" /></div><div><p className="text-sm font-medium text-foreground">Pipeline Visual</p><p className="text-xs text-muted-foreground mt-0.5">Embudo de ventas completo</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Target className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-medium text-foreground">Metas por Vendedor</p><p className="text-xs text-muted-foreground mt-0.5">Tracking en tiempo real</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><DollarSign className="h-4 w-4 text-warning" /></div><div><p className="text-sm font-medium text-foreground">Cotizaciones Rapidas</p><p className="text-xs text-muted-foreground mt-0.5">Genera y envia en segundos</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><Award className="h-4 w-4 text-success" /></div><div><p className="text-sm font-medium text-foreground">Comisiones Auto</p><p className="text-xs text-muted-foreground mt-0.5">Calculo sobre venta cerrada</p></div></div>
      </div>

      {/* Pipeline */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Pipeline de Ventas</CardTitle><CardDescription className="text-xs">Oportunidades activas por etapa</CardDescription></CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {pipeline.map((stage, i) => (
              <div key={stage.stage} className="flex min-w-[160px] flex-1 flex-col items-center gap-2 rounded-lg border bg-muted/30 p-4">
                <div className={`h-2 w-full rounded-full ${stage.color}`} />
                <p className="text-xs font-semibold text-foreground">{stage.stage}</p>
                <p className="text-2xl font-bold text-foreground">{stage.count}</p>
                <p className="text-[10px] text-muted-foreground">${(stage.value / 1000).toFixed(0)}K</p>
                {i < pipeline.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground mt-1" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sellers */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Rendimiento del Equipo</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {sellers.map(s => (
                <div key={s.name} className="flex items-center gap-4">
                  <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{s.initials}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between"><span className="text-xs font-semibold">{s.name}</span><span className="text-xs text-muted-foreground">${(s.revenue / 1000).toFixed(0)}K / ${(s.target / 1000).toFixed(0)}K</span></div>
                    <Progress value={(s.revenue / s.target) * 100} className="h-1.5 mt-1.5" />
                    <div className="flex items-center justify-between mt-1"><span className="text-[10px] text-muted-foreground">{s.sales} ventas</span><span className="text-[10px] text-success font-medium">${s.commission.toLocaleString()} comision</span></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Ingresos por Ventas</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Ingresos"]} />
                <Bar dataKey="revenue" fill="hsl(213, 72%, 42%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quotes */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Cotizaciones Recientes</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead className="text-xs">ID</TableHead><TableHead className="text-xs">Cliente</TableHead><TableHead className="text-xs">Vendedor</TableHead><TableHead className="text-xs text-right">Monto</TableHead><TableHead className="text-xs">Vigencia</TableHead><TableHead className="text-xs">Estado</TableHead></TableRow></TableHeader>
            <TableBody>
              {quotes.map(q => (
                <TableRow key={q.id}>
                  <TableCell className="text-xs font-mono text-primary">{q.id}</TableCell>
                  <TableCell><p className="text-xs font-medium">{q.client}</p><p className="text-[10px] text-muted-foreground">{q.desc}</p></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{q.seller}</TableCell>
                  <TableCell className="text-xs text-right font-semibold">${q.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{q.validity}</TableCell>
                  <TableCell><Badge className={`text-[10px] ${q.status === "Aprobada" ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : q.status === "Enviada" ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10" : q.status === "Vencida" ? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10" : "bg-muted text-muted-foreground hover:bg-muted"}`}>{q.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
