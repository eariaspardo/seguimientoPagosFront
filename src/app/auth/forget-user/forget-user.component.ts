import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-forget-user',
  templateUrl: './forget-user.component.html',
  styleUrls: ['./forget-user.component.css']
})
export class ForgetUserComponent implements OnInit {

  formOlvidarUsuario!: FormGroup;
  infoUsuario : Usuarios = new Usuarios();

  constructor() { }

  ngOnInit(): void {
  }

  recuperarUsuario(event: Event){


  }

}
