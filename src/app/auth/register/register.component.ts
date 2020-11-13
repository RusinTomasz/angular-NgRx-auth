import { getLoadingStatus, getRegisterUserError } from './../state/index';
import { State } from './../../state/app.state';
import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AuthPageActions } from '../state/actions';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  errorMessage$ = this.store.select(getRegisterUserError);
  isLoading$ = this.store.select(getLoadingStatus);

  private _unsubscribeAll: Subject<any>;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm
      .get('password')
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSubmit() {
    if (this.registerForm.status !== 'VALID') {
      return;
    }
    this.store.dispatch(
      AuthPageActions.registerUser({
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phoneNumber: this.registerForm.value.phoneNumber,
      })
    );
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
