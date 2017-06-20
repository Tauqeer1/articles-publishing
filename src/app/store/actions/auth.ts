import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from "../";


@Injectable()
export class AuthActions {

  static SIGNUP: string = 'SIGNUP';
  static SIGNUP_SUCCESS: string = 'SIGNUP_SUCCESS';
  static SIGNUP_FAIL: string = 'SIGNUP_FAIL';
  static LOGIN: string = 'LOGIN';
  static LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
  static LOGIN_FAIL: string = 'LOGIN_FAIL';
  static VERIFY_TOKEN: string = 'VERIFY_TOKEN';
  static LOGOUT: string = 'LOGOUT';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  signup(user: Object): void {
    this.ngRedux.dispatch({
      type: AuthActions.SIGNUP,
      payload: user
    });
  }
  login(credentials: Object): void {
    this.ngRedux.dispatch({
      type: AuthActions.LOGIN,
      payload: credentials
    });
  }
  verifyToken(token: string): void {
    this.ngRedux.dispatch({
      type: AuthActions.VERIFY_TOKEN,
      payload: token
    });
  }
  logout(): void {
    this.ngRedux.dispatch({
      type: AuthActions.LOGOUT
    })
  }

}
