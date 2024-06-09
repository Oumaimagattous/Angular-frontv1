import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/societes', title: 'Societés',  icon:'notifications', class: '' },
    { path: '/chambres', title: 'Chambres',  icon:'location_on', class: '' },
    { path: '/clients', title: 'Clients',  icon:'person', class: '' },
    { path: '/fournisseurs', title: 'Fournissuers',  icon:'person', class: '' },
    { path: '/produits', title: 'Produits',  icon:'bubble_chart', class: '' },
    { path: '/bon-entrer', title: 'BonEntrer',  icon:'content_paste', class: '' },
    { path: '/bon-sorties', title: 'BonSortie',  icon:'content_paste', class: '' },
    
    

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
