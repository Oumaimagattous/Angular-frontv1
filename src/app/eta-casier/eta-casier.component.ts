import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'app/service/auth-service.service';
import { JournalCasierService } from 'app/service/journal-casier.service';

@Component({
  selector: 'app-eta-casier',
  templateUrl: './eta-casier.component.html',
  styleUrls: ['./eta-casier.component.scss']
})
export class EtaCasierComponent implements OnInit {

  etatStock: any[] = [];
  societeId: number;

  constructor(private journalCasierService: JournalCasierService, private authService: AuthServiceService) { }

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
    this.journalCasierService.getEtatStock(this.societeId).subscribe(
      (data) => {
        this.etatStock = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'état du stock', error);
      }
    );
  }

}
