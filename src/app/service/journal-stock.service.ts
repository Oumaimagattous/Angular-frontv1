// src/app/services/journal-stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JournalStock } from 'app/Models/journal-stock';


@Injectable({
  providedIn: 'root'
})
export class JournalStockService {
  private apiUrl = 'https://localhost:7129/api/JournalStock'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les entrées du journal de stock
  getJournalStocks(societeId: number): Observable<JournalStock[]> {
    return this.http.get<JournalStock[]>(`${this.apiUrl}?societeId=${societeId}`);
  }

  getJournalStock(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /*getEtatStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/etatStock`);
  }*/
 
    getEtatStock(societeId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/etatStock?societeId=${societeId}`);
    }


  // Supprimer une entrée du journal de stock par ID
  deleteJournalStock(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
