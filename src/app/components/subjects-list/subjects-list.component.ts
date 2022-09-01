import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subject } from '../Models/subject';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent implements OnInit {


  subjects:subject[]=[];
  constructor(private _service: UserServiceService, private activatedrouter: ActivatedRoute, private route: Router){}
    
  
  ngOnInit(){
      
        this._service.getAllSubjects()
        .subscribe((data:subject[])=>{
          this.subjects=data;
            console.log(this.subjects);
          });
  }

  Gotodashboard()
  {
    const tid=this.activatedrouter.snapshot.params["user-id"];
    this.route.navigate(["/user-dashboard/"+tid]);
  }

}
