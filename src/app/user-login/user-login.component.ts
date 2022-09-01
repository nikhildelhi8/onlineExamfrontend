import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { User } from '../Models/User';
import { forgotPassword } from '../Models/forgotpassview';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private loginUse: UserServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  loginForm= new FormGroup
    ({
      Email: new FormControl(),
      Password: new FormControl()
    });


  loginSubmited(){

    
    console.log(this.loginForm.value);
    this.loginUse.loginUser([this.loginForm.value.Email,this.loginForm.value.Password]).subscribe(res =>{
      if(res=='Failure'){
        alert('Login Unsuccessful');
      }else{
        alert('Login successful');
        
        this.loginUse.getUser(this.loginForm.value.Email).subscribe(res=>
          {
            this.router.navigate(['/user-dashboard/'+res.user_Id]);
          });
         
      }
  });
}
forgotpassword= new FormGroup(
  {
    Email: new FormControl()
  });

  
  

  onSubmit(forgotpassword: any)
  {
      this.loginUse.forgotpassUser(forgotpassword.value.Email).subscribe(res=>{
        
        if(res.length>=1)
        {        
          console.log(res);
          this.router.navigate(['forgot-password/'+forgotpassword.value.Email]);
        }
        else
        {         
          alert("not able to found");
        }
        
      });
  }

  flag: boolean=false;

  forgot()
  {
    this.flag=true;
    console.log(this.flag);
  }


}
