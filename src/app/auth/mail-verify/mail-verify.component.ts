import { getLoadingStatus, getMailVerifyError } from './../state/index';
import { State } from './../../state/app.state';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthPageActions } from '../state/actions';

@Component({
  selector: 'mail-verify',
  templateUrl: './mail-verify.component.html',
  styleUrls: ['./mail-verify.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MailVerifyComponent implements OnInit {
  errorMessage$ = this.store.select(getMailVerifyError);
  isLoading$ = this.store.select(getLoadingStatus);

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthPageActions.verifyAccount());
  }
}
