import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminProductsComponent } from './products/admin-products/admin-products.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
//import { UpdateProductComponent } from './products/update-product/update-product.component';

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'AdminProducts', component: AdminProductsComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'UpdateProduct', component: UpdateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  
