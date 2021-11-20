import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseLogin } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  request: ResponseLogin={
    email:'',
    password: ''
  }

  constructor(private userService: UserService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit(): void {
     
  }

  login(){
    

    this.userService.getLogin(this.request)
    }


  
//end
}

