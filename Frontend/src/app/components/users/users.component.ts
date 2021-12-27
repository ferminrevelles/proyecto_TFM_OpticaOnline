import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  listUsers:any;

  constructor(
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.allUsers("user").subscribe(response=>{
      this.listUsers=response.user;
    })
  }

  modifyUser(user:any){
    this.userService.userModify = user;
    this.router.navigate(['modifyuser']);
  }

  deleteUser(userEmail:any){
    const deleteUr = this.userService.deleteUser(userEmail).subscribe((response:any)=>{
    //  console.log(response);
      this.ngOnInit();
      deleteUr.unsubscribe();
    });
  }
}
