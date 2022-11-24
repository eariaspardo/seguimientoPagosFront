import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/models/roles';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

  crearUsuario !: boolean;
  usuarios : Usuarios [] = [];
  formUsuarioNuevo!: FormGroup;
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
    private formBuilder : FormBuilder)
    {
      this.buildForm();
    }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  private buildForm() {
    this.formUsuarioNuevo = this.formBuilder.group({
      nombre: ['',  [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rolSeleccionado: ['',  [Validators.required]],
      contrasena: ['', [Validators.required]],
      contrasenaValidar: ['', [Validators.required]]
    });
  }

  consultarUsuarios(){
    this.usuarioService.consultarUsuarios().subscribe(
      data => {
        this.usuarios = data;
      },
      err =>{
        console.log('no se logro consultar los Usuarios registrados');
      }
    );
  }

  crearOCerrarNuevoUsuario(){
    this.crearUsuario = !this.crearUsuario;
  }

  guardarUsuario(event: Event){
    this.infoUsuario.nombreApellido = this.formUsuarioNuevo.value.nombre;
    this.infoUsuario.nombreUsuario = this.formUsuarioNuevo.value.usuario;
    this.infoUsuario.activo = true;
    this.infoUsuario.email = this.formUsuarioNuevo.value.email;
    const rol : Roles = {id:0, nombre : this.formUsuarioNuevo.value.rolSeleccionado}
    this.infoUsuario.roles.push(rol);

    this.passwordPrimario = this.formUsuarioNuevo.value.contrasena;
    this.passwordSecundario = this.formUsuarioNuevo.value.contrasenaValidar;
    if(this.passwordPrimario === this.passwordSecundario ){
      this.infoUsuario.password = this.passwordPrimario;
      this.usuarioService.guardarUsuario(this.infoUsuario).subscribe(
        data => {
          this.crearOCerrarNuevoUsuario();
          window.location.reload();
        },
        err =>{
          alert('no se logro Guardar el Usuario');
        }
      );

    }else{
      alert("Las constraseñas no son iguales");
    }

  }

  activarODesactivarUsuario(estado : boolean, usuario:number){
    this.infoUsuario.activo = estado;
    this.infoUsuario.id = usuario;
    this.usuarioService.activarODesactivarUsuario(this.infoUsuario).subscribe(
      data => {
        window.location.reload();
      },
      err =>{
        console.log('no se logro Activar o Desactivar el usuario');
      }
    );
  }

}
