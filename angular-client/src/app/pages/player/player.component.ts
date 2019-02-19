import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieListService } from '../../services/movie-list.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public movieLink = '';
  constructor(
    private route: ActivatedRoute,
    private movieListService: MovieListService
    ) {
         // tslint:disable-next-line:radix
    const id = parseInt(this.route.snapshot.paramMap.get('name'));
    this.getVideoDetails(id);
    }

  ngOnInit() {
  }

  getVideoDetails(id) {
    const body = JSON.stringify({'movie': '' + id, 'password': '123456'});
    this.movieListService.getMovieDetails(body).subscribe(
      (d) => {
        console.log(d);
        console.log(d[0]['link']);

        this.movieLink = d[0]['link'];
      }
    );
  }
}
