import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private api = 'https://formspree.io/f/mrgrdolp';

  constructor(
    private http: HttpClient
  ) { }

  PostMessage (input:any):Observable<any>{
    return this.http.post(this.api, input, {responseType: 'text'}).pipe(
      map(
        (response:any) =>{
          if (response){
            return response;
          }
        },
        (error:any) =>{
          return error;
        }
      )
    )
  }
}
