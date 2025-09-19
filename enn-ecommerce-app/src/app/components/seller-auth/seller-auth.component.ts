import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})

export class SellerAuthComponent {

  message: string | undefined;
  isSignupClicked:boolean=false;
  code: any;
  isConfirmSignupClicked: boolean = false;
  ngOnInit(): void {
  }

  isLoginMode = false;
  seller = { name: '', email: '', password: '' };

  constructor(private sellerService: SellerService,
              private router: Router,
              private auth: AuthService) { }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

 async onSubmit() {
  if (this.isLoginMode) {
    try {
      await this.auth.signIn(this.seller.email, this.seller.password);
      this.message = 'Login successful!';
      this.router.navigate(['/seller-home']);
    } catch (err: any) {
      this.message = err.message;
    }
  } else {
    try {
      await this.auth.signUp(this.seller.email, this.seller.password);
      this.message = 'Sign up successful. Please confirm your code.';
      this.isSignupClicked = true;   // ✅ show confirm form
    } catch (err: any) {
      this.message = err.message;
    }
  }
}

async confirmSignUp() {
  try {
    await this.auth.confirmSignUp(this.seller.email, this.code);
    this.message = 'User confirmed. You can now log in.';
        await this.auth.signOut();
    this.isSignupClicked = false;         // ✅ hide confirm form
    this.isConfirmSignupClicked = true;   // ✅ show login button
    this.isLoginMode = true;              // ✅ directly switch to login mode
  } catch (err: any) {
    this.message = 'Invalid verification code. Please try again.'; 
    this.isSignupClicked = true;   // 🔑 keep confirm form visible for retry
  }
}

 
}
