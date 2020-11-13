import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

/* RxJS */
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import {
  getLoadingStatus,
  getPasswordHasBeenChangedFlag,
  getResetPasswordError,
} from './../state/index';
import { AuthPageActions } from '../state/actions';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;

  resetPasswordForm: FormGroup;

  errorMessage$ = this.store.select(getResetPasswordError);
  isLoading$ = this.store.select(getLoadingStatus);
  passwordHasBeenChanged$ = this.store.select(getPasswordHasBeenChangedFlag);

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
    });

    this.resetPasswordForm
      .get('password')
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  onSubmit() {
    if (this.resetPasswordForm.status !== 'VALID') {
      return;
    }

    this.store.dispatch(
      AuthPageActions.resetPassword({
        newPass: this.resetPasswordForm.value.password,
      })
    );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
