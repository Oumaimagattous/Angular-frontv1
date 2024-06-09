import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private _http: HttpClient) {}

  addProduit(data: any): Observable<any> {
    return this._http.post('https://localhost:7129/api/Produit', data);
  }

  updateProduit(id: number, data: any): Observable<any> {
    return this._http.put(`https://localhost:7129/api/Produit/${id}`, data);
  }

  getProduitList(): Observable<any> {
    return this._http.get('https://localhost:7129/api/Produit');
  }

  deleteProduit(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7129/api/Produit/${id}`);
  }
}
