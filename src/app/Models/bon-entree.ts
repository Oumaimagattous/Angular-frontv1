export interface BonEntree {
    id: number;
    date: Date;
    qte: number;
    idFournisseur?: number;
    idProduit?: number;
    idChambre?: number;
    idSociete?: number;
    numeroBonEntree: number; 
    nombreCasier: number;
}
