import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})

export class ProductdetailsComponent implements OnInit {
  product!: Product;
  showCartSummary = false;
  subtotal = 0;
  cartItemsCount: number = 0; // ✅ Add this line


  constructor(private route: ActivatedRoute, 
              private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private orderService: OrderService){    }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => this.product = data,
      error: (err) => console.error('Failed to load product details:', err)
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
   
    this.orderService.notifyPurchase(product.id.toString(), product.name, 'shitalpadature@gmail.com', "want to buy" ).subscribe({
      next: () => alert(`Purchase notification sent for ${product.name}`),
      error: (err) => alert('Error sending notification: ' + err.message)
    });
    this.subtotal = this.cartService.getTotal();
    this.showCartSummary = true;
    this.cartItemsCount++; // ✅ Add this line

    // this.router.navigate(['/cart']); // optional: directly go to cart
  }

  buyNow(product: Product): void {
    const isLoggedIn = localStorage.getItem('user'); // simple check

    if (!isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/checkout' } });
    } else {
      this.cartService.addToCart(product);
      this.router.navigate(['/checkout']);
    }
  }

  proceedToCheckout(): void {
    const isLoggedIn = localStorage.getItem('user');
    if (!isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/checkout' } });
    } else {
      this.router.navigate(['/checkout']);
    }
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
  
}

