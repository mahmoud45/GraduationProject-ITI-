import { AbstractControl } from '@angular/forms';

export function uniqueValueValidator(control: AbstractControl) {
    const formGroup = control.parent;
    if (formGroup) {
      const uniqueValue = control.value;
      const otherControl = formGroup.get('vacationDay1Control'); 
      if (uniqueValue === otherControl?.value) {
        return { notUnique: true };
      }
    }
    return null;
  }