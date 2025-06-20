import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/login/authservice';

@Component({
  selector: 'app-default-redirect',
  templateUrl: './default-redirect.component.html',
  styleUrls: ['./default-redirect.component.css']
})
export class DefaultRedirectComponent {
  @Input() isLoggedIn = false;
  isShowButtons = false;
  showTakeoffPlane = false;
  isScrolled = false;

  clouds = Array.from({ length: 12 }, () => ({
    top: Math.random() * 70 + 10,
    left: Math.random() * 100,
    duration: Math.random() * 40 + 40
  }));

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Subscribe to shared button visibility trigger
    this.authService.enableButton$.subscribe(val => {
      this.isShowButtons = val;
      console.log('Navbar buttons visible:', this.isShowButtons);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  onLogoClick() {
    if (this.isLoggedIn) {
      this.triggerTakeoffAnimation(() => {
        this.router.navigate(['/flight-search']);
      });
    }
  }

  goToPastBookings() {
    this.router.navigate(['/past-bookings']);
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    this.isShowButtons = false;
    this.router.navigate(['/login']);
  }

  private triggerTakeoffAnimation(callback: () => void) {
    this.showTakeoffPlane = true;
    setTimeout(() => {
      this.showTakeoffPlane = false;
      callback();
    }, 1500);
  }
}
