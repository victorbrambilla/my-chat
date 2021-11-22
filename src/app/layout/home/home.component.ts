import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth.guard';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []
})
export class HomeComponent implements OnInit {

    avatar: any= sessionStorage.getItem("avatar")
    user: any= sessionStorage.getItem("name")

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout(){
    this.userService.removeToken()
    location.reload()
  }


}
