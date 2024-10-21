import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function completedValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value?.trim().toLowerCase();
		if (value === 'да' || value === 'нет') return null;
		else return { invalidCompleted: true };
	}
}