import {Component, OnDestroy, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { AuthActions } from '../../store/actions';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IError } from '../../models';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnDestroy {

  // @select(['auth', 'isLoading']) isLoading$: Observable<boolean>;
  @select(['auth', 'success']) success$: Observable<Object>;
  @select(['auth', 'error']) error$: Observable<IError>;

  subscription: Subscription[] = [];

  constructor(private aa: AuthActions,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private router: Router
  ) {

    this.toastr.setRootViewContainerRef(vcr);

    this.subscription[0] = this.success$.subscribe(res => {
      console.log('signup res', res);
      if (res && res['type'] === 'SIGNUP_SUCCESS') {
        this.toastr.success('Signup success', 'success!');
        this.router.navigate(['/login']);
      }
    });

    this.subscription[1] = this.error$.subscribe(res => {
      if (res && res.type === 'SIGNUP_FAIL') {
        console.error('signup err', res);
        this.toastr.error('Signup failed', 'error!');
      }
    });
  }

  signup(valid, value) {
    if(!valid) {
      return;
    }
    this.aa.signup(value);
  }

  ngOnDestroy() {
    console.log('register exit');
    this.subscription.map(observable => {
      observable.unsubscribe();
    });
  }
}
