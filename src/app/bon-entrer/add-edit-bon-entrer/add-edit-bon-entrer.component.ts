import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BonEntree } from 'app/Models/bon-entree';
import { Chambre } from 'app/Models/chambre';
import { Fournisseur } from 'app/Models/fournisseur';
import { Produit } from 'app/Models/produit';
import { AuthServiceService } from 'app/service/auth-service.service';
import { BonEntrersService } from 'app/service/bon-entrers.service';
import { ChambresService } from 'app/service/chambres.service';
import { FournissursService } from 'app/service/fournissurs.service';
import { ProduitsService } from 'app/service/produits.service';



@Component({
  selector: 'app-add-edit-bon-entrer',
  templateUrl: './add-edit-bon-entrer.component.html',
  styleUrls: ['./add-edit-bon-entrer.component.scss']
})
export class AddEditBonEntrerComponent implements OnInit {

 
  bonEntree: BonEntree;
  isEditMode: boolean;
  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];
  chambres: Chambre[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditBonEntrerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bonEntreeService: BonEntrersService,
    private produitService: ProduitsService,
    private fournisseurService: FournissursService,
    private chambreService: ChambresService,
    private authService: AuthServiceService 
  ) {
    this.isEditMode = !!data.bonEntree;
    this.bonEntree = this.isEditMode ? { ...data.bonEntree } : { id: null, date: new Date(), qte: 0, numeroBonEntree: 0, nombreCasier: 0, idFournisseur: null, idProduit: null, idChambre: null, idSociete: null };
  }

  ngOnInit(): void {
     // Récupérer l'ID de la société connectée depuis le service d'authentification
     const idSociete = this.authService.getIdSociete();
     this.bonEntree.idSociete = idSociete; // Définir l'ID de la société dans le bon d'entrée
     
    this.loadProduits(idSociete);
    this.loadFournisseurs(idSociete);
    this.loadChambres(idSociete);
  }

  loadProduits(idSociete: number): void {
    this.produitService.getProduitsBySociete(idSociete).subscribe(produits => this.produits = produits);
  }

  loadFournisseurs(idSociete: number): void {
    this.fournisseurService.getFournisseurBySocieteId(idSociete).subscribe(fournisseurs => this.fournisseurs = fournisseurs);
  }

  loadChambres(idSociete: number): void {
    this.chambreService.getChambresBySocieteId(idSociete).subscribe(chambres => this.chambres = chambres);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.bonEntree);
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

 
  
}
