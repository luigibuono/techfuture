import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
=======
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

>>>>>>> 58de0d18de0ed33f02ffc7b8635f7c580812dc70

@Injectable({
  providedIn: 'root'
})
export class NewsService {
<<<<<<< HEAD
  private apiUrlSapi = 'assets/api.json';  // Update to match your file's name
  private apiUrl = 'assets/api.json';      // Update to match your file's name
  
=======

  private apiUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2024-03-23&sortBy=publishedAt&apiKey=b759c4e7e9e448fcb92dbcd4bad66e53';
>>>>>>> 58de0d18de0ed33f02ffc7b8635f7c580812dc70

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
<<<<<<< HEAD
    return this.http.get<any>(this.apiUrlSapi);
  }

  getGNews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
=======
    return this.http.get<any>(this.apiUrl);
  }

}

>>>>>>> 58de0d18de0ed33f02ffc7b8635f7c580812dc70
