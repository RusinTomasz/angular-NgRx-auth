import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Services */
import { FormValidatorService } from './../../helpers/form-validator.service';

/* RxJS */
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import { getLoadingStatus, getRegisterUserError } from './../state/index';
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

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private store: Store<State>
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [
        '',
        [
          Validators.required,
          this.formValidatorService.confirmPasswordValidator,
        ],
      ],
    });

    this.registerForm
      .get('password')
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
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
