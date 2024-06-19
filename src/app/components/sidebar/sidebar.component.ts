import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'app/service/auth-service.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/login', title: 'Login',  icon: 'login', class: '' },
    //{ path: '/societes', title: 'Societés',  icon:'notifications', class: '' },
    { path: '/chambres', title: 'Chambres',  icon:'location_on', class: '' },
    { path: '/clients', title: 'Clients',  icon:'person', class: '' },
    { path: '/fournisseurs', title: 'Fournissuers',  icon:'person', class: '' },
    { path: '/produits', title: 'Produits',  icon:'bubble_chart', class: '' },
    { path: '/bon-entrer', title: 'BonEntrer',  icon:'content_paste', class: '' },
    { path: '/bon-sorties', title: 'BonSortie',  icon:'content_paste', class: '' },
    { path: '/journal-stock', title: 'JournalStock',  icon:'content_paste', class: '' },
    { path: '/eta-stock', title: 'EtatStock',  icon:'content_paste', class: '' },
    { path: '/journal-casier', title: 'JournalCasier',  icon:'content_paste', class: '' },
    { path: '/eta-casier', title: 'EtatCasier',  icon:'content_paste', class: '' },

    
    
    

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private router: Router, // Injection du Router
    private authService: AuthServiceService // Injection du service d'authentification
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
  logout() {
    this.authService.logout(); // Appel de la méthode de déconnexion du service d'authentification
    this.router.navigate(['/login']); // Redirection vers la page de login
  }
}
