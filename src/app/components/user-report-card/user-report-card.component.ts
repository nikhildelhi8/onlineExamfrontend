import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { user_report } from '../Models/userReportView';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-report-card',
  templateUrl: './user-report-card.component.html',
  styleUrls: ['./user-report-card.component.css']
})
export class UserReportCardComponent implements OnInit {

  faTrophy=faTrophy;
  reports:user_report[]=[];
  constructor(private _service : UserServiceService, private activatedroute: ActivatedRoute, private route: Router ){}
    ngOnInit(){
      
      const tid=Number(this.activatedroute.snapshot.params["user-id"]);
  
        this._service.getReportCard(tid)
        .subscribe((data:user_report[])=>{
          this.reports=data;
            console.log(this.reports);
          });
      
    }
    Gotodashboard()
{
  const tid=this.activatedroute.snapshot.params["user-id"];
  this.route.navigate(["/user-dashboard/"+tid]);
}

}
