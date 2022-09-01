import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private loginAuth: AdminService, private router: Router) { }

  ngOnInit(): void {}
  

  loginForm= new FormGroup
    ({
      Email: new FormControl(""),
      Password: new FormControl()
    });

  loginSubmitted(){
    console.log(this.loginForm.value.Email);
    this.loginAuth.loginAd([this.loginForm.value.Email,this.loginForm.value.Password]).subscribe(res =>{
      if(res=='Failure'){
        alert('Login Unsuccessful');
      }else{
        alert('login Successful');
        this.router.navigate(['/admin-dashboard']);
      }
    });
  }
}
