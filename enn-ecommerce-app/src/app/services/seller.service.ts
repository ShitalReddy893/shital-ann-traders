import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  // private baseUrl = 'http://localhost:8080/api/auth/register';

  // constructor(private http: HttpClient) {}

  // userSignUp(data: object): Observable<any> {
  //   return this.http.post(this.baseUrl, data);
  // }

  private baseUrl = 'http://localhost:8080/api/seller';
  message: any;

  constructor(private http: HttpClient,
              private auth: AuthService,
              private router: Router) {}

  register(seller: any): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/register`, seller);
  }

  async login(seller: any) {
   try {
      await this.auth.signIn(seller.email, seller.password);
      this.message = 'Login successful!';
    this.router.navigate(['/seller-home']);  

    } catch (err: any) {
      this.message = err.message;
    }
  }

  getSellerProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
