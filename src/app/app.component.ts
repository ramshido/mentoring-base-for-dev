import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterLink, 
		NgFor, 
		NgIf,
		DatePipe
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	public readonly title = 'mentoring-first-project';
	public headerItems = ['Главная', 'Компания'];
	public isAboutUs = true;
	public today: number = Date.now();
}
