import { Component, OnInit } from '@angular/core';
import { JournalCasier } from 'app/Models/JournalCasier ';
import { Fournisseur } from 'app/Models/fournisseur';
import { Produit } from 'app/Models/produit';
import { AuthServiceService } from 'app/service/auth-service.service';
import { FournissursService } from 'app/service/fournissurs.service';
import { JournalCasierService } from 'app/service/journal-casier.service';
import { ProduitsService } from 'app/service/produits.service';

@Component({
  selector: 'app-journal-casier',
  templateUrl: './journal-casier.component.html',
  styleUrls: ['./journal-casier.component.scss']
})
export class JournalCasierComponent implements OnInit {

  entries: JournalCasier[] = [];
  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];
  
  displayedColumns: string[] = [ 'date', 'nbrE', 'nbrS', 'totalStock'];

  selectedProduit: Produit | null = null;
  selectedFournisseur: Fournisseur | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  societeId: number;

  constructor(
    private journalCasierService: JournalCasierService,
    private produitsService: ProduitsService,
    private fournisseursService: FournissursService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.societeId = this.authService.getIdSociete();

    if (this.societeId) {
      this.loadJournalCasier();
      this.loadProduits();
      this.loadFournisseurs();
    } else {
      console.error('Erreur: ID de la société est indéfini');
    }
  }

  loadJournalCasier(): void {
    this.journalCasierService.getAllEntries(this.societeId).subscribe(
      data => {
        this.entries = data;
        this.applyFilters();
      },
      error => {
        console.error('Erreur lors du chargement du journal des casiers', error);
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
    this.entries = this.entries.filter(entry => {
      const produitFilter = !this.selectedProduit || entry.idProduit === this.selectedProduit.id;
      const fournisseurFilter = !this.selectedFournisseur || entry.idFournisseur === this.selectedFournisseur.id;
      const startDateFilter = !this.startDate || new Date(entry.date) >= this.startDate;
      const endDateFilter = !this.endDate || new Date(entry.date) <= this.endDate;

      return produitFilter && fournisseurFilter && startDateFilter && endDateFilter;
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
    this.startDate = null;
    this.endDate = null;
    this.loadJournalCasier();
  }

  


}
