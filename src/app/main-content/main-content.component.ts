import { NgIf } from "@angular/common";
import { Component } from "@angular/core";

@Component({
	selector: 'app-main-content-component',
	standalone: true,
	imports: [NgIf],
	templateUrl: './main-content.component.html',
	styleUrl: './main-content.component.scss'
})

export class MainContentComponent {
	isItemHide = true
}