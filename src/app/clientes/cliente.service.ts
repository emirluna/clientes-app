import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  private   httpheaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
      return this.http.get<Cliente[]>(this.urlEndPoint);
//return this.http.get(this.urlEndPoint).pipe(
  //map((response) => response as Cliente[])
//);
  }


getCliente(id): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
}

create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.httpheaders})
  }

update(cliente:Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpheaders})
}

delete(id: number): Observable<Cliente>{
  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.httpheaders})
}

}
