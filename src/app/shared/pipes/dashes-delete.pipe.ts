import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'dashesDelete',
	pure: true,
	standalone: true
})
export class DashesDeletePipe implements PipeTransform {
	transform(text: string | undefined): string | undefined {
		return text?.split('-').join('');
	}

}