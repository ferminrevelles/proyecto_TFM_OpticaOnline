import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  /* Desarrollo
  private apiCreateOrder = 'http://localhost:3000/createorder';  //Dirección y puerto donde está el servidor funcionando.
  private apiAllOrders = 'http://localhost:3000/allorders';  //Dirección y puerto donde está el servidor funcionando.
  private apiReadOrder = 'http://localhost:3000/readorder'; //Lee un pedido específico.
  private apiModifyOrder = 'http://localhost:3000/modifyorder'; //modifica un pedido concreto
  private apiDeleteOrder = 'http://localhost:3000/deleteorder'; //Borra un pedido.
  private apiOrderTemporalyUser = 'http://localhost:3000/ordertemp'; //Llamada para guardar el pedido temporal del usuario.*/

  private apiCreateOrder = 'https://backend-optica-sancristobal.herokuapp.com/createorder';  //Dirección y puerto donde está el servidor funcionando.
  private apiAllOrders = 'https://backend-optica-sancristobal.herokuapp.com/allorders';  //Dirección y puerto donde está el servidor funcionando.
  private apiReadOrder = 'https://backend-optica-sancristobal.herokuapp.com/readorder'; //Lee un pedido específico.
  private apiModifyOrder = 'https://backend-optica-sancristobal.herokuapp.com/modifyorder'; //modifica un pedido concreto
  private apiDeleteOrder = 'https://backend-optica-sancristobal.herokuapp.com/deleteorder'; //Borra un pedido.
  private apiOrderTemporalyUser = 'https://backend-optica-sancristobal.herokuapp.com/ordertemp'; //Llamada para guardar el pedido temporal del usuario.

  //CRUD Pedido
  orders:any; //Variables para guardar todos los pedidos.
  orderModify:any; //Variable que guardar el producto a modificar indicardo.
  
  constructor(
    private http: HttpClient
  ) { }

  // Crear Pedido
  createOrder(input:any){ 
    return this.http.post(this.apiCreateOrder, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Pedido creado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Pedido no creado");
          return error;
        }
      )
    )
  }

  // Crear Pedido
  orderTemp(input:any){ 
    return this.http.post(this.apiOrderTemporalyUser, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Pedido temportal guardado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Pedido temporal no guardado");
          return error;
        }
      )
    )
  }

    // Lista de todos los pedidos.
  allOrders(){
    return this.http.post(this.apiAllOrders, {responseType: 'JSON'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log(response);
            this.orders = response.orders;
            return response.orders;
          }
        },
        (error:any) =>{
        //  console.log("Usuario incorrecto");
          return error;
        }
      )
    )
  }

  deleteOrder(input:any){ 
    return this.http.post(this.apiDeleteOrder, {numOrder:input}, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Pedido borrado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Pedido no borrado");
          return error;
        }
      )
    )
  }

  // Modificar producto
  modifyOrder(input:any){ 
    return this.http.post(this.apiModifyOrder, input, {responseType: 'json'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Pedido Modificado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Pedido no modificado");
          return error;
        }
      )
    )
  }
}
