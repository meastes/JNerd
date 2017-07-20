import { ControlGroup } from '@angular/common';

/**
 * Validator to check whether the value of all controls matches.
 */
export class MatchingFieldsValidator {
    static matchingFields(group: ControlGroup) {
        let fieldValue;
        let valid = true;
        for (const key in group.controls) {
            if (!fieldValue) {
                fieldValue = group.controls[key].value;
            } else {
                if (fieldValue !== group.controls[key].value) {
                    valid = false;
                    break;
                }
            }
        }

        if (valid) {
            return null;
        }
        return { matchingFields: true };
    }
}
