import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  _usuario: Usuario;
  private _token:  string;

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

guardarUsuario(accessToken: string):void{
  let payload = this.obtenerToken(accessToken);
  this._usuario = new Usuario();
  this._usuario.username = payload.user_name;
  this._usuario.roles = payload.authorities;
  sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
}

guardarToken(accessToken: string):void{
  this._token=accessToken;
  sessionStorage.setItem('token', accessToken);
}

obtenerToken(accessToken: string):any{
  if(accessToken != null){
    return JSON.parse(atob(accessToken.split(".")[1]));
  }
  return null;
}


public get usuario(): Usuario{
  if(this._usuario != null){
    return this._usuario;
  }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
    this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
    return this._usuario;
  }
  return new Usuario();
}


public get token(): string{
  if(this._token != null){
    return this._token;
  }else if(this._token == null && sessionStorage.getItem('token') != null){
    this._token = sessionStorage.getItem('token');
    return this._token;
  }
  return null;
}




}
