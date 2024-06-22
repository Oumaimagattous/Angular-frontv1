import { Component, OnInit } from '@angular/core';
import { JournalCasier } from 'app/Models/JournalCasier ';
import { Fournisseur } from 'app/Models/fournisseur';
import { Produit } from 'app/Models/produit';
import { AuthServiceService } from 'app/service/auth-service.service';
import { FournissursService } from 'app/service/fournissurs.service';
import { JournalCasierService } from 'app/service/journal-casier.service';
import { ProduitsService } from 'app/service/produits.service';
import { AddJournalCasierComponent } from './add-journal-casier/add-journal-casier.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-journal-casier',
  templateUrl: './journal-casier.component.html',
  styleUrls: ['./journal-casier.component.scss']
})
export class JournalCasierComponent implements OnInit {

  entries: JournalCasier[] = [];
  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];
  
  displayedColumns: string[] = [ 'date', 'nbrE', 'nbrS', 'totalStock','delete'];

  selectedProduit: Produit | null = null;
  selectedFournisseur: Fournisseur | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  societeId: number;

  constructor(
    private journalCasierService: JournalCasierService,
    private produitsService: ProduitsService,
    private fournisseursService: FournissursService,
    private authService: AuthServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddJournalCasierComponent, {
        width: '400px',
        data: { produits: this.produits, fournisseurs: this.fournisseurs }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            console.log('Nouvelle entrée à ajouter:', result);

            let idBonEntree: number | null = null;
            let idBonSortie: number | null = null;
            let nbrE = 0;
            let nbrS = 0;

            if (result.type === 'Entrée') {
                // idBonEntree doit être récupéré d'une autre source ou généré dans le backend
                nbrE = result.nbrCasier;
            } else if (result.type === 'Sortie') {
                // idBonSortie doit être récupéré d'une autre source ou généré dans le backend
                nbrS = result.nbrCasier;
            }

            const newEntry: JournalCasier = {
                id: 0,
                idBonEntree: idBonEntree,
                idBonSortie: idBonSortie,
                nbrE: nbrE,
                nbrS: nbrS,
                date: new Date(result.date),
                idSociete: this.societeId,
                idProduit: result.idProduit,
                totalStock: this.calculateTotalStock(result.nbrCasier, result.type),
                idFournisseur: result.idFournisseur
            };

            console.log('Données à envoyer à l\'API:', newEntry);

            this.journalCasierService.addEntry(newEntry).subscribe(
                response => {
                    this.entries.push(response);
                    this.applyFilters();
                },
                error => {
                    console.error('Erreur lors de l\'ajout de l\'entrée', error);
                }
            );
        }
    });
}


  generateRandomId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  calculateTotalStock(nbrCasier: number, type: string): number {
    let totalStock = this.entries.length > 0 ? this.entries[this.entries.length - 1].totalStock : 0;
    return type === 'Entrée' ? totalStock + nbrCasier : totalStock - nbrCasier;
  }


  deleteEntry(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce journal Casier ?')) {
      this.journalCasierService.deleteEntry(id).subscribe(() => {
        this.snackBar.open('Journal Casier supprimé avec succès', 'Fermer', { duration: 2000 });
        this.loadJournalCasier();
      });
    }
  }
  
  

}
