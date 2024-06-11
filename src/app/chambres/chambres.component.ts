import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChambresService } from 'app/service/chambres.service';
import { Chambre } from '../Models/chambre';
import { AddEditChambresComponent } from './add-edit-chambres/add-edit-chambres.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'app/service/auth-service.service';

@Component({
  selector: 'app-chambres',
  templateUrl: './chambres.component.html',
  styleUrls: ['./chambres.component.scss']
})
export class ChambresComponent implements OnInit {

 

  chambres: Chambre[] = [];
  filteredChambres: Chambre[] = [];
  @ViewChild(MatSnackBar) snackBar: MatSnackBar;

  constructor(
    private chambreService: ChambresService,
    private router: Router,
    private authService: AuthServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadChambres();
  }

  loadChambres(): void {
    const idSociete = this.authService.getIdSociete();
    console.log('ID de la société:', idSociete);

    if (idSociete) {
      this.chambreService.getChambreList().subscribe(chambres => {
        console.log('Chambres:', chambres);
        this.chambres = chambres;
        this.filteredChambres = this.chambres.filter(chambre => chambre.idSociete === idSociete); // Filtrer les chambres par ID de société
        console.log('Filtered Chambres:', this.filteredChambres);
      });
    } else {
      console.error('ID de société non défini.');
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    // Appliquer le filtre sur les chambres
    this.chambres = this.chambres.filter(chambre =>
      chambre.name.toLowerCase().includes(filterValue) 
      
    );
  }
  
  

  deleteChambre(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
      this.chambreService.deleteChambre(id).subscribe(() => {
        this.snackBar.open('Chambre supprimée avec succès', 'Fermer', { duration: 2000 });
        this.loadChambres();
      });
    }
  }

  navigateToAddChambre(): void {
    const dialogRef = this.dialog.open(AddEditChambresComponent, {
      width: '400px',
      data: { chambre: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadChambres();
      }
    });
  }

  editChambre(id: number): void {
    const chambre = this.chambres.find(c => c.id === id);
    const dialogRef = this.dialog.open(AddEditChambresComponent, {
      width: '400px',
      data: { chambre: chambre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadChambres();
      }
    });
  }

}
