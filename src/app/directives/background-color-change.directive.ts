import { Directive, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
	selector: '[background-color-change]',
	standalone: true
})
export class BackgroundColorChangeDirective {
	@Input('background-color-change')
	set backgroundColorChangeSetter(value: string) {
		this.defaultColor = value;
		this.color = '';
	}

	private defaultColor: string = '';

	@HostBinding('style.backgroundColor') color:string = '';

	@HostListener('mouseenter')
	enter() {
		this.color = this.defaultColor;
	}

	@HostListener('mouseleave')
	leave() {
		this.color = '#f0ba4e';
	}
}