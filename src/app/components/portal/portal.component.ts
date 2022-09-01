import { TemplateBindingParseResult } from '@angular/compiler';
import { Component, OnInit, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, map, Observable } from 'rxjs';
import { ExamService } from '../exam.service';
import { Question } from '../Models/Question';
import { Report } from '../Models/Report';
import { Response } from '../Models/Response';
import { subject } from '../Models/subject';
import { test_List } from '../Models/test_Lists';
import { ReportComponent } from '../report/report.component';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  ques_list: Question []=[];
  test_id:number=1;
  temp: Response={user_Response:'',user_Id:0,question_Id:0,test_Id:0,correct_Wrong:false};
  current_Question:number=0;
  counter: number=3600;
  test_size: number=0;
  test_var:number=1;
  interval: any;
  constructor(private _service: ExamService, private activatedrouter: ActivatedRoute, private _subject: UserServiceService) { }

  tid: number=0;
  captured_subject_id:number=0;
  subjectTitle: subject={subject_Id:0, subject_Name:'',image_Path :''};
  TestDetail: test_List={test_Id:0,test_Level:1,marks:0, subject_Id:0};
  Marks: number=0;
    // final report for the user
  
    name?: string;
    user_ID:number=0;
  //get all the questions of that particular test
  ngOnInit(): void {

    const tid1=this.activatedrouter.snapshot.params["user-id"];
    this._subject.getUserbyId(tid1).subscribe(res=>{console.log(res);
    this.name=res.firstname+" "+res.lastname;
    });
    this.tid=this.activatedrouter.snapshot.params["test_id"];
    this.captured_subject_id=this.activatedrouter.snapshot.params["subject_Id"];
    this.user_ID=this.activatedrouter.snapshot.params["user-id"];

    console.log(this.captured_subject_id);
    
    this._service.getQuestionstestwise(this.tid).subscribe(data=>{
      this.ques_list=data;
      this.test_size=data.length;
      this.startCounter();
      console.log(this.response_map);
    });
    
    this._subject.getSubject(this.captured_subject_id).subscribe(data=>{this.subjectTitle=data;
      console.log(this.subjectTitle);

      this._service.getTestDetails(this.tid).subscribe(data=>{this.TestDetail=data;
        console.log(this.TestDetail);});
    });
    
  }
  // navigate to next question

  onRightClick(): void
    {
    this.current_Question++;
    }

    // navigate to previous question
  onLeftClick(): void
    {
    this.current_Question--;
    }
    // responses=new Array<string>(10);

    
    response_map= new Map<number,string>();
    

    //checking answer with the database
    checkAnswer(index:number,option? : string):boolean
    {
      if(option==this.ques_list[index].correct_Answer)
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    startCounter()
    {
        this.interval=interval(1000).subscribe(val=>{
          this.counter--;
          // if(this.counter==0)
          // {
          //   this.current_Question++;
          //   this.counter=60;
          // }
        });// 1000 milisec

        setTimeout(() => {
          this.interval.unsubscribe();
          
        }, 4000000);// 400 mins
    }

    stopCounter()
    {
      this.interval.unsubscribe();
      this.counter=0;
    }

    resetCounter()
    {
      this.stopCounter();
      this.counter=3600;
    }
    
    // to store all the elements in a array and then do get

 
    GenerateReport()
    {
      var user_report:Report={user_Id: 0, subject_Id: 0, test_Id: 0,total_Score: 0,pass_Fail: "Fail", test_Level:0};
        var i:number = 0;
        while(i<this.response_map.size)
        {
          if(this.checkAnswer(i,this.response_map.get(i)))
          {
            this.Marks+=this.ques_list[i].question_marks;
          }
          i++;
        }

        if(this.Marks>0.65*this.TestDetail.marks)
        {
            user_report.pass_Fail='Pass';
        }
        else
        {
          user_report.pass_Fail='Fail';
        }

        console.log(this.Marks);

        user_report.subject_Id=Number(this.captured_subject_id);
        user_report.test_Id=Number(this.tid);
        user_report.total_Score=this.Marks;
        user_report.user_Id=Number(this.user_ID);
        user_report.test_Level=this.TestDetail.test_Level;
        console.log(user_report);
        this.AddReport(user_report);
    }

  
    
    AddReport(newdata: Report)
    {
      console.log(newdata)
      this._service.postReport(newdata).subscribe(data=>console.log(data));
    }


}
