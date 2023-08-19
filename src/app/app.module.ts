import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { FotterComponent } from './fotter/fotter.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Manual
import { MatToolbarModule } from '@angular/material/toolbar'; //navbar
import { MatButtonModule } from '@angular/material/button'; //btn
import { MatIconModule } from '@angular/material/icon'; // icon
import {MatGridListModule} from '@angular/material/grid-list';// columnas y filas
import {MatFormFieldModule} from '@angular/material/form-field'; //contraseña
import {MatInputModule} from '@angular/material/input';// login input 
import {MatRadioModule} from '@angular/material/radio';// eleccion entre mayorita o minorista


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    LoginComponent,
    FotterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    

  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




