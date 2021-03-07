import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AuthService } from '../usuarios/auth.service';

@Injectable()
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8090/api/clientes';
  private   httpheaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, 
              private router: Router,
              private authService: AuthService) { }

  private isNotAuthorized(e):boolean{
    if(e.status==401){
      this.router.navigate(['/login'])
      return true;
    }
    
    
    if(e.status==403){
      swal.fire('Acceso denegado', `${this.authService.usuario.username} no tienes lo permisos para acceder este recurso`,  'warning');
      this.router.navigate(['/clientes'])
      return true;
    }
     
    return false;
    
  }


  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpheaders.append('Authorization', 'Bearer '+ token);
    }
    return this.httpheaders;
  }


  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint+ '/page/' + page).pipe(
    map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          return cliente;
        });
        return response;
      }),
      catchError(e => {
        if(this.isNotAuthorized(e)){
          return throwError(e);
        }
      })
    );
  }


getCliente(id): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {
      if(this.isNotAuthorized(e)){
        return throwError(e);
      }

      this.router.navigate(['/clientes']);
      console.error(e.error.mensaje)
      swal.fire('Error al obtener ', e.error.mensaje, 'error');
      return throwError(e);
      
    })
  );
}

create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {


          if(this.isNotAuthorized(e)){
            return throwError(e);
          }

            if(e.status==400){
              return throwError(e);
            }

            console.error(e.error.mensaje)
            swal.fire('Error al crear cliente', e.error.mensaje, 'error');
            return throwError(e);
        })
    );
  }

update(cliente:Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {

      if(this.isNotAuthorized(e)){
        return throwError(e);
      }


      if(e.status==400){
        return throwError(e);
      }

        console.error(e.error.mensaje)
        swal.fire('Error al actualizar cliente', e.error.mensaje, 'error');
        return throwError(e);
    })
  );
}

delete(id: number): Observable<Cliente>{
  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {

      if(this.isNotAuthorized(e)){
        return throwError(e);
      }

        console.error(e.error.mensaje)
        swal.fire('Error al eliminar cliente', e.error.mensaje, 'error');
        return throwError(e);
    })
  );
}

}
