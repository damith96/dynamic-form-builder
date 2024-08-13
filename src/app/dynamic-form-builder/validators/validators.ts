import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CheckBoxComponent } from '../components/fieldTypes/checkbox/checkbox.component';

export const requiredMinValidator = (form: FormGroup): ValidationErrors | null => {
    let count = 0;
    Object.entries(form.controls).forEach((control) => {
        if ((<FormControl>control[1]).value === true) {
            count++;
        }
    });

    return CheckBoxComponent.minRequired <= count ? null : { checkBoxInvalid: true };
};
