export interface BonSortie {
    id: number;
    date: Date;
    qte: number;
    idClient?: number;
    idProduit?: number;
    idChambre?: number;
    idSociete?: number;
    idFournisseur?: number;
    matricule: string;
    chauffeur: string;
    cinChauffeur: string;
    nbrScasier: number; 
    numeroBonSortie: number;
   
}
