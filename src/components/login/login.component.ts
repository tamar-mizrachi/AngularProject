import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { user } from '../../models/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  registerForm:FormGroup;
  show=true;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      user: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
    });
  }
  showpassword(){
    this.show=!this.show;
  }
  onSubmit():void{
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.authService.Login(this.registerForm.value.user.email,this.registerForm.value.user.password).subscribe({
        next:(data)=>{
          console.log("התחברת בהצלחה")
          localStorage.setItem('role',data.role)
        },error:(err)=>console.log("no")
      });
    };
    console.log(sessionStorage.getItem("token"));
  }
}