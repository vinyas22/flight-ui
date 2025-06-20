import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AuthService } from './auth/login/authservice';
declare var VANTA: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private vantaEffect: any;

  constructor(private authService: AuthService, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.authService.logout(); // reset login

    this.vantaEffect = VANTA.CLOUDS({
      el: this.elRef.nativeElement.querySelector('#vanta'),
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 500.0,
      skyColor: 0x68b8d7,
      cloudColor: 0xadc1de,
      cloudShadowColor: 0x183550,
      sunColor: 0xff9919,
      sunGlareColor: 0xff6633,
      sunlightColor: 0xff9933,
      speed: 1.5,
    });
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
