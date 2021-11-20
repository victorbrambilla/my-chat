import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseLogin } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  color: ThemePalette = 'accent';

  request:any={
    name:'',
    email:'',
    password: '',
    file: File
  }
  progress: number 
    
  url:string

  
  constructor(private userService: UserService,  private _route: Router) { }

  ngOnInit(): void {
    
  }
 

 

  onFileSelected(event:any){

    this.request.file=event.target.files[0];
    var reader = new FileReader();

    reader.onload = (event:any) => {
     this.url = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  submit(){
    
      if(this.request.name==='' && this.request.email==='' && this.request.password==='' ){
        return alert("Preencha todos seus dados!")
      }

      this.userService.createLogin(this.request).subscribe((event: HttpEvent<any>)=>{
        switch (event.type) {
          
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total! * 100);
            console.log(`Uploaded! ${this.progress}%`);
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
            break;
            
          case HttpEventType.Response:
            
            alert("Cadastro criado com sucesso")
            this._route.navigate([''])
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
  
        }
        
      }
      
      )
  }
    
p(){
  this.progress=0
}
  
}

