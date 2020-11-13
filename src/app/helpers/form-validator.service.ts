import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  constructor() {}

  confirmPasswordValidator: ValidatorFn = (
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
}
