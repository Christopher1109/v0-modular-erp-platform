"use client"

import { BarChart3, Download, FileText, TrendingUp, PieChart as PieIcon, Calendar, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const kpis = [
  { label: "Ventas Cerradas", value: 48, target: 50, unit: "" },
  { label: "Ticket Promedio", value: 52000, target: 45000, unit: "$" },
  { label: "Tiempo Ciclo", value: 14, target: 18, unit: " dias" },
  { label: "Satisfaccion", value: 4.6, target: 4.5, unit: "/5" },
  { label: "Retencion Clientes", value: 89, target: 85, unit: "%" },
  { label: "Margen Neto", value: 28.2, target: 25, unit: "%" },
]

const monthlyTrend = [
  { month: "Sep", ingresos: 1800000, egresos: 1350000 },
  { month: "Oct", ingresos: 2100000, egresos: 1520000 },
  { month: "Nov", ingresos: 1950000, egresos: 1480000 },
  { month: "Dic", ingresos: 2600000, egresos: 1890000 },
  { month: "Ene", ingresos: 2200000, egresos: 1650000 },
  { month: "Feb", ingresos: 2480000, egresos: 1780000 },
]

const revenueBySource = [
  { name: "Productos", value: 58, color: "hsl(213, 72%, 42%)" },
  { name: "Servicios", value: 26, color: "hsl(162, 63%, 41%)" },
  { name: "Contratos", value: 16, color: "hsl(38, 92%, 50%)" },
]

const reports = [
  { name: "Estado de Resultados Febrero 2026", type: "Finanzas", date: "23 Feb 2026", status: "Listo" },
  { name: "Reporte de Ventas Semanal", type: "Ventas", date: "21 Feb 2026", status: "Listo" },
  { name: "Analisis de Inventario Q1", type: "Inventario", date: "20 Feb 2026", status: "Listo" },
  { name: "KPIs Operativos Enero", type: "General", date: "5 Feb 2026", status: "Listo" },
  { name: "Reporte de Conversion CRM", type: "CRM", date: "1 Feb 2026", status: "Listo" },
]

function KPICard({ label, value, target, unit }: { label: string; value: number; target: number; unit: string }) {
  const isInverse = unit === " dias"
  const onTarget = isInverse ? value <= target : value >= target
  const pct = isInverse ? Math.min((target / value) * 100, 100) : Math.min((value / target) * 100, 100)
  const fmt = unit === "$" ? `$${value.toLocaleString()}` : `${value}`

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{label}</span><Badge className={`text-[9px] px-1.5 ${onTarget ? "bg-success/10 text-success border-success/20 hover:bg-success/10" : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10"}`}>{onTarget ? "En meta" : "Bajo meta"}</Badge></div>
      <div className="flex items-baseline gap-1"><span className="text-xl font-bold text-foreground">{fmt}</span><span className="text-xs text-muted-foreground">{unit !== "$" ? unit : ""}</span></div>
      <Progress value={pct} className="h-1.5" />
      <span className="text-[10px] text-muted-foreground">Meta: {unit === "$" ? `$${target.toLocaleString()}` : `${target}`}{unit !== "$" ? unit : ""}</span>
    </div>
  )
}

export function ReportesModule() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10"><BarChart3 className="h-4 w-4 text-blue-600" /></div><div><p className="text-sm font-medium text-foreground">Dashboards Custom</p><p className="text-xs text-muted-foreground mt-0.5">Personaliza tus vistas</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><TrendingUp className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-medium text-foreground">Analisis Predictivo</p><p className="text-xs text-muted-foreground mt-0.5">Proyecciones inteligentes</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><Calendar className="h-4 w-4 text-success" /></div><div><p className="text-sm font-medium text-foreground">Reportes Automaticos</p><p className="text-xs text-muted-foreground mt-0.5">Programados por periodo</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><Filter className="h-4 w-4 text-warning" /></div><div><p className="text-sm font-medium text-foreground">Filtros Avanzados</p><p className="text-xs text-muted-foreground mt-0.5">Segmenta por cualquier campo</p></div></div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-3">
        <Select defaultValue="feb2026"><SelectTrigger className="h-9 w-44 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="feb2026">Febrero 2026</SelectItem><SelectItem value="ene2026">Enero 2026</SelectItem><SelectItem value="dic2025">Diciembre 2025</SelectItem></SelectContent></Select>
        <Button variant="outline" size="sm" className="h-9 text-xs"><Download className="mr-1.5 h-3 w-3" />Exportar Reporte</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {kpis.map(k => <KPICard key={k.label} {...k} />)}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Tendencia Ingresos vs Egresos</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="reportIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0.15} /><stop offset="95%" stopColor="hsl(213, 72%, 42%)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" tickFormatter={v => `$${(v/1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                <Area type="monotone" dataKey="ingresos" stroke="hsl(213, 72%, 42%)" strokeWidth={2} fill="url(#reportIncome)" name="Ingresos" />
                <Area type="monotone" dataKey="egresos" stroke="hsl(0, 72%, 51%)" strokeWidth={1.5} fill="transparent" strokeDasharray="4 4" name="Egresos" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Ingresos por Fuente</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart><Pie data={revenueBySource} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">{revenueBySource.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} /></PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 w-full">
              {revenueBySource.map(s => (<div key={s.name} className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} /><span className="text-xs text-muted-foreground flex-1">{s.name}</span><span className="text-xs font-semibold">{s.value}%</span></div>))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Reports */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Reportes Generados</CardTitle><CardDescription className="text-xs">Descarga reportes del periodo seleccionado</CardDescription></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {reports.map(r => (
              <div key={r.name} className="flex items-center gap-4 p-3 rounded-lg border">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted"><FileText className="h-4 w-4 text-muted-foreground" /></div>
                <div className="flex-1 min-w-0"><p className="text-xs font-medium">{r.name}</p><div className="flex items-center gap-2 mt-0.5"><Badge variant="outline" className="text-[9px]">{r.type}</Badge><span className="text-[10px] text-muted-foreground">{r.date}</span></div></div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
