export type TenderStatus = "Nouveau" | "En analyse" | "En préparation" | "Soumis" | "Gagné" | "Perdu";

export interface Tender {
  id: string;
  reference: string;
  title: string;
  organization: string;
  city: string;
  publishedAt: string;
  deadline: string;
  budget: number;
  status: TenderStatus;
  relevance: number;
  sector: string;
}

export const tenders: Tender[] = [
  {
    id: "t1",
    reference: "AO-2026-001",
    title: "Entretien des espaces verts de la Corniche de Tanger",
    organization: "Commune de Tanger",
    city: "Tanger",
    publishedAt: "2026-06-10",
    deadline: "2026-07-05",
    budget: 2_400_000,
    status: "En analyse",
    relevance: 96,
    sector: "Entretien espaces verts",
  },
  {
    id: "t2",
    reference: "AO-2026-002",
    title: "Création d'un jardin public à Tétouan – Quartier Wilaya",
    organization: "Province de Tétouan",
    city: "Tétouan",
    publishedAt: "2026-06-12",
    deadline: "2026-07-12",
    budget: 4_800_000,
    status: "En préparation",
    relevance: 91,
    sector: "Création de jardins",
  },
  {
    id: "t3",
    reference: "AO-2026-003",
    title: "Installation système d'arrosage automatique – Lycée Mohammed V",
    organization: "Direction Régionale de l'Éducation",
    city: "Rabat",
    publishedAt: "2026-06-08",
    deadline: "2026-06-28",
    budget: 1_250_000,
    status: "Nouveau",
    relevance: 88,
    sector: "Arrosage automatique",
  },
  {
    id: "t4",
    reference: "AO-2026-004",
    title: "Aménagement paysager du parc Sindibad",
    organization: "Commune de Casablanca",
    city: "Casablanca",
    publishedAt: "2026-06-01",
    deadline: "2026-06-25",
    budget: 6_300_000,
    status: "Soumis",
    relevance: 84,
    sector: "Aménagement paysager",
  },
  {
    id: "t5",
    reference: "AO-2026-005",
    title: "Fourniture de plantes ornementales – Ville de Marrakech",
    organization: "Commune de Marrakech",
    city: "Marrakech",
    publishedAt: "2026-05-28",
    deadline: "2026-06-20",
    budget: 870_000,
    status: "Gagné",
    relevance: 79,
    sector: "Vente de plantes",
  },
  {
    id: "t6",
    reference: "AO-2026-006",
    title: "Maintenance des jardins publics de la médina de Fès",
    organization: "Établissement Public Régional",
    city: "Fès",
    publishedAt: "2026-06-15",
    deadline: "2026-07-18",
    budget: 1_900_000,
    status: "Nouveau",
    relevance: 93,
    sector: "Maintenance",
  },
  {
    id: "t7",
    reference: "AO-2026-007",
    title: "Travaux paysagers – Ministère de l'Équipement",
    organization: "Ministère de l'Équipement",
    city: "Rabat",
    publishedAt: "2026-05-20",
    deadline: "2026-06-15",
    budget: 3_750_000,
    status: "Perdu",
    relevance: 72,
    sector: "Travaux paysagers",
  },
  {
    id: "t8",
    reference: "AO-2026-008",
    title: "Espaces verts des collectivités – Préfecture de Tétouan",
    organization: "Province de Tétouan",
    city: "Tétouan",
    publishedAt: "2026-06-18",
    deadline: "2026-07-20",
    budget: 2_100_000,
    status: "En analyse",
    relevance: 87,
    sector: "Espaces verts collectivités",
  },
];

export type DossierStatus = "Brouillon" | "En cours" | "À valider" | "Soumis" | "Clôturé";
export interface Dossier {
  id: string;
  reference: string;
  tenderId: string;
  client: string;
  status: DossierStatus;
  assignee: string;
  deadline: string;
  completion: number;
  missingDocs: string[];
}

