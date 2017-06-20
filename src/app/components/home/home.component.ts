import {Component, OnDestroy, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { AuthActions } from '../../store/actions';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IUser, IError } from '../../models';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  @select(['auth', 'user']) user$: Observable<IUser>;

  user: IUser;

  constructor(private aa: AuthActions,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    this.user$.subscribe(user => {
      this.user = user
    })
  }

}
