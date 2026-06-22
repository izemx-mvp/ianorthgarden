import { useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Msg { role: "user" | "ai"; text: string }

const suggestions = [
  "Résume le dernier appel d'offres détecté",
  "Quels sont les documents manquants ?",
  "Génère une checklist pour DO-002",
  "Quelles sont les prochaines actions ?",
];

function aiAnswer(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("manquant")) {
    return "Il manque l'attestation fiscale, l'attestation CNSS et deux références similaires pour finaliser le dossier en cours.";
  }
  if (lower.includes("résume") || lower.includes("resume")) {
    return "L'appel d'offres AO-2026-001 (Commune de Tanger) porte sur l'entretien des espaces verts de la Corniche pour un budget estimé à 2,4 MMAD. Échéance : 05/07/2026. Forte pertinence (96%) pour THE NORTH GARDEN.";
  }
  if (lower.includes("checklist")) {
    return "Checklist générée : 1) Attestation fiscale  2) Attestation CNSS  3) RC à jour  4) Mémoire technique  5) 3 références similaires  6) Caution provisoire  7) Engagement.";
  }
  if (lower.includes("action") || lower.includes("prochain")) {
    return "Actions recommandées : 1) Renouveler l'attestation bancaire (expirée). 2) Finaliser DO-004 (24%). 3) Soumettre DO-002 avant le 12/07. 4) Lancer l'analyse IA sur AO-2026-006.";
  }
  return "Analyse en cours… D'après les données, je recommande de prioriser les dossiers DO-001 et DO-002 dont les échéances sont les plus proches. Voulez-vous que je génère un plan d'action détaillé ?";
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Bonjour 👋 Je suis votre Assistant IA Marchés Publics. Comment puis-je vous aider ?" },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: aiAnswer(text) }]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-primary text-white shadow-elev grid place-items-center hover:scale-105 transition-transform"
        aria-label="Assistant IA"
      >
        {open ? <X /> : <Bot />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] rounded-2xl bg-white shadow-elev border flex flex-col overflow-hidden">
          <div className="p-4 bg-gradient-primary text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <div className="font-semibold leading-tight">Assistant IA</div>
                <div className="text-xs opacity-90">Marchés Publics · en ligne</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7FAF7]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-gradient-primary text-white rounded-br-sm"
                      : "bg-white border rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {messages.length <= 2 && (
              <div className="pt-2 space-y-1.5">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground px-1">Suggestions</div>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left text-xs rounded-lg border bg-white px-3 py-2 hover:border-primary hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="p-3 border-t bg-white flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question…"
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-gradient-primary border-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}