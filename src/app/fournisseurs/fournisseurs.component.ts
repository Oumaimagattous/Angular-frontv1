import { Component, OnInit, ViewChild } from '@angular/core';
//import { Fournisseur } from './Models/fournisseur';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FournissursService } from 'app/service/fournissurs.service';
import { Router } from '@angular/router';
import { Fournisseur } from 'app/Models/fournisseur';
import { AddEditFournissuresComponent } from './add-edit-fournissures/add-edit-fournissures.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit {

  fournisseurs: Fournisseur[] = [];
  filteredFournisseurs: Fournisseur[] = [];
  @ViewChild(MatSnackBar) snackBar: MatSnackBar;
  

  constructor(
    private fournisseursService: FournissursService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseursService.getFournisseurList().subscribe(fournisseurs => {
      this.fournisseurs = fournisseurs;
      this.filteredFournisseurs = fournisseurs;
    });
  }

  applyFilter(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredFournisseurs = this.fournisseurs.filter(fournisseur => 
      fournisseur.name.toLowerCase().includes(searchTerm) ||
      fournisseur.adresse.toLowerCase().includes(searchTerm)
    );
  }

  deleteFournisseur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseursService.deleteFournisseur(id).subscribe(() => {
        this.snackBar.open('Fournisseur supprimé avec succès', 'Fermer', { duration: 2000 });
        this.loadFournisseurs();
      });
    }
  }

  navigateToAddFournisseur(): void {
    const dialogRef = this.dialog.open(AddEditFournissuresComponent, {
      width: '400px',
      data: { fournisseur: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFournisseurs();
      }
    });
  }

  navigateToEditFournisseur(id: number): void {
    const fournisseur = this.fournisseurs.find(f => f.id === id);
    const dialogRef = this.dialog.open(AddEditFournissuresComponent, {
      width: '400px',
      data: { fournisseur: fournisseur }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFournisseurs();
      }
    });
  }

}
