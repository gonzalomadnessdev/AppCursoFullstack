import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly baseUrl = "http://localhost:3000/users";
  

  constructor(private http : HttpClient , private auth : AuthenticationService) { }

  //

  toTitleCase(string){
      
    
      //modificacion por los Mc
      if((string[0]=="M"||string[0]=="m")&&(string[1]=="C"||string[1]=="c")){
        string = string.slice(2)
        
        return `Mc${string[0].toUpperCase()+string.slice(1).toLowerCase()}`
      }
      //modificacion por los Mac
      if((string[0]=="M"||string[0]=="m")&&(string[1]=="A"||string[1]=="a")&&(string[2]=="C"||string[2]=="c")){
        string = string.slice(3)
        
        return `Mac${string[0].toUpperCase()+string.slice(1).toLowerCase()}`
      }

      return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  
  
  getUsers(firstName?:string , lastName?:string , email?:string , phone?:number) {
    const options =  { headers : new HttpHeaders({'Authorization': this.auth.token}) };
    let url = this.baseUrl;

    //0000

    if(!firstName && !lastName && !email&& !phone){
      return this.http.get<any>(url,options);
    }

    // 0001 0010 0100 1000
    if (firstName && !lastName && !email && !phone){
      url = `${this.baseUrl}?firstname=${this.toTitleCase(firstName)}`;
      return this.http.get<any>(url,options);
    }
    if (!firstName && lastName && !email && !phone){
      url = `${this.baseUrl}?lastname=${this.toTitleCase(lastName)}`;
      return this.http.get<any>(url,options);
    }
    if (!firstName && !lastName && email &&!phone){
      url = `${this.baseUrl}?email=${email}`;
      return this.http.get<any>(url,options);
    }
    if (!firstName && !lastName && !email && phone){
      url = `${this.baseUrl}?phone=${phone}`;
      return this.http.get<any>(url,options);
    }
    //0011 0101 0110 1001 1010 1100 
    //0011
    if (firstName && lastName && !email&& !phone){
      url = `${this.baseUrl}?firstname=${this.toTitleCase(firstName)}&lastname=${this.toTitleCase(lastName)}`;
      return this.http.get<any>(url,options);
    }
    //0101
    if (firstName&& !lastName && email &&!phone){
      url = `${this.baseUrl}?firstname=${this.toTitleCase(firstName)}&email=${email}`;
      return this.http.get<any>(url,options);
    }
    //0110
    if (!firstName && lastName && email && !phone){
      url = `${this.baseUrl}?lastname=${this.toTitleCase(lastName)}&email=${email}`;
      return this.http.get<any>(url,options);
    }
    //1001
    if (firstName && !lastName && !email && phone){
      url = `${this.baseUrl}?firstname=${this.toTitleCase(firstName)}&phone=${phone}`;
      return this.http.get<any>(url,options);
    }
    //1010
    if (!firstName && lastName && !email && phone){
      url = `${this.baseUrl}?lastname=${this.toTitleCase(lastName)}&phone=${phone}`;
      return this.http.get<any>(url,options);
    }
    //1100
    if (!firstName && !lastName && email && phone){
      url = `${this.baseUrl}?email=${email}&phone=${phone}`;
      return this.http.get<any>(url,options);
    }
    //0111 1011 1101 1110
    if (firstName && lastName && email && !phone){
      url = `${this.baseUrl}?firstname=${this.toTitleCase(firstName)}&lastname=${this.toTitleCase(lastName)}&email=${email}`;
      return this.http.get<any>(url,options);
    }
    if (firstName && lastName && !email && phone){
      url = `${this.baseUrl}?firstname=${this.toTitleCase(firstName)}&lastname=${this.toTitleCase(lastName)}&phone=${phone}`;
      return this.http.get<any>(url,options);
    }
    if (firstName && !lastName && email && phone){
      url = `${this.baseUrl}?firstname=${this.toTitleCase(firstName)}&email=${email}&phone=${phone}`;
      return this.http.get<any>(url,options);
    }
    if (!firstName && lastName && email && phone){
      url = `${this.baseUrl}?lastname=${this.toTitleCase(lastName)}&email=${email}&phone=${phone}`;
      return this.http.get<any>(url,options);
    }

    //1111

    if (firstName && lastName && email && phone){
      url = `${this.baseUrl}?firstname=${this.toTitleCase(firstName)}&lastname=${this.toTitleCase(lastName)}&email=${email}&phone=${phone}`;
      return this.http.get<any>(url,options);
    }

    return this.http.get<any>(url,options);
  }
  
  getUser(id:any){
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url);
  }

  editUser(id:any,firstName:string,lastName:string,email:string,phone:number){

    const options =  { headers : new HttpHeaders({'Content-Type':  'application/json',}) };

    let url = `${this.baseUrl}/${id}`;
    let body = JSON.stringify({firstName : firstName , lastName : lastName , email : email , phone : phone});
    return this.http.put<any>(url, body, options);
  }

  saveUser(firstName:string,lastName:string,email:string,phone:number,password:string){

    const options =  { headers : new HttpHeaders({'Content-Type':  'application/json',}) };

    let url = this.baseUrl;
    let body = JSON.stringify({firstName : firstName , lastName : lastName , password : password ,phone : phone , email : email});
    return this.http.post<any>(url, body, options);
  }

  removeUser(id:any){
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }
} 
