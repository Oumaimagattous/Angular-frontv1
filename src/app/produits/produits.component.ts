import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProduitsService } from 'app/service/produits.service';
//import { Produit } from '../Models/produit';
import { Router } from '@angular/router';
import { Produit } from 'app/Models/produit';
import { AddEditPtoduitsComponent } from './add-edit-ptoduits/add-edit-ptoduits.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'app/service/auth-service.service';

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
    private authService: AuthServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    const idSociete = this.authService.getIdSociete();
    console.log('ID de la société:', idSociete);

    if (idSociete) {
      this.produitsService.getProduitList().subscribe(
        (data) => {
          console.log('Produits:', data);
          this.produits = data;
          this.filteredProduits = this.produits.filter(produit => produit.idSociete === idSociete); // Filtrer les produits par ID de société
          console.log('Filtered Produits:', this.filteredProduits);
        },
        (error) => {
          console.error('Erreur lors du chargement des produits : ', error);
        }
      );
    } else {
      console.error('ID de société non défini.');
    }
  }
  
  applyFilter(event: any): void {
    const searchTerm = event.target.value.toLowerCase().trim(); // Convertir en minuscules et supprimer les espaces inutiles
    if (!searchTerm) {
      // Si le terme de recherche est vide, afficher tous les produits de la société connectée
      this.filteredProduits = this.produits.filter(produit => produit.idSociete === this.authService.getIdSociete());
    } else {
      // Filtrer les produits par nom contenant le terme de recherche
      this.filteredProduits = this.produits.filter(produit =>
        produit.name.toLowerCase().includes(searchTerm) && produit.idSociete === this.authService.getIdSociete()
      );
    }
  }
  

  async deleteProduit(id: number): Promise<void> {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await this.produitsService.deleteProduit(id).toPromise(); // Attendre la suppression du produit
        this.snackBar.open('Produit supprimé avec succès', 'Fermer', { duration: 2000 });
        this.loadProduits(); // Recharger les produits après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du produit : ', error);
        this.snackBar.open('Erreur lors de la suppression du produit', 'Fermer', { duration: 2000 });
      }
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
