import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any;

  constructor(
    private orderService: OrdersService,
    private router:Router
  ) { }

  ngOnInit(): void {
    const subscription = this.orderService.allOrders().subscribe((response:any) =>{
      this.orders=response;
      subscription.unsubscribe();
    });
  }

  modifyOrder(order:any){   //Modificar pedido desde adminitrador
  //  console.log("Modifica producto");
    this.orderService.orderModify = order;
    this.router.navigate(['modifyorder']);
  }

  deleteOrder(numOrder:any){    // Borrar pedido desde administrador.
  //  console.log("Borra producto");
    const deleteOr = this.orderService.deleteOrder(numOrder).subscribe((response:any)=>{
      console.log(response);
      this.ngOnInit();
      deleteOr.unsubscribe();
    });
  }

}
