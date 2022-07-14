import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { BrowserModule } from '@angular/platform-browser'
import { TablaProyectosComponent } from './tabla-proyectos/tabla-proyectos.component';
import { FormularioProyectoComponent } from './formulario-proyecto/formulario-proyecto.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    PagesComponent,
    FormularioUsuarioComponent,
    FormularioProyectoComponent,
    DetalleProyectoComponent,
    TablaProyectosComponent,
    FormularioProyectoComponent
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    NgxDropzoneModule
  ]
})
export class PagesModule { }
