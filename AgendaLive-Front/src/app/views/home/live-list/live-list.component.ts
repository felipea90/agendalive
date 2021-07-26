import { Live } from './../../../shared/model/live.model';
import { LiveService } from './../../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  livePrevious: Live[] = [];
  liveNext: Live[] = [];

  next: boolean = false;
  previous: boolean = false;

  constructor(
    public liveService: LiveService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.GetLives();
  }

  GetLives(){
    this.liveService.GetLivesWithFlag('previous').subscribe(data => {
      this.livePrevious = data.content;
      console.log(this.livePrevious);
      this.livePrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.previous = true;

    });

    this.liveService.GetLivesWithFlag('next').subscribe(data => {
      this.liveNext = data.content;
      console.log(this.liveNext);
      this.liveNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.next = true;

    });
  }

}
