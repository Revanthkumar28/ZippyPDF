import { Component } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { MatButtonModule } from '@angular/material/button';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.mjs';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merge-pdf',
  standalone: true,
  imports: [CommonModule,MatButtonModule,CdkDropList, CdkDrag,MatIconModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './merge-pdf.component.html',
  styleUrls: ['./merge-pdf.component.css']
})
export class MergePdfComponent {
  pdfFiles: { id:number ,name: string, file: File, thumbnail?: string ,rotation:number}[] = [];
  addoptions:any=[{icon:'folder', name:'Local'}]
  zoom_open:boolean=false;
  image:any = '';
  id:number = 0
  onFileSelected(event: Event,type:any) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      if(type == 'new'){
        this.pdfFiles = [];

      }
      Array.from(input.files).forEach(file => {
        if (file.type === "application/pdf") {
          this.pdfFiles.push({id:this.id+1 , name: file.name, file,rotation:0 }); // Store the selected PDF
          this.id++
          this.renderThumbnail(file); // Render thumbnail for each selected PDF
        } else {
          console.error("Invalid file type. Only PDFs are allowed.");
        }
      });
    }
    console.log(this.pdfFiles)
  }
 
  async renderThumbnail(file: File,rotation =0) {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1); // Get the first page
   console.log(page)
    const viewport = page.getViewport({ scale: 2.5,rotation  });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext('2d');
    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      await page.render(renderContext).promise;
      const thumbnail = canvas.toDataURL('image/png');
      const index = this.pdfFiles.findIndex(pdf => pdf.file === file);
      if (index !== -1) {
        this.pdfFiles[index].thumbnail = thumbnail; // Set the thumbnail
        this.pdfFiles[index].rotation = rotation;  // Store rotation angle

      }
    }
    }
  

  async mergePDFs() {
    if (this.pdfFiles.length === 0) {
      console.error("No PDF files selected.");
      return;
    }

    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdf of this.pdfFiles) {
        const arrayBuffer = await pdf.file.arrayBuffer();
        const existingPdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(existingPdf, existingPdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error merging PDFs:", error);
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pdfFiles, event.previousIndex, event.currentIndex);
  }
  openImage(image:any){
    this.zoom_open = true;
    this.image = image;

  }
  deletepdf(id:any){
    this.pdfFiles = this.pdfFiles.filter((pdf:any)=>pdf.id !== id)
  }
  rotateLeft(pdfId: number) {
    const index = this.pdfFiles.findIndex(pdf => pdf.id === pdfId);
    if (index !== -1) {
        // Rotate counterclockwise (Left)
        this.pdfFiles[index].rotation = (this.pdfFiles[index].rotation - 90) % 360;
        this.renderThumbnail(this.pdfFiles[index].file, this.pdfFiles[index].rotation);
    }
}

rotateRight(pdfId: number) {
    const index = this.pdfFiles.findIndex(pdf => pdf.id === pdfId);
    if (index !== -1) {
        // Rotate clockwise (Right)
        this.pdfFiles[index].rotation = (this.pdfFiles[index].rotation + 90) % 360;
        this.renderThumbnail(this.pdfFiles[index].file, this.pdfFiles[index].rotation);
    }
}

}