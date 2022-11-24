import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-formulario-proyecto',
  templateUrl: './formulario-proyecto.component.html',
  styleUrls: ['./formulario-proyecto.component.css']
})
export class FormularioProyectoComponent implements OnInit {

  @Output() private textoEmitido = new EventEmitter<string>();

  crearProyecto !: boolean;
  proyectos : Proyecto [] = [];
  formProyecto!: FormGroup;
  infoProyecto : Proyecto = new Proyecto();
  usuarioID = localStorage.getItem('idUsuario')+"";

  // Litado y manejo de iconos
  iconoSeleccionado : string = "Viaje";
  listIcons = ["Viaje","Dinero","Vehiculo","Estudio","Casa","Salud","Persona"];
  mapIcons = new Map()
        .set("Viaje","fa fa fa-plane")
        .set("Dinero","fa fa-money")
        .set("Vehiculo","fa fa-bus")
        .set("Estudio","fa fa-graduation-cap")
        .set("Casa","fa fa-home")
        .set("Salud","fa fa-heartbeat")
        .set("Persona","fa fa-user-o");

  constructor(
    private proyectosService : ProyectosService,
    private formBuilder : FormBuilder,
    private usuarioService : UsuarioService,
    private router : Router)
    {
      this.buildForm();
    }

  ngOnInit(): void {
    this.consultarProyectos();
  }

  private buildForm() {
    this.formProyecto = this.formBuilder.group({
      nombreProyecto: ['',  [Validators.required]],
      valorProyecto: [0, [Validators.required]],
      cuotaProyecto: [0, [Validators.required]],
      fechaPago: ['', [Validators.required]],
      iconoSeleccionado: ["Viaje", [Validators.required]],
    });
  }

  consultarProyectos(){
    this.proyectosService.consultarTodosLosProyectos().subscribe(
      data => {
        this.proyectos = data;
      },
      err =>{
        console.log('no se logro consultar los Proyectos Asociados');
      }
    );
  }

  // Cerrar o abrir la seccion de crear proyecto
  crearOCerrarNuevoProyecto(){
    this.crearProyecto = !this.crearProyecto;
  }

  guardarProyecto(event: Event){
    this.infoProyecto.nombreproyecto = this.formProyecto.value.nombreProyecto;
    this.infoProyecto.valorproyecto = this.formProyecto.value.valorProyecto;
    this.infoProyecto.cuotas = this.formProyecto.value.cuotaProyecto;
    this.infoProyecto.fechapagos = this.formProyecto.value.fechaPago;
    this.infoProyecto.usuario = this.usuarioID;
    this.infoProyecto.icono = this.mapIcons.get(this.formProyecto.value.iconoSeleccionado);
    this.infoProyecto.estado = "Activo";

    this.proyectosService.guardarProyecto(this.infoProyecto).subscribe(
      data => {
        this.crearProyecto = !this.crearProyecto;
        window.location.reload();
      },
      err =>{
        alert('no se logro Guardar el Proyecto');
      }
    );

  }

}
