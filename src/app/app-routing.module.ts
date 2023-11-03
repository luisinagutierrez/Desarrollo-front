import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'login', component: LoginComponent},
  { path: 'reset-password', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  
