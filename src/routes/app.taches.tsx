import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { tasks as seed, Task, TaskStatus } from "@/lib/mock-data";
import { Calendar, User, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/taches")({
  component: TachesPage,
});

const columns: TaskStatus[] = ["À faire", "En cours", "À valider", "Terminé"];
const next: Record<TaskStatus, TaskStatus | null> = {
  "À faire": "En cours",
  "En cours": "À valider",
  "À valider": "Terminé",
  "Terminé": null,
};

function TachesPage() {
  const [list, setList] = useState<Task[]>(seed);

  const move = (id: string) => {
    setList((arr) =>
      arr.map((t) => {
        if (t.id !== id) return t;
        const n = next[t.status];
        if (!n) return t;
        toast.success(`Tâche déplacée vers « ${n} »`);
        return { ...t, status: n };
      }),
    );
  };

  return (
    <div>
      <PageHeader
        title="Tâches & Échéances"
        description="Pilotez l'avancement de votre équipe sur l'ensemble des dossiers en cours."
        actions={<Button className="bg-gradient-primary border-0"><Plus className="h-4 w-4 mr-1" />Nouvelle tâche</Button>}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const items = list.filter((t) => t.status === col);
          return (
            <div key={col} className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{col}</h3>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{items.length}</span>
                </div>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {items.map((t) => (
                  <Card key={t.id} className="hover:border-primary/40 hover:shadow-soft transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-muted-foreground">{t.tenderRef}</span>
                        <StatusBadge status={t.priority} />
                      </div>
                      <div className="text-sm font-semibold mt-2">{t.title}</div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(t.dueDate).toLocaleDateString("fr-FR")}</span>
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{t.owner}</span>
                      </div>
                      {next[t.status] && (
                        <Button size="sm" variant="ghost" className="mt-2 w-full justify-between text-primary hover:bg-primary/5" onClick={() => move(t.id)}>
                          Passer à « {next[t.status]} » <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}