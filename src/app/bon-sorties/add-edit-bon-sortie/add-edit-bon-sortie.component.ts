import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BonSortie } from 'app/Models/bon-sortie';
import { Produit } from 'app/Models/produit';
import { Chambre } from 'app/Models/chambre';
import { BonSortieService } from 'app/service/bon-sortie.service';
import { ProduitsService } from 'app/service/produits.service';
import { ChambresService } from 'app/service/chambres.service';
import { Client } from 'app/Models/client';
import { ClientsService } from 'app/service/clients.service';

@Component({
  selector: 'app-add-edit-bon-sortie',
  templateUrl: './add-edit-bon-sortie.component.html',
  styleUrls: ['./add-edit-bon-sortie.component.scss']
})
export class AddEditBonSortieComponent implements OnInit {

  bonSortie: BonSortie;
  isEditMode: boolean;
  produits: Produit[] = [];
  chambres: Chambre[] = [];
  clients: Client[] = []; 

  constructor(
    public dialogRef: MatDialogRef<AddEditBonSortieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bonSortieService: BonSortieService,
    private produitService: ProduitsService,
    private chambreService: ChambresService,
    private clientService: ClientsService 
  ) {
    this.isEditMode = !!data.bonSortie;
    this.bonSortie = this.isEditMode ? { ...data.bonSortie } : { id: null, date: new Date(), qte: 0, idProduit: null, idChambre: null, idClient: null, idSociete: null };
  }

  ngOnInit(): void {
    this.loadProduits();
    this.loadChambres();
    this.loadClients(); 
  }

  loadProduits(): void {
    this.produitService.getProduitList().subscribe(produits => this.produits = produits);
  }

  loadChambres(): void {
    this.chambreService.getChambreList().subscribe(chambres => this.chambres = chambres);
  }
  loadClients(): void { // Ajoutez cette méthode
    this.clientService.getClientList().subscribe(clients => this.clients = clients);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.bonSortie);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
