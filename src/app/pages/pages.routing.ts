import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { TablaProyectosComponent } from './tabla-proyectos/tabla-proyectos.component';
import { PagesComponent } from './pages.component';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { FormularioProyectoComponent } from './formulario-proyecto/formulario-proyecto.component';

const routes: Routes = [

    {
        path: 'home',
        component: PagesComponent,
        children: [
            { path: '', component: HomeComponent, data: {titulo: 'Home'}, canActivate: [ValidarTokenGuard] }, // el parametro "data", sirve para enviar parametros a la pantalla
            { path: 'formulario-usuario', component: FormularioUsuarioComponent, data: {titulo: 'Usuarios'}, canActivate: [ValidarTokenGuard] },
            { path: 'detalle-proyecto/:id', component: DetalleProyectoComponent, data: {titulo: 'Proyecto'}, canActivate: [ValidarTokenGuard] },
            { path: 'proyecto-nuevo', component: FormularioProyectoComponent, data: {titulo: 'Nuevo Proyecto'}, canActivate: [ValidarTokenGuard] },
            { path: 'tabla-proyectos/:id', component: TablaProyectosComponent, data: {titulo: 'Detalle Proyectos'}, canActivate: [ValidarTokenGuard] }
        ]
    }
    //,{path:'prueba', component:HomeComponent} -- ejemplo de ruta padre
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
