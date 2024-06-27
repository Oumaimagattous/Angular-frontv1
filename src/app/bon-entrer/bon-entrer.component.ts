import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BonEntrersService } from 'app/service/bon-entrers.service';
import { Router } from '@angular/router';
import { BonEntree } from 'app/Models/bon-entree';
import { AddEditBonEntrerComponent } from './add-edit-bon-entrer/add-edit-bon-entrer.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'app/service/auth-service.service';
import { SocietesService } from 'app/service/societes.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FournissursService } from 'app/service/fournissurs.service';
import { ClientsService } from 'app/service/clients.service';
import { ProduitsService } from 'app/service/produits.service';
import { ChambresService } from 'app/service/chambres.service';

@Component({
  selector: 'app-bon-entrer',
  templateUrl: './bon-entrer.component.html',
  styleUrls: ['./bon-entrer.component.scss']
})
export class BonEntrerComponent implements OnInit {

  bonsEntree: BonEntree[] = [];
  filteredBonsEntree: BonEntree[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  
 //@ViewChild(MatSnackBar) snackBar: MatSnackBar;

  constructor(
    private bonEntreeService: BonEntrersService,
    private authService: AuthServiceService, 
    private societeService: SocietesService,
    private fournisseurService: FournissursService,
    private chambreService: ChambresService,
    private produitService: ProduitsService,
    private snackBar: MatSnackBar,
    private router: Router,

    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBonsEntree();
  }

  
  loadBonsEntree(): void {
    const idSociete = this.authService.getIdSociete();
    console.log('ID de la société:', idSociete);

    if (idSociete) {
      this.bonEntreeService.getBonEntrerList().subscribe(bonsEntree => {
        console.log('Bons d\'entrée:', bonsEntree);
        this.bonsEntree = bonsEntree;
        this.filteredBonsEntree = this.bonsEntree.filter(bonEntree => bonEntree.idSociete === idSociete); // Filtrer les bons d'entrée par ID de société
        console.log('Filtered Bons d\'entrée:', this.filteredBonsEntree);
      });
    } else {
      console.error('ID de société non défini.');
    }
  }

 
  applyDateFilter(): void {
    const idSociete = this.authService.getIdSociete();
    if (!idSociete) {
      console.error('ID de société non défini.');
      return;
    }
  
    this.filteredBonsEntree = this.bonsEntree.filter(bonEntree => {
      const date = new Date(bonEntree.date);
      return bonEntree.idSociete === idSociete &&
             (!this.startDate || date >= this.startDate) &&
             (!this.endDate || date <= this.endDate);
    });
  }
  

  addBonEntree(): void {
    const dialogRef = this.dialog.open(AddEditBonEntrerComponent, {
      width: '400px',
      data: { bonEntree: null } // Assurez-vous d'envoyer null ici pour ajouter un nouveau bon d'entrée
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonEntreeService.addBonEntrer(result).subscribe(() => {
          this.loadBonsEntree();
          this.snackBar.open('Bon d\'entrée ajouté avec succès', 'Fermer', { duration: 2000 });
        });
      }
    });
  }
  
  
  

