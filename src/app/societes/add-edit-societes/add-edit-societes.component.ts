import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Societe } from 'app/Models/societe';
import { SocietesService } from 'app/service/societes.service';

@Component({
  selector: 'app-add-edit-societes',
  templateUrl: './add-edit-societes.component.html',
  styleUrls: ['./add-edit-societes.component.scss']
})
export class AddEditSocietesComponent implements OnInit {

  societe: Societe = { id: 0, name: '', adresse: '', mf: '', telephone: '', responsable: '', email: '' };

  constructor(
    public dialogRef: MatDialogRef<AddEditSocietesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private societesService: SocietesService
  ) {}

  ngOnInit(): void {
    if (this.data.societe) {
      this.societe = this.data.societe;
    }
  }

  onSave(): void {
    if (this.societe.id) {
      this.societesService.updateSociete(this.societe.id, this.societe).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.societesService.addSociete(this.societe).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
