import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT } from '../models/jwt';
import {Router} from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { Resumen } from '../models/resumen';
import { DetallePago } from '../models/detallePago';

const ID_USUARIO = 'idUsuario';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private urlProyectos = 'http://localhost:8080/proyecto/';
  private urlDetalle = 'http://localhost:8080/detalle/';
  private cabecera : HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http : HttpClient,
    private router:Router) {

    }

  public consultarProyectosPorUsuario() : Observable<Proyecto[]>{
    let token = this.consultarJWTLocalSession();
    let idUsuario = localStorage.getItem(ID_USUARIO);
    this.cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this.http.get<Proyecto[]>(`${this.urlProyectos}porUsuario/${idUsuario}`, {headers : this.cabecera});
  }

  public consultarProyectosPorId(idProyecto : number ) : Observable<Proyecto>{
    let token = this.consultarJWTLocalSession();
    this.cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this.http.get<Proyecto>(this.urlProyectos + idProyecto, {headers : this.cabecera});
  }

  public consultarResumenProyectos(idUsuario : string | null ) : Observable<Resumen>{
    let token = this.consultarJWTLocalSession();
    this.cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this.http.get<Resumen>(`${this.urlProyectos}resumenProyectos/${idUsuario}`, {headers : this.cabecera});
  }

  public consultarDetallesProyecto(idProyecto : string | null ) : Observable<DetallePago[]>{
    let token = this.consultarJWTLocalSession();
    this.cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this.http.get<DetallePago[]>(`${this.urlDetalle}detalleProyecto/${idProyecto}`, {headers : this.cabecera});
  }

  public consultarTodosLosProyectos() : Observable<Proyecto[]>{
    let token = this.consultarJWTLocalSession();
    this.cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this.http.get<Proyecto[]>(`${this.urlProyectos}obtenerTodos`, {headers : this.cabecera});
  }

  private consultarJWTLocalSession() : any{
    let llave = localStorage.getItem('jwt')
    if(llave === null || llave === undefined){
      return this.router.navigate(['login']);
    }else{
      return llave;
    }
  }

}
