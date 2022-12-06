import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { Roles } from 'src/app/models/roles';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  proyectos: Proyecto[] = [];
  administrados : boolean = false;

  constructor(private proyectoService : ProyectosService,
    private usuarioService : UsuarioService) {}

  ngOnInit(): void {
    this.validarSiEsAdministrados();
    this.consultarListadoProyectos();
  }

  consultarListadoProyectos(){
    this.proyectoService.consultarProyectosPorUsuario().subscribe(
      data => {
        this.proyectos = data;
      },
      err =>{
        console.log('no se logro consultar el menu');
      }
    );
  }

  validarSiEsAdministrados(){
    let roles : Roles[] = this.usuarioService.consultarRolesUsuario();
    roles.forEach(rol =>{
      if(rol.nombre === 'ROLE_SUPER_ADMIN'){
        this.administrados = true;
      }
    })
    console.log(this.administrados);
  }

}
