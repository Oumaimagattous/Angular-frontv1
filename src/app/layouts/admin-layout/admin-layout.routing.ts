import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClientsComponent } from '../../clients/clients.component';
import { FournisseursComponent } from '../../fournisseurs/fournisseurs.component';
import { ProduitsComponent } from '../../produits/produits.component';
import { SocietesComponent } from '../../societes/societes.component';
import { BonEntrerComponent } from '../../bon-entrer/bon-entrer.component';
import { ChambresComponent } from '../../chambres/chambres.component';
import { BonSortiesComponent } from '../../bon-sorties/bon-sorties.component';
//import { ClientsComponent } from '../../clients/clients.component'; 

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'clients',        component: ClientsComponent },
    //{ path: 'clients/add-edit-clients',        component: AddEditClientsComponent },
    { path: 'fournisseurs',        component: FournisseursComponent },
    { path: 'produits',        component: ProduitsComponent },
    { path: 'societes',        component: SocietesComponent },
    { path: 'bon-entrer',        component: BonEntrerComponent },
    { path: 'chambres',        component: ChambresComponent },
    { path: 'bon-sorties',        component: BonSortiesComponent },

    

    
    
    
];
