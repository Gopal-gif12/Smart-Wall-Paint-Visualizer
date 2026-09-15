import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VisualizerComponent } from './pages/visualizer/visualizer.component';
import { CompareComponent } from './pages/compare/compare.component';
import { ColorsComponent } from './pages/colors/colors.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'SmartPaint Visualizer | Home' },
  { path: 'visualizer', component: VisualizerComponent, title: 'Visualizer Studio | SmartPaint' },
  { path: 'compare', component: CompareComponent, title: 'Before & After Comparison | SmartPaint' },
  { path: 'colors', component: ColorsComponent, title: 'Color & Pattern Explorer | SmartPaint' },
  { path: 'projects', component: ProjectsComponent, title: 'My Saved Designs | SmartPaint' },
  { path: 'admin', component: AdminComponent, title: 'Admin Analytics & Management | SmartPaint' },
  { path: 'auth', component: AuthComponent, title: 'Sign In / Register | SmartPaint' },
  { path: '**', redirectTo: '' }
];
