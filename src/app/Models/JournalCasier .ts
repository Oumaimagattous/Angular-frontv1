export interface JournalCasier {
  id?: number; // Id optionnel si vous générez l'id côté backend
  idBonEntree?: number | null;
  idBonSortie?: number | null;
    nbrE: number;
    nbrS: number;
    date: Date;
    idSociete: number;
    idProduit: number;
    totalStock: number;
    idFournisseur: number;
  }
  