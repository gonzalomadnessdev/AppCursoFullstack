import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userForm =  new FormGroup({
    password : new FormControl('' , Validators.required),
    duplicatePassword : new FormControl('' , Validators.required)
  })

  passwordChangedFlag = false;
  hidePasswordFlag = true;

  constructor(private auth : AuthenticationService , private router : Router) { }

  ngOnInit(): void {
    this.passwordChangedFlag = false;
  }

  toggleHidePassword(){
    this.hidePasswordFlag = !this.hidePasswordFlag;
  } 

  onSubmit(){

    if(this.userForm.controls['password'].value == this.userForm.controls['duplicatePassword'].value){
      this.auth.changePassword(this.userForm.controls['password'].value);
      this.passwordChangedFlag = true;
      setTimeout(() => {
        this.router.navigate(['/']);
  
      }, 1000);
    }


  }

}
