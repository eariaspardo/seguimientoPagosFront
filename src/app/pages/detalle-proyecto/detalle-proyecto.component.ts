import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, map } from 'rxjs';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {

  proyecto !: Proyecto;
  cuotasPagas : number = 0;
  fechaFinProyecto = new Date() ;
  id !: number;

  constructor(
    private proyectoService : ProyectosService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef)
    {

    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.consultarproyecto(this.id);
      }
    );
  }

  consultarproyecto(idProyecto : number){
    this.proyectoService.consultarProyectosPorId(idProyecto).subscribe(
      data => {
        this.proyecto = data;
        this.cuotasPagas = data.detallesPagos.length;
        //this.fechaFinProyecto = new Date(data.fechapagos.setMonth(data.fechapagos.getMonth() + data.cuotas));
      },
      err =>{
        alert('no se logro consultar el Proyecto');
      }
    );
  }

}
