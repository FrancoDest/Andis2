import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private baseUrl = 'http://localhost:3000/api/order'; // URL del backend

  constructor(private http: HttpClient) { }

  completeOrder(orderDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/complete-order`, { orderDetails }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente (por ejemplo, error de red)
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.error && error.error.message) {
        // Si el backend envía un mensaje específico en la respuesta
        errorMessage = `${error.error.message}`;
      } else {
        // Mensaje genérico en caso de que no haya un mensaje específico
        errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}