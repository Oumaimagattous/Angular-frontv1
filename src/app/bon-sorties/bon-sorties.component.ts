import { Component, OnInit } from '@angular/core';
import { BonSortie } from 'app/Models/bon-sortie';
import { BonSortieService } from 'app/service/bon-sortie.service';
import { AddEditBonSortieComponent } from './add-edit-bon-sortie/add-edit-bon-sortie.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'app/service/auth-service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ClientsService } from 'app/service/clients.service';
import { ProduitsService } from 'app/service/produits.service';
import { ChambresService } from 'app/service/chambres.service';
import { FournissursService } from 'app/service/fournissurs.service';
import { SocietesService } from 'app/service/societes.service';
@Component({
  selector: 'app-bon-sorties',
  templateUrl: './bon-sorties.component.html',
  styleUrls: ['./bon-sorties.component.scss']
})
export class BonSortiesComponent implements OnInit {

  sorties: BonSortie[] = [];
  filteredBonsSortie: BonSortie[] = []; // Liste filtrée des bons de sortie
  startDate: Date;
  endDate: Date;

  constructor(
    private bonsortieService: BonSortieService,
    private authService: AuthServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private clientService: ClientsService,
    private produitService: ProduitsService,
    private chambreService: ChambresService,
    private societeService: SocietesService,
    private fournisseurService: FournissursService
  ) { }

  ngOnInit(): void {
    this.loadSorties();
  }

  loadSorties() {
    const idSociete = this.authService.getIdSociete(); // Récupérer l'ID de la société
    console.log('ID de la société:', idSociete);

    if (idSociete) {
      this.bonsortieService.getBonsSortie().subscribe(
        (data: BonSortie[]) => {
          this.sorties = data;
          this.filteredBonsSortie = data.filter(bonSortie => bonSortie.idSociete === idSociete); // Filtrer les bons de sortie par ID de société
        },
        (error) => {
          console.log('Une erreur s\'est produite lors du chargement des bons de sortie:', error);
        }
      );
    } else {
      console.error('ID de société non défini.');
    }
  }


  applyDateFilter() {
    // Filtre les sorties en fonction de la date de début et de fin
    if (this.startDate && this.endDate) {
      this.filteredBonsSortie = this.sorties.filter(bonSortie =>
        new Date(bonSortie.date) >= this.startDate && new Date(bonSortie.date) <= this.endDate
      );
    } else {
      // Si l'une des dates est vide, affiche toutes les sorties
      this.filteredBonsSortie = this.sorties;
    }
  }

  
  
  deletebonSortie(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bon d\'entrée ?')) {
      this.bonsortieService.deleteBonSortie(id).subscribe(() => {
        this.snackBar.open('Bon d\'entrée supprimé avec succès', 'Fermer', { duration: 2000 });
        this.loadSorties();
      });
    }
  }

  addBonSortie(): void {
    const dialogRef = this.dialog.open(AddEditBonSortieComponent, {
      width: '400px',
      data: { bonSortie: null } // Assurez-vous d'envoyer null ici pour ajouter un nouveau bon de sortie
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonsortieService.addBonSortie(result).subscribe(() => {
          this.loadSorties();
          this.snackBar.open('Bon de sortie ajouté avec succès', 'Fermer', { duration: 2000 });
        });
      }
    });
  }

  editBonSortie(id: number): void {
    const bonSortie = this.sorties.find(b => b.id === id);
    const dialogRef = this.dialog.open(AddEditBonSortieComponent, {
      width: '400px',
      data: { bonSortie }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonsortieService.updateBonSortie(result).subscribe(() => { // Correction ici
          this.loadSorties();
          this.snackBar.open('Bon de sortie modifié avec succès', 'Fermer', { duration: 2000 });
        });
      }
    });
  }


  async printBonSortie(bonSortie: BonSortie): Promise<void> {
    const doc = new jsPDF();

    // Récupérer la date du jour
    const currentDate = new Date().toLocaleDateString();

    // Titre du bon de sortie
    const title = `Bon de Sortie numéro: ${bonSortie.numeroBonSortie}`;

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
    const fournisseur = await this.fournisseurService.getFournisseur(bonSortie.idFournisseur).toPromise();
    const fournisseurInfo = `
      Fournisseur: ${fournisseur.nomCommercial}
      Nom : ${fournisseur.name}
      Adresse: ${fournisseur.adresse}
      Téléphone: ${fournisseur.telephone}
      CIN : ${fournisseur.cin}
    `;

    // Informations sur le bon de sortie
    const produit = await this.produitService.getProduit(bonSortie.idProduit).toPromise();
    const client = await this.clientService.getClient(bonSortie.idClient).toPromise();
    const chambre = await this.chambreService.getChambre(bonSortie.idChambre).toPromise();

    const bonSortieInfo = `
      Produit: ${produit.name}
      Quantité (Kg): ${bonSortie.qte}
      Numéro Bon de Sortie: ${bonSortie.numeroBonSortie}
      Matricule: ${bonSortie.matricule}
      Chauffeur: ${bonSortie.chauffeur}
      CIN Chauffeur: ${bonSortie.cinChauffeur}
      Client: ${client.name}
      Chambre: ${chambre.name}
      Date: ${new Date(bonSortie.date).toLocaleDateString()}
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
    doc.text('Informations du Bon de Sortie', margin, y);
    y += lineHeight;
    doc.rect(margin, y, pageWidth - 2 * margin, 50); // Cadre pour les informations sur le bon de sortie
    doc.setFont('helvetica', 'normal'); // Revenir à la police normale
    doc.setFontSize(10);
    doc.text(bonSortieInfo, margin + 5, y + 5);

    // Afficher la fenêtre d'impression
    doc.output('dataurlnewwindow');
}

}
