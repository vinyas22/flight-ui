// src/app/auth/login/authservice.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private enableButtonSubject = new BehaviorSubject<boolean>(false);
  enableButton$ = this.enableButtonSubject.asObservable();
  triggerEnableButton(value: boolean) {
    this.enableButtonSubject.next(value);
  }
  login() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.clear(); // Optional: clears role, user_id, etc.
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

}
