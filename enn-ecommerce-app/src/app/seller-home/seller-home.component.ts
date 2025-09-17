import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService, Order } from '../services/order.service';
import { Product, ProductService } from '../services/product.service';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

  products: Product[] = [];
  cartItems: Product[] = [];
  userMessage: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private productService: ProductService   // ✅ ProductService inject किया
  ) {}


  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    // ✅ Products load from AWS RDS via backend
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('❌ Failed to load products:', err)
    });
  }

  addToCart(product: Product) {
    // 1. Frontend cart update
    this.cartService.addToCart(product);
    this.cartItems = this.cartService.getItems();

     // 2. Save to backend order table
    const order: Order = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price,
      customerName: 'Demo User',    // TODO: Replace with logged-in user
      customerEmail: 'demo@email.com'
    };

    this.orderService.createOrder(order).subscribe({
      next: () => alert(`${product.name} added to cart & saved to backend!`),
      error: (err) => {
        console.error(err);
        alert('❌ Failed to save order to backend');
      }
    });


    
    alert(`${product.name} added to cart!`);
  }

  buyNow(product: Product) {
    this.orderService.notifyPurchase(product.id.toString(), product.name, 'demo@email.com', this.userMessage ).subscribe({
      next: () => alert(`Purchase notification sent for ${product.name}`),
      error: (err) => alert('Error sending notification: ' + err.message)
    });
    
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getItems();
  }


}
