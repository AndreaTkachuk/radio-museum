import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
