import { Router } from '@angular/router';
import { State } from './state/app.state';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
/* Helpers */
import { JwtHelperService } from '@auth0/angular-jwt';
/* NgRx */
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/state/actions/auth-page.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-ngrx-auth';

  userData: {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    userId: string;
    role: string;
  } = JSON.parse(localStorage.getItem('userData'));

  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    //Autologin
    if (this.userData) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(this.userData.token);
      if (isExpired) {
        localStorage.removeItem('userData');
        return this.router.navigate(['/login']);
      }
      this.store.dispatch(autoLogin({ userData: this.userData }));
    }
  }
}
