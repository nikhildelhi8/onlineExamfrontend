import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { ExamService } from '../exam.service';
import { SearchQuestions } from '../Models/SearchQuestion';
import { subject } from '../Models/subject';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-admin-modify-questions',
  templateUrl: './admin-modify-questions.component.html',
  styleUrls: ['./admin-modify-questions.component.css']
})
export class AdminModifyQuestionsComponent implements OnInit {

  Index:number[]=[1,2,3];
  constructor(private _service: UserServiceService, private _exam: ExamService) { }

  subjectList: subject[]=[];
  questions: SearchQuestions[]=[];
  ngOnInit(): void {
    this._service.getAllSubjects().subscribe(data=>this.subjectList=data);
  }

  flag:boolean=false;
  onSubmit(addTest: any)
  {
    addTest.subject_Id=Number(addTest.subject_Id);
    addTest.test_Level=Number(addTest.test_Level);
    this._service.getQuestionsView(addTest.subject_Id,addTest.test_Level).subscribe((data)=>{
      if(data.length>0)
      {
        this.SetValue(data);
        this.flag=true;
      }
      else
      {
        alert("Records not found. Try Again");
      }
    });
  }
  SetValue(temp: SearchQuestions[])
  {
    this.questions=temp;
  }

  closeTable()
  {
    this.flag=false;
  }

  onDelete(id: number)
  {
    this._exam.DeleteQuestion(id).subscribe(data=>{
      console.log(data);
    });

  }

}
