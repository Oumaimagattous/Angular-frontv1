import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produit } from 'app/Models/produit';
import { AuthServiceService } from 'app/service/auth-service.service';
import { ProduitsService } from 'app/service/produits.service';

@Component({
  selector: 'app-add-edit-ptoduits',
  templateUrl: './add-edit-ptoduits.component.html',
  styleUrls: ['./add-edit-ptoduits.component.scss']
})
export class AddEditPtoduitsComponent {


  produit: Produit;

  constructor(
    public dialogRef: MatDialogRef<AddEditPtoduitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { produit: Produit },
    private authService: AuthServiceService,
    private produitsService: ProduitsService
  ) {
    this.produit = data.produit ? { ...data.produit } : { id: null, name: '', idSociete: null };
  }
  
  ngOnInit(): void {
    // Récupérer l'ID de la société connectée depuis le service d'authentification
    const idSociete = this.authService.getIdSociete();
    this.produit.idSociete = idSociete; // Définir l'ID de la société dans le produit
  }

  onSubmit(): void {
    if (this.produit.id) {
      this.produitsService.updateProduit(this.produit.id, this.produit).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.produitsService.addProduit(this.produit).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
