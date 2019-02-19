import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieGenreRowComponent } from './components/movie-genre-row/movie-genre-row.component';
import { PlayerComponent } from './pages/player/player.component';
import { ModalMovieDetailsComponent } from './components/modal-movie-details/modal-movie-details.component';

import { MovieListService } from './services/movie-list.service';
import { UtilityService } from './services/utility.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    MovieGenreRowComponent,
    PlayerComponent,
    ModalMovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    MovieListService,
    DataService,
    UtilityService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
