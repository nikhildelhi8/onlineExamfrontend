import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../exam.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private _service: ExamService, private activatedrouter: ActivatedRoute, private _subject: UserServiceService) { }
 name?: string;
  tid: number=0;
  ngOnInit(): void {
    this.tid=this.activatedrouter.snapshot.params["test_id"];
    console.log(this.tid);
    const tid1=this.activatedrouter.snapshot.params["user-id"];
    this._subject.getUserbyId(tid1).subscribe(res=>{console.log(res);
    this.name=res.firstname+" "+res.lastname;
    });

    
  }

}
