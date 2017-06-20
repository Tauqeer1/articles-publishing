
import { NgModule } from "@angular/core";
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createEpicMiddleware } from 'redux-observable';
import { combineReducers } from 'redux';
import { logger } from 'redux-logger';

import { AuthActions } from './actions';
import { AuthEpics } from "./epics";
import { authReducer, IAuthState } from './reducers';


export interface IAppState {
  auth?: IAuthState
}

const AppReducer = combineReducers<IAppState>({
  auth: authReducer
});

@NgModule({
  imports: [NgReduxModule],
  providers: [
    AuthActions,
    AuthEpics
  ]
})

export class StoreModule {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ae: AuthEpics
  ) {

    const middleware = [
      createEpicMiddleware(this.ae.signup),
      createEpicMiddleware(this.ae.login),
      createEpicMiddleware(this.ae.verifyToken),
      // logger
    ];
    this.ngRedux.configureStore(
      AppReducer, //main reducer
      {}, //default state
      middleware, // epic middlewares
      [devTool.isEnabled() ? devTool.enhancer() : f => f] //enhancers
    )
  }



}
