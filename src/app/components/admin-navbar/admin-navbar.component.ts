import { Component, OnInit } from '@angular/core';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor() { }
  faComputer=faDisplay;

  ngOnInit(): void {
  }

}
