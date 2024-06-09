
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'app/service/clients.service';
//import { Client } from../Models/client.modelel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Client } from 'app/Models/client';
import { AddEditClientsComponent } from './add-edit-clients/add-edit-clients.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

  @ViewChild(MatSnackBar) snackBar: MatSnackBar;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private dialog: MatDialog,
    
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClientList().subscribe(clients => {
      this.clients = clients;
      
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    // Appliquer le filtre sur les clients
    this.clients = this.clients.filter(client =>
      client.name.toLowerCase().includes(filterValue) || // Filtre par nom
      client.adresse.toLowerCase().includes(filterValue) || // Filtre par adresse
      client.type.toLowerCase().includes(filterValue) || // Filtre par type
      client.cin.toLowerCase().includes(filterValue) // Filtre par CIN
    );
  }

  


  
  deleteClient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientsService.deleteClient(id).subscribe(() => {
        this.snackBar.open('Client supprimé avec succès', 'Fermer', { duration: 2000 });
        this.loadClients();
      });
    }
  }
  navigateToAddClient(): void {
    const dialogRef = this.dialog.open(AddEditClientsComponent, {
      width: '400px',
      data: { client: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientsService.addClient(result).subscribe(() => {
          this.snackBar.open('Client ajouté avec succès', 'Fermer', { duration: 2000 });
          this.loadClients();
        });
      }
    });
  }

  navigateToEditClient(clientId: number): void {
    const client = this.clients.find(c => c.id === clientId);
    const dialogRef = this.dialog.open(AddEditClientsComponent, {
      width: '400px',
      data: { client }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientsService.updateClient(result.id, result).subscribe(() => {
          this.snackBar.open('Client modifié avec succès', 'Fermer', { duration: 2000 });
          this.loadClients();
        });
      }
    });
  }
  




}
