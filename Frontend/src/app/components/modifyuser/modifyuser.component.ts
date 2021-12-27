import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-modifyuser',
  templateUrl: './modifyuser.component.html',
  styleUrls: ['./modifyuser.component.css']
})
export class ModifyuserComponent implements OnInit {

  userModify:any= this.userService.userModify;

  submitted = false;
  file:File|null = null;
  fileName:any;
  imageDefaultUser:any = "https://backend-optica-sancristobal.herokuapp.com/uploads/defaultUser.png";

  modifyUserForm = this.formBuilder.group({
    name: [this.userModify.name, Validators.required],
    pass: ['',Validators.required],
    imgUrlUser: [this.userModify.imgUrlUser]
  });

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router:Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(modifyUserForm:any) {
    // Se verifica si hay cambio de imagen de perfil en el usuario o no.
    if (modifyUserForm.imgUrlUser == undefined){
      this.userModify.imgUrlUser = "defaultUser.png";
    }else{
      this.userModify.imgUrlUser = this.file?.name;
    }
    // Se mofican los datos en el Array con los datos introducidos en el formulario   
    this.userModify.name = modifyUserForm.name;
    this.userModify.pass = modifyUserForm.pass;
    
    this.userService.modifyUser(this.userModify).subscribe(response => {
      //console.log(response);
      this.submitted = true;

       // Si existe imagen subir al servidor
       if (this.file){

        this.fileName = this.file.name;
        const formData = new FormData();
        formData.append("imgUrl", this.file);
        
        this.userService.uploadImage(formData).subscribe(response => {
          console.log(response);
          
          }, error => {
          console.warn(error.responseText)
          console.log({ error })
        })
      }
  //    this.errorLogin=false;
      if (this.userModify.typeUser!='admin') this.router.navigate(['admin']);
      else {
        this.adminService.changeAdmin();
        this.router.navigate(['login']);
      }
     
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

  getErrorMessageName(){
    if (this.modifyUserForm.value.carrier=="") {
      return 'You must enter a value';
    }
      return 'Not a valid product';
  }

  getErrorMessageEmail() {
    if (this.modifyUserForm.value.email=="") {
          return 'You must enter a value';
        }
          return 'Not a valid email';
      }
  getErrorMessagePassword() {
    if (this.modifyUserForm.value.password=="") {
          return 'You must enter a value';
        }
      return "You must enter a value";
    }
}
