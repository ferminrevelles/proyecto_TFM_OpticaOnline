import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /*Desarrollo
  private apiCreateUser = 'http://localhost:3000/register';  //Crear usuario
  private apiDeleteUser = 'http://localhost:3000/deleteuser';  //Borrar usuario
  private apiModifyUser = 'http://localhost:3000/modifyuser';  //Borrar usuario
  private apiUpload = 'http://localhost:3000/uploadimage';  //Dirección y puerto donde está el servidor funcionando.
  private apiAllUsers = 'http://localhost:3000/allusers';  //Dirección y puerto donde está el servidor funcionando.*/

  private apiCreateUser = 'https://backend-optica-sancristobal.herokuapp.com/register';  //Crear usuario
  private apiDeleteUser = 'https://backend-optica-sancristobal.herokuapp.com/deleteuser';  //Borrar usuario
  private apiModifyUser = 'https://backend-optica-sancristobal.herokuapp.com/modifyuser';  //Borrar usuario
  private apiUpload = 'https://backend-optica-sancristobal.herokuapp.com/uploadimage';  //Dirección y puerto donde está el servidor funcionando.
  private apiAllUsers = 'https://backend-optica-sancristobal.herokuapp.com/allusers';  //Dirección y puerto donde está el servidor funcionando.

  userModify:any;   //Datos de usuario a modificar, comunicación entre componentes.

  constructor(
    private http: HttpClient
  ) { }

  // Crear Usuario
  createUser(input:any){ 
    return this.http.post(this.apiCreateUser, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Usuario creado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Usuario no creado");
          return error;
        }
      )
    )
  }

  //Mostrar usuarios por tipo
  allUsers(typeUser:any){
    return this.http.post(this.apiAllUsers, {typeUser: typeUser}, {responseType: 'json'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Lista de usuarios");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("No lista de usuarios");
          return error;
        }
      )
    )
  }

  //Borrar usuario
  deleteUser(userEmail:any){
    return this.http.post(this.apiDeleteUser, {email:userEmail}, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Usuario borrado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Usuario no borrado");
          return error;
        }
      )
    )
  }

  // Modificar Usuario
  modifyUser(input:any){ 
    //const model:any = {model:input};
    return this.http.post(this.apiModifyUser, input, {responseType: 'json'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Usuario Modificado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Usuario no modificado");
          return error;
        }
      )
    )
  }

  uploadImage(formData:FormData){

    return this.http.post(this.apiUpload, formData, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Imagen Subida");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Producto no Subida");
          return error;
        }
      )
    )
  }
}
