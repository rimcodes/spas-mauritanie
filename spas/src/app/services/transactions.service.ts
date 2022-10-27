import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  apiURLTransactions = environment.apiURL + 'transactions/';

  constructor(private http: HttpClient) {}

  // Getting the transaction from the backend
  getTransactions(selectedFacts?: string[]): Observable<Transaction[]> {
    let params = new HttpParams();
    if (selectedFacts) {
      params = params.append('categories', selectedFacts.join(','));
      return this.http.get<Transaction[]>(this.apiURLTransactions, { params });
    }
    return this.http.get<Transaction[]>(this.apiURLTransactions);
  }

  // Getting a specific transaction by id
  getSingleTransaction(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiURLTransactions}${transactionId}`);
  }
  // Getting a transaction by name
  getTransactionByName(productName: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiURLTransactions}factures/${productName}`
    );
  }

  // Creating a Transaction
  createTransaction(transactionFormData: FormData): Observable<Transaction> {
    return this.http.post<Transaction>(
      this.apiURLTransactions,
      transactionFormData
    );
  }

  // Getting featured products
  getFeaturedTransactions(count: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiURLTransactions}get/featured/${count}`
    );
  }

  // Updating a Transaction
  updateTransaction(
    transactionFormData: FormData,
    transactionId: string
  ): Observable<Transaction> {
    //updating a specific Transaction
    return this.http.put<Transaction>(
      `${this.apiURLTransactions}${transactionId}`,
      transactionFormData
    );
  }

  // Deleting a Transaction
  deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLTransactions}${transactionId}`);
  }

}
