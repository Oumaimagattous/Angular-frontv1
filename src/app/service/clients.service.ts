import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly baseUrl = 'https://localhost:7129/api/Client';

  constructor(private _http: HttpClient) {}

  addClient(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}`, data);
  }

  updateClient(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, data);
  }

  getClientList(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  getClient(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  
  ggetClientBySocieteId(idSociete: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/BySociete/${idSociete}`);
  }

  deleteClient(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
