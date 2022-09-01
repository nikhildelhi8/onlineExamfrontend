import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExamService } from '../exam.service';
import { Report } from '../Models/Report';
import { test_List } from '../Models/test_Lists';



@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent {

  tid: number=0;

  tests: test_List[]=[];
  reports: Report[]=[];
  constructor(private _service: ExamService,private activatedrouter: ActivatedRoute, private route:Router) { }
  
  ngOnInit(): void {
    const tid1=Number(this.activatedrouter.snapshot.params["user-id"]);

    console.log(tid1);
    this._service.getReportId(tid1).subscribe((res:Report[])=>{
      this.Mapvalues(res);
    })
    this.tid=this.activatedrouter.snapshot.params["subject_Id"];
    console.log(this.tid);
    this._service.getTests(this.tid).subscribe(data=>{
      this.setvalue(data);
      console.log(this.tests);
    });
  }

  setvalue(temp: test_List[])
  {
    this.tests=temp;
  }
  map=new Map<number,string>()
  Mapvalues(temp: Report[])
  {
    var i= 0;
    console.log(temp.length);
    while(i<temp.length)
    {
      this.map.set(temp[i].test_Id,temp[i].pass_Fail);
      i++;
    }
    console.log(this.map);
  }

  Check(id: number, level: number)
  {

    if(level==1)
    {
      return false;
    }
    else{
      if(this.map.get(level-1)=="Pass")
      {
        return false;
      }
      else
      {
        return true;
      }
    }

  }



  
  Gotodashboard()
  {
    const tid=this.activatedrouter.snapshot.params["user-id"];
    this.route.navigate(["/user-dashboard/"+tid]);
  }


}
