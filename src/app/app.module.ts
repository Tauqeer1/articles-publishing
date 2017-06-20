//Modules
import {NgModule, ViewContainerRef} from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastModule, ToastsManager, ToastOptions, ToastContainer, Toast } from 'ng2-toastr/ng2-toastr';
import { StoreModule } from '../app/store';

//Services
import { HttpService } from './services';



//Routes
import { appRoutes } from './routes/app.routes';

//Components
import { AppComponent } from './index';
import {
  NavigationComponent,
  SignupComponent,
  LoginComponent,
  HomeComponent
} from './components';

@NgModule({

  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    UniversalModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ToastModule,
    StoreModule
  ],
  providers: [ HttpService, ToastsManager, ToastOptions ]
})
export class AppModule {

}
