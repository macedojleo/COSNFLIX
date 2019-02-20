import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGenreRowComponent } from './movie-genre-row.component';

describe('MovieGenreRowComponent', () => {
  let component: MovieGenreRowComponent;
  let fixture: ComponentFixture<MovieGenreRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieGenreRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieGenreRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
