import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private _http: HttpClient) {}

  addClient(data: any): Observable<any> {
    return this._http.post('https://localhost:7129/api/Client', data);
  }

  updateClient(id: number, data: any): Observable<any> {
    return this._http.put(`https://localhost:7129/api/Client/${id}`, data);
  }

  getClientList(): Observable<any> {
    return this._http.get('https://localhost:7129/api/Client');
  }

  getClient(id: number): Observable<any> {
    return this._http.get(`https://localhost:7129/api/Client/${id}`);
  }

  deleteClient(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7129/api/Client/${id}`);
  }
}
