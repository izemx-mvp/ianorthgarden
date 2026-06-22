import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { Sparkles, FolderPlus, MapPin, Building2, Calendar, Wallet, Target } from "lucide-react";
import { tenders, formatMAD } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/veille")({
  component: VeillePage,
});

const cities = ["Toutes", "Tanger", "Tétouan", "Rabat", "Casablanca", "Marrakech", "Fès"];
const statuses = ["Tous", "Nouveau", "En analyse", "En préparation", "Soumis", "Gagné", "Perdu"];

function VeillePage() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("Toutes");
  const [status, setStatus] = useState("Tous");

  const list = useMemo(
    () =>
      tenders.filter((t) => {
        if (q && !`${t.title} ${t.organization}`.toLowerCase().includes(q.toLowerCase())) return false;
        if (city !== "Toutes" && t.city !== city) return false;
        if (status !== "Tous" && t.status !== status) return false;
        return true;
      }),
    [q, city, status],
  );

  return (
    <div>
      <PageHeader
        title="Veille Marchés Publics"
        description="Surveillez en temps réel les appels d'offres pertinents pour THE NORTH GARDEN à travers le Maroc."
        actions={
          <Badge variant="outline" className="border-primary/30 text-primary">
            {list.length} opportunités détectées
          </Badge>
        }
      />

      <Card className="mb-4">
        <CardContent className="p-4 flex flex-wrap gap-3">
          <Input
            placeholder="Rechercher un marché ou un organisme…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="md:max-w-sm"
          />
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Ville" /></SelectTrigger>
            <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((t) => (
          <Card key={t.id} className="group hover:border-primary/40 hover:shadow-soft transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-[11px] font-mono text-muted-foreground">{t.reference}</div>
                  <h3 className="font-semibold leading-snug mt-0.5 line-clamp-2">{t.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pertinence</div>
                  <div className="text-lg font-extrabold text-primary">{t.relevance}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground"><Building2 className="h-3.5 w-3.5" />{t.organization}</div>
                <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{t.city}</div>
                <div className="flex items-center gap-1.5 text-muted-foreground"><Calendar className="h-3.5 w-3.5" />Échéance {new Date(t.deadline).toLocaleDateString("fr-FR")}</div>
                <div className="flex items-center gap-1.5 text-muted-foreground"><Wallet className="h-3.5 w-3.5" />{formatMAD(t.budget)}</div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <StatusBadge status={t.status} />
                  <Badge variant="outline" className="text-[10px] gap-1"><Target className="h-3 w-3" />{t.sector}</Badge>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button size="sm" className="bg-gradient-primary border-0 flex-1" onClick={() => toast.success("Analyse IA lancée sur " + t.reference)}>
                  <Sparkles className="h-3.5 w-3.5 mr-1" /> Analyser avec IA
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success("Dossier créé pour " + t.reference)}>
                  <FolderPlus className="h-3.5 w-3.5 mr-1" /> Créer dossier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}