import { Component } from '@angular/core';
import { AuthActions } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private aa: AuthActions) {
    this.verifyToken();
  }

  verifyToken() {
    if(localStorage.getItem('token')) {
      this.aa.verifyToken(localStorage.getItem('token'));
    }
  }

}
