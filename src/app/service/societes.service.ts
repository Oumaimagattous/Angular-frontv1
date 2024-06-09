import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocietesService {

  constructor(private _http: HttpClient) {}

  addSociete(data: any): Observable<any> {
    return this._http.post('https://localhost:7129/api/Societe', data);
  }

  updateSociete(id: number, data: any): Observable<any> {
    return this._http.put(`https://localhost:7129/api/Societe/${id}`, data);
  }

  getSocieteList(): Observable<any> {
    return this._http.get('https://localhost:7129/api/Societe');
  }

  deleteSociete(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7129/api/Societe/${id}`);
  }
}
