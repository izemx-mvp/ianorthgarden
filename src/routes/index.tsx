import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Connexion — THE NORTH GARDEN Public Tenders Suite" },
      { name: "description", content: "Connectez-vous à votre plateforme intelligente de gestion des marchés publics." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@thenorthgarden.ma");
  const [password, setPassword] = useState("demo123");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("tng_auth")) {
      navigate({ to: "/app/dashboard" });
    }
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("tng_auth", "1");
    toast.success("Bienvenue sur THE NORTH GARDEN Public Tenders Suite");
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gradient-primary text-white">
        <div className="absolute inset-0 leaf-pattern opacity-60" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#A9D97A]/30 blur-3xl" />

        <div className="relative z-10">
          <Logo size={56} />
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
            THE NORTH GARDEN
            <span className="block text-[#D5F2A8] text-2xl xl:text-3xl mt-2">
              Public Tenders Suite
            </span>
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Votre plateforme intelligente de gestion des marchés publics.
          </p>
          <div className="space-y-3 pt-4">
            {[
              { icon: Sparkles, t: "Analyse IA des appels d'offres" },
              { icon: Leaf, t: "Génération automatique de mémoires techniques" },
              { icon: ShieldCheck, t: "Suivi des échéances & documents" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-3 text-white/95">
                <div className="h-9 w-9 rounded-lg bg-white/15 grid place-items-center">
                  <Icon className="h-4.5 w-4.5" size={18} />
                </div>
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-white/70">
          © 2026 THE NORTH GARDEN · Services d'aménagement paysagers
        </div>
      </div>

      {/* Right login card */}
      <div className="relative flex items-center justify-center p-6 lg:p-12 leaf-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F1F8EC]" />
        <div className="relative w-full max-w-md">
          <div className="lg:hidden mb-6 flex justify-center">
            <Logo size={56} withText />
          </div>

          <div className="glass rounded-2xl p-8 shadow-elev border-white/40">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight">Se connecter</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Accédez à votre espace de gestion des marchés publics.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@thenorthgarden.ma"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a href="#" className="text-xs text-primary hover:underline">Mot de passe oublié ?</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary border-0 h-11 shadow-elev hover:opacity-95">
                Se connecter
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>

            <div className="mt-6 p-3 rounded-xl border border-dashed border-primary/30 bg-primary/[0.03]">
              <div className="text-[11px] uppercase tracking-wider text-primary font-semibold">
                Identifiants de démonstration
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="font-mono">demo@thenorthgarden.ma</span> · <span className="font-mono">demo123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
