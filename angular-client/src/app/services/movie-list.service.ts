import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { IMovie } from '../interface/movieList';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class MovieListService {
  private apiUrl = 'http://localhost:5000/movie';
  private apiVideoUrl = 'http://localhost:5000/';
  // private apiPhpURL = 'http://localhost:6000/movielist.php';

  constructor(private dataService: DataService,
    private http: HttpClient) {
  }


  public getData(): Observable<IMovie[]> {
    return this.dataService.get<IMovie[]>(this.apiUrl);
  }
  public getMovieDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.apiVideoUrl, data, httpOptions);
  }

  // public getMovieListPHP(): Observable<IMovie> {
  //   return this.dataService.get<IMovie>(this.apiPhpURL);
  // }
}




