import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }


  getPosts(): Observable<JSON[]>{
    return this.http.get<JSON[]>("https://jsonplaceholder.typicode.com/posts")
  }

  getPhotos(): Observable<JSON[]>{
    return this.http.get<JSON[]>("https://jsonplaceholder.typicode.com/photos")
  }

  getPhoto(photoId: string): Observable<any>{
    return this.http.get<any>("https://jsonplaceholder.typicode.com/photos/" + photoId);
  }

  sendPost(body: string): Observable<any>{
    return this.http.post<any>("https://jsonplaceholder.typicode.com/posts", body, httpOptions)
  }
}
