import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournissursService {
  constructor(private _http: HttpClient) {}

  addFournisseur(data: any): Observable<any> {
    return this._http.post('https://localhost:7129/api/Fournisseur', data);
  }

  updateFournisseur(id: number, data: any): Observable<any> {
    return this._http.put(`https://localhost:7129/api/Fournisseur/${id}`, data);
  }

  getFournisseurList(): Observable<any> {
    return this._http.get('https://localhost:7129/api/Fournisseur');
  }

  deleteFournisseur(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7129/api/Fournisseur/${id}`);
  }
}
