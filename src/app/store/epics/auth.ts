import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';

import { HttpService } from '../../services';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEpics {
  constructor(private hs: HttpService) {}


  verifyToken = (action$: ActionsObservable<any>) =>
    action$.ofType(AuthActions.VERIFY_TOKEN)
      .switchMap(({ payload }) => {
        return this.hs.GetRequest('/api/auth' + '/' + payload)
          .switchMap(result => {
            if (result.success) {
              return Observable.of({
                type: AuthActions.LOGIN_SUCCESS,
                payload: <any>result
              })
            } else {
              return Observable.of({
                type: AuthActions.LOGIN_FAIL,
                payload: <any>JSON.stringify(result.error)
              })
            }
          })
          .catch(error => Observable.of({
            type: AuthActions.LOGIN_FAIL,
            payload: <any>'Error: ' + JSON.stringify(error)
          }))
      });

  signup = (action$: ActionsObservable<any>) =>
    action$.ofType(AuthActions.SIGNUP)
      .switchMap(({ payload }) => {
        return this.hs.PostRequest('/api/users', payload)
          .switchMap(result => {
            if (result.success) {
              return Observable.of({
                type: AuthActions.SIGNUP_SUCCESS,
                payload: <any>result
              })
            } else {
              return Observable.of({
                type: AuthActions.SIGNUP_FAIL,
                payload: <any>result
              })
            }
          })
          .catch(error => Observable.of({
            type: AuthActions.SIGNUP_FAIL,
            payload: <any>'Error: ' + JSON.stringify(error)
          }))
      });

  login = (action$: ActionsObservable<any>) =>
    action$.ofType(AuthActions.LOGIN)
      .switchMap(({ payload }) => {
        return this.hs.PostRequest('/api/auth', payload)
          .switchMap(result => {
            console.log('result', result);
            if (result.success) {
              localStorage.setItem('token', result.data['token']);
              return Observable.of({
                type: AuthActions.LOGIN_SUCCESS,
                payload: <any>result
              })
            } else {
              return Observable.of({
                type: AuthActions.LOGIN_FAIL,
                payload: <any>result
              })
            }
          })
          .catch(error => Observable.of({
            type: AuthActions.LOGIN_FAIL,
            payload: <any>'Error: ' + JSON.stringify(error)
          }))
      });
}
