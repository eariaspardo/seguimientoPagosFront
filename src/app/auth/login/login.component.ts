import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  infoUsuario : Login = new Login();

  constructor(
    private router : Router,
    private loginService : TokenService,
    private usuarioService : UsuarioService,
    private formBuilder : FormBuilder)
    {
      this.buildForm();
     }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formLogin = this.formBuilder.group({
      nombreUsuario: ['',  [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  obtenerJWT(event: Event){

    this.infoUsuario.nombreUsuario = this.formLogin.value.nombreUsuario;
    this.infoUsuario.password = this.formLogin.value.password;
    this.loginService.generarJWT(this.infoUsuario).subscribe(
      log =>  {
        if(log != null && log.token != null){
          this.loginService.almacenarToken(log.token);
          this.consultarInforUsuario(log.token);
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 1000);
        }
    },
      err => {
        alert('Error al consultar el JWT: ');
      }
    )

  }

  private consultarInforUsuario(token : string){
    this.usuarioService.consultarInfoUsuarioLogueado(token).subscribe(
      (info : Usuarios) =>{
        localStorage.setItem('nombreUsuario', info.nombreUsuario);
        localStorage.setItem('idUsuario', info.id+'');
        localStorage.setItem('roles', JSON.stringify(info.roles));
        localStorage.setItem('nombreApellido', info.nombreApellido);
      },
      err => {
        alert('Error al consultar la informacion del Usuario: ');
      }
    )
  }

}
