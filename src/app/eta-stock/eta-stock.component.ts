import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'app/service/auth-service.service';
import { JournalStockService } from 'app/service/journal-stock.service';

@Component({
  selector: 'app-eta-stock',
  templateUrl: './eta-stock.component.html',
  styleUrls: ['./eta-stock.component.scss']
})
export class EtaStockComponent implements OnInit {

  etatStock: any[] = [];
  societeId: number;

  constructor(private etatStockService: JournalStockService,   private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.societeId = this.authService.getIdSociete();
    console.log("Societe ID on Init:", this.societeId);
    if (this.societeId) {
      this.loadEtatStock();
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
}
