import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable()
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  private   httpheaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint+ '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.name));
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.name = cliente.name.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.name));
      })
    );
  }


getCliente(id): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/clientes']);
      console.error(e.error.mensaje)
      swal.fire('Error al obtener ', e.error.mensaje, 'error');
      return throwError(e);
    })
  );
}

create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.httpheaders}).pipe(
        catchError(e => {

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
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpheaders}).pipe(
    catchError(e => {

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
  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.httpheaders}).pipe(
    catchError(e => {
        console.error(e.error.mensaje)
        swal.fire('Error al eliminar cliente', e.error.mensaje, 'error');
        return throwError(e);
    })
  );
}

}
