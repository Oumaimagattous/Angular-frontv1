import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonEntrersService {
  private readonly baseUrl = 'https://localhost:7129/api/BonEntree';

  constructor(private _http: HttpClient) {}

  addBonEntrer(data: any): Observable<any> {
    return this._http.post(this.baseUrl, data);
  }

  updateBonEntrer(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, data);
  }

  getBonEntrerList(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  getBonEntrer(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  deleteBonEntrer(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
