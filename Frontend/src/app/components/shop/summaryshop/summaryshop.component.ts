import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { OrdersService } from 'src/app/services/orders.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-summaryshop',
  templateUrl: './summaryshop.component.html',
  styleUrls: ['./summaryshop.component.css']
})
export class SummaryshopComponent implements OnInit {

  order:any;
  priceCarrier:any|0=0; //Variable para el precio sobre el método de envío
  infoAdd:any='';  //Información adicional para el vendedor
  subtotal:number=0;
  orderCreated:boolean=false; //Mostrará mensaje indicando que el pedido se ha creado correctamente


  constructor(
    private productService: ProductService,
    private ordersService: OrdersService,
    private loginService: LoginService,
    private router: Router
    ) { 
  }

  ngOnInit(): void {
    this.subtotal=0;
    this.order = this.productService.productShop;
    this.calcSubtotal();
  }

  decrement(product:any){
    let position = this.order.indexOf(product);
    if (this.order[position].quantity>1){ //Controlar que la cantidad no sea negativa
    this.order[position].quantity--;
    this.ngOnInit();
    }
  }

  increment(product:any){
    let position = this.order.indexOf(product);
    this.order[position].quantity++;
    this.ngOnInit();
  }

  calcSubtotal(){ //cálculo del subtotal de la cesta.
    this.order.forEach((element:any) => {
      this.subtotal= this.subtotal+(element.price*element.quantity);
    });
  }

  deleteProductShop(product:any){
    let position = this.order.indexOf(product);
    this.order.splice(position,1);
    this.productService.delProductHeader(); //Actualizar el valor de la cesta de la cabecera
    this.ngOnInit();
  }

  doOrder(){
    //Calcular número de pedido
  if (this.loginService.login){
    //Confirmado el pedido se borra el pedido temporal del usuario que ha confirmado el mismo
    // Hay que guardar el pedido temporal 
    this.loginService.userLogin.dataUser.orderTemp = [];
    this.ordersService.orderTemp(this.loginService.userLogin.dataUser).subscribe(response=>{  // modifica el pedido del usuario logueado.
    //  console.log(response);
    },error=>{
      console.warn(error.responseText)
      console.log({ error });
    });

    // Ahora guarda el pedido en la base de datos.
    var numOrder:number=0;
    this.ordersService.allOrders().subscribe(response=>{
        if (response.length!=0) numOrder = response[response.length-1].numOrder;
        //Transformar pedido a formato JSON
      //  console.log("Crear pedido en BD");
        var carrier;
        if (this.priceCarrier==5){  // Transportista elegido
          carrier="Seur";
        }else{
          carrier="DHL";
        }

        var objeto = {
          numOrder:numOrder+1,
          order:null,
          carrier:carrier,
          total: (this.subtotal+this.priceCarrier)+(this.subtotal+this.priceCarrier)*0.21,
          pay:true,
          infoAdd: this.infoAdd,
          send: false,
          user: this.loginService.userLogin.dataUser
        };
        objeto.order = this.order;

        this.ordersService.createOrder(objeto).subscribe(response=>{
        //  console.log(response);
          this.productService.productShop=[];  //Una vez registrado el producto se vacía la cesta
          
        },error=>{
          console.warn(error.responseText)
          console.log({ error });
        });
        this.productService.numProductShop =null;
        //this.router.navigate(['shop']);
        this.orderCreated=true;

    },error=>{
      console.warn(error.responseText)
      console.log({ error })
    });
  }else{
    this.router.navigate(['login']);
  }
    
  }

  backShop(){
    this.router.navigate(['shop']);
  }

}
