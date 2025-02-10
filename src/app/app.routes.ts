import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MergePdfComponent } from './options/merge-pdf/merge-pdf.component';
import { EditPdfComponent } from './options/edit-pdf/edit-pdf.component';
export const routes: Routes = [
    {path: '', redirectTo: '/landing', pathMatch: 'full'},
    {path:'landing', component:LandingPageComponent},
    {path:'merge',component:MergePdfComponent},
    {path:'edit',component:EditPdfComponent}
];
