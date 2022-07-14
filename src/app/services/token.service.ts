import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JWT } from '../models/jwt';
import { Login } from '../models/login';
import {Router} from '@angular/router';

const TOKEN_SESSION_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private urlJWT = 'http://localhost:8080/usuario/login';
  private cabecera : HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http : HttpClient,
    private router:Router) { }

  public generarJWT(login : Login) : Observable<JWT>{
    return this.http.post<JWT>(this.urlJWT, login, {headers : this.cabecera});
  }

  public almacenarToken(token : string) {
    localStorage.setItem(TOKEN_SESSION_KEY, token);
  }

  public consultarToken() : string | null{
    return localStorage.getItem(TOKEN_SESSION_KEY);
  }

  public logOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

  public consultarJWTLocalSession() : any{
    let llave = localStorage.getItem('jwt')
    if(llave === null || llave === undefined){
      return this.router.navigate(['login']);
    }else{
      return llave;
    }
  }
}
