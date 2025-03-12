import { Component } from '@angular/core';
import { GetCoursesService } from '../../services/get-course/get-courses.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { course } from '../../models/course';
import { user } from '../../models/user';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-get-courses',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatDividerModule],
  templateUrl: './get-courses.component.html',
  styleUrl: './get-courses.component.css'
})
export class GetCoursesComponent {
  courses: course[] = [];
  token: string | any = sessionStorage.getItem('token');
  role: string | any = localStorage.getItem('role');
  constructor(private courseService: GetCoursesService, private htttp: HttpClient, private router: Router) { }
  delete(id: number | undefined) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.htttp.delete(`http://localhost:3000/api/courses/${id}`, { headers }).subscribe((response) => {
      console.log('Course deleted successfully', response);
      this.courses = this.courses.filter((course) => course.id !== id);
    }, (error) => {
      console.error('Error deleting course', error);
    }
    );
  }
  editCourse(course: any) {
    this.router.navigate(['/NewCourses'], { state: { courseData: course } });
  }
  showLesson(course: any) {
    this.router.navigate(['/GetLessons'], { state: { courseData: course } });
  }
  ngOnInit() {
    this.courseService.getAllCourses(this.token).subscribe((data) => {
      this.courses = data;
    }, (error) => {
      console.error('Error fetching courses', error);
    });
  }
  AddPerson(c: course) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const userId: string | null = localStorage.getItem('userId');
    this.htttp.post<user>(`http://localhost:3000/api/courses/${c.id}/enroll`, { userId }, { headers }).subscribe((response) => {
      console.log('User added successfully', response);
    }, (error) => {
      console.error('Error adding user', error);
      alert('You are already enrolled in this course');
    });
  }
  deletePerson(c: course) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const userId: string | null = localStorage.getItem('userId');
    this.htttp.delete<user>(`http://localhost:3000/api/courses/${c.id}/enroll`, { headers, body: { userId } }).subscribe((response) => {
      console.log('User deleted successfully', response);
    }, (error) => {
      console.error('Error deleting user', error);
      alert('You are not enrolled in this course');
    });
  }
}
