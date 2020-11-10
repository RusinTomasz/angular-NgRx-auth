import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* RxJs */
import { Observable } from 'rxjs';
/* NgRx */
import { State } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { AuthPageActions } from '../state/actions';
import { getError, getLoadingStatus } from './../state/index';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private _formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getError);

    this.isLoading$ = this.store.select(getLoadingStatus);

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.status !== 'VALID') {
      return;
    }
    this.store.dispatch(
      AuthPageActions.loginUser({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
    );
  }
}
