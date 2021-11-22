import {  HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {  Router } from '@angular/router';

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
      
      if(!this.request.name){
        return alert("Preencha seu nome!")
      }
      if(!this.request.email){
        return alert("Preencha seu email!")
      }
      if(!this.request.password){
        return alert("Preencha sua senha!")
      }

      console.log(this.request.file.type)

      if(!this.request.file.type){
        return alert("Escolha uma foto de perfil!")
      }

      this.userService.createLogin(this.request).subscribe((event: HttpEvent<any>)=>{
        switch (event.type) {
          
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total! * 100);
            console.log(`Uploaded! ${this.progress}%`);
            if(this.progress===100){
              this.progress=0
            }
            break;
            
            
          case HttpEventType.Response:
            
            alert("Cadastro criado com sucesso")
            this._route.navigate([''])
            setTimeout(() => {
              this.progress = 0;
            }, 2500);
            
        }
        
      }
      
      )
  }
    
p(){
  this.progress=0
}
  
}

