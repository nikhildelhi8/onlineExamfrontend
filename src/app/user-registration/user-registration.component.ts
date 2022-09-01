import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Security_Question } from '../Models/SecurityQ';
import { User } from '../Models/User';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private _userService: UserServiceService, private route: Router) { }

  questions: Security_Question[]=[]

  ngOnInit(): void {
    this._userService.getSecurityQuestions().subscribe((res:Security_Question[])=>{
      this.questions=res;
      console.log(this.questions);
    });
  }

  onSubmit(registerationForm: any)
  { 
    registerationForm.security_Id=Number(registerationForm.security_Id);
    console.log(registerationForm);
    this._userService.postUser(registerationForm).subscribe(data=>{console.log(data)
   
   alert("Succesfully Registered");

      this.route.navigate(["/login"]);
    });
  }
}
