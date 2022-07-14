import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      cuota: ['',  [Validators.required]],
      valor: ['', [Validators.required]],
      email: ['', [Validators.required]]
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

}
