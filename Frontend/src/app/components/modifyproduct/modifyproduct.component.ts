import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service'
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-modifyproduct',
  templateUrl: './modifyproduct.component.html',
  styleUrls: ['./modifyproduct.component.css']
})
export class ModifyproductComponent implements OnInit {

  productModify:any = this.productService.productModify;  //Producto a modificar
  products: any = ['Gafas de Sol','Gafas Graduadas','Líquido de Lentillas','Lentillas','Gafas Deportivas'];
  imageDefault:any = "https://backend-optica-sancristobal.herokuapp.com/uploads/default.jpg";

  modifyProductForm = this.formBuilder.group({
    typeProduct: [this.productModify.typeProduct, Validators.required],
    brand: [this.productModify.brand,Validators.required],
  //  model: ['', Validators.required],
    size: [this.productModify.size, [Validators.required,Validators.pattern('[0-9]*\.?[0-9]*')]],
    description: [this.productModify.description, Validators.required],
    price: [this.productModify.price, [Validators.required,Validators.pattern('[0-9]*\.?[0-9]*')]],
    imgUrl: [this.productModify.imgUrl]
  });

  modelInitial :any;
  submitted = false;
//  errorLogin = false;
  file:File|null = null;
  fileName:any;
  uploadImage:any;

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
  }


  onSubmit(modifyProductForm:any) {
      
    if (modifyProductForm.typeProduct.imgUrl == this.imageDefault){
      this.modifyProductForm.value.imgUrl = modifyProductForm.typeProduct.imgUrl;

    }else{
      this.modifyProductForm.value.imgUrl = this.file?.name;
    }
    
    const product = this.modifyProductForm.value;
    product.model = this.productModify.model;
    this.productService.modifyProduct(product).subscribe(response => {
      //console.log(response);
      this.submitted = true;

       // Si existe imagen subir al servidor
       if (this.file){

        this.fileName = this.file.name;
        const formData = new FormData();
        formData.append("imgUrl", this.file);
        
        this.productService.uploadImage(formData).subscribe(response => {
          console.log(response);
          
          }, error => {
          console.warn(error.responseText)
          console.log({ error })
        })
      }
  //    this.errorLogin=false;
      this.router.navigate(['admin']);
     
      }, error => {
  //      this.errorLogin=true;
        this.submitted = false;
      console.warn(error.responseText)
      console.log({ error })
      })
  }

  onFileSelected(event:any) {   //carga imagen en variable local
    this.file = event.target.files[0];
    this.fileName = this.file?.name;
  }

    getErrorMessageTypeProduct(){
      if (this.modifyProductForm.value.typeProduct=="") {
        return 'You must enter a value';
      }
        return 'Not a valid product';
    }
    
    getErrorMessageBrand(){
      if (this.modifyProductForm.value.brand=="") {
        return 'You must enter a value';
      }
        return 'Not a valid brand';
    }
  
    getErrorMessageModel(){
      if (this.modifyProductForm.value.model=="") {
        return 'You must enter a value';
      }
        return 'Not a valid model';
    }
  
    getErrorMessageSize() {
      if (this.modifyProductForm.value.size==null) {
            return 'You must enter a number';
          }
            return 'Not is a number';
      }
  
    getErrorMessageDescription() {
      if (this.modifyProductForm.value.description=="") {
            return 'You must enter a value';
          }
        return "You must enter a value";
      }
  
    getErrorMessagePrice() {
      if (this.modifyProductForm.value.size==null) {
            return 'You must enter a number';
          }
            return 'Not is a number';
      }
}
