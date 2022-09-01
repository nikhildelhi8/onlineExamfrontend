import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  url1:string ="https://localhost:44378/api/test";
  url2:string ="https://localhost:44378/api/question";
  url4:string="https://localhost:44378/api/report";

  constructor(private http: HttpClient) 
  {

   }
//-----------------Tests------------------
   postTest(newTest: any):Observable<any>
   {
      return this.http.post<any>(this.url1,newTest);
   }
   getTests(subjectId: number):Observable<any>
   {
    return this.http.get<any>(`${this.url1}/${subjectId}`);
   }
   getTestDetails(testId: number):Observable<any>
   {
    return this.http.get<any>(`${this.url1}/tid/${testId}`);
   }

   //-----------------Questions-------------------

   getQuestionstestwise(id:number):Observable<any>
   {
    return this.http.get<any>(`${this.url2}/${id}`);
   }
   postQuestion(newdata:any): Observable<any>
  {
    return this.http.post<any>(this.url2,newdata);
  }

  updateQuestion(id:number,newdata: any): Observable<any>
  {
    return this.http.put<any>(`${this.url2}/${id}`,newdata);
  }
  DeleteQuestion(id:number): Observable<any>
  {
    return this.http.delete<any>(`${this.url2}/${id}`);
  }

   //-----------------Reports-------------------
   getReport(user_id: number,test_id: number):Observable<any>
  {
    return this.http.get<any>(`${this.url4}/${user_id}/${test_id}`);
  }

  postReport(newdata: any):Observable<any>
  {
    return this.http.post<any>(this.url4,newdata);
  }
  getReportId(id: number):Observable<any>
  {
    return this.http.get<any>(`${this.url4}/getbyid/${id}`)
  }
}
