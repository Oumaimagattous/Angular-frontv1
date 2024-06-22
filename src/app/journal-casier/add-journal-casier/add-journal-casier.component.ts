import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fournisseur } from 'app/Models/fournisseur';
import { Produit } from 'app/Models/produit';

@Component({
  selector: 'app-add-journal-casier',
  templateUrl: './add-journal-casier.component.html',
  styleUrls: ['./add-journal-casier.component.scss']
})
export class AddJournalCasierComponent  {

  newEntry = {
    type: '',
    nbrCasier: 0,
    idProduit: null,
    idFournisseur: null,
    date: new Date()
  };

  constructor(
    public dialogRef: MatDialogRef<AddJournalCasierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { produits: Produit[], fournisseurs: Fournisseur[] }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.newEntry);
  }
}
