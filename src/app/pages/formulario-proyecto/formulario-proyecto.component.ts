import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-formulario-proyecto',
  templateUrl: './formulario-proyecto.component.html',
  styleUrls: ['./formulario-proyecto.component.css']
})
export class FormularioProyectoComponent implements OnInit {

  crearProyecto !: boolean;
  proyectos : Proyecto [] = [];
  formProyectoNuevo!: FormGroup;

  constructor(
    private proyectosService : ProyectosService,
    private formBuilder : FormBuilder)
    {
      this.buildForm();
    }

  ngOnInit(): void {
    this.consultarProyectos();
  }

  private buildForm() {
    this.formProyectoNuevo = this.formBuilder.group({
      cuota: ['',  [Validators.required]],
      valor: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    });
  }

  consultarProyectos(){
    this.proyectosService.consultarTodosLosProyectos().subscribe(
      data => {
        this.proyectos = data;
      },
      err =>{
        console.log('no se logro consultar los Usuarios registrados');
      }
    );
  }

  crearOCerrarNuevoProyecto(){
    this.crearProyecto = !this.crearProyecto;
  }

}
