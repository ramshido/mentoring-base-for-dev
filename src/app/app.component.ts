import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BackgroundColorChangeDirective } from './directives/background-color-change.directive';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgFor,
    NgIf,
    DatePipe,
    BackgroundColorChangeDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly userService = inject(UserService);
  public readonly title = 'mentoring-first-project';
  public headerItems = ['Главная', 'Компания'];
  public isAboutUs = true;
  public today: number = Date.now();
}
