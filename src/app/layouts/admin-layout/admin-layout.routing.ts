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
import { LoginComponent } from '../../login/login.component';
import { AuthGuard } from '../../auth.guard';
import { JournalStockComponent } from '../../journal-stock/journal-stock.component';
import { EtaStockComponent } from '../../eta-stock/eta-stock.component';
import { JournalCasierComponent } from '../../journal-casier/journal-casier.component';
import { EtaCasierComponent } from '../../eta-casier/eta-casier.component';


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
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    //{ path: 'clients',        component: ClientsComponent },
  
    { path: 'Parametrage/clients', component: ClientsComponent, canActivate: [AuthGuard] },
    { path: 'Parametrage/fournisseurs', component: FournisseursComponent, canActivate: [AuthGuard] },
    { path: 'Parametrage/produits', component: ProduitsComponent, canActivate: [AuthGuard] },
    { path: 'societes', component: SocietesComponent, canActivate: [AuthGuard] },
    { path: 'Parametrage/chambres', component: ChambresComponent, canActivate: [AuthGuard] },
    { path: 'bon-entrer', component: BonEntrerComponent, canActivate: [AuthGuard] },
    { path: 'bon-sorties', component: BonSortiesComponent, canActivate: [AuthGuard] },
    { path: 'stock/journal-stock', component: JournalStockComponent, canActivate: [AuthGuard] },
    { path: 'stock/eta-stock', component: EtaStockComponent, canActivate: [AuthGuard] },
    { path: 'stock/journal-casier', component: JournalCasierComponent, canActivate: [AuthGuard] },
    { path: 'eta-casier', component: EtaCasierComponent, canActivate: [AuthGuard] },
    
    { path: 'login', component: LoginComponent }


    

    
    
    
];
