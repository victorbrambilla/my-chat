


export interface ResponseLogin {
    name?:string,
    email: string;
    password: string;
   
}




export interface Message{
    name:string
    user:string,
    message:string,
    date:{
        hour:string,
        msg:string,
    },
    file?:File

}  