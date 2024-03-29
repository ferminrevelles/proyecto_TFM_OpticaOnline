import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService} from "../services/admin.service";

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor( 
    private adminService: AdminService,
    private router:Router
    ) {   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.adminService.isAdmin) {
      return true;
    } else{
      this.router.navigate(['login']);
      return false;
    } 
  }
}
