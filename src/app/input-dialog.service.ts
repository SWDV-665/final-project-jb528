import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { WooftimeServiceService } from './wooftime-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(private alertController: AlertController, private dataService: WooftimeServiceService) {
    console.log("Hello Input Dialog Service");
  }
  
  async itemAdd(item?: {name: any}, index?: number) {
    const alert = await this.alertController.create({
      header: item ? 'Please edit item...' : 'Please enter training item...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : '',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: item ? 'Edit' : 'Add',
          handler: (data) => {
            console.log('Save clicked', data);
            if (item) {
              item.name = data.name;
            } else {
              this.dataService.addItem(data);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}