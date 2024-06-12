import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChambresService } from 'app/service/chambres.service';
import { Chambre } from 'app/Models/chambre';
import { AuthServiceService } from 'app/service/auth-service.service';


@Component({
  selector: 'app-add-edit-chambres',
  templateUrl: './add-edit-chambres.component.html',
  styleUrls: ['./add-edit-chambres.component.scss']
})
export class AddEditChambresComponent  {

  chambre: Chambre;
  

  constructor(
    public dialogRef: MatDialogRef<AddEditChambresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chambre: Chambre },
    private chambresService: ChambresService,
    private authService: AuthServiceService

  ) {
    this.chambre = data.chambre ? { ...data.chambre } : { id: null, name: '', idSociete: null };
  }

  ngOnInit(): void {
    // Récupérer l'ID de la société connectée depuis le service d'authentification
    const idSociete = this.authService.getIdSociete();
    this.chambre.idSociete = idSociete; // Définir l'ID de la société dans la chambre
  }

  onSubmit(): void {
    if (this.chambre.id) {
      this.chambresService.updateChambre(this.chambre.id, this.chambre).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.chambresService.addChambre(this.chambre).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
