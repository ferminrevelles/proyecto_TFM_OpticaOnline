import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  /*  Modo desarrollo
  private apiReadAppointment = 'http://localhost:3000/readappointment';  //Leer citas de la fecha indicada.
  private apiCreateAppointment = 'http://localhost:3000/createappointment';  //Leer citas de la fecha indicada.
  private apiDeleteAppointment = 'http://localhost:3000/deleteappointment';  //Borrar citas de la fecha indicada.
  private apiModifyAppointment = 'http://localhost:3000/modifyappointment';  //Modificar citas de la fecha indicada.
  private apiReadAppointmentUser = 'http://localhost:3000/readappointmentuser';  //Crear usuario con cita
  private apiCreateAppointmentUser = 'http://localhost:3000/createappointmentuser';  //Crear usuario con cita
  private apiDeleteAppointmentUser = 'http://localhost:3000/deleteappointmentuser';  //Crear usuario con cita*/

  private apiReadAppointment = 'https://backend-optica-sancristobal.herokuapp.com/readappointment';  //Leer citas de la fecha indicada.
  private apiCreateAppointment = 'https://backend-optica-sancristobal.herokuapp.com/createappointment';  //Leer citas de la fecha indicada.
  private apiDeleteAppointment = 'https://backend-optica-sancristobal.herokuapp.com/deleteappointment';  //Borrar citas de la fecha indicada.
  private apiModifyAppointment = 'https://backend-optica-sancristobal.herokuapp.com/modifyappointment';  //Modificar citas de la fecha indicada.
  private apiReadAppointmentUser = 'https://backend-optica-sancristobal.herokuapp.com/readappointmentuser';  //Crear usuario con cita
  private apiCreateAppointmentUser = 'https://backend-optica-sancristobal.herokuapp.com/createappointmentuser';  //Crear usuario con cita
  private apiDeleteAppointmentUser = 'https://backend-optica-sancristobal.herokuapp.com/deleteappointmentuser';  //Crear usuario con cita

  hours:any;
  daySelect:any;  //Dia seleccionado por el usuario para pedir la cita
  hourSelect:any=null; //Hora seleccionada por el usuario para pedir la cita.
  hourId:any;
  
  constructor(private http: HttpClient) { }

// Lista de todos los usuario con cita
  readAppointmentUser(input:any){
     const sendServer = {
      "appointmentUser": input
    }
    //console.log(sendServer);
    return this.http.post(this.apiReadAppointmentUser, sendServer, {responseType: 'json'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log(response);
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Usuario incorrecto");
          return error;
        }
      )
    )
  }

  createAppointmentUser(input:any){ 
    return this.http.post(this.apiCreateAppointmentUser, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Usuario con cita creado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Usuario con cita no creado");
          return error;
        }
      )
    )
  }

  deleteAppointmentUser(input:any){ 
    //console.log(input);    
    return this.http.post(this.apiDeleteAppointmentUser,{"appointmentUser" :input}, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Borrado usuario con cita creada");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("No borrado usuario con cita creada");
          return error;
        }
      )
    )
  }

  // Lista de todos las citas de un día seleccionado.
  readAppointment(input:any){
    this.daySelect=input;
    const sendServer = {
      appointment : input
    }
    console.log(sendServer);
    return this.http.post(this.apiReadAppointment, sendServer, {responseType: 'json'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log(response);
            this.hours=response.dataAppointment.hourAndUser;
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Usuario incorrecto");
          return error;
        }
      )
    )
  }

  createAppointment(input:any){ 
    return this.http.post(this.apiCreateAppointment, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Cita creada");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Cita no creado");
          return error;
        }
      )
    )
  }

  modifyAppointment(input:any){ 
   // console.log(input);    
    return this.http.post(this.apiModifyAppointment, input, {responseType: 'json'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Cita modificada");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Cita no modificada");
          return error;
        }
      )
    )
  }

  deleteAppointment(input:any){ 
    console.log(input);    
    return this.http.post(this.apiDeleteAppointment, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Cita borrada");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Cita no borrada");
          return error;
        }
      )
    )
  }
}
