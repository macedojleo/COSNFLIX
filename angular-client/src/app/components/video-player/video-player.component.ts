import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieListService } from '../../services/movie-list.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoDetail: any;
  @ViewChild('myVideo') myVideo: ElementRef;
  videoSrc = 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4';

  constructor(
    private sanitizier: DomSanitizer,
    private movieListService: MovieListService,
    ) {
   }

  ngOnInit() {
    setTimeout(
      () => {
          this.playVideo();
      }, 3000);
  }

  playVideo() {
    console.log(this.videoSrc);
    console.log(this.videoDetail);
    this.myVideo.nativeElement.src = this.videoDetail;
    this.myVideo.nativeElement.load();
    this.myVideo.nativeElement.play();
  }
}
