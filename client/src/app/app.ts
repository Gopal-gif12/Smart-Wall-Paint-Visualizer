import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TutorialModalComponent } from './components/tutorial/tutorial-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, TutorialModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showTutorial = false;
}
