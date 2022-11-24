import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetUserComponent } from './forget-user/forget-user.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetUserComponent
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    ForgetUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
