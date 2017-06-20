import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { AuthActions } from '../../store/actions';
import { IUser, IError } from '../../models';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {

  @select(['auth', 'user']) user$: Observable<IUser>;

  user: IUser;

  constructor(private aa: AuthActions) {
    this.user$.subscribe(user => {
      this.user = user
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.aa.logout();
  }

}
