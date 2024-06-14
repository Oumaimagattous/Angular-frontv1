import { Component, OnInit } from '@angular/core';
import { JournalStock } from 'app/Models/journal-stock';
import { JournalStockService } from 'app/service/journal-stock.service';

@Component({
  selector: 'app-journal-stock',
  templateUrl: './journal-stock.component.html',
  styleUrls: ['./journal-stock.component.scss']
})
export class JournalStockComponent implements OnInit {

  journalStock: JournalStock[] = [];
  displayedColumns: string[] = ['produit', 'date','qteE', 'qteS', 'stock', 'delete'];
  filteredJournalStock: JournalStock[] = [];
  startDate: Date;
  endDate: Date;

  constructor(private journalStockService: JournalStockService) { }

  ngOnInit(): void {
    this.loadJournalStock();
  }

  loadJournalStock(): void {
    this.journalStockService.getJournalStock().subscribe(
      data => {
        this.journalStock = data;
      },
      error => {
        console.error('Erreur lors du chargement des données du journal de stock', error);
      }
    );
  }

  applyDateFilter(): void {
    // Convertissez les dates en format ISO string pour la comparaison
    const start = this.startDate.toISOString();
    const end = this.endDate.toISOString();

    // Appliquer le filtre
    this.filteredJournalStock = this.journalStock.filter(item => {
        const itemDate = new Date(item.date).toISOString();
        return itemDate >= start && itemDate <= end;
    });
}


  deleteEntry(id: number): void {
    // Appelez votre service pour supprimer l'entrée correspondante par son ID
    this.journalStockService.deleteJournalStock(id).subscribe(
      () => {
        // Rafraîchissez les données après la suppression
        this.loadJournalStock();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'entrée du journal de stock', error);
      }
    );
}

calculatePercentage(value: number, total: number): number {
  return (value / total) * 100;
}



}
