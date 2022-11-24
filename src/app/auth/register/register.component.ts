import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/models/roles';
import { Usuarios } from 'src/app/models/usuarios';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formUsuarioNew!: FormGroup;
  infoUsuario : Usuarios = new Usuarios();
  usuarioID = localStorage.getItem('idUsuario')+"";
  passwordPrimario = "";
  passwordSecundario = "";

  listRoles = [
    { rol: "ROLE_USER", name: "Usuario" },
    { rol: "ROLE_ADMIN", name: "Administrador" },
    { rol: "ROLE_SUPER_ADMIN", name: "Super Administrador" }
  ];

  constructor(
    private usuarioService : UsuarioService,
    private formBuilder : FormBuilder,
    private tokenService : TokenService)
    {
      this.buildForm();
    }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formUsuarioNew = this.formBuilder.group({
      nombre: ['',  [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rolSeleccionado: ['',  [Validators.required]],
      contrasena: ['', [Validators.required]],
      contrasenaValidar: ['', [Validators.required]]
    });
  }

  guardarUsuario(event: Event){
    this.infoUsuario.nombreApellido = this.formUsuarioNew.value.nombre;
    this.infoUsuario.nombreUsuario = this.formUsuarioNew.value.usuario;
    this.infoUsuario.activo = true;
    this.infoUsuario.email = this.formUsuarioNew.value.email;
    const rol : Roles = {id:0, nombre : this.formUsuarioNew.value.rolSeleccionado}
    this.infoUsuario.roles.push(rol);

    this.passwordPrimario = this.formUsuarioNew.value.contrasena;
    this.passwordSecundario = this.formUsuarioNew.value.contrasenaValidar;
    if(this.passwordPrimario === this.passwordSecundario ){
      this.infoUsuario.password = this.passwordPrimario;
      this.usuarioService.guardarUsuario(this.infoUsuario).subscribe(
        data => {
          alert('Usuario Creado');
          this.tokenService.logOut;
        },
        err =>{
          alert('no se logro Guardar el Usuario');
        }
      );

    }else{
      alert("Las constraseñas no son iguales");
    }


  }

}
