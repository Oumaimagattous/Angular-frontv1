export interface JournalStock {
  id: number;
  date: Date;
  qteE: number;
  qteS: number;
  stockTotal: number;
  idProduit: number;
  idBonSortie: number;
  idBonEntree: number;
  idSociete?: number; 
  idFournisseur: number;
  numeroBon: string;
}