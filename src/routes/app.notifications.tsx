import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { initialNotifications, NotifType } from "@/lib/mock-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/app/notifications")({
  component: NotificationsPage,
});

const filters: ("Tous" | NotifType)[] = ["Tous", "Urgent", "Documents", "Marchés Publics", "Tâches", "Système"];

function NotificationsPage() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tous");
  const filtered = filter === "Tous" ? items : items.filter((n) => n.type === filter);

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Toutes les alertes liées à vos appels d'offres, documents et échéances."
        actions={<Button variant="outline" onClick={() => setItems((arr) => arr.map((n) => ({ ...n, read: true })))}><Check className="h-4 w-4 mr-1" />Tout marquer comme lu</Button>}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === f ? "bg-gradient-primary text-white border-transparent" : "bg-white hover:border-primary/40"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0 divide-y">
          {filtered.map((n) => (
            <div key={n.id} className={`flex items-start gap-3 p-4 ${!n.read ? "bg-gradient-card" : ""}`}>
              <div className={`h-2.5 w-2.5 rounded-full mt-1.5 ${!n.read ? "bg-primary" : "bg-muted"}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{n.title}</span>
                  <StatusBadge status={n.type} />
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">{n.detail}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{n.date}</div>
              </div>
              {!n.read && (
                <Button variant="ghost" size="sm" onClick={() => setItems((arr) => arr.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}>
                  Marquer lu
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}