import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent  implements OnInit {
goToCart() {
throw new Error('Method not implemented.');
}
removeFromCart(_t10: Product) {
throw new Error('Method not implemented.');
}
  cart: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  proceedToCheckout(): void {
    const isLoggedIn = localStorage.getItem('user');
    if (!isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/checkout' } });
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}



