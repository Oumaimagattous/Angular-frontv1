import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { JournalCasier } from 'app/Models/JournalCasier ';

@Injectable({
  providedIn: 'root'
})
export class JournalCasierService {

  private baseUrl = 'https://localhost:7129/api/JournalCasier';

  constructor(private http: HttpClient) { }

  getAllEntries(societeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?societeId=${societeId}`);
  }

  getEtatStock(societeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/etatStock?societeId=${societeId}`);
  }

  addEntry(entry: JournalCasier): Observable<JournalCasier> {
    return this.http.post<JournalCasier>(this.baseUrl, entry);
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
