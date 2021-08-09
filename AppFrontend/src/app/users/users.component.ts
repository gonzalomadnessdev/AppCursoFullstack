import { Component, OnInit , Input} from '@angular/core';
import { UserModel } from 'src/assets/UserModel';
import { UsersService } from '../users.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  @Input() token = '';


  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  phone = new FormControl(''); 

  users:Array<UserModel> =  [];

  constructor(private service : UsersService ) {
    
  }
  
  ngOnInit(): void {
   this.loadUsers();
  }

  loadUsers() {
    
   this.service.getUsers().subscribe(response => {this.users = response});
  }

  onSearch(){
    this.service.getUsers(this.firstName.value,this.lastName.value,this.email.value,this.phone.value).subscribe(response => {this.users = response});
    this.firstName.setValue("");
    this.lastName.setValue("");
    this.email.setValue("");
    this.phone.setValue("");
  }
}