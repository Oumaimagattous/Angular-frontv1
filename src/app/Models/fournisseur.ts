export interface Fournisseur {
    id: number;
    name: string;
    adresse: string;
    idSociete?: number; // L'ID de la société est facultatif
}
