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
    // Get HTML head element
    var head = document.getElementsByTagName('HEAD')[0];

    // Create new link Element
    var link = document.createElement('link');

    // set the attributes for link element
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './assets/css/modo_oscuro.css';

    // Append link element to HTML head
    head.appendChild(link);
  }

}
