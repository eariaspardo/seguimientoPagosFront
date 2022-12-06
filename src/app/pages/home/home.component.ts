import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Resumen } from 'src/app/models/resumen';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resumen !: Resumen;

  public colors: string[] = ['#acb5f6','#6777ef','#44b5ff'] ;

  public barChartData: ChartData<'bar'> = {
    labels: [ 'Compra moto', 'Viaje Punta Cana', 'Compra Computador' ],
    datasets: [
      { data: [ 5000000, 2400000, 2500000], label: 'Deuda', backgroundColor: '#6777ef' },
      { data: [ 0, 1200000, 2000000], label: 'Pagos Realizados', backgroundColor: '#44b5ff'}
    ]
  };

  public barChartLabels = ["A1", "A2", "A3"];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [ 'Compra moto', 'Viaje Punta Cana', 'Compra Computador' ],
    datasets: [
      { data: [ 5000000, 2400000, 2500000 ],
        backgroundColor:this.colors }
    ]
  };


  constructor(
    private proyectoService : ProyectosService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef)
    {

    }

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
