import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Radar,
  FolderKanban,
  Send,
  Trophy,
  CalendarClock,
  FileWarning,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  kpis,
  chartRepartition,
  chartSectors,
  chartEvolution,
  tenders,
  initialNotifications,
  dossiers,
  formatMAD,
} from "@/lib/mock-data";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

const GREENS = ["#2D7A2D", "#4D9B4D", "#7DC832", "#A9D97A"];

const kpiCards = [
  { label: "Appels d'offres détectés", value: kpis.detected, icon: Radar, trend: "+12%" },
  { label: "Dossiers en cours", value: kpis.ongoing, icon: FolderKanban, trend: "+3" },
  { label: "Dossiers soumis", value: kpis.submitted, icon: Send, trend: "+2" },
  { label: "Dossiers gagnés", value: kpis.won, icon: Trophy, trend: "+1" },
  { label: "Échéances proches", value: kpis.upcomingDeadlines, icon: CalendarClock, trend: "J-7" },
  { label: "Documents manquants", value: kpis.missingDocs, icon: FileWarning, trend: "Action requise" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary text-white p-8 shadow-elev">
        <div className="absolute inset-0 leaf-pattern opacity-50" />
        <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <Badge className="bg-white/15 text-white border-white/20 mb-3 hover:bg-white/20">
            <Sparkles className="h-3 w-3 mr-1" /> Plateforme IA active
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Bienvenue sur THE NORTH GARDEN Public Tenders Suite.
          </h1>
          <p className="mt-3 text-white/90 leading-relaxed">
            Gérez vos appels d'offres, automatisez vos dossiers et développez vos opportunités
            commerciales grâce à l'intelligence artificielle.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/95">
              <Link to="/app/veille">Voir les nouveaux marchés <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:bg-white/15">
              <Link to="/app/analyse-ia">Lancer une analyse IA</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map(({ label, value, icon: Icon, trend }) => (
          <Card key={label} className="border-border/70 hover:border-primary/40 hover:shadow-soft transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-xl bg-gradient-card grid place-items-center text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {trend}
                </span>
              </div>
              <div className="mt-4 text-3xl font-extrabold tracking-tight">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Évolution des soumissions</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">6 derniers mois</p>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary gap-1">
              <TrendingUp className="h-3 w-3" /> +44%
            </Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartEvolution}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7DC832" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#7DC832" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D7A2D" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#2D7A2D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E6EAE6" vertical={false} />
                <XAxis dataKey="mois" stroke="#5F6368" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#5F6368" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E6EAE6" }} />
                <Area dataKey="soumissions" stroke="#7DC832" strokeWidth={2} fill="url(#g1)" />
                <Area dataKey="gains" stroke="#2D7A2D" strokeWidth={2} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Répartition des dossiers</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={chartRepartition} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {chartRepartition.map((_, i) => (
                    <Cell key={i} fill={GREENS[i % GREENS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E6EAE6" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Opportunités par secteur</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartSectors}>
                <CartesianGrid stroke="#E6EAE6" vertical={false} />
                <XAxis dataKey="name" stroke="#5F6368" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#5F6368" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E6EAE6" }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartSectors.map((_, i) => (
                    <Cell key={i} fill={GREENS[i % GREENS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dossiers gagnés / perdus</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={[{ name: "Gagnés", value: 5 }, { name: "Perdus", value: 3 }]} dataKey="value" nameKey="name" outerRadius={90}>
                  <Cell fill="#2D7A2D" />
                  <Cell fill="#A9D97A" />
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E6EAE6" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom rows */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Dernières notifications</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/app/notifications">Voir tout</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {initialNotifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.detail}</div>
                </div>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">{n.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Prochains délais</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/app/dossiers">Dossiers</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {dossiers.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50">
                <div className="h-10 w-10 rounded-lg bg-gradient-card grid place-items-center text-primary text-xs font-bold">
                  {d.reference.slice(-2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{d.client}</div>
                  <div className="text-xs text-muted-foreground">Échéance {new Date(d.deadline).toLocaleDateString("fr-FR")}</div>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Derniers marchés détectés</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/app/veille">Veille</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {tenders.slice(0, 4).map((t) => (
              <div key={t.id} className="p-2.5 rounded-lg hover:bg-secondary/50">
                <div className="text-sm font-medium line-clamp-1">{t.title}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{t.city} · {formatMAD(t.budget)}</span>
                  <span className="text-[11px] font-semibold text-primary">{t.relevance}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}