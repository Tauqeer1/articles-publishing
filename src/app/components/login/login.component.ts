import {Component, OnDestroy, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { AuthActions } from '../../store/actions';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IError } from '../../models';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy {

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
      console.log('login res', res);
      if (res && res['type'] === 'LOGIN_SUCCESS') {
        this.toastr.success('Login success', 'success!');
        this.router.navigate(['/home']);
      }
    });

    this.subscription[1] = this.error$.subscribe(res => {
      if (res && res.type === 'LOGIN_FAIL') {
        console.error('login err', res);
        this.toastr.error('Login failed', 'error!');
      }
    });

  }

  login(valid, value) {
    if(!valid) {
      return;
    }
    this.aa.login(value);
  }

  ngOnDestroy() {
    console.log('register exit');
    this.subscription.map(observable => {
      observable.unsubscribe();
    });
  }
}
