import { tap } from 'rxjs/operators';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
/* NgRx */
import { State } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { getRegisteredUserEmail } from './../state/index';

@Component({
  selector: 'mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MailConfirmComponent {
  registeredUserEmail$ = this.store.select(getRegisteredUserEmail).pipe(
    tap((registeredUserEmail) => {
      if (!registeredUserEmail) {
        this.router.navigate(['/register']);
      }
    })
  );

  constructor(private router: Router, private store: Store<State>) {}
}
