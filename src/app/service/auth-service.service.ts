import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseUrl  = 'https://localhost:7129/api/Login';
  private idSociete: number | null = null;

  constructor(private _http: HttpClient, private router: Router) { }



 

  login(email: string, password: string): Observable<any> {
    return this._http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('idSociete', response.idSociete); // Stocker l'ID de la société
      })
    );
  }
  
  getIdSociete(): number | null {
    const id = localStorage.getItem('idSociete');
    return id ? parseInt(id, 10) : null;
  }


  
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    // Retourner une observable vide
    return new Observable<any>();
  }
  
}

