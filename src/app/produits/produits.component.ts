import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProduitsService } from 'app/service/produits.service';
//import { Produit } from '../Models/produit';
import { Router } from '@angular/router';
import { Produit } from 'app/Models/produit';
import { AddEditPtoduitsComponent } from './add-edit-ptoduits/add-edit-ptoduits.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {

  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  @ViewChild(MatSnackBar) snackBar: MatSnackBar;

  constructor(
    private produitsService: ProduitsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitsService.getProduitList().subscribe(produits => {
      this.produits = produits;
      this.filteredProduits = produits;
    });
  }

  applyFilter(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredProduits = this.produits.filter(produit => 
      produit.name.toLowerCase().includes(searchTerm)
    );
  }

  deleteProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produitsService.deleteProduit(id).subscribe(() => {
        this.snackBar.open('Produit supprimé avec succès', 'Fermer', { duration: 2000 });
        this.loadProduits();
      });
    }
  }

  navigateToAddProduit(): void {
    const dialogRef = this.dialog.open(AddEditPtoduitsComponent, {
      width: '400px',
      data: { produit: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProduits();
      }
    });
  }

  editProduit(id: number): void {
    const produit = this.produits.find(p => p.id === id);
    const dialogRef = this.dialog.open(AddEditPtoduitsComponent, {
      width: '400px',
      data: { produit: produit }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProduits();
      }
    });
  }

}
