import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navBarScroll: string;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number > 100) {
      this.navBarScroll = 'black';
    } else {
      this.navBarScroll = '';
    }
  }

}
