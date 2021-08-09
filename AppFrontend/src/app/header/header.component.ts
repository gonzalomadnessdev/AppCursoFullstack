import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth : AuthenticationService , private router : Router) { }

  
  test=true;

  ngOnInit(): void {
    
  }

  onLogout(){
    this.auth.clearUser();
    //this.router.navigate(['/']);
    this.reloadComponent();
    this.router.navigate(['/']);
  }

  reloadComponent() {

    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        
    }

  getUser(){
    return this.auth.currentUser.email;
  }

  isLogged(){
    if (this.auth.currentUser['_id']){
      return true;
    } else return false;
  }

}
