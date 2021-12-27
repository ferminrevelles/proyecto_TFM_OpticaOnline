import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { LoginService } from 'src/app/services/login.service';
import { OrdersService }  from 'src/app/services/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  productCarry:Number|null=null;
  userLogin:any;
  
  constructor(
    public productService:ProductService,
    private loginService:LoginService,
    private ordersService: OrdersService
    ) {
      this.productService.EmitNumProduct.subscribe(()=>{    //Subcripción al evento del servicio product para detectar cambios en el num productos de la cesta
        this.productCarry = this.productService.numProductShop;
      })
     }

  ngOnInit(): void {
    this.userLogin = this.loginService.login;
    this.productCarry = this.productService.numProductShop;   //Actualizar cada vez que se recargue la cabecera.
  }

  logout(){
    // Hay que guardar el pedido temporal 
    this.loginService.userLogin.dataUser.orderTemp = this.productService.productShop;
    this.ordersService.orderTemp(this.loginService.userLogin.dataUser).subscribe(response=>{  // modifica el pedido del usuario logueado.
    //  console.log(response);
    },error=>{
      console.warn(error.responseText)
      console.log({ error });
    });

    // Se inicializan los valores temporales.
    this.productService.numProductShop=null;
    this.productService.productShop=[];
    //Para cerrar el login de usuario normal.
    this.loginService.login=false;  
  }
}
