import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BonEntree } from 'app/Models/bon-entree';
import { Chambre } from 'app/Models/chambre';
import { Fournisseur } from 'app/Models/fournisseur';
import { Produit } from 'app/Models/produit';
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
    private chambreService: ChambresService
  ) {
    this.isEditMode = !!data.bonEntree;
    this.bonEntree = this.isEditMode ? { ...data.bonEntree } : { id: null, date: new Date(), qte: 0, idFournisseur: null, idProduit: null, idChambre: null, idSociete: null };
  }

  ngOnInit(): void {
    this.loadProduits();
    this.loadFournisseurs();
    this.loadChambres();
  }

  loadProduits(): void {
    this.produitService.getProduitList().subscribe(produits => this.produits = produits);
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurList().subscribe(fournisseurs => this.fournisseurs = fournisseurs);
  }

  loadChambres(): void {
    this.chambreService.getChambreList().subscribe(chambres => this.chambres = chambres);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.bonEntree);
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  printTable(): void {
    // Récupérer les noms des produits, fournisseurs et chambres correspondants
    const produitNom = this.produits.find(produit => produit.id === this.bonEntree.idProduit)?.name;
    const fournisseurNom = this.fournisseurs.find(fournisseur => fournisseur.id === this.bonEntree.idFournisseur)?.name;
    const chambreNom = this.chambres.find(chambre => chambre.id === this.bonEntree.idChambre)?.name;
  
    // Génération du contenu du tableau avec les noms correspondants
    const content = `
    <table class="print-table">
     <h1>Bon-Entrée</h1>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Quantité</th>
          <th>Fournisseur</th>
          <th>Produit</th>
          <th>Chambre</th>
          <!-- Ajoutez d'autres en-têtes si nécessaire -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${this.bonEntree.id}</td>
          <td>${this.bonEntree.date}</td>
          <td>${this.bonEntree.qte}</td>
          <td>${fournisseurNom}</td>
          <td>${produitNom}</td>
          <td>${chambreNom}</td>
          <!-- Remplacez par les valeurs appropriées -->
        </tr>
        <!-- Ajoutez d'autres lignes si nécessaire -->
      </tbody>
    </table>
  `;

  // Ouvrir une fenêtre d'impression
  const popupWin = window.open('', '_blank');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <style>
          /* Ajoutez vos styles CSS ici */
          .print-table {
            width: 80%; /* Largeur du tableau */
            margin: 0 auto; /* Centrage horizontal */
            border-collapse: collapse;
          }
          .print-table th, .print-table td {
            border: 1px solid #ddd; /* Bordures */
            padding: 8px; /* Espacement intérieur */
            text-align: center; /* Alignement du texte */
          }
          .print-table th {
            background-color: #f2f2f2; /* Couleur de fond de l'en-tête */
          }
        </style>
      </head>
      <body onload="window.print();">
        ${content}
      </body>
    </html>
  `);
    popupWin.document.close();
  }
  
}
