import { Badge } from "@/components/ui/badge";

const palette: Record<string, string> = {
  "Nouveau": "bg-primary/10 text-primary border-primary/20",
  "En analyse": "bg-[#7DC832]/15 text-[#2D7A2D] border-[#7DC832]/30",
  "En préparation": "bg-amber-50 text-amber-700 border-amber-200",
  "Soumis": "bg-blue-50 text-blue-700 border-blue-200",
  "Gagné": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Perdu": "bg-rose-50 text-rose-700 border-rose-200",
  "Brouillon": "bg-slate-100 text-slate-600 border-slate-200",
  "En cours": "bg-[#7DC832]/15 text-[#2D7A2D] border-[#7DC832]/30",
  "À valider": "bg-amber-50 text-amber-700 border-amber-200",
  "Clôturé": "bg-slate-100 text-slate-600 border-slate-200",
  "Valide": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Expire bientôt": "bg-amber-50 text-amber-700 border-amber-200",
  "Expiré": "bg-rose-50 text-rose-700 border-rose-200",
  "Manquant": "bg-rose-50 text-rose-700 border-rose-200",
  "Actif": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Inactif": "bg-slate-100 text-slate-600 border-slate-200",
  "Haute": "bg-rose-50 text-rose-700 border-rose-200",
  "Moyenne": "bg-amber-50 text-amber-700 border-amber-200",
  "Basse": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Urgent": "bg-rose-50 text-rose-700 border-rose-200",
  "Documents": "bg-blue-50 text-blue-700 border-blue-200",
  "Marchés Publics": "bg-[#7DC832]/15 text-[#2D7A2D] border-[#7DC832]/30",
  "Tâches": "bg-amber-50 text-amber-700 border-amber-200",
  "Système": "bg-slate-100 text-slate-600 border-slate-200",
  "À faire": "bg-slate-100 text-slate-600 border-slate-200",
  "Terminé": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = palette[status] ?? "bg-slate-100 text-slate-600 border-slate-200";
  return <Badge variant="outline" className={`${cls} font-medium`}>{status}</Badge>;
}