  editBonEntree(id: number): void {
    const bonEntree = this.bonsEntree.find(b => b.id === id);
    const dialogRef = this.dialog.open(AddEditBonEntrerComponent, {
      width: '400px',
      data: { bonEntree }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonEntreeService.updateBonEntrer(result.id, result).subscribe(() => {
          this.loadBonsEntree();
          this.snackBar.open('Bon d\'entrée modifié avec succès', 'Fermer', { duration: 2000 });
        });
      }
    });
  }
  
  

  deleteBonEntree(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bon d\'entrée ?')) {
      this.bonEntreeService.deleteBonEntrer(id).subscribe(() => {
        this.snackBar.open('Bon d\'entrée supprimé avec succès', 'Fermer', { duration: 2000 });
        
        // Supprimer le bon d'entrée de la liste locale bonsEntree
        this.bonsEntree = this.bonsEntree.filter(bonEntree => bonEntree.id !== id);
  
        // Mettre à jour filteredBonsEntree si nécessaire (assurez-vous que filteredBonsEntree est mis à jour selon vos filtres appliqués)
        this.filteredBonsEntree = this.filteredBonsEntree.filter(bonEntree => bonEntree.id !== id);
      });
    }
  }
  
  
  async printBonEntrer(bonEntree: BonEntree): Promise<void> {
    const doc = new jsPDF();

    // Récupérer la date du jour
    const currentDate = new Date().toLocaleDateString();

    // Titre du bon de sortie
    const title = `Bon d'Entrer numéro: ${bonEntree.numeroBonEntree}`;

    // Informations sur la société (partie fixe)
    const societeId = this.authService.getIdSociete(); // Supposons que vous avez une méthode dans votre service AuthService pour obtenir l'ID de la société
    const societe = await this.societeService.getSociete(societeId).toPromise();
    const societeInfo = `
      Société: ${societe.name}
      Responsable: ${societe.responsable}
      Adresse: ${societe.adresse}
      Téléphone: ${societe.telephone}
      Email: ${societe.email}
    `;

    // Informations sur le fournisseur
    const fournisseur = await this.fournisseurService.getFournisseur(bonEntree.idFournisseur).toPromise();
    const fournisseurInfo = `
      Fournisseur: ${fournisseur.nomCommercial}
      Nom : ${fournisseur.name}
      Adresse: ${fournisseur.adresse}
      Téléphone: ${fournisseur.telephone}
      CIN : ${fournisseur.cin}
    `;

    // Informations sur le bon de sortie
    const produit = await this.produitService.getProduit(bonEntree.idProduit).toPromise();
    const chambre = await this.chambreService.getChambre(bonEntree.idChambre).toPromise();

    const bonEntrerInfo = `
      Produit: ${produit.name}
      Quantité (Kg): ${bonEntree.qte}
       Nombre de Casier: ${bonEntree.nombreCasier}
      Numéro Bon de Entrer: ${bonEntree.numeroBonEntree}
      Chambre: ${chambre.name}
      Date: ${new Date(bonEntree.date).toLocaleDateString()}
    `;

    // Définir les marges
    const margin = 10;

    // Largeur et hauteur de la page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Ajouter les informations au document PDF
    doc.setFontSize(18);
    doc.text(title, pageWidth / 2, margin, { align: 'center' });

    // Ajouter la date du jour aux extrémités de la page
    doc.setFontSize(10);
   // doc.text(currentDate, margin, margin);
    doc.text(currentDate, pageWidth - margin, margin, { align: 'right' });

    // Dessiner un cadre pour chaque partie
    const lineHeight = 6;
    let y = margin + lineHeight;

    doc.setFont('helvetica', 'bold'); // Mettre en gras
    doc.setFontSize(12);
    doc.text('Informations sur la Société', margin, y);
    y += lineHeight;
    doc.rect(margin, y, pageWidth - 2 * margin, 40); // Cadre pour les informations sur la société
    doc.setFont('helvetica', 'normal'); // Revenir à la police normale
    doc.setFontSize(10);
    doc.text(societeInfo, margin + 5, y + 5);

    y += 50; // Espace supplémentaire

    doc.setFont('helvetica', 'bold'); // Mettre en gras
    doc.setFontSize(12);
    doc.text('Informations sur le Fournisseur', margin, y);
    y += lineHeight;
    doc.rect(margin, y, pageWidth - 2 * margin, 40); // Cadre pour les informations sur le fournisseur
    doc.setFont('helvetica', 'normal'); // Revenir à la police normale
    doc.setFontSize(10);
    doc.text(fournisseurInfo, margin + 5, y + 5);

    y += 50; // Espace supplémentaire

    doc.setFont('helvetica', 'bold'); // Mettre en gras
    doc.setFontSize(12);
    doc.text('Informations du Bon Entrer', margin, y);
    y += lineHeight;
    doc.rect(margin, y, pageWidth - 2 * margin, 50); // Cadre pour les informations sur le bon de sortie
    doc.setFont('helvetica', 'normal'); // Revenir à la police normale
    doc.setFontSize(10);
    doc.text(bonEntrerInfo, margin + 5, y + 5);

    // Afficher la fenêtre d'impression
    doc.output('dataurlnewwindow');
}




}
