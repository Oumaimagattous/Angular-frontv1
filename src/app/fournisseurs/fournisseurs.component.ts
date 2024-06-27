import { Component, OnInit, ViewChild } from '@angular/core';
//import { Fournisseur } from './Models/fournisseur';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FournissursService } from 'app/service/fournissurs.service';
import { Router } from '@angular/router';
import { Fournisseur } from 'app/Models/fournisseur';
import { AddEditFournissuresComponent } from './add-edit-fournissures/add-edit-fournissures.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from 'app/service/auth-service.service';
import { TranslateService } from '@ngx-translate/core'; 


@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit {

  fournisseurs: Fournisseur[] = [];
  filteredFournisseurs: Fournisseur[] = [];
  @ViewChild(MatSnackBar) snackBar: MatSnackBar;
  

  constructor(
    private fournisseursService: FournissursService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loadFournisseurs();
    this.setTranslations(); 
  }

  loadFournisseurs(): void {
    const idSociete = this.authService.getIdSociete(); // Récupérer l'ID de la société
    console.log('ID de la société:', idSociete);

    if (idSociete) {
      this.fournisseursService.getFournisseurList().subscribe(fournisseurs => {
        this.fournisseurs = fournisseurs.filter(f => f.idSociete === idSociete); // Filtrer les fournisseurs par ID de société
        this.filteredFournisseurs = this.fournisseurs;
      });
    } else {
      console.error('ID de société non défini.');
    }
  }

  applyFilter(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredFournisseurs = this.fournisseurs.filter(fournisseur => 
      fournisseur.name.toLowerCase().includes(searchTerm) ||
      fournisseur.adresse.toLowerCase().includes(searchTerm)||
      fournisseur.nomCommercial.toLowerCase().includes(searchTerm)
    );
  }

  deleteFournisseur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseursService.deleteFournisseur(id).subscribe(() => {
        this.snackBar.open('Fournisseur supprimé avec succès', 'Fermer', { duration: 2000 });
        
        // Mettre à jour la liste locale après suppression
        this.filteredFournisseurs = this.filteredFournisseurs.filter(f => f.id !== id);
  
        // Recharger la liste complète des fournisseurs depuis le backend
        this.loadFournisseurs();
      });
    }
  }
    


  navigateToAddFournisseur(): void {
    const dialogRef = this.dialog.open(AddEditFournissuresComponent, {
      width: '400px',
      data: { fournisseur: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFournisseurs();
      }
    });
  }

  navigateToEditFournisseur(id: number): void {
    const fournisseur = this.fournisseurs.find(f => f.id === id);
    const dialogRef = this.dialog.open(AddEditFournissuresComponent, {
      width: '400px',
      data: { fournisseur: fournisseur }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFournisseurs();
      }
    });
  }

  // Fonction pour définir les traductions
  private setTranslations(): void {
    this.translate.get('liste_Fournisseurs').subscribe((translation: string) => {
      document.title = translation; // Modifier le titre de la page par exemple
    });
  }

}
