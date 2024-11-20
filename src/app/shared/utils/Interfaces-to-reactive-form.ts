import { FormControl, FormGroup } from "@angular/forms";

export type FormControls<T> = {
	[K in keyof T]: T[K] extends object
	? FormGroup<FormControls<T[K]>>
	: FormControl<T[K]>;
};