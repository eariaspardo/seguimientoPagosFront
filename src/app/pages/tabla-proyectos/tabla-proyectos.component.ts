import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

}
