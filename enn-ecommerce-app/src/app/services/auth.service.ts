import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { signUp, signIn, signOut, confirmSignUp, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.checkUser(); // ✅ refresh वर check
  }
  
  // Register user
  async signUp(email: string, password: string) {
    return await signUp({
      username:email,
      password:password,
      options: {
        userAttributes: { email }
      }
    });
  }

  
  // Confirm user with code
  async confirmSignUp(username: string, code: string) {
    return await confirmSignUp({
      username,
      confirmationCode: code
    });
  }

  // Login
  async signIn(email: string, password: string) {
    const user = await signIn({ username: email, password });
    this.isLoggedInSubject.next(true); // ✅ login झालं
    return user;
    }

  // Logout
  async signOut() {
    await signOut();
    this.isLoggedInSubject.next(false); // ✅ logout झालं
  }

  // Current user session
  async currentUser() {
    return await getCurrentUser();
  }


  // Fetch tokens
  async getTokens() {
    return await fetchAuthSession();
  }

  async checkUser() {
    try {
      await getCurrentUser();
      this.isLoggedInSubject.next(true);
    } catch {
      this.isLoggedInSubject.next(false);
    }
  }
}
