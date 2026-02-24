"use client"

import { Users, Mail, Phone, Star, TrendingUp, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const leads = [
  { name: "Empresa Alfa S.A.", contact: "Roberto Mendez", email: "rmendez@alfa.com", score: 85, source: "Web", stage: "Calificado", value: 120000, lastContact: "Hace 2h" },
  { name: "Distribuidora Beta", contact: "Maria Castillo", email: "mcastillo@beta.mx", score: 72, source: "Referido", stage: "Contactado", value: 85000, lastContact: "Hace 1 dia" },
  { name: "Tech Solutions", contact: "Jorge Ramirez", email: "jramirez@techsol.com", score: 91, source: "LinkedIn", stage: "Propuesta", value: 210000, lastContact: "Hace 3h" },
  { name: "Constructora Delta", contact: "Andrea Silva", email: "asilva@delta.mx", score: 58, source: "Evento", stage: "Nuevo", value: 45000, lastContact: "Hace 3 dias" },
  { name: "Logistica Omega", contact: "Fernando Vega", email: "fvega@omega.com", score: 78, source: "Web", stage: "Negociacion", value: 175000, lastContact: "Hace 5h" },
  { name: "Farmacia Plus", contact: "Elena Gutierrez", email: "egutierrez@fplus.mx", score: 65, source: "Llamada", stage: "Contactado", value: 62000, lastContact: "Hace 2 dias" },
]

const sourceData = [
  { name: "Web", value: 42, color: "hsl(213, 72%, 42%)" },
  { name: "Referidos", value: 28, color: "hsl(162, 63%, 41%)" },
  { name: "LinkedIn", value: 18, color: "hsl(38, 92%, 50%)" },
  { name: "Eventos", value: 12, color: "hsl(340, 65%, 55%)" },
]

const interactions = [
  { type: "Llamada", contact: "Roberto Mendez - Empresa Alfa", note: "Interesado en plan enterprise. Agendar demo para la proxima semana.", user: "Ana Martinez", time: "Hace 2h" },
  { type: "Email", contact: "Jorge Ramirez - Tech Solutions", note: "Envio de propuesta tecnica v2.1 con descuento por volumen.", user: "Carlos Lopez", time: "Hace 3h" },
  { type: "Reunion", contact: "Fernando Vega - Logistica Omega", note: "Revision de contrato. Solicitan clausula de soporte 24/7.", user: "Diego Torres", time: "Hace 5h" },
  { type: "Seguimiento", contact: "Maria Castillo - Distribuidora Beta", note: "Follow-up automatico: sin respuesta en 48h. Escalar a llamada.", user: "Sistema", time: "Hace 1 dia" },
]

function scoreColor(score: number) {
  if (score >= 80) return "text-success"
  if (score >= 60) return "text-warning"
  return "text-destructive"
}

export function CRMModule() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-500/10"><Users className="h-4 w-4 text-pink-600" /></div><div><p className="text-sm font-medium text-foreground">Pipeline de Leads</p><p className="text-xs text-muted-foreground mt-0.5">Seguimiento completo</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Mail className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-medium text-foreground">Automatizacion</p><p className="text-xs text-muted-foreground mt-0.5">Emails y seguimientos auto</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><Star className="h-4 w-4 text-warning" /></div><div><p className="text-sm font-medium text-foreground">Lead Scoring</p><p className="text-xs text-muted-foreground mt-0.5">Calificacion inteligente</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><TrendingUp className="h-4 w-4 text-success" /></div><div><p className="text-sm font-medium text-foreground">Conversion</p><p className="text-xs text-muted-foreground mt-0.5">Metricas de cierre</p></div></div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Leads Activos</p><p className="text-2xl font-bold text-foreground mt-2">64</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Tasa Conversion</p><p className="text-2xl font-bold text-success mt-2">24%</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Valor Pipeline</p><p className="text-2xl font-bold text-primary mt-2">$697K</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Tiempo Promedio</p><p className="text-2xl font-bold text-foreground mt-2">18 dias</p></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leads */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Leads Recientes</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {leads.map(l => (
                <div key={l.name} className="flex items-center gap-4 p-3 rounded-lg border">
                  <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">{l.contact.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><p className="text-xs font-semibold truncate">{l.name}</p><Badge variant="outline" className="text-[9px] shrink-0">{l.stage}</Badge></div>
                    <p className="text-[10px] text-muted-foreground">{l.contact} - {l.source}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${scoreColor(l.score)}`}>{l.score}</p>
                    <p className="text-[10px] text-muted-foreground">${(l.value / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source Chart */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Fuentes de Leads</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                  {sourceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 w-full">
              {sourceData.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-muted-foreground flex-1">{s.name}</span>
                  <span className="text-xs font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactions */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Interacciones Recientes</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {interactions.map((int, i) => (
              <div key={i} className="flex gap-4 pb-5 last:pb-0 relative">
                {i < interactions.length - 1 && <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-card z-10">
                  {int.type === "Llamada" && <Phone className="h-3.5 w-3.5 text-primary" />}
                  {int.type === "Email" && <Mail className="h-3.5 w-3.5 text-success" />}
                  {int.type === "Reunion" && <Users className="h-3.5 w-3.5 text-warning" />}
                  {int.type === "Seguimiento" && <Clock className="h-3.5 w-3.5 text-muted-foreground" />}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2"><p className="text-xs font-semibold">{int.contact}</p><Badge variant="outline" className="text-[9px]">{int.type}</Badge></div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{int.note}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{int.user} - {int.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