export const dossiers: Dossier[] = [
  { id: "d1", reference: "DO-001", tenderId: "t1", client: "Commune de Tanger", status: "En cours", assignee: "Karim Benali", deadline: "2026-07-05", completion: 68, missingDocs: ["Attestation fiscale", "Références similaires"] },
  { id: "d2", reference: "DO-002", tenderId: "t2", client: "Province de Tétouan", status: "À valider", assignee: "Sara Idrissi", deadline: "2026-07-12", completion: 92, missingDocs: ["Attestation CNSS"] },
  { id: "d3", reference: "DO-003", tenderId: "t4", client: "Commune de Casablanca", status: "Soumis", assignee: "Mehdi Tazi", deadline: "2026-06-25", completion: 100, missingDocs: [] },
  { id: "d4", reference: "DO-004", tenderId: "t6", client: "EPR Fès", status: "Brouillon", assignee: "Karim Benali", deadline: "2026-07-18", completion: 24, missingDocs: ["Mémoire technique", "Attestation bancaire", "Références"] },
  { id: "d5", reference: "DO-005", tenderId: "t8", client: "Province de Tétouan", status: "En cours", assignee: "Sara Idrissi", deadline: "2026-07-20", completion: 54, missingDocs: ["Photos réalisations"] },
];

export type DocStatus = "Valide" | "Expire bientôt" | "Expiré" | "Manquant";
export interface AdminDoc {
  id: string;
  name: string;
  category: string;
  status: DocStatus;
  expiry?: string;
}

export const adminDocs: AdminDoc[] = [
  { id: "a1", name: "Registre de commerce", category: "Juridique", status: "Valide", expiry: "2027-04-12" },
  { id: "a2", name: "Attestation fiscale", category: "Fiscal", status: "Expire bientôt", expiry: "2026-07-10" },
  { id: "a3", name: "Attestation CNSS", category: "Social", status: "Valide", expiry: "2026-12-01" },
  { id: "a4", name: "Assurance RC", category: "Assurance", status: "Valide", expiry: "2026-11-15" },
  { id: "a5", name: "Attestation bancaire", category: "Financier", status: "Expiré", expiry: "2026-05-30" },
  { id: "a6", name: "Références projets 2024-2025", category: "Références", status: "Valide" },
  { id: "a7", name: "Certificats ISO 9001", category: "Certificats", status: "Valide", expiry: "2027-02-20" },
  { id: "a8", name: "Fiches techniques équipements", category: "Technique", status: "Valide" },
  { id: "a9", name: "Photos réalisations", category: "Visuel", status: "Valide" },
  { id: "a10", name: "Modèle mémoire technique", category: "Modèles", status: "Valide" },
  { id: "a11", name: "Attestation de qualification", category: "Certificats", status: "Manquant" },
];

export type TaskStatus = "À faire" | "En cours" | "À valider" | "Terminé";
export type Priority = "Haute" | "Moyenne" | "Basse";
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  owner: string;
  tenderRef: string;
}

export const tasks: Task[] = [
  { id: "k1", title: "Vérifier attestation fiscale", status: "À faire", priority: "Haute", dueDate: "2026-06-25", owner: "Sara Idrissi", tenderRef: "AO-2026-001" },
  { id: "k2", title: "Préparer mémoire technique", status: "En cours", priority: "Haute", dueDate: "2026-06-28", owner: "Mehdi Tazi", tenderRef: "AO-2026-002" },
  { id: "k3", title: "Compléter dossier administratif", status: "En cours", priority: "Moyenne", dueDate: "2026-07-01", owner: "Karim Benali", tenderRef: "AO-2026-006" },
  { id: "k4", title: "Soumettre le dossier DO-002", status: "À valider", priority: "Haute", dueDate: "2026-07-10", owner: "Sara Idrissi", tenderRef: "AO-2026-002" },
  { id: "k5", title: "Ajouter références similaires", status: "À faire", priority: "Moyenne", dueDate: "2026-06-30", owner: "Karim Benali", tenderRef: "AO-2026-001" },
  { id: "k6", title: "Valider le devis matériel", status: "Terminé", priority: "Basse", dueDate: "2026-06-15", owner: "Mehdi Tazi", tenderRef: "AO-2026-004" },
  { id: "k7", title: "Photographier réalisations Tanger", status: "Terminé", priority: "Basse", dueDate: "2026-06-12", owner: "Karim Benali", tenderRef: "AO-2026-008" },
];

