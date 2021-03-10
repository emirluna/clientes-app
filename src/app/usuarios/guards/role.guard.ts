import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let role =  route.data['role'] as string; 
    if(this.authService.hasRole(role)){
      return true;  
    }
    Swal.fire('Acceso Denegado', `Hola ${this.authService.usuario.username} no tienes permisios para acceder a este recurso`, 'warning');
    this.router.navigate(['/clientes'])
    return false;
  }
  
}
