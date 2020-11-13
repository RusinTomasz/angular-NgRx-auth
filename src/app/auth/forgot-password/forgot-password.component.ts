import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* NgRx */
import { Store } from '@ngrx/store';
import { AuthPageActions } from '../state/actions';
import { State } from './../../state/app.state';
import {
  getLoadingStatus,
  getError,
  getEmailToSendResetPasswordLink,
} from './../state/index';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  errorMessage$ = this.store.select(getError);
  isLoading$ = this.store.select(getLoadingStatus);

  emailToSendResetPasswordLink$ = this.store.select(
    getEmailToSendResetPasswordLink
  );

  constructor(private _formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.status !== 'VALID') {
      return;
    }

    this.store.dispatch(
      AuthPageActions.sendEmailToResetPassword({
        email: this.forgotPasswordForm.value.email,
      })
    );
  }
}
