import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartItems: Product[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartCount.next(this.cartItems.length);
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(p => p.id !== product.id);
    this.cartCount.next(this.cartItems.length);
  }

  clearCart() {
    this.cartItems = [];
    this.cartCount.next(0);
  }
  
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
  
}

