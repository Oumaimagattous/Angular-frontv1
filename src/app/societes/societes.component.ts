import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocietesService } from 'app/service/societes.service';
///import { Societe } from './societe';
import { Router } from '@angular/router';
import { Societe } from 'app/Models/societe';
import { AddEditSocietesComponent } from './add-edit-societes/add-edit-societes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-societes',
  templateUrl: './societes.component.html',
  styleUrls: ['./societes.component.scss']
})
export class SocietesComponent implements OnInit {

  societes: Societe[] = [];
  filteredSocietes: Societe[] = [];
  @ViewChild(MatSnackBar) snackBar: MatSnackBar;

  constructor(
    private societesService: SocietesService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSocietes();
  }

  loadSocietes(): void {
    this.societesService.getSocieteList().subscribe(societes => {
      this.societes = societes;
      this.filteredSocietes = societes;
    });
  }

  applyFilter(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredSocietes = this.societes.filter(societe => 
      societe.name.toLowerCase().includes(searchTerm) ||
      societe.adresse.toLowerCase().includes(searchTerm) ||
      societe.mf.toLowerCase().includes(searchTerm)
    );
  }

  deleteSociete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette société ?')) {
      this.societesService.deleteSociete(id).subscribe(() => {
        this.snackBar.open('Société supprimée avec succès', 'Fermer', { duration: 2000 });
        this.loadSocietes();
      });
    }
  }

  navigateToAddSociete(): void {
    const dialogRef = this.dialog.open(AddEditSocietesComponent, {
      width: '400px',
      data: { societe: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSocietes();
      }
    });
  }

  navigateToEditSociete(id: number): void {
    const societe = this.societes.find(s => s.id === id);
    const dialogRef = this.dialog.open(AddEditSocietesComponent, {
      width: '400px',
      data: { societe }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSocietes();
      }
    });
  }

}
