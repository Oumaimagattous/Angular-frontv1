export interface JournalCasier {
    id: number;
    idBonEntree: number | null;
    idBonSortie: number | null;
    nbrE: number;
    nbrS: number;
    date: Date;
    idSociete: number;
    idProduit: number;
    totalStock: number;
  }
  