import { Routes } from '@angular/router';
import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import { GetCoursesComponent } from '../components/get-courses/get-courses.component';
import { NewCourseComponent } from '../components/new-course/new-course.component';
import { GetLessonsComponent } from '../components/get-lessons/get-lessons.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';

export const routes: Routes = [
  { path: 'SignUp', component: SignupComponent },
  { path: 'Login', component: LoginComponent },
  {path: 'GetCourses',component: GetCoursesComponent},
  {path: 'NewCourses',component: NewCourseComponent},
  {path: 'GetLessons',component: GetLessonsComponent},
  {path: 'NewLesson',component: AddLessonComponent},
];


