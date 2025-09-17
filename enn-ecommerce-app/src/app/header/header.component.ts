import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartCount = 0;
  isLoggedIn = false;


  constructor(private cartService: CartService,
              private auth: AuthService, 
              private router: Router
  ) {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']); // ✅ login पेजला redirect
  }
}


