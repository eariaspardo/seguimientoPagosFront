import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { Resumen } from 'src/app/models/resumen';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resumen !: Resumen;

  constructor(private proyectoService : ProyectosService) {}

  ngOnInit(): void {
    this.resumenProyectos();
  }

  resumenProyectos(){

    let usuario = localStorage.getItem('idUsuario');
    this.proyectoService.consultarResumenProyectos(usuario).subscribe(
      data => {
        this.resumen = data;
      },
      err =>{
        console.log('no se logro consultar el menu');
      }
    );



  }

}
