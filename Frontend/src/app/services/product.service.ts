import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /*Desarrollo
  private apiCreate = 'http://localhost:3000/createproduct';  //Dirección y puerto donde está el servidor funcionando.
  private apiDelete = 'http://localhost:3000/deleteproduct';  //Dirección y puerto donde está el servidor funcionando.
  private apiModify = 'http://localhost:3000/modifyproduct';  //Dirección y puerto donde está el servidor funcionando.
  private apiUpload = 'http://localhost:3000/uploadimage';  //Dirección y puerto donde está el servidor funcionando.
  private apiTypeProduct = 'http://localhost:3000/typeproduct';  //Dirección y puerto donde está el servidor funcionando.
  private apiProducts = 'http://localhost:3000/allproducts';  //Pedir todos los productos*/

  private apiCreate = 'https://backend-optica-sancristobal.herokuapp.com/createproduct';  //Dirección y puerto donde está el servidor funcionando.
  private apiDelete = 'https://backend-optica-sancristobal.herokuapp.com/deleteproduct';  //Dirección y puerto donde está el servidor funcionando.
  private apiModify = 'https://backend-optica-sancristobal.herokuapp.com/modifyproduct';  //Dirección y puerto donde está el servidor funcionando.
  private apiUpload = 'https://backend-optica-sancristobal.herokuapp.com/uploadimage';  //Dirección y puerto donde está el servidor funcionando.
  private apiTypeProduct = 'https://backend-optica-sancristobal.herokuapp.com/typeproduct';  //Dirección y puerto donde está el servidor funcionando.
  private apiProducts = 'https://backend-optica-sancristobal.herokuapp.com/allproducts';  //Pedir todos los productos
  
  productModify:any;
  products:any;
  

  //Variables para solicitudes a BD y mostrar web
  typeProduct:String="Gafas de Sol";
  typeProducts:any;
  detailProduct:any;
  
  //Crear pedido
  productShop:any=[];
  numProductShop:any;    //numero productos en la cesta

  EmitNumProduct = new EventEmitter<any>();   //Evento capture num productos la cabecera

  constructor(private http: HttpClient) { }

  // Creación del CRUD
  // Crear Producto
  createProduct(input:any){ 
    return this.http.post(this.apiCreate, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
        //    console.log("Producto creado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Producto no creado");
          return error;
        }
      )
    )
  }

  // Borrar producto
  deleteProduct(input:any){ 
    return this.http.post(this.apiDelete, {model:input}, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Producto borrado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Producto no borrado");
          return error;
        }
      )
    )
  }

  // Modificar producto
  modifyProduct(input:any){ 
    return this.http.post(this.apiModify, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log("Producto Modificado");
            return response;
          }
        },
        (error:any) =>{
        //  console.log("Producto no modificado");
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

  allProducts(){
    return this.http.post(this.apiProducts, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
          //  console.log(response.product);
            this.products = response.product;
            return response.product;
          }
        },
        (error:any) =>{
        //  console.log("Usuario incorrecto");
          return error;
        }
      )
    )
  }

  allTypeProducts(inputProduct:String){
    return this.http.post(this.apiTypeProduct, {typeProduct: inputProduct}).pipe(
      map(
        (response:any) =>{
          if (response){
          return response.product;
          }
        },
        (error:any) =>{
        //  console.log("No hay datos");
          return error;
        }
      )
    )
  }

  addProduct(addProduct:any){   //Añade producto la cesta en un Array con los distintos productos.
    addProduct.quantity ="1"; //Añade campo con cantidad de ese producto
    this.productShop.push(addProduct);
    this.numProductShop = this.productShop.length;
    this.EmitNumProduct.emit();   //Evento para emitir los cambios en el numero de productos de la cesta.
  }

  delProductHeader(){   // Para actualizar el valor de la cesta de la cabecera
    this.numProductShop--;
    if (this.numProductShop==0) this.numProductShop=null;
    this.EmitNumProduct.emit();
  }
}



