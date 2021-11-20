import {HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {  ResponseLogin } from './user.model';
import { ActivatedRoute, Router } from '@angular/router';

import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private url = "http://3.144.187.146:3000"

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  public user$: BehaviorSubject<string> = new BehaviorSubject('');
  public userD$: BehaviorSubject<string> = new BehaviorSubject('');
  public userC$: BehaviorSubject<string> = new BehaviorSubject('');


  constructor(private http: HttpClient, private route: ActivatedRoute, private _route: Router) { }


  socket = io(this.url);

    public sendMessage(message:any) {
      this.socket.emit('message', message);
    }

    public getNewMessage = () => {
      this.socket.on('message', (message) =>{
        this.message$.next(message);
      });
      
      return this.message$.asObservable();
    };


    public sendUser(user:any) {
      this.socket.emit('join', user);
      
    }

    public getUsers= ()=>{
      this.socket.on('join', (users)=>{
        this.user$.next(users);
        
      })
      return  this.user$.asObservable();
    }

    
    
 


  //login

  public getLogin(request: ResponseLogin){
    return this.http.post(`${this.url}/login`, request).subscribe(data=>{
      var token = JSON.parse(JSON.stringify(data)).token
      
      var name = JSON.parse(JSON.stringify(data)).userName
      var avatar = this.url+'/'+JSON.parse(JSON.stringify(data)).avatar
      localStorage.setItem("token", token)
      localStorage.setItem("name", name)
      localStorage.setItem("avatar", avatar)
      this._route.navigate(['/users'])
    })
  }
  
  public createLogin(request: any): Observable<any>{
    const formData = new FormData();
    formData.append("avatar", request.file)
    formData.append("name", request.name)
    formData.append("email", request.email)
    formData.append("password", request.password)

    return this.http.post<any>(`${this.url}/users`, formData, {
      reportProgress: true,
      observe: 'events'
  })}

  public postPhoto(message: any){
    const formData = new FormData();
    formData.append("name", message.name)
    formData.append("user", message.user)
    formData.append("message", message.message)
    formData.append("foto", message.file)
    return this.http.post<any>(`${this.url}/photo`, formData)
    
  }
  

  public getAuthorizationToken() {
    const token = localStorage.getItem("token");
    return token;
  }

  
  public removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
  }

  
  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } 

    return true;
  }

  getDateTime(date: any) {
    let today = new Date()
    let currentDay = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();

    date = new Date(date)
    let userDay = date.getDate();
    let userMonth = date.getMonth() + 1;
    let userYear = date.getFullYear();

    let dayMessage

    if (userDay == currentDay && userMonth == currentMonth && userYear == currentYear) {
      dayMessage = 'hoje'
    } else if (userDay == currentDay - 1 && userMonth == currentMonth && userYear == currentYear) {
      dayMessage = 'ontem'
    } else {
      dayMessage = `${userDay}/${userMonth}/${userYear}`
    }

    let time = {
      hour: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      msg: dayMessage
    }

    return time
  }

}
