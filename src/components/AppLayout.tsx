import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Radar,
  FolderKanban,
  Sparkles,
  FileText,
  FileSignature,
  CheckSquare,
  Bell,
  Users,
  Settings,
  LogOut,
  Search,
  Leaf,
} from "lucide-react";
import { Logo } from "./Logo";
import { AIAssistant } from "./AIAssistant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const nav = [
  { to: "/app/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/app/veille", label: "Veille Marchés Publics", icon: Radar },
  { to: "/app/dossiers", label: "Dossiers d'Appels d'Offres", icon: FolderKanban },
  { to: "/app/analyse-ia", label: "Analyse IA", icon: Sparkles },
  { to: "/app/documents", label: "Documents Administratifs", icon: FileText },
  { to: "/app/memoire", label: "Génération Mémoire Technique", icon: FileSignature },
  { to: "/app/taches", label: "Tâches & Échéances", icon: CheckSquare },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/utilisateurs", label: "Utilisateurs & Permissions", icon: Users },
  { to: "/app/parametres", label: "Paramètres", icon: Settings },
] as const;

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-[#F7FAF7]">
      <aside className="w-72 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-sidebar-border flex items-center gap-3">
          <Logo size={42} />
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight text-sm">THE NORTH GARDEN</div>
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">
              Public Tenders Suite
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-primary text-white shadow-elev"
                    : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => {
              localStorage.removeItem("tng_auth");
              navigate({ to: "/" });
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 border-b bg-white/80 backdrop-blur-lg flex items-center px-6 gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un appel d'offres, un dossier, un document…"
              className="pl-9 bg-secondary/60 border-transparent focus-visible:bg-white"
            />
          </div>
          <Badge variant="outline" className="gap-1.5 border-primary/30 text-primary">
            <Leaf className="h-3 w-3" /> Production
          </Badge>
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/app/notifications" })}>
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 pl-3 border-l">
            <Avatar className="h-9 w-9 bg-gradient-primary">
              <AvatarFallback className="bg-transparent text-white font-semibold">YK</AvatarFallback>
            </Avatar>
            <div className="leading-tight hidden md:block">
              <div className="text-sm font-semibold">Youssef El Khattabi</div>
              <div className="text-[11px] text-muted-foreground">Direction</div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <AIAssistant />
    </div>
  );
}