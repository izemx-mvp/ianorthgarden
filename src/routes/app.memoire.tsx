import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { FileSignature, Sparkles, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/memoire")({
  component: MemoirePage,
});

function MemoirePage() {
  const [form, setForm] = useState({
    title: "Entretien des espaces verts de la Corniche de Tanger",
    org: "Commune de Tanger",
    city: "Tanger",
    duration: "24 mois",
    description: "Entretien, taille, arrosage et remplacement des végétaux sur l'ensemble de la corniche.",
    team: "1 Ingénieur agronome, 2 chefs de chantier, 8 jardiniers qualifiés",
    equipment: "Tracteurs tondeuses, taille-haies professionnels, système d'arrosage automatisé",
    refs: "Parc Sindibad (Casablanca), Jardin Wilaya (Tétouan), Espaces verts Lycée Mohammed V (Rabat)",
  });
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      toast.success("Mémoire technique généré");
    }, 1200);
  };

  return (
    <div>
      <PageHeader
        title="Génération Mémoire Technique"
        description="Générez en un clic un mémoire technique professionnel adapté à chaque appel d'offres."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-4">
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-bold mb-2">Paramètres du mémoire</h3>
            <Field label="Intitulé du marché"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Organisme"><Input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} /></Field>
              <Field label="Ville"><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
            </div>
            <Field label="Durée"><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></Field>
            <Field label="Description"><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
            <Field label="Équipe affectée"><Textarea rows={2} value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} /></Field>
            <Field label="Matériel utilisé"><Textarea rows={2} value={form.equipment} onChange={(e) => setForm({ ...form, equipment: e.target.value })} /></Field>
            <Field label="Références similaires"><Textarea rows={2} value={form.refs} onChange={(e) => setForm({ ...form, refs: e.target.value })} /></Field>

            <Button onClick={generate} disabled={loading} className="w-full bg-gradient-primary border-0 mt-2">
              {loading ? <><Loader2 className="h-4 w-4 mr-1 animate-spin" />Génération…</> : <><Sparkles className="h-4 w-4 mr-1" />Générer le mémoire technique</>}
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-card p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <FileSignature className="h-4 w-4" /> Aperçu du document
              </div>
              <Button size="sm" variant="outline" disabled={!generated} onClick={() => toast.success("PDF téléchargé")}>
                <Download className="h-4 w-4 mr-1" />Télécharger PDF
              </Button>
            </div>

            <div className="p-8 bg-white max-h-[720px] overflow-y-auto" style={{ fontFamily: "Inter, system-ui" }}>
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <Logo size={48} withText />
                <div className="text-right text-xs text-muted-foreground">
                  <div className="font-mono">MT-2026-{Math.floor(Math.random() * 900 + 100)}</div>
                  <div>{new Date().toLocaleDateString("fr-FR")}</div>
                </div>
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-primary">Mémoire Technique</h1>
              <h2 className="text-lg font-semibold mt-1">{form.title}</h2>
              <div className="text-sm text-muted-foreground">Présenté à : {form.org} — {form.city}</div>

              {!generated ? (
                <div className="mt-10 text-sm text-muted-foreground text-center">
                  Cliquez sur « Générer le mémoire technique » pour produire les sections complètes.
                </div>
              ) : (
                <div className="space-y-5 mt-6 text-sm leading-relaxed">
                  <Sec n="1" t="Présentation de THE NORTH GARDEN">
                    THE NORTH GARDEN est une société marocaine spécialisée dans l'aménagement paysager, l'entretien des espaces verts, la création de jardins, l'installation de systèmes d'arrosage automatique et la vente de plantes. Implantée dans le Nord du Maroc, elle accompagne collectivités, ministères et entreprises depuis plus de 10 ans.
                  </Sec>
                  <Sec n="2" t="Compréhension du besoin">
                    Le présent marché vise {form.description.toLowerCase()} L'objectif est d'assurer la qualité paysagère et la pérennité des espaces verts confiés.
                  </Sec>
                  <Sec n="3" t="Méthodologie">
                    Notre approche s'articule autour de 4 phases : diagnostic initial, planification des interventions, exécution avec contrôle qualité hebdomadaire, et reporting mensuel à l'autorité contractante.
                  </Sec>
                  <Sec n="4" t="Moyens humains">{form.team}</Sec>
                  <Sec n="5" t="Moyens matériels">{form.equipment}</Sec>
                  <Sec n="6" t="Planning prévisionnel">
                    Démarrage immédiat à notification · Phase 1 : 0-2 mois (diagnostic) · Phase 2 : 2-{form.duration} (exécution continue).
                  </Sec>
                  <Sec n="7" t="Références similaires">{form.refs}</Sec>
                  <Sec n="8" t="Engagement qualité">
                    Certifié ISO 9001, THE NORTH GARDEN garantit le respect des cahiers des charges et l'utilisation de matériaux conformes aux normes en vigueur.
                  </Sec>
                  <Sec n="9" t="Conclusion">
                    Forts de notre expertise et de nos moyens, nous nous engageons à délivrer une prestation exemplaire dans les délais impartis.
                  </Sec>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>{children}</div>;
}

function Sec({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-bold text-primary"><span className="opacity-60 mr-1">{n}.</span>{t}</h3>
      <p className="text-foreground/80 mt-1">{children}</p>
    </div>
  );
}