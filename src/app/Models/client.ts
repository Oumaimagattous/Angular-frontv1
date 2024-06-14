// client.model.ts

export interface Client {
    id: number;
    name: string;
    adresse: string;
    type: string;
    cin: string;
    mf: string; // Nouvel attribut MF
    telephone: string; // Nouvel attribut Téléphone
    dateEmission: Date; // Nouvel attribut Date d'émission
    idSociete?: number; // L'ID de la société est facultatif (?)
  }
  