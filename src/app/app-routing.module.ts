import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './userRegistration/login/login.component';
import { BodyComponent } from './body/body.component';
import { ResetPasswordComponent } from './userRegistration/reset-password/reset-password.component';
import { AdminProductsComponent } from './products/admin-products/admin-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AdminProvincesComponent } from './provinces/admin-provinces/admin-provinces.component';
import { AdminCategoriesComponent } from './categories/admin-categories/admin-categories.component';
import { AdminCitiesComponent } from './cities/admin-cities/admin-cities.component';
import { AdminSuppliersComponent } from './suppliers/admin-suppliers/admin-suppliers.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegistrationComponent } from './userRegistration/user-registration/user-registration.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { CollectionComponent } from './collections/collection.component'


const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'UserRegistration', component: UserRegistrationComponent },
  { path: 'AdminProducts', component: AdminProductsComponent },
  { path: 'AdminProvinces', component: AdminProvincesComponent },
  { path: 'AdminCategories', component: AdminCategoriesComponent },
  { path: 'AdminCities', component: AdminCitiesComponent },
  { path: 'UserList', component: UserListComponent },
  { path: 'AdminSuppliers', component: AdminSuppliersComponent },
  { path: 'UserInformation', component: UserInformationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'product/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'collection/:collection', component: CollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
