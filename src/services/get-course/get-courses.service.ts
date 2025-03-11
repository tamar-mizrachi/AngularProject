import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { course } from '../../models/course';
import { lesson } from '../../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
  getAllLessons(token: string, id: number): Observable<lesson[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
   // http://localhost:3000/api/courses/:courseId/lessons 
    return this.http.get<lesson[]>(`${this.apiUrl}/${id}/lessons`, { headers });
  }
  postCourse(title:string,description:string,teacherId:string|null,token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    const course={title,description,teacherId}
    console.log(course);
    return this.http.post<course>(`${this.apiUrl}`,course,{headers})
  }
  putCourse(title:string,description:string,teacherId:string|null,token:string,id:number):Observable<any>{
     const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`
     });
     const course={title,description,teacherId}
     return this.http.put<course>(`${this.apiUrl}/${id}`,course,{headers})
  }
  postLesson(title: string, content: string, courseId: string | null, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
  
    const lesson = { title, content, courseId };
    console.log("Creating lesson:", lesson);
  
    // ודא שהכתובת נכונה
    return this.http.post<lesson>(`${this.apiUrl}/${courseId}/lessons`, lesson, { headers });
  }
  putLesson(title: string, content: string, courseId: number, token: string, lessonId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    
    const lesson = { title, content, courseId };
    return this.http.put<lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers });
  }
}
