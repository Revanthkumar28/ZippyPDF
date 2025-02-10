import { Component } from '@angular/core';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-pdf',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './edit-pdf.component.html',
  styleUrl: './edit-pdf.component.css'
})
export class EditPdfComponent {
  items = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    console.log(this.items)
  }

}
