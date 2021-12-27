import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  submitted = false;
  errorProduct = false;
  products: any = ['Gafas de Sol','Gafas Graduadas','Líquido de Lentillas','Lentillas','Gafas Deportivas'];
  file:File|null = null;
  fileName:any;
  uploadImage:any;

  createProductForm = this.formBuilder.group({
    typeProduct: ['', Validators.required],
    brand: ['',Validators.required],
    model: ['', Validators.required],
    size: ['', [Validators.required,Validators.pattern('[0-9]*\.?[0-9]*')]],
    description: ['', Validators.required],
    price: ['', [Validators.required,Validators.pattern('[0-9]*\.?[0-9]*')]],
    imgUrl: ['']
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private http : HttpClient
  ) { }

  ngOnInit(): void {
  }

  onSubmit(createProductForm:any) {
    if (this.createProductForm.value.imgUrl == undefined){
      this.createProductForm.value.imgUrl = "";
    }else{
      this.createProductForm.value.imgUrl = this.file?.name;
    }
    
    //console.log(this.createProductForm.value);
    this.productService.createProduct(createProductForm).subscribe(response => {
    //  console.log(response);

      // Si existe imagen subir al servidor
      if (this.file){

        this.fileName = this.file.name;
        const formData = new FormData();
        formData.append("imgUrl", this.file);
        
        this.productService.uploadImage(formData).subscribe(response => {
        //  console.log(response);
          }, error => {
          console.warn(error.responseText)
          console.log({ error })
        })
      }

      this.submitted = true;
      this.errorProduct=false;
      this.router.navigate(['admin']);
      
      }, error => {
        this.errorProduct=true;
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
    if (this.createProductForm.value.typeProduct=="") {
      return 'You must enter a value';
    }
      return 'Not a valid product';
  }
  
  getErrorMessageBrand(){
    if (this.createProductForm.value.brand=="") {
      return 'You must enter a value';
    }
      return 'Not a valid brand';
  }

  getErrorMessageModel(){
    if (this.createProductForm.value.model=="") {
      return 'You must enter a value';
    }
      return 'Not a valid model';
  }

  getErrorMessageSize() {
    if (this.createProductForm.value.size==null) {
          return 'You must enter a number';
        }
          return 'Not is a number';
    }

  getErrorMessageDescription() {
    if (this.createProductForm.value.description=="") {
          return 'You must enter a value';
        }
      return "You must enter a value";
    }

  getErrorMessagePrice() {
    if (this.createProductForm.value.size==null) {
          return 'You must enter a number';
        }
          return 'Not is a number';
    }

}
