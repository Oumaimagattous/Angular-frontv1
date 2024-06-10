import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonSortie } from 'app/Models/bon-sortie';

@Injectable({
  providedIn: 'root'
})
export class BonSortieService {

  private apiUrl = 'https://localhost:7129/api/BonSortie';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les bons de sortie depuis l'API
  getBonsSortie(): Observable<BonSortie[]> {
    return this.http.get<BonSortie[]>(this.apiUrl);
  }
   // Méthode pour ajouter un bon de sortie
   addBonSortie(bonSortie: BonSortie): Observable<BonSortie> {
    return this.http.post<BonSortie>(this.apiUrl, bonSortie);
  }

  // Méthode pour supprimer un bon de sortie
  deleteBonSortie(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // Méthode pour mettre à jour un bon de sortie
  updateBonSortie(bonSortie: BonSortie): Observable<BonSortie> {
    const url = `${this.apiUrl}/${bonSortie.id}`;
    return this.http.put<BonSortie>(url, bonSortie);
  }
}
