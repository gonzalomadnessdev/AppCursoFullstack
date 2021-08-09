import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserModel } from 'src/assets/UserModel';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm =  new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('' , Validators.required),
    email : new FormControl('' , Validators.required),
    phone : new FormControl('' , Validators.required)
  })

  user:UserModel;
  id:any;

  constructor(private route:ActivatedRoute , private service:UsersService , private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.loadUser(params.id);
      this.id = params.id
      console.log(this.userForm)
    })
  }

  loadUser(id:any){
    this.service.getUser(id).subscribe(response => {
      this.user = response;
      this.userForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phone: this.user.phone
      })

    })
  }

  onEdit(){
    this.service.editUser(this.id,this.userForm.controls['firstName'].value, this.userForm.controls['lastName'].value,this.userForm.controls['email'].value,this.userForm.controls['phone'].value).subscribe(()=>this.loadUser(this.id));
    this.router.navigate(['/']);
  }

  onDelete(){
    this.service.removeUser(this.id).subscribe(()=>{
      this.router.navigate(['/']);
    })
  }

}
