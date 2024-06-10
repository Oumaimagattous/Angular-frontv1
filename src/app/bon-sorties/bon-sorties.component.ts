import { Component, OnInit } from '@angular/core';
import { BonSortie } from 'app/Models/bon-sortie';
import { BonSortieService } from 'app/service/bon-sortie.service';
import { AddEditBonSortieComponent } from './add-edit-bon-sortie/add-edit-bon-sortie.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bon-sorties',
  templateUrl: './bon-sorties.component.html',
  styleUrls: ['./bon-sorties.component.scss']
})
export class BonSortiesComponent implements OnInit {

  sorties: BonSortie[] = [];
  filteredBonsSortie: BonSortie[] = []; // Liste filtrée des bons de sortie
  startDate: Date;
  endDate: Date;

  constructor(
    private bonsortieService: BonSortieService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadSorties();
  }

  loadSorties() {
    this.bonsortieService.getBonsSortie().subscribe(
      (data: BonSortie[]) => {
        this.sorties = data;
        this.filteredBonsSortie = data; // Initialise la liste filtrée avec toutes les sorties
      },
      (error) => {
        console.log('Une erreur s\'est produite lors du chargement des bons de sortie:', error);
      }
    );
  }

  applyDateFilter() {
    // Filtre les sorties en fonction de la date de début et de fin
    if (this.startDate && this.endDate) {
      this.filteredBonsSortie = this.sorties.filter(bonSortie =>
        new Date(bonSortie.date) >= this.startDate && new Date(bonSortie.date) <= this.endDate
      );
    } else {
      // Si l'une des dates est vide, affiche toutes les sorties
      this.filteredBonsSortie = this.sorties;
    }
  }

  
  
  deletebonSortie(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bon d\'entrée ?')) {
      this.bonsortieService.deleteBonSortie(id).subscribe(() => {
        this.snackBar.open('Bon d\'entrée supprimé avec succès', 'Fermer', { duration: 2000 });
        this.loadSorties();
      });
    }
  }

  addBonSortie(): void {
    const dialogRef = this.dialog.open(AddEditBonSortieComponent, {
      width: '400px',
      data: { bonSortie: null } // Assurez-vous d'envoyer null ici pour ajouter un nouveau bon de sortie
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonsortieService.addBonSortie(result).subscribe(() => {
          this.loadSorties();
          this.snackBar.open('Bon de sortie ajouté avec succès', 'Fermer', { duration: 2000 });
        });
      }
    });
  }

  editBonSortie(id: number): void {
    const bonSortie = this.sorties.find(b => b.id === id);
    const dialogRef = this.dialog.open(AddEditBonSortieComponent, {
      width: '400px',
      data: { bonSortie }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonsortieService.updateBonSortie(result).subscribe(() => { // Correction ici
          this.loadSorties();
          this.snackBar.open('Bon de sortie modifié avec succès', 'Fermer', { duration: 2000 });
        });
      }
    });
  }
  
}
