import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private baseUrl = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient) {}

  userSignUp(data: object): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
