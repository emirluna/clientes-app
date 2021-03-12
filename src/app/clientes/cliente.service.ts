import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8090/api/clientes';
  
  constructor(private http: HttpClient, 
              private router: Router) { }

  


  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint+ '/page/' + page).pipe(
    map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          return cliente;
        });
        return response;
      })
    );
  }


getCliente(id): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {      

      this.router.navigate(['/clientes']);
      console.error(e.error.mensaje)
      //swal.fire('Error al obtener ', e.error.mensaje, 'error');
      return throwError(e);
      
    })
  );
}

create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente).pipe(
        catchError(e => {
            if(e.status==400){
              return throwError(e);
            }

            console.error(e.error.mensaje)
        //    swal.fire('Error al crear cliente', e.error.mensaje, 'error');
            return throwError(e);
        })
    );
  }

update(cliente:Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
    catchError(e => {

      if(e.status==400){
        return throwError(e);
      }

        console.error(e.error.mensaje)
        //swal.fire('Error al actualizar cliente', e.error.mensaje, 'error');
        return throwError(e);
    })
  );
}

delete(id: number): Observable<Cliente>{
  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
        console.error(e.error.mensaje)
//        swal.fire('Error al eliminar cliente', e.error.mensaje, 'error');
        return throwError(e);
    })
  );
}

}
