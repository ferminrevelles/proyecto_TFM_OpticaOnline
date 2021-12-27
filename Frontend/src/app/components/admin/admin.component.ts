import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  dataAdmin:any;
  //Variables para mostrar los procesos hijos.
  showProfileWeb:boolean=true;
  showProductWeb:boolean=false;
  showOrderWeb:boolean=false;
  showUserWeb:boolean=false;
  showCalendarWeb:boolean=false;

  listproducts:any;   //Listado de productos del componente padre pasados al hijo mediante @Input
  
  constructor( 
    public adminService: AdminService,
    private productService: ProductService,
    private userService: UserService,
    private router : Router  ) { }

  ngOnInit(): void {
    this.dataAdmin = this.adminService.dataAdmin;
  }

  getIsAdmin(): boolean{
    return this.adminService.isAdmin;
  }

  showProfile(){
    this.showProfileWeb=true;
    this.showProductWeb=false;
    this.showOrderWeb=false;
    this.showUserWeb=false;
    this.showCalendarWeb=false;
  }

  showProducts(typeProduct:any){
    this.showProductWeb=true;
    this.showProfileWeb=false;
    this.showOrderWeb=false;
    this.showUserWeb=false;
    this.showCalendarWeb=false;

    this.adminService.typeListProduct=typeProduct;
    const subscription = this.productService.allTypeProducts(typeProduct).subscribe((response:any) =>{
      this.listproducts = response;
      subscription.unsubscribe();
    });
  }

  showOrders(){
    this.showProductWeb=false;
    this.showProfileWeb=false;
    this.showOrderWeb=true;
    this.showUserWeb=false;
    this.showCalendarWeb=false;
  }
  
  showUsers(){
    this.showProductWeb=false;
    this.showProfileWeb=false;
    this.showOrderWeb=false;
    this.showUserWeb=true;
    this.showCalendarWeb=false;
  }

  showCalendar(){
  //  console.log("Mostrar Calendario de citas");
    this.showProductWeb=false;
    this.showProfileWeb=false;
    this.showOrderWeb=false;
    this.showUserWeb=false;
    this.showCalendarWeb=true;
  }

  modifyAdmin(){
    this.userService.userModify = this.dataAdmin.dataUser;
    this.router.navigate(['modifyuser']);
  }
}
