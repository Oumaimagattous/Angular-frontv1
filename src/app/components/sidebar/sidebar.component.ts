import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'app/service/auth-service.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[];
    open?: boolean;
}
export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/bon-entrer', title: 'Gestion des Entrées',  icon:'input', class: '' },
    { path: '/bon-sorties', title: 'Gestion des sorties',  icon:'exit_to_app', class: '' },
    //{ path: '/login', title: 'Login',  icon: 'login', class: '' },
    //{ path: '/societes', title: 'Societés',  icon:'notifications', class: '' },
    {
      path: '/Parametrage', 
      title: 'Paramétrage', 
      icon: 'settings',  
      class: '', 
      children: [
        { path: '/chambres', title: 'Chambres', icon: 'home', class: '' },  
        { path: '/clients', title: 'Clients', icon: 'group', class: '' }, 
        { path: '/fournisseurs', title: 'Fournissuers', icon: 'local_shipping', class: '' },  
        { path: '/produits', title: 'Produits', icon: 'shopping_cart', class: '' } 
      ]
    },
    
    {
      path: '/stock', 
      title: 'Statistique', 
      icon: 'bar_chart',  
      class: '', 
      children: [
        { path: 'journal-stock', title: 'Journal du Stock', icon: 'assessment', class: '' },  
        { path: 'eta-stock', title: 'Etat du Stock', icon: 'inventory_2', class: '' },  
        { path: 'journal-casier', title: 'Journal du Casier', icon: 'folder', class: '' }  
      ]
    }
    
    
    
    

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

  toggleSubMenu(menuItem: RouteInfo) {
    if (menuItem.children) {
      menuItem.open = !menuItem.open;
    }
  }

}
