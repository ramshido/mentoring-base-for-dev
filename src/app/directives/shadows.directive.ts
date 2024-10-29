import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[shadows]',
  standalone: true
})
export class ShadowsDirective {
	@Input('shadows')
	set backgroundColorChangeSetter(value: string) {
		this.defaultColor = (value) ? `3px 3px 10px ${value}` : `3px 3px 10px black`;
		this.shadowColor = '';
	}

	private defaultColor: string = '3px 3px 10px rgba(151, 151, 151, 0.6)';

	@HostBinding('style.boxShadow') shadowColor:string = '';

	@HostListener('mouseenter')
	enter() {
		this.shadowColor = this.defaultColor;
	}

	@HostListener('mouseleave')
	leave() {
		this.shadowColor = '3px 3px 10px rgba(151, 151, 151, 0.6)';
	}
}
