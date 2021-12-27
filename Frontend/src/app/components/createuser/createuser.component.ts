import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  file:File|null = null;
  fileName:any;
  uploadImage:any;

  createUserForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    pass: ['', Validators.required],
    name:['',Validators.required],
    imgUrlUser: ['']
  });
  submitted = false;
  errorUser = false;    //Usada para indicar si el usuario ya existe en la base de datos o no

  constructor(
    private formBuilder:FormBuilder,
    private userService: UserService,
    private productService: ProductService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(createUserForm:any) {
  //  console.log(this.createUserForm.value);
    if (this.createUserForm.value.imgUrlUser == undefined){
      this.createUserForm.value.imgUrlUser = "";
    }else{
      this.createUserForm.value.imgUrlUser = this.file?.name;
    }
    createUserForm.typeUser="user";   //Definimos el tipo de usuario que serán siempre user. Solo hay un administrador.

      this.userService.createUser(createUserForm).subscribe(response=>{
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
      this.errorUser=false;
      this.router.navigate(['admin']);
      
      }, error => {
      this.errorUser=true;
      this.submitted = false;
      console.warn(error.responseText)
      console.log({ error })
    })
  }

  onFileSelected(event:any) {   //carga imagen en variable local
    this.file = event.target.files[0];
    this.fileName = this.file?.name;
  }

  getErrorMessageEmail() {
    if (this.createUserForm.value.email=="") {
          return 'You must enter a value';
        }
          return 'Not a valid email';
      }
  getErrorMessagePassword() {
    if (this.createUserForm.value.password=="") {
          return 'You must enter a value';
        }
      return "You must enter a value";
    }
    getErrorMessageName() {
      if (this.createUserForm.value.nameUser=="") {
            return 'You must enter a value';
          }
        return "You must enter a value";
    }
}
