import { Component } from '@angular/core';
import { WooftimeServiceService } from '../wooftime-service.service';
import { InputDialogService } from '../input-dialog.service';

interface Training {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items: Training[] = [];
  newTrainingName: string = '';
  errorMessage: string = '';
  selectedItemId: number | null = null; // Add this line

  constructor(private dataService: WooftimeServiceService, private inputDialogService: InputDialogService) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems().subscribe({
      next: (items) => (this.items = items),
      error: (error) => (this.errorMessage = error as any),
    });
  }

  addTraining() {
    console.log("Add Training -", this.newTrainingName);
    this.inputDialogService.itemAdd();
  }


  onSelectItemToDelete(training: Training): void {
    if (training.id === undefined || training.id === null) {
      console.error('ID is undefined or null');
      return;
    }

    this.selectedItemId = training.id;

    // Perform the DELETE request using the ID
    this.dataService.removeItem(this.selectedItemId).subscribe(
      (response) => {
        console.log('Item deleted successfully');
        // Remove the deleted item from the items array
        this.items = this.items.filter(item => item.id !== this.selectedItemId);
        this.selectedItemId = null;
      },
      (error) => {
        console.error('Error while deleting the item:', error);
      }
    );
  }

  }

  




