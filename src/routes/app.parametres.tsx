import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/app/parametres")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div>
      <PageHeader title="Paramètres" description="Configurez votre espace THE NORTH GARDEN." />

      <Tabs defaultValue="company">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="company">Informations société</TabsTrigger>
          <TabsTrigger value="categories">Catégories de marchés</TabsTrigger>
          <TabsTrigger value="notifs">Notifications</TabsTrigger>
          <TabsTrigger value="ai">Préférences IA</TabsTrigger>
          <TabsTrigger value="templates">Modèles documentaires</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-4">
          <Card><CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <Logo size={64} />
              <div>
                <div className="font-bold">THE NORTH GARDEN</div>
                <div className="text-xs text-muted-foreground">Services d'aménagement paysagers</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Raison sociale" defaultValue="THE NORTH GARDEN SARL" />
              <Field label="ICE" defaultValue="002847593000091" />
              <Field label="RC" defaultValue="125847 — Tanger" />
              <Field label="IF" defaultValue="48572910" />
              <Field label="Email contact" defaultValue="contact@thenorthgarden.ma" />
              <Field label="Téléphone" defaultValue="+212 539 99 88 77" />
            </div>
            <div><Label>Adresse</Label><Textarea defaultValue="Zone Industrielle Gzenaya, Tanger, Maroc" /></div>
            <Button className="bg-gradient-primary border-0" onClick={() => toast.success("Informations enregistrées")}>Enregistrer</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <Card><CardContent className="p-6 flex flex-wrap gap-2">
            {["Entretien espaces verts", "Création de jardins", "Aménagement paysager", "Arrosage automatique", "Vente de plantes", "Maintenance", "Travaux paysagers"].map((c) => (
              <Badge key={c} variant="outline" className="border-primary/30 text-primary px-3 py-1.5">{c}</Badge>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="notifs" className="mt-4">
          <Card><CardContent className="p-6 space-y-3">
            {["Nouveau marché détecté", "Échéance < 7 jours", "Document expiré", "Mémoire technique à valider", "Synthèse hebdomadaire"].map((n) => (
              <div key={n} className="flex items-center justify-between p-3 border rounded-xl">
                <span className="text-sm">{n}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <Card><CardContent className="p-6 space-y-4">
            <Field label="Modèle IA" defaultValue="NorthGarden GPT-4 Tenders" />
            <Field label="Seuil de pertinence minimum (%)" defaultValue="70" />
            <div className="flex items-center justify-between p-3 border rounded-xl">
              <div><div className="text-sm font-medium">Analyse automatique</div><div className="text-xs text-muted-foreground">Lancer l'IA dès qu'un nouveau marché est détecté</div></div>
              <Switch defaultChecked />
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card><CardContent className="p-6 space-y-2">
            {["Modèle Mémoire Technique 2026", "Modèle Lettre d'engagement", "Modèle CV équipe", "Modèle Planning Gantt"].map((t) => (
              <div key={t} className="flex items-center justify-between p-3 border rounded-xl">
                <span className="text-sm">{t}</span>
                <Button variant="outline" size="sm" onClick={() => toast.success("Modèle téléchargé")}>Télécharger</Button>
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card><CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-xl">
              <div><div className="text-sm font-medium">Double authentification (2FA)</div><div className="text-xs text-muted-foreground">Renforce la sécurité de votre compte</div></div>
              <Switch />
            </div>
            <Field label="Mot de passe actuel" type="password" />
            <Field label="Nouveau mot de passe" type="password" />
            <Button className="bg-gradient-primary border-0" onClick={() => toast.success("Mot de passe mis à jour")}>Mettre à jour</Button>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Input defaultValue={defaultValue} type={type} />
    </div>
  );
}