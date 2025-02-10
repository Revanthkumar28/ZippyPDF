import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [MatToolbarModule,],
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css'
})
export class AppbarComponent {
  constructor(private Router :Router){}
  home(){
    this.Router.navigate(['/landing'])

  }
}
