import { Component, OnInit, Input } from '@angular/core';
import { MovieListService } from '../../services/movie-list.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { IMovie } from '../../interface/movieList';


@Component({
  selector: 'app-movie-genre-row',
  templateUrl: './movie-genre-row.component.html',
  styleUrls: ['./movie-genre-row.component.scss']
})
export class MovieGenreRowComponent implements OnInit {
  @Input() message: string;
  movieList = [];

  constructor(
    private movieListService: MovieListService,
    private route: Router,
    ) {}

  ngOnInit() {
    this.movieListService.getData()
        .subscribe((data) => {
          this.movieList = data;
        });
  }

  onSelect(movie) {
    this.route.navigate(['/watch', movie.id]);
  }
}
