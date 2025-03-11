import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // הייבוא של השירות
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  registerForm: FormGroup;
  show = true;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      user: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', Validators.required],
      
      }),
      
    });
  }

  showpassword() {
    this.show = !this.show;
  }

  onSubmit(): void {
    console.log("bla bla")
    localStorage.setItem('role',this.registerForm.value.user.role)
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authService.SignUp(this.registerForm.value.user.name,this.registerForm.value.user.email,this.registerForm.value.user.password,this.registerForm.value.user.role).subscribe({
        next: (data) => console.log("נרשמת בהצלחה"), error: (err) => console.log("no")
      });
    };
  }
}
