import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  email = '';
  code = '';
  message = '';
  isSignupClicked:boolean=false;
  isConfirmSignupClicked:boolean=false;
  awaitingVerification = false;


  constructor(private auth: AuthService,
              private router: Router
  ) {}

  async signUp() {
    try {
      await this.auth.signUp(this.email, this.password);
      this.message = 'Sign up successful. Please confirm your code.';
          this.isSignupClicked=true;
    } catch (err: any) {
      this.message = err.message;
    }
  }

  async confirmSignUp() {
    
    try {
      await this.auth.confirmSignUp(this.email, this.code);
      this.message = 'User confirmed. You can now log in.';
      this.isSignupClicked=false;
    this.isConfirmSignupClicked = true;
    } catch (err: any) {
      this.message = err.message;
    }
  }

  async signIn() {
    this.isConfirmSignupClicked = false;
    try {
      await this.auth.signIn(this.email, this.password);
      this.message = 'Login successful!';
    this.router.navigate(['/seller-home']);  

    } catch (err: any) {
      this.message = err.message;
    }
  }

  async signOut() {
    try {
      await this.auth.signOut();
      this.message = 'Logged out.';
    } catch (err: any) {
      this.message = err.message;
    }
  }
}
