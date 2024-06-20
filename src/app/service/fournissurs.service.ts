import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournissursService {
  private readonly baseUrl = 'https://localhost:7129/api/Fournisseur';

  constructor(private _http: HttpClient) {}

  addFournisseur(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}`, data);
  }

  updateFournisseur(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, data);
  }

  getFournisseurList(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  getFournisseur(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  
  getFournisseurBySocieteId(idSociete: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/BySociete/${idSociete}`);
  }

  deleteFournisseur(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
