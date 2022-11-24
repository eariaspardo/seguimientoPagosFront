import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { DetallePago } from 'src/app/models/detallePago';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-tabla-proyectos',
  templateUrl: './tabla-proyectos.component.html',
  styleUrls: ['./tabla-proyectos.component.css']
})
export class TablaProyectosComponent implements OnInit {

  detallePagos : DetallePago [] = [];
  id !: number;
  crearCuota !: boolean;
  files: File[] = [];
  formDetallePago!: FormGroup;
  infoCuota : DetallePago = new DetallePago();
  usuarioID = localStorage.getItem('idUsuario')+"";

  //Recuperar el Id del proyecto de la URL
  path = this.activatedRoute.snapshot.url.join('/').split('/');
  proyectoID = Number(this.path[this.path.length-1]);

  constructor(
    private proyectoService : ProyectosService,
    private activatedRoute: ActivatedRoute,
    private formBuilder : FormBuilder)
    {
      this.buildForm();
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.consultarproyecto(this.id+'');
      }
    );
    this.crearCuota = false;
  }

  private buildForm() {
    this.formDetallePago = this.formBuilder.group({
      cuota: ['',  [Validators.required]],
      valor: ['', [Validators.required]],
      fechaCuota: ['', [Validators.required]],
    });
  }

  consultarproyecto(idProyecto : string){
    this.proyectoService.consultarDetallesProyecto(idProyecto).subscribe(
      data => {
        this.detallePagos = data;
      },
      err =>{
        console.log('no se logro consultar los detalles del proyecto');
      }
    );
  }

  crearOCerrarCuotaNueva(){
    this.crearCuota = !this.crearCuota;
  }

  onSelect(event : any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event : any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  guardarDetalleOCuota(event: Event){
    this.infoCuota.numeroCuota = this.formDetallePago.value.cuota;
    this.infoCuota.valorPagado = this.formDetallePago.value.valor;
    this.infoCuota.fechaPagado = this.formDetallePago.value.fechaCuota;
    this.infoCuota.usuarioPago = Number(this.usuarioID);
    this.infoCuota.idAdjunto != null;
    this.infoCuota.idProyecto = this.proyectoID;

    this.proyectoService.guardarDetalleProyecto(this.infoCuota).subscribe(
      data => {
        window.location.reload();
      },
      err =>{
        alert('no se logro Guardar el detalle de la Cuota');
      }
    );

  }

}
