import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://k8s-shitalns-producti-f5f8ce99e5-1602930351.us-east-1.elb.amazonaws.com/product/api/products'; // Spring Boot
  private s3Url = 'http://localhost:8080/api/s3';
  private API_BASE = 'https://f3sobp69sd.execute-api.us-east-1.amazonaws.com/dev'; 
  // 👆 Replace with your actual Invoke URL

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<string>(`${this.s3Url}/upload`, formData, { responseType: 'text' as 'json' });
}


// Step 1: Get presigned S3 upload URL
  async getUploadUrl(filename: string, contentType: string) {
    const url = `${this.API_BASE}/get-image-url?filename=${encodeURIComponent(filename)}&contentType=${encodeURIComponent(contentType)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(await res.text());
    return res.json(); // { uploadUrl, objectUrl }
  }

  // Step 2: Upload file to S3
  async uploadFileToS3(uploadUrl: string, file: File) {
    const res = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    if (!res.ok) throw new Error('Upload failed: ' + res.statusText);
    return true;
  }

  
async createProduct(product: any) {
  console.log("Sending product to backend:", product);
  return await firstValueFrom(
    this.http.post("http://localhost:8081/api/products", product, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  );
}

  

  // notifyPurchase(productId: string,productName:string, userEmail: string,userMessage:string): Observable<any> {
  //   const body = { productId,productName, userEmail,userMessage  };
  //   return this.http.post(`${this.API_BASE}/notify`, body);
  // }
  

  updateProduct(id: number, product: any) {
  return firstValueFrom(
    this.http.put(`http://localhost:8081/api/products/${id}`, product, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  );
}

}

