import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IAllCoursesResponse } from "../types/allCoursesResponse.interface";
import { ICourseData } from "../types/courseData.interface";
import { ICourseResponse } from "../types/courseResponse.interface";

@Injectable({
  providedIn: 'root'
})
export class PreviewCoursesService {

  constructor(private http: HttpClient) { }
  
  getCourses(response: IAllCoursesResponse): ICourseData[] {
    return response.courses;
  }

  getAllCourses(): Observable<ICourseData[]> {
    const url = environment.apiUrl + environment.previewCourses;

    return this.http
      .get<IAllCoursesResponse>(url, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + environment.token
        })
      })
      .pipe(map(this.getCourses));
  }

  getCourseData(courseId: string): Observable<ICourseResponse> {
    const url = environment.apiUrl + environment.previewCourses + `/${courseId}`;

    return this.http.get<ICourseResponse>(url, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + environment.token
        })
      });
  }
}