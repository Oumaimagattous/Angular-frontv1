import { Component, OnInit } from '@angular/core';
import { JournalStock } from 'app/Models/journal-stock';
import { AuthServiceService } from 'app/service/auth-service.service';
import { FournissursService } from 'app/service/fournissurs.service';
import { JournalStockService } from 'app/service/journal-stock.service';
import { ProduitsService } from 'app/service/produits.service';

@Component({
  selector: 'app-journal-stock',
  templateUrl: './journal-stock.component.html',
  styleUrls: ['./journal-stock.component.scss']
})
export class JournalStockComponent implements OnInit {

  journalStock: JournalStock[] = [];
  filteredJournalStock: JournalStock[] = [];
  displayedColumns: string[] = ['date', 'qteE', 'qteS', 'stock', 'delete'];
  products: any[] = [];
  fournisseurs: any[] = [];
  selectedProduct: any = null;
  selectedFournisseur: any = null;  // Assurez-vous qu'il est initialisé à null

  startDate: Date | null = null;
  endDate: Date | null = null;
  societeId: number;

  constructor(
    private journalStockService: JournalStockService,
    private authService: AuthServiceService,
    private productService: ProduitsService,
    private fournisseurService: FournissursService 
  ) {}

  ngOnInit(): void {
    this.societeId = this.authService.getIdSociete();
    if (this.societeId) {
      this.loadJournalStock();
      this.loadProduits();
      this.loadFournisseurs();
    } else {
      console.error('Erreur: Societe ID est undefined');
    }
  }

  loadJournalStock(): void {
    this.journalStockService.getJournalStocks(this.societeId).subscribe(
      data => {
        this.journalStock = data;
        this.filteredJournalStock = data;
        this.applyFilters(); 
      },
      error => {
        console.error('Erreur lors du chargement des données du journal de stock', error);
      }
    );
  }

  loadProduits(): void {
    this.productService.getProduitsBySociete(this.societeId).subscribe(data => {
      this.products = data;
    });
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurBySocieteId(this.societeId).subscribe(data => {
      this.fournisseurs = data;
    });
  }

  applyFilters(): void {
    this.filteredJournalStock = this.journalStock.filter(entry => {
      const productFilter = !this.selectedProduct || entry.idProduit === this.selectedProduct;
      const startDateFilter = !this.startDate || new Date(entry.date) >= this.startDate;
      const endDateFilter = !this.endDate || new Date(entry.date) <= this.endDate;

      return productFilter && startDateFilter && endDateFilter;
    });
  }

  applyProductFilter(): void {
    if (this.selectedProduct) {
      this.filteredJournalStock = this.journalStock.filter(
        item => item.idProduit === this.selectedProduct.id
      );
    } else {
      this.filteredJournalStock = this.journalStock;
    }
  }

  applyFournisseurFilter(): void {
    if (this.selectedFournisseur) {
      this.filteredJournalStock = this.journalStock.filter(
        item => item.idFournisseur === this.selectedFournisseur.id
      );
    } else {
      this.filteredJournalStock = this.journalStock;
    }
  }

  deleteEntry(id: number): void {
    this.journalStockService.deleteJournalStock(id).subscribe(
      () => {
        this.loadJournalStock();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'entrée du journal de stock', error);
      }
    );
  }

  
}