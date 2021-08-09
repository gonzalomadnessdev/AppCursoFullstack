import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/assets/UserModel';
 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly baseUrl = "http://localhost:3000/users";

  currentUser:UserModel = new UserModel() ;
  token="";

  constructor(private http:HttpClient , private router:Router ) { }

  loginUser(email : string , password :string ){
    let url = `${this.baseUrl}/login`;
    
    this.http.post<any>(url,{email:email , password:password}).subscribe((res)=>{
      this.token = res.token;
      this.currentUser = res.user;

      const options =  { headers : new HttpHeaders({'Content-Type':  'application/json',}) };

      let url = `${this.baseUrl}/${this.currentUser._id}`;
      let body = JSON.stringify({isActive : true});
      this.http.put<any>(url, body, options).subscribe();

      this.router.navigate(['/']);
    })
  }

  clearUser(){

    const options =  { headers : new HttpHeaders({'Content-Type':  'application/json',}) };

    let url = `${this.baseUrl}/${this.currentUser._id}`;
    let body = JSON.stringify({isActive : false});
    this.http.put<any>(url, body, options).subscribe();

    this.currentUser = new UserModel;
    this.token="";
    
    

  }

  changePassword(password : string){
    
    const options =  { headers : new HttpHeaders({'Content-Type':  'application/json',}) };

    let url = `${this.baseUrl}/pwd/${this.currentUser._id}`;
    let body = JSON.stringify({password : password});
    this.http.put<any>(url, body, options).subscribe();

  }


}
