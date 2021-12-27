import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shoptypeproduct',
  templateUrl: './shoptypeproduct.component.html',
  styleUrls: ['./shoptypeproduct.component.css']
})
export class ShoptypeproductComponent implements OnInit {

  sidebarOpen: boolean|false =false;
  typeProduct=this.productService.typeProduct;
  products:any;
  isDataAvailable:boolean=false;
  
  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const subscription = this.productService.allTypeProducts(this.typeProduct).subscribe((response)=>{
      this.products=response;
      this.isDataAvailable=true;
      subscription.unsubscribe();
    });
  }

  detailProduct(product:any){
    this.productService.detailProduct=product;
    this.router.navigate(['detailproduct']);
  }

  changeProduct(product:any){
    this.typeProduct = product;
    this.ngOnInit();
  }
}
