import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { users } from "@/lib/mock-data";
import { UserPlus } from "lucide-react";

export const Route = createFileRoute("/app/utilisateurs")({
  component: UsersPage,
});

function UsersPage() {
  return (
    <div>
      <PageHeader
        title="Utilisateurs & Permissions"
        description="Gérez les accès et permissions des collaborateurs de THE NORTH GARDEN."
        actions={<Button className="bg-gradient-primary border-0"><UserPlus className="h-4 w-4 mr-1" />Inviter un utilisateur</Button>}
      />

      <div className="grid lg:grid-cols-2 gap-4">
        {users.map((u) => {
          const initials = u.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
          return (
            <Card key={u.id} className="hover:border-primary/40 hover:shadow-soft transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 bg-gradient-primary">
                    <AvatarFallback className="bg-transparent text-white font-semibold">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-semibold">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </div>
                      <StatusBadge status={u.status} />
                    </div>
                    <Badge variant="outline" className="mt-2 border-primary/30 text-primary">{u.role}</Badge>
                    <div className="mt-3">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">Permissions</div>
                      <div className="flex flex-wrap gap-1.5">
                        {u.permissions.map((p) => (
                          <span key={p} className="text-[11px] bg-secondary px-2 py-0.5 rounded-full">{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}