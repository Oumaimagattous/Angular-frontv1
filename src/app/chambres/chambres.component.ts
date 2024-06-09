import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChambresService } from 'app/service/chambres.service';
import { Chambre } from '../Models/chambre';
import { AddEditChambresComponent } from './add-edit-chambres/add-edit-chambres.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chambres',
  templateUrl: './chambres.component.html',
  styleUrls: ['./chambres.component.scss']
})
export class ChambresComponent implements OnInit {

 

  chambres: Chambre[] = [];
  @ViewChild(MatSnackBar) snackBar: MatSnackBar;

  constructor(
    private chambreService: ChambresService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadChambres();
  }

  loadChambres(): void {
    this.chambreService.getChambreList().subscribe(chambres => {
      this.chambres = chambres;
     
    });
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
