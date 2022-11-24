import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios';
import {Router} from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlUsuario = 'http://localhost:8080/usuario/';
  private cabecera : HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http : HttpClient,
    private router:Router,
    private tokenService : TokenService) { }

  public consultarUsuarios() : Observable<Usuarios[]>{
    let token = this.tokenService.consultarJWTLocalSession();
    this.cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this.http.get<Usuarios[]>(this.urlUsuario+'obtenerTodos', {headers : this.cabecera});
  }

  public consultarInfoUsuarioLogueado(token : string) : Observable<Usuarios>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get<Usuarios>(`${this.urlUsuario}logueado`, httpOptions);
  }

  public guardarUsuario(usuario : Usuarios) : Observable<Usuarios>{
    let token = this.tokenService.consultarJWTLocalSession();
    this.cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this.http.post<Usuarios>(`${this.urlUsuario}guardar`, usuario, {headers : this.cabecera});
  }

  public activarODesactivarUsuario(usuario : Usuarios) : Observable<Usuarios>{
    let token = this.tokenService.consultarJWTLocalSession();
    this.cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization', token);
    return this.http.put<Usuarios>(`${this.urlUsuario}actualizarEstado`, usuario, {headers : this.cabecera});
  }

}
