import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.userService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token){
      // O request é imutavel, ou seja, não é possível mudar nada
      // Faço o clone para conseguir mudar as propriedades
      // Passo o token de autenticação no header
      request = req.clone({
        headers: req.headers.set('token', token)
      });

      
    }

    
    return next.handle(request)
      .pipe(
        finalize(()=>{
          
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro de client-side ou de rede
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Erro retornando pelo backend
      alert(
        error.error.message)
    }
    // retornar um observable com uma mensagem amigavel.
    return throwError('Ocorreu um erro, tente novamente');
  }
}