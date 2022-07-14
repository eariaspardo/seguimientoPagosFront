import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

const NOMBRE = 'nombreApellido';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario : string|null = '';

  constructor(
    private loginService : TokenService,
    private router : Router)
    {}

  ngOnInit(): void {
    this.usuario = localStorage.getItem(NOMBRE);
  }

  cerrarSesion(){
    this.loginService.logOut();
  }

  modoOscuro(){
    const body  = document.querySelector('body')!;
    body.classList.toggle('darkmode');
  }

}
