import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClientsService } from 'app/service/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'app/Models/client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.client;
    this.client = this.isEditMode ? { ...data.client } : { id: null, name: '', adresse: '', type: '', cin: '', idSociete: null };
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.client);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
