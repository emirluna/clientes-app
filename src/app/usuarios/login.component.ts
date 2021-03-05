import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo:string = "Iniciar sesión";
  usuario: Usuario;


  constructor(private authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login():void{
    console.log(this.usuario)
    if(this.usuario.username ==null || this.usuario.password == null){
      swal.fire('Error en el login', 'Username or Password empty', 'error')
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      this.router.navigate(['/clientes']);
      swal.fire('Login', `Hola ${response.username}, has iniciado sesión`, 'success');
      });
    }
}
