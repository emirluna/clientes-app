import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


login(user:Usuario):Observable<any>{
  const urlEndpoint = 'http://localhost:8090/oauth/token';

  const credenciales = btoa('AngularApp' + ':'  + '12345');

  const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Authorization': 'Basic ' + credenciales
  });

  let params = new URLSearchParams();
  params.set('grant_type', 'password');
  params.set('username', user.username);
  params.set('password', user.password);


  return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders})
}

}
