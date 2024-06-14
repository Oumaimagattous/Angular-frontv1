import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JournalStock, JournalStockDto } from 'app/Models/journal-stock';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JournalStockService {

 // URL de l'API
 private apiUrl = 'https://localhost:7129/api/JournalStock';

 constructor(private http: HttpClient) { }

 // Récupérer tous les journaux de stock
 getJournalStock(): Observable<JournalStock[]> {
   return this.http.get<JournalStock[]>(this.apiUrl);
 }

 // Récupérer un journal de stock par ID
 getJournalStockById(id: number): Observable<JournalStock> {
   return this.http.get<JournalStock>(`${this.apiUrl}/${id}`);
 }

 // Ajouter un journal de stock
 addJournalStock(journalStock: JournalStockDto): Observable<JournalStock> {
   return this.http.post<JournalStock>(this.apiUrl, journalStock);
 }

 // Mettre à jour un journal de stock
 updateJournalStock(id: number, journalStock: JournalStockDto): Observable<JournalStock> {
   return this.http.put<JournalStock>(`${this.apiUrl}/${id}`, journalStock);
 }

 // Supprimer un journal de stock
 deleteJournalStock(id: number): Observable<void> {
   return this.http.delete<void>(`${this.apiUrl}/${id}`);
 }
}
