import { Routes } from '@angular/router';
import {
  HomeComponent,
  LoginComponent,
  SignupComponent
} from '../components';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];
