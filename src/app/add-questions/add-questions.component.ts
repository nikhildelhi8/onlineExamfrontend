import { Component, OnInit } from '@angular/core';
import { writeXLSX } from 'xlsx';
import * as XLSX from 'xlsx';
import { ExamService } from '../exam.service';
import { UserServiceService } from '../user-service.service';
import { subject } from '../Models/subject';
import { Question } from '../Models/Question';
import { Scanned_Question } from '../Models/Scanned_Question';
import { test_List } from '../Models/test_Lists';
import { Router } from '@angular/router';
import { PropertyRead } from '@angular/compiler';
import { faPersonMilitaryToPerson } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
// select subject, select test level and total marks, this will generate a test id, now we have testid and subject id and thus we will add all the questions.
  constructor(private _exam: ExamService, private _userService: UserServiceService, private route: Router) { }
  // data: [][]=new Array();// to store the data of excel
  Index: number[]=[1,2,3];

flag: boolean=false;
  QuestionsfromExcel: Scanned_Question[]=[];// question getting from excel
  subjectList: subject[]=[]
  ngOnInit(): void {

    this._userService.getAllSubjects().subscribe(data=>this.subjectList=data);
  }

  curr_Subject_Id:number=0;
  
  curr_Test_Id:number=0;
  onSubmitTest(addTest: any)
  {
    addTest.subject_Id=Number(addTest.subject_Id);
    addTest.test_Level=Number(addTest.test_Level);
    this._exam.postTest(addTest).subscribe((data)=>{
      // subject_id getting stored here
      this.curr_Subject_Id=data.subject_Id;

      // test_id getting stored here
      this.curr_Test_Id=data.test_Id;
      console.log(this.curr_Subject_Id);
      console.log(this.curr_Test_Id);
      alert("Verified!! Upload the Excel File Now")
    });
  }

  // if any file is added then this function will be called

  onFileChange(event: any)
  {
      const target: DataTransfer=<DataTransfer>(event.target);// give all the files from input control// Data transfer is an interface that is uploading the data
      if(target.files.length!==1) throw new Error("Cannot upload more than 1 file");

      const reader: FileReader= new FileReader();


      reader.onload=(e:any)=>{
          const bstr:string =e.target.result;
          const wb: XLSX.WorkBook=XLSX.read(bstr,{type:'binary'});// wb will have all the sheet names

          const wsname: string =wb.SheetNames[0]; // we are selecting first sheet over here
          const  ws: XLSX.WorkSheet=wb.Sheets[wsname];// ws contains the data of 1st sheet
          console.log(ws);// we will have all the cell values with cell no. in the console but not in proper format
        this.QuestionsfromExcel=(XLSX.utils.sheet_to_json(ws));//this.data=(XLSX.utils.sheet_to_json(ws,{header: 1}));
        console.log(this.QuestionsfromExcel);

      };
      reader.readAsBinaryString(target.files[0]);
    }

    Stored_Question:Question[]=new Array();

    
    //add the data in model array
    scan()
    {
      
      
      var i=0;
     while(i<this.QuestionsfromExcel.length)
     {
      var temp:Question={subject_Id:this.curr_Subject_Id, test_Id: this.curr_Test_Id, question_No:0, question_Statement:'', option_1:'', option_2:'', option_3:'', option_4:'', correct_Answer:'',question_marks:0};
      console.log(this.QuestionsfromExcel[i]);
      temp.question_No=this.QuestionsfromExcel[i].question_No;
      temp.question_Statement=this.QuestionsfromExcel[i].question_Statement;
      temp.option_1=this.QuestionsfromExcel[i].option_1;
      temp.option_2=this.QuestionsfromExcel[i].option_2;
      temp.option_3=this.QuestionsfromExcel[i].option_3;
      temp.option_4=this.QuestionsfromExcel[i].option_4;
      temp.correct_Answer=this.QuestionsfromExcel[i].correct_Answer;
      temp.question_marks=this.QuestionsfromExcel[i].question_marks;
      this.Stored_Question.push(temp);
      i++;
     }
     console.log(this.Stored_Question);
     this.flag=true;
    }

    Upload()
    {
      var i=0;
      while(i<this.Stored_Question.length)
      {
        this._exam.postQuestion(this.Stored_Question[i]).subscribe(res=>{
          console.log(res);
          alert("added Successfully");
          this.route.navigate(["/admin-dashboard"]);
        });
        i++;
      }
    }

    Delete(statement: string)
    {
        this.Stored_Question.forEach((value,index)=>
        {
          if(value.question_Statement==statement)
          {
            this.Stored_Question.splice(index,1);
          }
        });
        
        this.Proper();
    }

    Proper()
    {
      var i=0;
      while(i<this.Stored_Question.length)
      {
        this.Stored_Question[i].question_No=i+1;
        i++;
      }
    }

}
