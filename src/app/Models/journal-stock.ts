
export interface JournalStock {
    id: number;
    date: string;
    qteE: number;
    qteS: number;
    idProduit: number;
    produit: Produit;
    idBonSortie?: number;
    bonSortie?: BonSortie;
    idBonEntree?: number;
    bonEntree?: BonEntree;
   
  }

  
  
  
  export interface Produit {
    id: number;
    name: string;
  }
  
  export interface BonSortie {
    id: number;
    // Ajouter d'autres propriétés pertinentes pour BonSortie
  }
  
  export interface BonEntree {
    id: number;
    // Ajouter d'autres propriétés pertinentes pour BonEntree
  }
  
  export interface JournalStockDto {
    date: string;
    qteE: number;
    qteS: number;
    idProduit: number;
    idBonSortie?: number;
    idBonEntree?: number;
    
  }
  