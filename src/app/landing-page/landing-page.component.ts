import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexComponent } from '../custom-Materials/flex/flex.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatToolbarModule,FlexComponent,MatGridListModule,CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private Router :Router){}
  cards:any=[{id:1,icon:'merge',color:'var(--color-light-red)',name:'Merge PDF',describe:'Combine Multiple Pdf and Image into one'},
    {id:2,icon:'content_copy',color:'var(--color-lighter-green)',name:'Split PDF',describe:'Split PDF into multiple files'},
    {id:3,icon:'compress',color:'var(--color-drawer-light)',name:'Compress PDF',describe:'Compress PDF and reduse the size'},
    {id:4,icon:'edit',color:'var(--color-toggle-background)',name:'Edit PDF',describe:'Add text images and edit PDF'},
  ]

  openOptions(id:any){
    switch(id){
      case 1 :
        this.Router.navigate(['/merge'])
      break;  
      case 4 :
        this.Router.navigate(['/edit'])
      break;  
    }

  }
}
