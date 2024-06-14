import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocietesService {
  private readonly baseUrl = 'https://localhost:7129/api/Societe';

  constructor(private _http: HttpClient) {}

  addSociete(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}`, data);
  }

  updateSociete(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, data);
  }

  getSocieteList(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Nouvelle méthode pour récupérer les informations de la société connectée
  getCurrentSociete(): Observable<any> {
    return this._http.get(`${this.baseUrl}/current`);
  }

  getSociete(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  deleteSociete(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
