import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminProductsComponent } from './products/admin-products/admin-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AdminProvincesComponent } from './provinces/admin-provinces/admin-provinces.component';
import { AdminCategoriesComponent } from './categories/admin-categories/admin-categories.component';
import { AdminCitiesComponent } from './cities/admin-cities/admin-cities.component';
import { AdminSuppliersComponent } from './suppliers/admin-suppliers/admin-suppliers.component';


const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'AdminProducts', component: AdminProductsComponent},
  {path: 'AdminProvinces', component: AdminProvincesComponent},
  {path: 'AdminCategories', component: AdminCategoriesComponent},
  {path: 'AdminCities', component: AdminCitiesComponent},
  {path: 'AdminSuppliers', component: AdminSuppliersComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  { path: 'product/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
