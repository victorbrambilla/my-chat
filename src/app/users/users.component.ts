import { HttpEventType,HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class  UsersComponent implements OnInit {

  user: any= sessionStorage.getItem("name")
  avatar: any= sessionStorage.getItem("avatar")
  
  progress: number 
  newMessage: any={
    name:this.user,
    user: this.avatar,
    message:'',
    
    file:File
  }

  users:any={
    name: this.user,
    avatar: this.avatar
  }

  messageList: any[] = [];
  userlist: any[]=[];
  
  constructor(public userService: UserService ) { }

  ngOnInit(): void {
    this.scroll()
     
    
   
    this.userService.getNewMessage().subscribe((message: string) => {
      this.messageList.splice(0, this.messageList.length)
      this.messageList.push(message);
      this.scroll() 
      
    })

    this.userService.getUsers().subscribe((users:string)=>{
      this.userlist.splice(0, this.userlist.length)
      this.userlist.push(users);
      
    })

    this.userService.sendUser(this.users)
    
   

   
  }


  
  scroll(){
    setTimeout(()=>{
      const ul= document.querySelector('.list-messages')
      ul!.scrollTop=ul!.scrollHeight
    },2000)

  }



  sendMessage() {
    if(this.newMessage.message!=''){
      this.newMessage.date=this.userService.getDateTime(new Date())
      this.userService.sendMessage(this.newMessage);
      this.newMessage.message = '';
      setTimeout(()=>{
        const ul= document.querySelector('.list-messages')
        ul!.scrollTop=ul!.scrollHeight
      },100)
    }
    
    
  }
  
  

  

  onFileSelected(event :any){
    
    this.newMessage.file=event.target.files[0];
    this.userService.postPhoto(this.newMessage).subscribe((event: HttpEvent<any>)=>{
      switch (event.type) {
          
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total! * 100);
          console.log(`Uploaded! ${this.progress}%`);
         
          if(this.progress===100){
            setTimeout(() => {
              this.progress = 0;
              location.reload()
            }, 500);
          }
          break;
          
        
          
          
      }

    }
  )
     
}

}

