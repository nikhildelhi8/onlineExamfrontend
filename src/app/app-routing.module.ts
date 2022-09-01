import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from 'src/app/aboutus/aboutus.component';
import { ContactusComponent } from 'src/app/contactus/contactus.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminModifyQuestionsComponent } from './admin-modify-questions/admin-modify-questions.component';
import { AdminSearchUsersComponent } from './admin-search-users/admin-search-users.component';
import { PortalComponent } from './portal/portal.component';
import { ReportComponent } from './report/report.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { TestListComponent } from './test-list/test-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserReportCardComponent } from './user-report-card/user-report-card.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {path:"", redirectTo: "homepage", pathMatch: "full"},
  
  {path:"user-dashboard/:user-id", component: UserDashboardComponent},
  {path:"homepage", component: UserHomepageComponent},
  {path:"register",component:UserRegistrationComponent},
  {path:"login", component:UserLoginComponent},
  {path: "forgot-password/:user_mail", component: UserForgotPasswordComponent},
  {path:"user-dashboard/:user-id", component: UserDashboardComponent},
  {path:"user-dashboard/:user-id/subject_list", component: SubjectsListComponent},
  {path:"user-dashboard/:user-id/user-report", component: UserReportCardComponent},
  {path:"user-dashboard/:user-id/subject_list/test_lists/:subject_Id/welcome/:test_id", component:WelcomeComponent},
  {path:"user-dashboard/:user-id/subject_list/test_lists/:subject_Id", component: TestListComponent},
  {path:"user-dashboard/:user-id/subject_list/test_lists/:subject_Id/welcome/:test_id/portal", component: PortalComponent},
  {path:"user-dashboard/:user-id/subject_list/test_lists/:subject_Id/welcome/:test_id/portal/report", component: ReportComponent},

  //admin
  {path:"admin-login",component:AdminLoginComponent},
  { path:"admin-dashboard",component:AdminDashboardComponent},
  {path:"modify",component:AdminModifyQuestionsComponent},
  {path:"add-question", component: AddQuestionsComponent},

  {path:"search",component: AdminSearchUsersComponent},



  // normal static pages

  {path: "contact", component:ContactusComponent},
  {path: "aboutus", component: AboutusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