export type NotifType = "Urgent" | "Documents" | "Marchés Publics" | "Tâches" | "Système";
export interface Notification {
  id: string;
  title: string;
  detail: string;
  type: NotifType;
  date: string;
  read: boolean;
}

export const initialNotifications: Notification[] = [
  { id: "n1", title: "Nouveau marché détecté", detail: "Entretien des espaces verts – Commune de Tanger", type: "Marchés Publics", date: "Il y a 2 h", read: false },
  { id: "n2", title: "Dossier à soumettre", detail: "DO-002 doit être soumis avant le 12/07", type: "Urgent", date: "Il y a 4 h", read: false },
  { id: "n3", title: "Document expiré", detail: "Attestation bancaire à renouveler", type: "Documents", date: "Hier", read: false },
  { id: "n4", title: "Échéance proche", detail: "Tâche : Vérifier attestation fiscale (J-3)", type: "Tâches", date: "Hier", read: true },
  { id: "n5", title: "Mémoire technique à valider", detail: "DO-004 – EPR Fès", type: "Tâches", date: "Il y a 2 j", read: true },
  { id: "n6", title: "Mise à jour système", detail: "Nouvelle version IA déployée v2.4", type: "Système", date: "Il y a 3 j", read: true },
];

export interface AppUser {
  id: string;
  name: string;
  role: "Direction" | "Responsable Marchés Publics" | "Assistant Administratif" | "Responsable Technique";
  email: string;
  permissions: string[];
  status: "Actif" | "Inactif";
}

export const users: AppUser[] = [
  { id: "u1", name: "Youssef El Khattabi", role: "Direction", email: "y.khattabi@thenorthgarden.ma", permissions: ["Voir Dashboard", "Gérer Appels d'Offres", "Gérer Documents", "Générer Documents", "Valider Soumissions", "Administrer Utilisateurs"], status: "Actif" },
  { id: "u2", name: "Sara Idrissi", role: "Responsable Marchés Publics", email: "s.idrissi@thenorthgarden.ma", permissions: ["Voir Dashboard", "Gérer Appels d'Offres", "Générer Documents", "Valider Soumissions"], status: "Actif" },
  { id: "u3", name: "Karim Benali", role: "Assistant Administratif", email: "k.benali@thenorthgarden.ma", permissions: ["Voir Dashboard", "Gérer Documents"], status: "Actif" },
  { id: "u4", name: "Mehdi Tazi", role: "Responsable Technique", email: "m.tazi@thenorthgarden.ma", permissions: ["Voir Dashboard", "Générer Documents", "Gérer Appels d'Offres"], status: "Actif" },
];

export const kpis = {
  detected: 38,
  ongoing: 12,
  submitted: 9,
  won: 5,
  upcomingDeadlines: 7,
  missingDocs: 4,
};

export const chartRepartition = [
  { name: "En cours", value: 12 },
  { name: "Soumis", value: 9 },
  { name: "Gagnés", value: 5 },
  { name: "Perdus", value: 3 },
];

export const chartSectors = [
  { name: "Entretien", value: 14 },
  { name: "Création", value: 9 },
  { name: "Arrosage", value: 6 },
  { name: "Plantes", value: 5 },
  { name: "Maintenance", value: 4 },
];

export const chartEvolution = [
  { mois: "Jan", soumissions: 3, gains: 1 },
  { mois: "Fév", soumissions: 4, gains: 2 },
  { mois: "Mar", soumissions: 5, gains: 2 },
  { mois: "Avr", soumissions: 6, gains: 3 },
  { mois: "Mai", soumissions: 7, gains: 4 },
  { mois: "Juin", soumissions: 9, gains: 5 },
];

export const chartWonLost = [
  { name: "Gagnés", value: 5 },
  { name: "Perdus", value: 3 },
];

export const formatMAD = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD", maximumFractionDigits: 0 }).format(n);