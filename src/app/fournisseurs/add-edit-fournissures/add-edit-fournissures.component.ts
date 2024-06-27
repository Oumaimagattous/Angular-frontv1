import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fournisseur } from 'app/Models/fournisseur';
import { AuthServiceService } from 'app/service/auth-service.service';
import { FournissursService } from 'app/service/fournissurs.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-fournissures',
  templateUrl: './add-edit-fournissures.component.html',
  styleUrls: ['./add-edit-fournissures.component.scss']
})
export class AddEditFournissuresComponent  {

  fournisseur: Fournisseur;

  constructor(
    public dialogRef: MatDialogRef<AddEditFournissuresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fournisseur: Fournisseur },
    private authService: AuthServiceService,
    private fournisseursService: FournissursService
  ) {
    this.fournisseur = data.fournisseur ? { 
      ...data.fournisseur 
    } : { 
      id: null, 
      name: '', 
      adresse: '', 
      nomCommercial: '',
      cin: '',
      dateEmission: null,
      telephone: '',
      mf: '',
      idSociete: null 
    };
  }

  ngOnInit(): void {
    // Récupérer l'ID de la société connectée depuis le service d'authentification
    const idSociete = this.authService.getIdSociete();
    this.fournisseur.idSociete = idSociete; // Définir l'ID de la société dans le fournisseur
  }

  onSubmit(fournisseurForm: NgForm): void {
    if (fournisseurForm.valid) {
      if (this.fournisseur.id) {
        this.fournisseursService.updateFournisseur(this.fournisseur.id, this.fournisseur).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.fournisseursService.addFournisseur(this.fournisseur).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    } else {
      // Afficher un message d'erreur ou gérer la validation du formulaire non valide
      console.error('Formulaire invalide. Veuillez remplir tous les champs obligatoires.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
