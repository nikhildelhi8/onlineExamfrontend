import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HttpClient, HttpClientModule} from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { PortalComponent } from './portal/portal.component';
import { ReportComponent } from './report/report.component';
import { TestListComponent } from './test-list/test-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

import { AdminModifyQuestionsComponent } from './admin-modify-questions/admin-modify-questions.component';
import { UserReportCardComponent } from './user-report-card/user-report-card.component';
import { AdminSearchUsersComponent } from './admin-search-users/admin-search-users.component';



@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    UserHomepageComponent,
    UserNavbarComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserForgotPasswordComponent,
    HomeNavbarComponent,
    AboutusComponent,
    ContactusComponent,
    SubjectsListComponent,
    PortalComponent,
    ReportComponent,
    TestListComponent,
    WelcomeComponent,
    AdminLoginComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    AddQuestionsComponent,
    AdminModifyQuestionsComponent,
    UserReportCardComponent,
    AdminSearchUsersComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
