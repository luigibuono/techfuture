import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrlSapi = 'assets/api.json';  // Update to match your file's name
  private apiUrl = 'assets/api.json';      // Update to match your file's name


  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>(this.apiUrlSapi);
  }

  getGNews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
