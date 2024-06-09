// client.model.ts

export interface Client {
    id: number;
    name: string;
    adresse: string;
    type: string;
    cin: string;
    idSociete?: number; // L'ID de la société est facultatif (?)
  }
  