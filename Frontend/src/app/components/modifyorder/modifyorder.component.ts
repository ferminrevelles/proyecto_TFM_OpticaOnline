import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-modifyorder',
  templateUrl: './modifyorder.component.html',
  styleUrls: ['./modifyorder.component.css']
})
export class ModifyorderComponent implements OnInit {

  orderModify:any=this.orderService.orderModify;
  listProduct:any=this.orderService.orderModify.order   //Array para modificar las características de los productos del pedido.
  carriers: any = ['Seur','DHL'];
  submitted = false;

  modifyOrderForm = this.formBuilder.group({
    carrier: [this.orderModify.carrier, Validators.required],
    send: [this.orderModify.send]
  });

  constructor(
    private orderService: OrdersService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    //console.log(this.orderModify);
  }

  onSubmit(modifyOrderForm:any) {
    this.orderModify.send=modifyOrderForm.send;
    this.orderModify.carrier=modifyOrderForm.carrier;
    this.orderModify.order=this.listProduct;
    var subtotal:any=0;

    //Cálculo de la modificación de productos tanto en cantidad como en el número de productos.
    this.listProduct.forEach((element:any)=>{
      subtotal = subtotal + (element.price*element.quantity);
    // console.log(subtotal);
    })
    if (this.orderModify.carrier=="Seur") subtotal=(subtotal+5)*1.21;
    else subtotal=(subtotal+7)*1.21;
    this.orderModify.total = subtotal.toFixed(2);

    //Llamada al servicio para modificación del pedido.
    this.orderService.modifyOrder(this.orderModify).subscribe(response=>{
      if(response)  this.router.navigate(['admin']);
    })
  }

  delListProduct(product:any){
    var position = this.listProduct.indexOf(product);
    this.listProduct.splice(position,1);  //Elimina del array de productos los indicados para modificar el pedido
  }

  decrement(product:any){
    var position = this.listProduct.indexOf(product);
    if (this.listProduct[position].quantity>1)  this.listProduct[position].quantity--;
  }

  increment(product:any){
    var position = this.listProduct.indexOf(product);
    this.listProduct[position].quantity++;
  }

  getErrorMessageTypeCarrier(){
    if (this.modifyOrderForm.value.carrier=="") {
      return 'You must enter a value';
    }
      return 'Not a valid product';
  }

  getErrorMessageSend(){
    if (this.modifyOrderForm.value.typeProduct=="") {
      return 'You must enter a value';
    }
      return 'Not a valid product';
  }
}
