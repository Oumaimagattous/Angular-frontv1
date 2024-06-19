import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private readonly baseUrl = 'https://localhost:7129/api/Produit';

  constructor(private _http: HttpClient) {}

  addProduit(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}`, data);
  }

  updateProduit(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, data);
  }

  getProduitList(): Observable<any> {
    return this._http.get(`${this.baseUrl}/all`);
  }

 // Nouvelle méthode pour obtenir la liste des produits par ID de société
 getProduitsBySociete(societeId: number): Observable<any[]> {
  return this._http.get<any[]>(`${this.baseUrl}/bysociete/${societeId}`);
}
  
  

  getProduit(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  deleteProduit(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}

