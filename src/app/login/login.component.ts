import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'app/service/auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  email: string = '';
  password: string = '';
 // idSociete: number;

  constructor(
    private authService: AuthServiceService,
    private router: Router ,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    // Afficher les valeurs de l'email, du mot de passe et de l'ID de la société dans la console
    console.log("Email:", this.email);
    console.log("Password:", this.password);
   // console.log("IdSociete:", this.idSociete);

    // Appeler la méthode de login du service d'authentification
    this.authService.login(this.email, this.password ).subscribe(
      (response: any) => {
        // Gérer la réponse ici, par exemple, stocker le token dans le localStorage
        localStorage.setItem('token', response.token);

         // Si l'authentification est réussie, stockez l'ID de la société
         //this.authService.setIdSociete(this.idSociete);

        // Rediriger vers la page appropriée
        this.router.navigate(['/bon-entrer']); // Rediriger vers le tableau de bord après la connexion réussie
      },
      error => {
        // Gérer les erreurs de connexion
        console.error('Erreur de connexion : ', error);
        // Afficher un message d'erreur à l'utilisateur
        this.snackBar.open('Email ou mot de passe incorrect.', 'Fermer', { duration: 3000 }); // Afficher une notification d'erreur
      }
    );
  }

 

}
