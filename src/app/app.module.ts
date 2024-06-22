import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatTableModule } from '@angular/material/table';
import { ClientsService } from './service/clients.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { FournissursService } from './service/fournissurs.service';
import { ProduitsService } from './service/produits.service';
import { SocietesService } from './service/societes.service';
import { BonEntrersService } from './service/bon-entrers.service';
import { ChambresService } from './service/chambres.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BonSortieService } from './service/bon-sortie.service';
import { AuthServiceService } from './service/auth-service.service';
import { JournalStockService } from './service/journal-stock.service';
import { JournalCasierService } from './service/journal-casier.service';










//import { MatIconModule } from '@angular/material/icon';










//import { AddEditClientsComponent } from './clients/add-edit-clients/add-edit-clients.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    
 
   
    
    
   
    
   
   
   
   
    
   
    
    
   
    
    
    
    
   

  ],
  providers: [
    ClientsService,
    FournissursService,
    ProduitsService,
    SocietesService,
    BonEntrersService,
    ChambresService,
    BonSortieService,
    AuthServiceService,
    JournalStockService,
    JournalCasierService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
