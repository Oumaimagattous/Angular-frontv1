import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fournisseur } from 'app/Models/fournisseur';
import { FournissursService } from 'app/service/fournissurs.service';

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
    private fournisseursService: FournissursService
  ) {
    this.fournisseur = data.fournisseur ? { ...data.fournisseur } : { id: null, name: '', adresse: '', idSociete: null };
  }

  onSubmit(): void {
    if (this.fournisseur.id) {
      this.fournisseursService.updateFournisseur(this.fournisseur.id, this.fournisseur).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.fournisseursService.addFournisseur(this.fournisseur).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
