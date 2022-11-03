/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FacturesService {
    apiURLFactures = environment.apiURL + 'factures/';

    constructor(private http: HttpClient) {}

    // Getting the factures from the backend
    getFactures(): Observable<Facture[]> {
        return this.http.get<Facture[]>(this.apiURLFactures);
    }

    // Getting the factures by user id from the backend
    getFacturesByUser(userId: string): Observable<Facture[]> {
        return this.http.get<Facture[]>(`${this.apiURLFactures}users/${userId}`);
    }

    // Getting the facture after filtering  from the backend
    getfilteredFactures(userId?: string, month?: string | number ): Observable<Facture[]> {
        return this.http.get<Facture[]>(`${this.apiURLFactures}months/users?month=${month}&user=${userId}`);
    }

    // Getting a specific facture by id
    getSingleFacture(factureId: string): Observable<Facture> {
        return this.http.get<Facture>(`${this.apiURLFactures}${factureId}`);
    }

    // Creating a facture
    createFacture(facture: FormData): Observable<Facture> {
        return this.http.post<Facture>(this.apiURLFactures, facture);
    }

    // Updating a facture
    updateFacture(
        facture: FormData,
        factureId: string
    ): Observable<Facture> {
        //updating a specific facture
        return this.http.put<Facture>(
            `${this.apiURLFactures}${factureId}`,
            facture
        );
    }

    // Deleting a facture
    deleteFacture(factureId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLFactures}${factureId}`);
    }

    // getting active months
    getActiveMonths(userId: string) {
      return this.http.get<any[]>(`${this.apiURLFactures}months/${userId}`)
    }

}
