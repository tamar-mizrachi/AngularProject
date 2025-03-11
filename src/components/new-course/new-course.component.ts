import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GetCoursesService } from '../../services/get-course/get-courses.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-course',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.css'
})
export class NewCourseComponent {
  postCourseForm: FormGroup;
  token: string = sessionStorage.getItem("token") ?? "";
isEditMode = false;
  constructor(private fb: FormBuilder, private courseService: GetCoursesService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const courseData = navigation?.extras.state?.['courseData'];
    this.postCourseForm = this.fb.group({
      course: this.fb.group({
        title: [courseData ? courseData.title : '', Validators.required],
        description: [courseData ? courseData.description : '', Validators.required],
        id: [courseData ? courseData.id : null] 
      })
    });
    if (courseData) {
      this.isEditMode = true; 
    }
  }

  onSubmit(): void {
    const storedUserId = localStorage.getItem('userId');
    const userId: string|null=localStorage.getItem('userId')


    console.log(userId);
    console.log(this.postCourseForm.value.course.id);
    
   if(this.isEditMode)
   {
    if (this.postCourseForm.valid) {
      console.log(this.postCourseForm.value);
      this.courseService.putCourse(this.postCourseForm.value.course.title,this.postCourseForm.value.course.description ,userId,this.token,this.postCourseForm.value.course.id ).subscribe({
        next: (data) => {
          console.log("הקורס עודכן בהצלחה")
        console.log(data);
        
        }
        , error: (err) => console.log("no")
      });
    };
   }
    else{
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.courseService.postCourse(this.postCourseForm.value.course.title,this.postCourseForm.value.course.description ,userId,this.token ).subscribe({
          next: (data) => console.log("הקורס נוסף בהצלחה"), error: (err) => console.log("no")
        });
      };
    }
    
  }
}
