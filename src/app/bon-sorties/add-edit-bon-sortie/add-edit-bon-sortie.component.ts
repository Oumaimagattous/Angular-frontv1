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
import { AuthServiceService } from 'app/service/auth-service.service';
import { Fournisseur } from 'app/Models/fournisseur';
import { FournissursService } from 'app/service/fournissurs.service';

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
  fournisseurs: Fournisseur[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditBonSortieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bonSortieService: BonSortieService,
    private produitService: ProduitsService,
    private chambreService: ChambresService,
    private clientService: ClientsService ,
    private fournisseurService: FournissursService,
    private authService: AuthServiceService
  ) {
    this.isEditMode = !!data.bonSortie;
    this.bonSortie = this.isEditMode ? { ...data.bonSortie } : { 
      id: null, 
      date: new Date(), 
      qte: 0, 
      idProduit: null, 
      idChambre: null, 
      idClient: null, 
      idFournisseur: null, 
      matricule: '', 
      chauffeur: '', 
      cinChauffeur: '', 
      nbrScasier: 0,  
      numeroBonSortie: 0, 
      idSociete: null 
  };

  }

  ngOnInit(): void {

    // Récupérer l'ID de la société connectée depuis le service d'authentification
    const idSociete = this.authService.getIdSociete();
    this.bonSortie.idSociete = idSociete; // Définir l'ID de la société dans le bon de sortie

    this.loadProduits(idSociete);
    this.loadChambres();
    this.loadClients(); 
    this.loadFournisseurs();
  }

  loadProduits(idSociete: number): void {
    this.produitService.getProduitsBySociete(idSociete).subscribe(produits => this.produits = produits);
  }


  loadChambres(): void {
    this.chambreService.getChambreList().subscribe(chambres => this.chambres = chambres);
  }
  loadClients(): void { // Ajoutez cette méthode
    this.clientService.getClientList().subscribe(clients => this.clients = clients);
  }
  
  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurList().subscribe(fournisseurs => this.fournisseurs = fournisseurs);
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
