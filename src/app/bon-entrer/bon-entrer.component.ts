import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BonEntrersService } from 'app/service/bon-entrers.service';
import { Router } from '@angular/router';
import { BonEntree } from 'app/Models/bon-entree';
import { AddEditBonEntrerComponent } from './add-edit-bon-entrer/add-edit-bon-entrer.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'app/service/auth-service.service';

@Component({
  selector: 'app-bon-entrer',
  templateUrl: './bon-entrer.component.html',
  styleUrls: ['./bon-entrer.component.scss']
})
export class BonEntrerComponent implements OnInit {

  bonsEntree: BonEntree[] = [];
  filteredBonsEntree: BonEntree[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  @ViewChild(MatSnackBar) snackBar: MatSnackBar;

  constructor(
    private bonEntreeService: BonEntrersService,
    private authService: AuthServiceService, 
    private router: Router,

    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBonsEntree();
  }

  
  loadBonsEntree(): void {
    const idSociete = this.authService.getIdSociete();
    console.log('ID de la société:', idSociete);

    if (idSociete) {
      this.bonEntreeService.getBonEntrerList().subscribe(bonsEntree => {
        console.log('Bons d\'entrée:', bonsEntree);
        this.bonsEntree = bonsEntree;
        this.filteredBonsEntree = this.bonsEntree.filter(bonEntree => bonEntree.idSociete === idSociete); // Filtrer les bons d'entrée par ID de société
        console.log('Filtered Bons d\'entrée:', this.filteredBonsEntree);
      });
    } else {
      console.error('ID de société non défini.');
    }
  }

 
  applyDateFilter(): void {
    this.filteredBonsEntree = this.bonsEntree.filter(bonEntree => {
      const date = new Date(bonEntree.date);
      return (!this.startDate || date >= this.startDate) && (!this.endDate || date <= this.endDate);
    });
  }

  addBonEntree(): void {
    const dialogRef = this.dialog.open(AddEditBonEntrerComponent, {
      width: '400px',
      data: { bonEntree: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonEntreeService.addBonEntrer(result).subscribe(() => {
          this.snackBar.open('Bon d\'entrée ajouté avec succès', 'Fermer', { duration: 2000 });
          this.loadBonsEntree();
        });
      }
    });
  }

  editBonEntree(id: number): void {
    const bonEntree = this.bonsEntree.find(b => b.id === id);
    const dialogRef = this.dialog.open(AddEditBonEntrerComponent, {
      width: '400px',
      data: { bonEntree }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonEntreeService.updateBonEntrer(result.id, result).subscribe(() => {
          this.snackBar.open('Bon d\'entrée modifié avec succès', 'Fermer', { duration: 2000 });
          this.loadBonsEntree();
        });
      }
    });
  }

  deleteBonEntree(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bon d\'entrée ?')) {
      this.bonEntreeService.deleteBonEntrer(id).subscribe(() => {
        this.snackBar.open('Bon d\'entrée supprimé avec succès', 'Fermer', { duration: 2000 });
        this.loadBonsEntree();
      });
    }
  }
}
