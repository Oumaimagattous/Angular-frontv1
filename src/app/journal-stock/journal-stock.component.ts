import { Component, OnInit } from '@angular/core';
import { JournalStock } from 'app/Models/journal-stock';
import { AuthServiceService } from 'app/service/auth-service.service';
import { FournissursService } from 'app/service/fournissurs.service';
import { JournalStockService } from 'app/service/journal-stock.service';
import { ProduitsService } from 'app/service/produits.service';
import jsPDF from 'jspdf';
import { SocietesService } from 'app/service/societes.service';

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
    private societeService: SocietesService,
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


  // Méthode pour imprimer une entrée spécifique du journal de stock
  // Méthode pour imprimer une entrée spécifique du journal de stock avec des zones distinctes
async printEntry(entry: JournalStock): Promise<void> {
  const doc = new jsPDF();

  // Récupérer la date du jour
  const currentDate = new Date().toLocaleDateString();

  // Titre du document
  const title = `Journal de Stock - Entrée : `;

  // Informations sur la société (partie fixe)
  const societe = await this.societeService.getSociete(this.societeId).toPromise();
  const societeInfo = `
    Société: ${societe.name}
    Responsable: ${societe.responsable}
    Adresse: ${societe.adresse}
    Téléphone: ${societe.telephone}
    Email: ${societe.email}
  `;

  // Informations sur le fournisseur
  const fournisseur = await this.fournisseurService.getFournisseur(entry.idFournisseur).toPromise();
  const fournisseurInfo = `
    Fournisseur: ${fournisseur.nomCommercial}
    Nom : ${fournisseur.name}
    Adresse: ${fournisseur.adresse}
    Téléphone: ${fournisseur.telephone}
    CIN : ${fournisseur.cin}
  `;

  // Informations sur le produit
  const produit = await this.productService.getProduit(entry.idProduit).toPromise();

  // Construire le texte pour chaque entrée du journal de stock
  const entryInfo = `
    Produit: ${produit.name}
    Date: ${new Date(entry.date).toLocaleDateString()}
    Observation: ${entry.numeroBon}
    Quantité Entrée: ${entry.qteE === 0 ? '' : entry.qteE}
    Quantité Sortie: ${entry.qteS === 0 ? '' : entry.qteS}
    Stock Total: ${entry.stockTotal}
    Chambre:  // Remplacez par l'affichage réel de la chambre
  `;

  // Définir les marges et dimensions de la page
  const margin = 10;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Taille des rectangles et positions
  const rectMargin = 5; // Marge autour des rectangles
  const rectWidth = pageWidth - 2 * margin;
  const rectHeight = 50; // Hauteur de chaque rectangle
  let rectY = margin + 20; // Position Y du premier rectangle

  // Dessiner les rectangles avec seulement le cadre noir et fond transparent
  doc.setDrawColor(0); // Couleur du cadre noir
  doc.setFillColor(255, 255, 255, 0); // Fond transparent
  doc.rect(margin, rectY, rectWidth, rectHeight); // Rectangle pour les informations sur la société
  doc.rect(margin, rectY + rectHeight + margin, rectWidth, rectHeight); // Rectangle pour les informations sur le fournisseur
  doc.rect(margin, rectY + 2 * (rectHeight + margin), rectWidth, rectHeight); // Rectangle pour les détails de l'entrée

  // Ajouter le texte dans chaque rectangle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  doc.text(societeInfo, margin + rectMargin, rectY + rectMargin); // Informations sur la société
  doc.text(fournisseurInfo, margin + rectMargin, rectY + rectHeight + margin + rectMargin); // Informations sur le fournisseur
  doc.text(entryInfo, margin + rectMargin, rectY + 2 * (rectHeight + margin) + rectMargin); // Détails de l'entrée

  // Ajouter le titre
  doc.setFontSize(18);
  doc.text(title, pageWidth / 2, margin, { align: 'center' });

  // Ajouter la date du jour aux extrémités de la page
  doc.setFontSize(10);
  doc.text(currentDate, pageWidth - margin, margin, { align: 'right' });

  // Afficher la fenêtre d'impression
  doc.output('dataurlnewwindow');
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