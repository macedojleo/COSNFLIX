import { Component, ViewChild, AfterViewInit, OnInit, Inject, HostListener } from '@angular/core';
import { MovieGenreRowComponent } from '../../components/movie-genre-row/movie-genre-row.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
