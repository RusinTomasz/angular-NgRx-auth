import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* NgRx */
import { State } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { AuthPageActions } from '../state/actions';
import { getLoadingStatus, getLoginError } from './../state/index';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage$ = this.store.select(getLoginError);
  isLoading$ = this.store.select(getLoadingStatus);

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
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
