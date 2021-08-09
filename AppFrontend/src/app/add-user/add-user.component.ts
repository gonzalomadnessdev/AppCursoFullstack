import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserModel } from 'src/assets/UserModel';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  userForm =  new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('' , Validators.required),
    email : new FormControl('' , Validators.required),
    phone : new FormControl('' , Validators.required),
    password : new FormControl('' , Validators.required)
  })

  user:UserModel;
  hidePasswordFlag = true;

  greetingsFlag= false ;

  constructor(private route:ActivatedRoute , private router:Router, private service:UsersService) { }

  ngOnInit(): void {
    this.greetingsFlag = false;
  }

  toggleHidePassword(){
    this.hidePasswordFlag = !this.hidePasswordFlag;
  }

  onSubmit(){
    this.service.saveUser(this.userForm.controls['firstName'].value, this.userForm.controls['lastName'].value,this.userForm.controls['email'].value,this.userForm.controls['phone'].value,this.userForm.controls['password'].value).subscribe(
      ()=>{

        this.greetingsFlag=true;
        setTimeout(() => {
          this.router.navigate(['/']);

        }, 1000);
        

      });
   
    
  }

}
