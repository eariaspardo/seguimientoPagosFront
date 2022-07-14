import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';

//Modulos
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes : Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto si no se agrega nada a la URL
  {path: '**', component: NopagefoundComponent} // Ruta de error si la pagina no existe
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

    //rutas del path: '/home'
    PagesRoutingModule,

    //rutas de path: '/auth'
    AuthRoutingModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
