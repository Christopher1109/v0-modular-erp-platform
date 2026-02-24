"use client"

import { Megaphone, Mail, Target, TrendingUp, Eye, MousePointerClick, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const campaigns = [
  { name: "Lanzamiento Q1 2026", channel: "Multi-canal", status: "Activa", budget: 120000, spent: 78000, leads: 342, conversions: 28, roi: 3.2 },
  { name: "Retargeting Clientes", channel: "Google Ads", status: "Activa", budget: 45000, spent: 32000, leads: 156, conversions: 18, roi: 4.1 },
  { name: "Newsletter Febrero", channel: "Email", status: "Completada", budget: 5000, spent: 4800, leads: 89, conversions: 12, roi: 6.8 },
  { name: "LinkedIn B2B", channel: "Social", status: "Pausada", budget: 30000, spent: 15000, leads: 67, conversions: 5, roi: 1.8 },
  { name: "Evento Presencial", channel: "Offline", status: "Planificada", budget: 80000, spent: 0, leads: 0, conversions: 0, roi: 0 },
]

const channelPerformance = [
  { channel: "Google Ads", leads: 245, cost: 52000, cpl: 212 },
  { channel: "Email", leads: 189, cost: 8500, cpl: 45 },
  { channel: "Social Media", leads: 134, cost: 28000, cpl: 209 },
  { channel: "Referidos", leads: 98, cost: 5000, cpl: 51 },
  { channel: "Organico", leads: 156, cost: 0, cpl: 0 },
]

function statusBadge(s: string) {
  const m: Record<string, string> = { "Activa": "bg-success/10 text-success border-success/20 hover:bg-success/10", "Completada": "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10", "Pausada": "bg-warning/10 text-warning border-warning/20 hover:bg-warning/10", "Planificada": "bg-muted text-muted-foreground hover:bg-muted" }
  return <Badge className={`${m[s] || ""} text-[10px]`}>{s}</Badge>
}

export function MarketingModule() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fuchsia-500/10"><Megaphone className="h-4 w-4 text-fuchsia-600" /></div><div><p className="text-sm font-medium text-foreground">Campanas Multi-canal</p><p className="text-xs text-muted-foreground mt-0.5">Email, social, ads, offline</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Target className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-medium text-foreground">Segmentacion</p><p className="text-xs text-muted-foreground mt-0.5">Audiencias inteligentes</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10"><TrendingUp className="h-4 w-4 text-success" /></div><div><p className="text-sm font-medium text-foreground">ROI por Campana</p><p className="text-xs text-muted-foreground mt-0.5">Retorno de inversion</p></div></div>
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10"><MousePointerClick className="h-4 w-4 text-warning" /></div><div><p className="text-sm font-medium text-foreground">Conversion</p><p className="text-xs text-muted-foreground mt-0.5">Lead a cliente</p></div></div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Campanas Activas</p><p className="text-2xl font-bold text-foreground mt-2">2</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Leads Generados</p><p className="text-2xl font-bold text-primary mt-2">654</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">Tasa Conversion</p><p className="text-2xl font-bold text-success mt-2">9.6%</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs text-muted-foreground">ROI Promedio</p><p className="text-2xl font-bold text-foreground mt-2">3.9x</p></CardContent></Card>
      </div>

      {/* Campaigns */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Campanas</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {campaigns.map(c => (
              <div key={c.name} className="flex items-center gap-4 p-4 rounded-lg border">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap"><p className="text-sm font-semibold">{c.name}</p>{statusBadge(c.status)}<Badge variant="outline" className="text-[9px]">{c.channel}</Badge></div>
                  <div className="flex items-center gap-2 mt-2"><Progress value={c.budget > 0 ? (c.spent / c.budget) * 100 : 0} className="flex-1 h-1.5" /><span className="text-[10px] text-muted-foreground shrink-0">${(c.spent / 1000).toFixed(0)}K / ${(c.budget / 1000).toFixed(0)}K</span></div>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{c.leads} leads</span>
                    <span className="flex items-center gap-1"><MousePointerClick className="h-3 w-3" />{c.conversions} conversiones</span>
                    {c.roi > 0 && <span className="flex items-center gap-1 text-success font-semibold"><ArrowUpRight className="h-3 w-3" />{c.roi}x ROI</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Rendimiento por Canal</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 89%)" />
              <XAxis dataKey="channel" tick={{ fontSize: 10 }} stroke="hsl(215, 14%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 14%, 46%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 18%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="leads" fill="hsl(213, 72%, 42%)" radius={[4, 4, 0, 0]} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
