import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap/carousel'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { AdminProductsComponent } from './products/admin-products/admin-products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminCategoriesComponent } from './categories/admin-categories/admin-categories.component';
import { EditListProductsComponent } from './products/edit-list-products/edit-list-products.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Manual
import { MatToolbarModule } from '@angular/material/toolbar'; //navbar
import { MatButtonModule } from '@angular/material/button'; //btn
import { MatIconModule } from '@angular/material/icon'; // icon
import {MatGridListModule} from '@angular/material/grid-list';// columnas y filas
import {MatFormFieldModule} from '@angular/material/form-field'; //contraseña
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';// quizá haya que borrarlo
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    LoginComponent,
    CarouselComponent,
    FooterComponent,
    ResetPasswordComponent,
    AdminProductsComponent,
    AddProductComponent,
    SignUpComponent,
    AdminCategoriesComponent,
    EditListProductsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTabsModule
    
  ],
  exports: [
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }







