import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private URL = 'http://localhost:3000/api'; 

  constructor(  
    private http: HttpClient,
    private router: Router
  ) {}

  create(orderData: any): Observable<any> {
    const url = `${this.URL}/orders`; // URL para el endpoint de creación
    return this.http.post(url, orderData).pipe(
      catchError((error: any) => {
        console.error('Error creating order:', error);
        return throwError(error);
      })
    );
  }  

findAll(): Observable<any> {
  const url = `${this.URL}/orders`;
  return this.http.get(url).pipe(
    map((response: any) => {
      console.log('Raw API response:', response); // Debug log
      const orders = response.data.map((order: any) => ({
        ...order,
        orderItems: order.orderItems.map((item: any) => ({
          ...item,
          product: item.productId || item.product, // Handle both possible structures
          subtotal: item.quantity * item.unitPrice
        }))
      }));
      return { data: orders };
    }),
    catchError((error: any) => {
      console.error('Error in findAll:', error);
      return throwError(error);
    })
  );
}

update(order: any): Observable<any> {
  const url = `${this.URL}/orders/${order.id}`;
  return this.http.put(url, order).pipe(
    catchError((error: any) => {
      console.error('Error updating order:', error);
      return throwError(error);
    })
  );
}

delete(orderId: string): Observable<any> {
  const url = `${this.URL}/orders/${orderId}`;
  return this.http.delete(url).pipe(
    catchError((error: any) => {
      console.error('Error deleting order:', error);
      return throwError(error);
    })
  );
}

  getOrdersByEmail(email: string): Observable<any> {
    const url = `${this.URL}/orders/user/email/${email}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return {
          data: response.data.map((order: any, index: number) => ({
            ...order,
            displayNumber: index + 1,
            orderItems: order.orderItems.map((item: any) => ({
              ...item,
              subtotal: item.quantity * item.unitPrice
            }))
          }))
        };
      }),
      catchError(error => {
        console.error('Error fetching orders:', error);
        return throwError(() => error);
      })
    );
  }

}



