export interface Fournisseur {
    id: number;
    name: string;
    adresse: string;
    nomCommercial?: string;
    cin?: string;
    dateEmission?: Date;
    telephone?: string;
    mf?: string;
    idSociete?: number; 

}
