import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id?: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  customerName: string;
  customerEmail: string;
  status?: string;
  orderDate?: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private apiUrl = 'http://k8s-shitalns-ordering-1b031995ea-1197979564.us-east-1.elb.amazonaws.com/order/api/orders';
  // private notifyUrl = 'https://f3sobp69sd.execute-api.us-east-1.amazonaws.com/dev/notify';

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {

    // SNS Notification API (Lambda via API Gateway)
  // const notifyUrl = 'https://f3sobp69sd.execute-api.us-east-1.amazonaws.com/dev/notify';
  // const notifyCall$ = this.http.post<any>(notifyUrl, {
  //   productId: order.productId,
  //   productName: order.productName,
  //   userEmail: order.customerEmail,
  //   userMessage: `Added ${order.productName} to cart`
  // });
    const dbCall$ = this.http.post<Order>(this.apiUrl, order);
  // Merge both requests together
    return dbCall$; // <-- database save will return Observable<Or
  }

  notifyPurchase(productId: string,productName:string, userEmail: string,userMessage:string): Observable<any> {
    const body = { productId,productName, userEmail,userMessage  };
    return this.http.post(`https://f3sobp69sd.execute-api.us-east-1.amazonaws.com/dev/notify`, body);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}


