import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  dogName: string;
  dogAge: number;
  dogBreed: string;

  constructor() {
    // Add your own logic here to fetch these details
    this.dogName = 'Enter Name';
    this.dogAge = 0;
    this.dogBreed = 'Enter Breed';
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture instanceof HTMLImageElement && image.webPath) {
      profilePicture.src = image.webPath as string;
    }
  }

  async selectPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture instanceof HTMLImageElement && image.webPath) {
      profilePicture.src = image.webPath as string;
    }
  }





}

