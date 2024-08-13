import { FormControl } from '@angular/forms';
// eslint-disable-next-line max-len
import { checkbox, checkboxesDepend, date, dateDepend, divider, drop_down_menuDepend, dropdown, email, emailDepend, expansionPanel, expansion_panelDepend, file, fileDepend, number, numberDepend, password, passwordDepend, radio, radio_buttonsDepend, stepper, stepperDepend, tab, tabDepend, tel, telDepend, text, textArea, textDepend, text_areaDepend, url, urlDepend } from './constants';
import { DEPENDENT_FIELDS, FIELDS } from './enums';

export function switchTroughItems(itemData: string, addFields: (field: any)=> void) {
    switch (itemData) {
        case FIELDS.TEXT:
            addFields(text);
            break;
        case DEPENDENT_FIELDS.TEXT_DEPENDENT:
            addFields(textDepend);
            break;
        case FIELDS.EMAIL:
            addFields(email);
            break;
        case DEPENDENT_FIELDS.EMAIL_DEPENDENT:
            addFields(this.emailDepend);
            break;
        case FIELDS.PASSWORD:
            addFields(this.password);
            break;
        case DEPENDENT_FIELDS.PASSWORD_DEPENDENT:
            addFields(this.passwordDepend);
            break;
        case FIELDS.URL:
            addFields(this.url);
            break;
        case DEPENDENT_FIELDS.URL_DEPENDENT:
            addFields(this.urlDepend);
            break;
        case FIELDS.TEL:
            addFields(this.tel);
            break;
        case DEPENDENT_FIELDS.TEL_DEPENDENT:
            addFields(this.telDepend);
            break;
        case FIELDS.NUMBER:
            addFields(this.number);
            break;
        case DEPENDENT_FIELDS.NUMBER_DEPENDENT:
            addFields(this.numberDepend);
            break;
        case FIELDS.DATE:
            addFields(this.date);
            break;
        case DEPENDENT_FIELDS.DATE_DEPENDENT:
            addFields(this.dateDepend);
            break;
        case FIELDS.TEXTAREA:
            addFields(this.textArea);
            break;
        case DEPENDENT_FIELDS.TEXTAREA_DEPENDENT:
            addFields(this.text_areaDepend);
            break;
        case FIELDS.DROPDOWN:
            addFields(this.dropdown);
            break;
        case DEPENDENT_FIELDS.DROPDOWN_DEPENDENT:
            addFields(this.drop_down_menuDepend);
            break;
        case FIELDS.CHECKBOXES:
            addFields(this.checkbox);
            break;
        case DEPENDENT_FIELDS.CHECKBOXES_DEPENDENT:
            addFields(this.checkboxesDepend);
            break;
        case FIELDS.RADIO_BUTTONS:
            addFields(this.radio);
            break;
        case DEPENDENT_FIELDS.RADIO_BUTTONS_DEPENDENT:
            addFields(this.radio_buttonsDepend);
            break;
        case FIELDS.FILE:
            addFields(this.file);
            break;
        case DEPENDENT_FIELDS.FILE_DEPENDENT:
            addFields(this.fileDepend);
            break;
        case FIELDS.DIVIDER:
            addFields(this.divider);
            break;
        case FIELDS.STEPPER:
            addFields(JSON.parse(JSON.stringify(this.stepper)));
            break;
        case DEPENDENT_FIELDS.STEPPER_DEPENDENT:
            addFields(JSON.parse(JSON.stringify(this.stepperDepend)));
            break;
        case FIELDS.EXPANSION_PANEL:
            addFields(JSON.parse(JSON.stringify(this.expansionPanel)));
            break;
        case DEPENDENT_FIELDS.EXPANSION_PANEL_DEPENDENT:
            addFields(JSON.parse(JSON.stringify(this.expansion_panelDepend)));
            break;
        case FIELDS.TAB:
            addFields(JSON.parse(JSON.stringify(this.tab)));
            break;
        case DEPENDENT_FIELDS.TAB_DEPENDENT:
            addFields(JSON.parse(JSON.stringify(this.tabDepend)));
            break;
    }
}
