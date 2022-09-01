import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url1="https://localhost:44378/api/";

  constructor(private http: HttpClient) { }

  loginAd(loginInfo: Array<string>){
    return this.http.post(this.url1+"Admin/LoginAdmin",{
      Email:loginInfo[0],
      Password:loginInfo[1],
    },
    {
      responseType:'text'
    },
    );
}
}
