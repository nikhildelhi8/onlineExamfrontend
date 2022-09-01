import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forgotPassword } from '../Models/forgotpassview';
import { User } from '../Models/User';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})

export class UserForgotPasswordComponent implements OnInit {

  constructor(private _service: UserServiceService, private activatedroute: ActivatedRoute, private route: Router) { 
  
  }
  temp: forgotPassword[]=[];

  tempUser:User[]=[];

  ngOnInit(): void {

    const email= String(this.activatedroute.snapshot.params["user_mail"]);
    this._service.forgotpassUser(email).subscribe(res=>{
      this.temp=res;
      console.log(this.temp);
    });
    

  }
  flag: boolean=false;

  CheckAns= new FormGroup(
  {
    
    response: new FormControl()
  });

  Check()
  {
    if(this.temp[0].security_Answer==this.CheckAns.value.response)
    {

      this.flag=true;
      this._service.getUserbyId(this.temp[0].user_Id).subscribe(res=>{
          this.tempUser[0]=res;
      });
      alert("Please Update your Password");
    }
    else
    {
      alert("Response does not match");
    }
  }
  UpdatePass= new FormGroup(
    {
      Password: new FormControl(),
      Confirm_Password: new FormControl
    });

    update()
    {
    
      this.tempUser[0].password=this.UpdatePass.value.Password;
      this.tempUser[0].confirm_password=this.UpdatePass.value.Confirm_Password;

    
     this._service.updatePassword(this.tempUser[0]).subscribe(res=>{
      alert("Password Updated");

      this.route.navigate(["/login"]);
     });
      
    }

}
