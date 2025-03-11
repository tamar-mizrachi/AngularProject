import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/'; // עדכני לפי ה-API שלך

  constructor(private http: HttpClient) {}
  // פונקציה להתחברות משתמש קיים
  Login( email: string, password: string ): Observable<any> {
    const user = { email, password };
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response:any)=>{
        if(response.token){
          sessionStorage.setItem("token",response.token);
          localStorage.setItem('userId',response.userId);
          console.log(sessionStorage.getItem("token"));
          console.log(localStorage.getItem('userId'));
        }
      })
    ); // פנייה ל-API
  }
  // פונקציה להרשמת משתמש חדש
  SignUp( name: string, email: string, password: string, role: string ): Observable<any> {
    const user = { name, email, password, role };
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response:any)=>{
        if(response.token){
          sessionStorage.setItem("token",response.token);
          console.log(sessionStorage.getItem("token"));
        }
      })
    );
  }
}
