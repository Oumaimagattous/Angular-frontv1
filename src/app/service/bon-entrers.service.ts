import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonEntrersService {

  constructor(private _http: HttpClient) {}

  addBonEntrer(data: any): Observable<any> {
    return this._http.post('https://localhost:7129/api/BonEntree', data);
  }

  updateBonEntrer(id: number, data: any): Observable<any> {
    return this._http.put(`https://localhost:7129/api/BonEntree/${id}`, data);
  }

  getBonEntrerList(): Observable<any> {
    return this._http.get('https://localhost:7129/api/BonEntree');
  }

  deleteBonEntrer(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7129/api/BonEntree/${id}`);
  }
}
