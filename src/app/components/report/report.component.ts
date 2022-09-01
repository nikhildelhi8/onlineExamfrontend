import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../exam.service';
import { Report } from '../Models/Report';
import { subject } from '../Models/subject';
import { test_List } from '../Models/test_Lists';
import { User } from '../Models/User';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  sub_ID: number=0;
  subjectTitle: subject={subject_Id:0, subject_Name:'',image_Path :''};
  TestDetail: test_List={test_Id:0,test_Level:1,marks:0, subject_Id:0};
 
  userReport: Report={report_Id:0, subject_Id:0, test_Id: 0, total_Score: 0, test_Level:0,user_Id:0,pass_Fail:''};
  test_ID: number=0;
  user_ID: number=0;

  user:User={user_Id: 0,
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    city: '',
    dob: '',
    state: '',
    qualification: '',
    year_of_completion: '',
    password: '',
    confirm_password: '',
  security_Id:0,
security_Answer:''};
  constructor(private _exam: ExamService, private _userService: UserServiceService, private activatedrouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub_ID=this.activatedrouter.snapshot.params["subject_Id"];
    this.test_ID=this.activatedrouter.snapshot.params["test_id"];
    this.user_ID=this.activatedrouter.snapshot.params["user-id"];

    this._exam.getTestDetails(this.test_ID).subscribe(data=>this.setValueTest(data));
    this._userService.getUserbyId(this.user_ID).subscribe(data=>this.setValueUser(data));

    this._userService.getSubject(this.sub_ID).subscribe(data=>this.setValueSubject(data));

    this._exam.getReport(this.user_ID,this.test_ID).subscribe(data=>this.setValueReport(data));
    
  }

  setValueSubject(temp: any)
  {
    this.subjectTitle=temp;
  }
  setValueReport(temp: any)
  {
    this.userReport=temp;
  }
  setValueUser(temp: any)
  {
    this.user=temp;
  }
  setValueTest(temp: any)
  {
    this.TestDetail=temp;
  }
  

}
