import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  chime: MediaObject;

  constructor(private media: Media) {
    this.chime = this.media.create('assets/metalClick.mp4');
  }

  playChime() {
    console.log('playChime');
    this.chime.play();
    console.log('playChime done')
  }
}

