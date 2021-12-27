import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../app/services/login.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    pass: ['', Validators.required]
  });
  submitted = false;
  errorLogin = false;

  constructor( 
    private formBuilder: FormBuilder,
    private login: LoginService,
    private router: Router,
    private adminService : AdminService,
    private productService: ProductService
    ) { }
 

  ngOnInit(): void {
  }

  onSubmit(loginForm:any) {
    //console.log(this.loginForm.value);
    this.login.loginUser(loginForm).subscribe(response => {
    //  console.log(response);
      this.adminService.dataAdmin=response;
      this.submitted = true;
      this.errorLogin=false;
      if (response.dataUser.typeUser==="admin"){  //Si es administrador muestra dashboard
        this.adminService.changeAdmin();
        this.router.navigate(['admin']);
      }else{                                      //Otro usuario registrado vuelve a la compra.
        this.login.login=true;
        // Unir los pedidos temporales con aquellos que ha añadido posteriormente, por ejemplo antes de loguearse.
        this.productService.productShop= response.dataUser.orderTemp.concat(this.productService.productShop);

        this.productService.numProductShop = this.productService.productShop.length;
        this.router.navigate(['summaryshop']);
      }
      
      }, error => {
        this.errorLogin=true;
        this.submitted = false;
      console.warn(error.responseText)
      console.log({ error })
      })
  }

  getErrorMessageEmail() {
    if (this.loginForm.value.email=="") {
          return 'You must enter a value';
        }
          return 'Not a valid email';
      }
  getErrorMessagePassword() {
    if (this.loginForm.value.password=="") {
          return 'You must enter a value';
        }
      return "You must enter a value";
    }
}
