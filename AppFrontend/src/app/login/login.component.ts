import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserModel } from 'src/assets/UserModel';
import { AuthenticationService } from '../authentication.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm =  new FormGroup({
    email : new FormControl('' , Validators.required),
    password : new FormControl('' , Validators.required)
  })

  user:UserModel;
  hidePasswordFlag = true;
  token="";

  constructor(private auth :AuthenticationService) { }

  ngOnInit(): void {
  }

  toggleHidePassword(){
    this.hidePasswordFlag = !this.hidePasswordFlag;
  }

  onLogin(){
    this.auth.loginUser(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value);
    
  }

  


}
