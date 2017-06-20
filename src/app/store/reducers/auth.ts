import { Action } from 'redux';

import { IUser, IError } from '../../models';
import { AuthActions } from '../actions';

export interface IAuthState {
  success: Object,
  user: IUser,
  error: IError
}

const InitialState: IAuthState = {
  success: null,
  user: null,
  error: null
};

export const authReducer = function(state: IAuthState = InitialState, action: {type: string, payload?: any}) {

  switch (action.type) {

    case AuthActions.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        success: { timestamp: new Date(), type: AuthActions.SIGNUP_SUCCESS, data: action.payload }
      });
    case AuthActions.SIGNUP_FAIL:
      return Object.assign({}, state, {
        error: { timestamp: new Date(), type: AuthActions.SIGNUP_FAIL, data: action.payload.data }
      });
    case AuthActions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        success: { timestamp: new Date(), type: AuthActions.LOGIN_SUCCESS },
        user: action.payload.data
      });
    case AuthActions.LOGIN_FAIL:
      return Object.assign({}, state, {
        error: { timestamp: new Date(), type: AuthActions.LOGIN_FAIL, data: action.payload }
      });
    case AuthActions.LOGOUT:
      return Object.assign({}, state, {
        success: null,
        user: null,
        error: null
      });
    default:
      return state;
  }


};
