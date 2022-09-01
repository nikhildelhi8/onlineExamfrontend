import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchUser } from '../Models/SearchUser';
import { subject } from '../Models/subject';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-admin-search-users',
  templateUrl: './admin-search-users.component.html',
  styleUrls: ['./admin-search-users.component.css']
})
export class AdminSearchUsersComponent implements OnInit {

  constructor(private _service: UserServiceService) { }

  subjects: subject[]=[];
  
  flag:boolean=false;
  ngOnInit(): void {
    this._service.getAllSubjects().subscribe((res:subject[])=>// getting the list of subjects for dropdown
      {
        this.subjects=res;
        console.log(res);
      });
  }

//--------------------------------------------Search by Subject----------------------------------------------------------//

// Subject form
  SearchbySubject= new FormGroup({
    subject_id: new FormControl()
  });

  // search_list_subject: SearchUser[]=[];
  search_list: SearchUser[]=[];

// search the view with sibjec id
  onSubmitSubject(){

    this._service.getUserBySubject(Number(this.SearchbySubject.value.subject_id)).subscribe((res)=>
    {
      console.log(res);
      this.setValueSubject(res);
      this.flag=true;

    });
  }

  // since alocatting inside the ngonit gives null therefore added a function to set value
  setValueSubject(temp: SearchUser[])
  {
    console.log(temp);
    this.search_list=temp;
    console.log(this.search_list);
    
  }

  //--------------------------------------------Search by State----------------------------------------------------------//

  // State form
  SearchbyState= new FormGroup({
    state: new FormControl()
  });

  // search_list_state: SearchUser[]=[];

  
  // search the view with state
  onSubmitState(){

    this._service.getUserBystate(this.SearchbyState.value.state).subscribe((res)=>
    {
      console.log(res);
      this.setValueState(res);
      this.flag=true;

    });
  }
  // since alocatting inside the ngonit gives null therefore added a function to set value
  setValueState(temp: SearchUser[])
  {
    console.log(temp);
    this.search_list=temp;
    console.log(this.search_list);
  }

  //-----------------------------------------------Search by Test Level-------------------------------------------------------//

  // TestLevel form
  SearchbyLevel= new FormGroup({
    Level: new FormControl()
  });

  // search_list_level: SearchUser[]=[];
  // search the view with level
  onSubmitLevel(){

    this._service.getUserByLevel(this.SearchbyLevel.value.Level).subscribe((res)=>
    {
      console.log(res);
      this.setValueLevel(res);
      this.flag=true;

    });
  }
  // since alocatting inside the ngonit gives null therefore added a function to set value
  setValueLevel(temp: SearchUser[])
  {
    console.log(temp);
    this.search_list=temp;
    console.log(this.search_list);
  }

//-----------------------------------------------Search by marks range-------------------------------------------------------//

// State form
SearchbyMarks= new FormGroup({
  lower: new FormControl(),
  upper:new FormControl()
});

// search_list_Marks: SearchUser[]=[];
  // search the view with marks
  onSubmitMarks(){

    this._service.getUserByMarks(this.SearchbyMarks.value.lower,this.SearchbyMarks.value.upper).subscribe((res)=>
    {
      console.log(res);
      this.setValueMarks(res);
      this.flag=true;
    });
  }
  // since alocatting inside the ngonit gives null therefore added a function to set value
  setValueMarks(temp: SearchUser[])
  {
    console.log(temp);
    this.search_list=temp;
    console.log(this.search_list);
  }

  closeTable()
  {
    this.flag=false;
  }
}
