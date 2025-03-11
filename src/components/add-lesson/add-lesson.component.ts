import { GetCoursesService } from '../../services/get-course/get-courses.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  courseData: any;
  postLessonForm: FormGroup;
  token: string = sessionStorage.getItem("token") ?? "";
  isEditMode = false;
  lessonData: any;
  constructor(private fb: FormBuilder, private courseService: GetCoursesService, private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.courseData = navigation?.extras.state?.['courseData'];
    this.lessonData = navigation?.extras.state?.['lesson'];
    if (this.lessonData)
      this.isEditMode = true
    console.log('נתונים שהתקבלו מהניווט', this.courseData);
    this.postLessonForm = this.fb.group({
      lesson: this.fb.group({
        title: [this.lessonData ? this.lessonData.title : '', Validators.required],
        content: [this.lessonData ? this.lessonData.content : '', Validators.required],
      })
    });
  }

  onSubmit() {
    console.log("onsubmit yes")
    if (this.isEditMode) {
      this.courseService.putLesson(
        this.postLessonForm.value.lesson.title,
        this.postLessonForm.value.lesson.content,
        this.courseData.id,
        this.token,
        this.lessonData.id
      ).subscribe({
        next: (data) => {
          console.log("השיעור עודכן בהצלחה");
          console.log(data);
        },
        error: (err) => console.log("אירעה שגיאה בעדכון השיעור:", err)
      });
    }
    else {
      if (this.postLessonForm && this.postLessonForm.valid) {
        console.log(this.postLessonForm.value);
        this.courseService.postLesson(this.postLessonForm.value.lesson.title, this.postLessonForm.value.lesson.content, this.courseData.id, this.token).subscribe({
          next: (data) => console.log("הקורס נוסף בהצלחה"), error: (err) => console.log("no")
        });
      };
    }
  }
}
