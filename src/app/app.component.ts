import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterOutlet } from '@angular/router';
import { AppbarComponent } from './appbar/appbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule,RouterOutlet,AppbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zippyPDF';
}
