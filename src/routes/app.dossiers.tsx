import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dossiers, tenders } from "@/lib/mock-data";
import { FilePlus2, ListChecks, FileSignature, Sparkles, Send, ChevronRight, Paperclip, Check, X as XIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/dossiers")({
  component: DossiersPage,
});

function DossiersPage() {
  const [selected, setSelected] = useState(dossiers[0].id);
  const dossier = dossiers.find((d) => d.id === selected)!;
  const tender = tenders.find((t) => t.id === dossier.tenderId);

  return (
    <div>
      <PageHeader
        title="Dossiers d'Appels d'Offres"
        description="Pilotez la préparation, la validation et la soumission de vos dossiers de marchés publics."
      />

      <div className="grid lg:grid-cols-[360px_1fr] gap-4">
        {/* List */}
        <Card className="lg:sticky lg:top-20 h-fit">
          <CardContent className="p-2">
            {dossiers.map((d) => {
              const t = tenders.find((x) => x.id === d.tenderId);
              const active = d.id === selected;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelected(d.id)}
                  className={`w-full text-left p-3 rounded-xl transition-colors ${active ? "bg-gradient-card border border-primary/20" : "hover:bg-secondary/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground">{d.reference}</span>
                    <StatusBadge status={d.status} />
                  </div>
                  <div className="text-sm font-semibold mt-1 line-clamp-1">{d.client}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{t?.title}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={d.completion} className="h-1.5" />
                    <span className="text-[11px] font-semibold w-9 text-right">{d.completion}%</span>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Detail */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{dossier.reference}</div>
                <h2 className="text-xl font-bold mt-1">{tender?.title}</h2>
                <div className="text-sm text-muted-foreground mt-1">{dossier.client} · Assigné à {dossier.assignee}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.success("Checklist générée")}><ListChecks className="h-4 w-4 mr-1" />Générer checklist</Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Analyse IA en cours…")}><Sparkles className="h-4 w-4 mr-1" />Analyse IA</Button>
                <Button size="sm" className="bg-gradient-primary border-0" onClick={() => toast.success("Dossier marqué comme soumis")}><Send className="h-4 w-4 mr-1" />Soumettre</Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-5">
              <Stat label="Échéance" value={new Date(dossier.deadline).toLocaleDateString("fr-FR")} />
              <Stat label="Avancement" value={`${dossier.completion}%`} />
              <Stat label="Documents manquants" value={`${dossier.missingDocs.length}`} />
            </div>

            <Tabs defaultValue="general" className="mt-6">
              <TabsList className="flex-wrap h-auto">
                <TabsTrigger value="general">Informations générales</TabsTrigger>
                <TabsTrigger value="admin">Pièces administratives</TabsTrigger>
                <TabsTrigger value="tech">Pièces techniques</TabsTrigger>
                <TabsTrigger value="fin">Pièces financières</TabsTrigger>
                <TabsTrigger value="check">Checklist</TabsTrigger>
                <TabsTrigger value="hist">Historique</TabsTrigger>
                <TabsTrigger value="com">Commentaires</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-3 mt-4 text-sm">
                <Row k="Référence" v={dossier.reference} />
                <Row k="Organisme" v={tender?.organization ?? "—"} />
                <Row k="Ville" v={tender?.city ?? "—"} />
                <Row k="Budget estimé" v={tender ? new Intl.NumberFormat("fr-FR").format(tender.budget) + " MAD" : "—"} />
                <Row k="Date publication" v={tender ? new Date(tender.publishedAt).toLocaleDateString("fr-FR") : "—"} />
                <Row k="Date limite" v={new Date(dossier.deadline).toLocaleDateString("fr-FR")} />
              </TabsContent>

              {(["admin", "tech", "fin"] as const).map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-muted-foreground">{tab === "admin" ? "Documents administratifs" : tab === "tech" ? "Documents techniques" : "Documents financiers"}</div>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Document ajouté")}><FilePlus2 className="h-4 w-4 mr-1" />Ajouter</Button>
                  </div>
                  <div className="space-y-2">
                    {["Attestation fiscale", "Registre de commerce", "RIB bancaire", "Assurance RC"].map((doc, i) => (
                      <div key={doc} className="flex items-center gap-3 p-3 border rounded-xl">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm flex-1">{doc}</span>
                        {i < 3 ? <StatusBadge status="Valide" /> : <StatusBadge status="Manquant" />}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}

              <TabsContent value="check" className="mt-4 space-y-2">
                {[
                  { t: "Attestation fiscale à jour", ok: true },
                  { t: "Attestation CNSS", ok: true },
                  { t: "Mémoire technique signé", ok: false },
                  { t: "3 références similaires", ok: false },
                  { t: "Caution provisoire", ok: true },
                ].map((c) => (
                  <div key={c.t} className="flex items-center gap-3 p-3 border rounded-xl">
                    <div className={`h-6 w-6 rounded-full grid place-items-center ${c.ok ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                      {c.ok ? <Check className="h-3.5 w-3.5" /> : <XIcon className="h-3.5 w-3.5" />}
                    </div>
                    <span className="text-sm">{c.t}</span>
                  </div>
                ))}
                <Button className="bg-gradient-primary border-0 mt-2"><FileSignature className="h-4 w-4 mr-1" />Générer le mémoire technique</Button>
              </TabsContent>

              <TabsContent value="hist" className="mt-4 space-y-3">
                {["Dossier créé", "Pièces administratives ajoutées", "Analyse IA exécutée", "Validation interne"].map((h, i) => (
                  <div key={h} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{h}</div>
                      <div className="text-xs text-muted-foreground">Il y a {i + 1} jour(s) · par Sara Idrissi</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="com" className="mt-4">
                <div className="space-y-3">
                  {[
                    { a: "Sara Idrissi", t: "Mémoire technique prêt pour relecture." },
                    { a: "Mehdi Tazi", t: "Ajouter les références de Tanger 2024." },
                  ].map((c) => (
                    <div key={c.a} className="p-3 border rounded-xl">
                      <div className="text-sm font-semibold">{c.a}</div>
                      <div className="text-sm text-muted-foreground">{c.t}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-gradient-card p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-lg font-bold text-primary mt-0.5">{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b py-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}