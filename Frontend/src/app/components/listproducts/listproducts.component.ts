import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listproducts',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit {

  @Input() products:any;

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }
  
  allProducts():any{
    const subscription = this.productService.allProducts().subscribe((response:any) =>{
      this.products=response;
      subscription.unsubscribe();
    });
  }

  allTypeProducts(){
    console.log("Peticion lista productos por tipo");
    const subscription = this.productService.allTypeProducts(this.adminService.typeListProduct).subscribe((response:any) =>{
      this.products=response;
    //  console.log(this.products);
      subscription.unsubscribe();
    });
  }



  // Borrar producto
  deleteProduct(model:any){ 
    const deletePr = this.productService.deleteProduct(model).subscribe((response:any)=>{
      this.allTypeProducts();
      deletePr.unsubscribe();
    });
  }

  modifyProduct(input:any){
    this.productService.productModify = input;
    this.router.navigate(['modifyproduct']);
  }
}
