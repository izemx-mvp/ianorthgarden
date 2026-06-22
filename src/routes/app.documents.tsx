import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { adminDocs } from "@/lib/mock-data";
import { Eye, RefreshCw, Download, AlertTriangle, FilePlus2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  const [q, setQ] = useState("");
  const docs = adminDocs.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()));
  const alerts = adminDocs.filter((d) => d.status === "Expire bientôt" || d.status === "Expiré" || d.status === "Manquant");

  return (
    <div>
      <PageHeader
        title="Documents Administratifs"
        description="Centralisez et suivez la validité de tous les documents requis pour vos soumissions."
        actions={<Button className="bg-gradient-primary border-0"><FilePlus2 className="h-4 w-4 mr-1" />Ajouter un document</Button>}
      />

      {alerts.length > 0 && (
        <Card className="mb-4 border-amber-200 bg-amber-50/50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-amber-900">{alerts.length} document(s) nécessitent votre attention</div>
              <div className="text-sm text-amber-800">{alerts.map((a) => a.name).join(" · ")}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-4">
        <CardContent className="p-4">
          <Input placeholder="Rechercher un document…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-md" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {docs.map((d) => (
              <div key={d.id} className="flex items-center gap-4 p-4 hover:bg-secondary/40">
                <div className="h-10 w-10 rounded-xl bg-gradient-card grid place-items-center text-primary text-xs font-bold">
                  {d.category.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.category}{d.expiry ? ` · Expire le ${new Date(d.expiry).toLocaleDateString("fr-FR")}` : ""}</div>
                </div>
                <StatusBadge status={d.status} />
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => toast("Aperçu de " + d.name)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => toast.success("Document remplacé")}><RefreshCw className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => toast.success("Téléchargement…")}><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}