import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  login:boolean=false;
  userLogin:any;  //Guarda usuario logueado para asignarlo al pedido.

  //URL desarrollo.
  //private api = 'http://localhost:3000/login';  //Dirección y puerto donde está el servidor funcionando.

  //URL producción
  private api = 'https://backend-optica-sancristobal.herokuapp.com/login';  //Dirección y puerto donde está el servidor funcionando.
  
  constructor( private http: HttpClient) { }

  loginUser(input:any){
    
    return this.http.post(this.api, input, {responseType: 'json'}).pipe(
      map(
        (response:any) =>{
          if (response){
            console.log("usuario logueado");
          //  this.login=true;
            this.userLogin = response;  //Guarda el usuario logueado
            return response;
          }
        },
        (error:any) =>{
          this.login=false;
          console.log("Usuario incorrecto");
          return error;
        }
      )
    )
  }
}
