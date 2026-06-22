import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Sparkles, ListChecks, FolderPlus, AlertTriangle, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/analyse-ia")({
  component: AnalyseIA,
});

function AnalyseIA() {
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const run = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
      toast.success("Analyse IA terminée");
    }, 1200);
  };

  return (
    <div>
      <PageHeader
        title="Analyse IA"
        description="Importez un cahier des charges et laissez l'IA extraire les exigences, identifier les risques et préparer votre réponse."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center bg-gradient-card">
              <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-primary text-white grid place-items-center shadow-elev">
                <UploadCloud className="h-7 w-7" />
              </div>
              <h3 className="font-semibold mt-4">Déposer un cahier des charges</h3>
              <p className="text-sm text-muted-foreground mt-1">PDF, DOCX jusqu'à 25 Mo</p>
              <Button className="mt-4 bg-gradient-primary border-0" onClick={run} disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 mr-1 animate-spin" />Analyse en cours…</> : <><Sparkles className="h-4 w-4 mr-1" />Lancer l'analyse</>}
              </Button>
            </div>

            <div className="mt-6 space-y-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Documents récents</div>
              {["CPS_Tanger_EspacesVerts.pdf", "RC_Casablanca_Sindibad.pdf", "AO_Tetouan_JardinPublic.docx"].map((f) => (
                <div key={f} className="flex items-center gap-3 p-3 border rounded-xl hover:bg-secondary/40">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm flex-1">{f}</span>
                  <Button size="sm" variant="ghost" onClick={run}>Analyser</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={analyzed ? "" : "opacity-60"}>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Résultats de l'analyse IA</h3>
              {analyzed && <Badge className="bg-gradient-primary border-0 text-white">Confiance 94%</Badge>}
            </div>

            {!analyzed ? (
              <p className="text-sm text-muted-foreground">Importez ou sélectionnez un cahier des charges pour générer les résultats.</p>
            ) : (
              <>
                <Section title="Résumé automatique" icon={Sparkles}>
                  Cet appel d'offres porte sur l'entretien des espaces verts de la Corniche de Tanger pour une durée de 24 mois,
                  avec une option de reconduction. Budget estimé : 2,4 MMAD. La prestation inclut tonte, taille, arrosage et
                  remplacement des végétaux.
                </Section>

                <Section title="Documents requis" icon={ListChecks}>
                  <ul className="grid sm:grid-cols-2 gap-1.5 text-sm">
                    {["Attestation fiscale", "Attestation CNSS", "Registre de commerce", "Assurance RC", "Caution provisoire", "Mémoire technique", "Références similaires", "RIB bancaire"].map((d) => (
                      <li key={d} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{d}</li>
                    ))}
                  </ul>
                </Section>

                <Section title="Critères d'éligibilité" icon={CheckCircle2}>
                  Chiffre d'affaires moyen ≥ 5 MMAD sur 3 ans · Au moins 3 références similaires sur les 5 dernières années ·
                  Personnel qualifié (ingénieur agronome + chef de chantier).
                </Section>

                <Section title="Analyse des risques" icon={AlertTriangle}>
                  <div className="space-y-1.5 text-sm">
                    <Risk level="Élevé" text="Délai de soumission court (15 jours)." />
                    <Risk level="Moyen" text="Caution provisoire de 50 000 MAD requise." />
                    <Risk level="Faible" text="Critères techniques alignés avec notre savoir-faire." />
                  </div>
                </Section>

                <Section title="Pièces manquantes" icon={AlertTriangle}>
                  <div className="flex flex-wrap gap-1.5">
                    {["Attestation fiscale (à jour)", "2 références similaires", "Caution provisoire"].map((m) => (
                      <Badge key={m} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">{m}</Badge>
                    ))}
                  </div>
                </Section>

                <div className="rounded-xl border border-primary/30 bg-gradient-card p-4">
                  <div className="flex items-center gap-2 text-primary font-semibold"><Sparkles className="h-4 w-4" />Recommandation IA</div>
                  <p className="text-sm mt-2">
                    Cet appel d'offres est pertinent pour THE NORTH GARDEN sous réserve de fournir des références similaires
                    et des attestations administratives à jour.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline"><ListChecks className="h-4 w-4 mr-1" />Extraire les exigences</Button>
                  <Button variant="outline"><CheckCircle2 className="h-4 w-4 mr-1" />Générer checklist</Button>
                  <Button className="bg-gradient-primary border-0"><FolderPlus className="h-4 w-4 mr-1" />Préparer le dossier</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">
        <Icon className="h-4 w-4 text-primary" />{title}
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function Risk({ level, text }: { level: string; text: string }) {
  const color = level === "Élevé" ? "bg-rose-50 text-rose-700 border-rose-200" : level === "Moyen" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200";
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={color}>{level}</Badge>
      <span>{text}</span>
    </div>
  );
}