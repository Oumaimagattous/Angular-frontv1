import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClientsService } from 'app/service/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'app/Models/client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from 'app/service/auth-service.service';


@Component({
  selector: 'app-add-edit-clients',
  templateUrl: './add-edit-clients.component.html',
  styleUrls: ['./add-edit-clients.component.scss']
})
export class AddEditClientsComponent implements OnInit {

  client: Client;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddEditClientsComponent>,
    private authService: AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.client;
    this.client = this.isEditMode ? { ...data.client } : { id: null, name: '', adresse: '', type: '', cin: '', mf: '', telephone: '', dateEmission: null, idSociete: null };
  }

  ngOnInit(): void {
    // Récupérer l'ID de la société connectée depuis le service d'authentification
    const idSociete = this.authService.getIdSociete();
    this.client.idSociete = idSociete; // Définir l'ID de la société dans le client
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.client);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
