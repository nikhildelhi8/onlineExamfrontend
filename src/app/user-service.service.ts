import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './Models/User';


@Injectable({
  providedIn: 'root'
}) 

export class UserServiceService {

  url1="https://localhost:44378/api/subject";
  url2="https://localhost:44378/api/user";
  url3="https://localhost:44378/api/userlogin/";
  url4="https://localhost:44378/api/forgot_Password/";
  url5="https://localhost:44378/api/userreport";
  url6="https://localhost:44378/api/securityquestion";
  url7="https://localhost:44378/api/searchuser/";
  url8="https://localhost:44378/api/searchquestion/"
  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };
  constructor(private http : HttpClient) { }

  //------------------------Subjects---------------------------
  //get all subjects
  getAllSubjects(): Observable<any>
  {
       return this.http.get<any>(this.url1);
  }

  // get subject by ID
  getSubject(id: number): Observable<any>

  {
    return this.http.get<any>(`${this.url1}/${id}`);
  }

  //--------------------------User------------------------------
  // post user data after registration
  postUser(newUser: User): Observable<User>
  {
    return this.http.post<User>(this.url2,newUser);
  }

  //get user with mail, used in login form// searching the db with the mail and reverting back with the whole info
  getUser(mail: string): Observable<any>
  {
    return this.http.get<any>(`${this.url2}/${mail}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  // checking the availabilty of the entered email in the db
  loginUser(loginInfo:Array<string>){
    return this.http.post(this.url3+"UserLogin",
    {
      Email:loginInfo[0],
      Password:loginInfo[1],
    },
    {responseType:"text"},
    );
  }

  // get user by userid
  getUserbyId(id: any): Observable<any>
  {
  return this.http.get<any>(`${this.url2}/GetUser/${id}`);
  }
  // updating pass after forgot password
  updatePassword(data: any)
  {
    return this.http.put<any>(`${this.url2}/${data.user_Id}`,data);
  }


  //-----------------Forgot Password View-------------------
  // forgot pass view
  // geting user detail from the view iwth email
  forgotpassUser(mail: string): Observable<any>
  {
    return this.http.get<any>(`${this.url4}${mail}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  

// getting user report from user report view
  getReportCard(id: number)
  {
    return this.http.get<any>(`${this.url5}/${id}`);
  }


  handleError(error:HttpErrorResponse){

    let errorMessage="";

    errorMessage=error.status +'\n'+error.statusText+'\n'+"Email not found";

    alert(errorMessage);

    return throwError(errorMessage);
  }
  

  // getiing security question from the security questions table
  getSecurityQuestions()
  {
    return this.http.get<any>(this.url6);
  }

//-----------------User Search View-------------------
  
// Search Services for The Admin


// searching data by subject id

  getUserBySubject(id: number): Observable<any>
  {
      return this.http.get<any>(`${this.url7}getbysubject/${id}`);
  }

  // searching data by level
  getUserByLevel(level: number): Observable<any>
  {
    return this.http.get<any>(`${this.url7}getbylevel/${level}`);
  }
  // searching data by state

  getUserBystate(state: string): Observable<any>
  {
    return this.http.get<any>(`${this.url7}getbystate/${state}`);
  }
// searching data by mina and max marks
  getUserByMarks(lower: number, upper: number): Observable<any>
  {
    return this.http.get<any>(`${this.url7}getbymarks/${lower}/${upper}`);
  }

  //-----------------Questions View for modify------------------
  
  getQuestionsView(id:number, level:number):Observable<any>
  {
    return this.http.get<any>(`${this.url8}${id}/${level}`)
  }
}
