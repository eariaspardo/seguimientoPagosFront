import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  proyectos: Proyecto[] = [];

  constructor(private proyectoService : ProyectosService) {}

  ngOnInit(): void {
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

}
