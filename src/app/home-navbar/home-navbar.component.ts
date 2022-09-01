import { Component, OnInit } from '@angular/core';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  constructor() { }
  faComputer=faDisplay;

  ngOnInit(): void {
  }

}
