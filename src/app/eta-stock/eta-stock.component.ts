import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'app/Models/fournisseur';
import { Produit } from 'app/Models/produit';
import { AuthServiceService } from 'app/service/auth-service.service';
import { FournissursService } from 'app/service/fournissurs.service';
import { JournalStockService } from 'app/service/journal-stock.service';
import { ProduitsService } from 'app/service/produits.service';

@Component({
  selector: 'app-eta-stock',
  templateUrl: './eta-stock.component.html',
  styleUrls: ['./eta-stock.component.scss']
})
export class EtaStockComponent implements OnInit {

  etatStock: any[] = [];
 
  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];

  selectedProduit: Produit | null = null;
  selectedFournisseur: Fournisseur | null = null;
  societeId: number;

  constructor(private etatStockService: JournalStockService,   private authService: AuthServiceService,   private produitsService: ProduitsService, private fournisseursService: FournissursService) { }

  ngOnInit(): void {
    this.societeId = this.authService.getIdSociete();
    console.log("Societe ID on Init:", this.societeId);
    if (this.societeId) {
      this.loadEtatStock();
      this.loadProduits();
      this.loadFournisseurs();
    } else {
      console.error('Erreur: Societe ID est undefined');
    }
  }

  loadEtatStock(): void {
    this.etatStockService.getEtatStock(this.societeId).subscribe(
      data => {
        this.etatStock = data;
      },
      error => {
        console.error('Erreur lors du chargement de l\'état du stock', error);
      }
    );
  }

  loadProduits(): void {
    this.produitsService.getProduitsBySociete(this.societeId).subscribe(
      data => {
        this.produits = data;
      },
      error => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }

  loadFournisseurs(): void {
    this.fournisseursService.getFournisseurBySocieteId(this.societeId).subscribe(
      data => {
        this.fournisseurs = data;
      },
      error => {
        console.error('Erreur lors du chargement des fournisseurs', error);
      }
    );
  }

  applyFilters(): void {
    this.etatStock = this.etatStock.filter(entry => {
      const produitFilter = !this.selectedProduit || entry.idProduit === this.selectedProduit.id;
      const fournisseurFilter = !this.selectedFournisseur || entry.idFournisseur === this.selectedFournisseur.id;
     
      return produitFilter && fournisseurFilter ;
    });
  }

  applyProduitFilter(): void {
    this.applyFilters();
  }

  applyFournisseurFilter(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedProduit = null;
    this.selectedFournisseur = null;
    this.loadEtatStock();
  }

}
