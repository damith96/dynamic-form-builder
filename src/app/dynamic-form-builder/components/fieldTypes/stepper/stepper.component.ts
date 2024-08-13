import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldService } from '../../../services/field.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { DEPENDENT_FIELDS, FIELDS } from '../../../common/enums';
// eslint-disable-next-line max-len
import { checkbox, checkboxesDepend, date, dateDepend, divider, drop_down_menuDepend, dropdown, email, emailDepend, expansionPanel, expansion_panelDepend, file, fileDepend, number, numberDepend, password, passwordDepend, radio, radio_buttonsDepend, stepper, stepperDepend, tab, tabDepend, tel, telDepend, text, textArea, textDepend, text_areaDepend, url, urlDepend } from '../../../common/constants';
@Component({
    selector: 'stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {
    @Input() field:any = {};
    @Input() form:any;
    @Input() id:number=0;
    @Input() editor!:JsonEditorComponent;
    @Input() fullFields:any = {};
    @Input() dropListIds: string[] = [];
    @Input() fullFieldsArray:any[] = [];
    @Input() controlsArray:any;

    activeStep = 0;
    isLinear = false;
    hideButton = true;
    uniqueId: string = "";
    addedIds: string[] = [];

    constructor(private fb: FormBuilder, public fieldService:FieldService) {
        this.form = new FormGroup({});
    }

    ngOnInit(): void {
        this.uniqueId = uuidv4();
        this.field.steps.forEach((_: any, index: { toString: () => string; }) => {
            const id = this.uniqueId + index.toString();
            this.dropListIds.unshift(id);
            this.addedIds.push(id);
        });
        this.addControls();
    }

    ngOnDestroy(): void {
        const filteredIds = this.dropListIds.filter(id => !this.addedIds.includes(id));
        this.dropListIds.splice(0, this.dropListIds.length);
        this.dropListIds.push(...filteredIds);
        console.log('Destroyed Stepper');
        console.log(this.dropListIds);
    }

    onDelete() {
        this.fullFieldsArray.splice(this.id, 1);
        this.editor.set(this.fullFields);
        this.controlsArray.removeAt(this.id);
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            const formName = this.uniqueId + this.activeStep.toString();
            const array = this.form.get(formName).get(formName).controls;
            moveItemInArray(array, event.previousIndex, event.currentIndex);
            this.editor.set(this.fullFields);
        } else {
            switch (event.item.data) {
                case FIELDS.TEXT:
                    this.addFields(text);
                    break;
                case DEPENDENT_FIELDS.TEXT_DEPENDENT:
                    this.addFields(textDepend);
                    break;
                case FIELDS.EMAIL:
                    this.addFields(email);
                    break;
                case DEPENDENT_FIELDS.EMAIL_DEPENDENT:
                    this.addFields(emailDepend);
                    break;
                case FIELDS.PASSWORD:
                    this.addFields(password);
                    break;
                case DEPENDENT_FIELDS.PASSWORD_DEPENDENT:
                    this.addFields(passwordDepend);
                    break;
                case FIELDS.URL:
                    this.addFields(url);
                    break;
                case DEPENDENT_FIELDS.URL_DEPENDENT:
                    this.addFields(urlDepend);
                    break;
                case FIELDS.TEL:
                    this.addFields(tel);
                    break;
                case DEPENDENT_FIELDS.TEL_DEPENDENT:
                    this.addFields(telDepend);
                    break;
                case FIELDS.NUMBER:
                    this.addFields(number);
                    break;
                case DEPENDENT_FIELDS.NUMBER_DEPENDENT:
                    this.addFields(numberDepend);
                    break;
                case FIELDS.DATE:
                    this.addFields(date);
                    break;
                case DEPENDENT_FIELDS.DATE_DEPENDENT:
                    this.addFields(dateDepend);
                    break;
                case FIELDS.TEXTAREA:
                    this.addFields(textArea);
                    break;
                case DEPENDENT_FIELDS.TEXTAREA_DEPENDENT:
                    this.addFields(text_areaDepend);
                    break;
                case FIELDS.DROPDOWN:
                    this.addFields(dropdown);
                    break;
                case DEPENDENT_FIELDS.DROPDOWN_DEPENDENT:
                    this.addFields(drop_down_menuDepend);
                    break;
                case FIELDS.CHECKBOXES:
                    this.addFields(checkbox);
                    break;
                case DEPENDENT_FIELDS.CHECKBOXES_DEPENDENT:
                    this.addFields(checkboxesDepend);
                    break;
                case FIELDS.RADIO_BUTTONS:
                    this.addFields(radio);
                    break;
                case DEPENDENT_FIELDS.RADIO_BUTTONS_DEPENDENT:
                    this.addFields(radio_buttonsDepend);
                    break;
                case FIELDS.FILE:
                    this.addFields(file);
                    break;
                case DEPENDENT_FIELDS.FILE_DEPENDENT:
                    this.addFields(fileDepend);
                    break;
                case FIELDS.DIVIDER:
                    this.addFields(divider);
                    break;
                case FIELDS.STEPPER:
                    this.addFields(JSON.parse(JSON.stringify(stepper)));
                    break;
                case DEPENDENT_FIELDS.STEPPER_DEPENDENT:
                    this.addFields(JSON.parse(JSON.stringify(stepperDepend)));
                    break;
                case FIELDS.EXPANSION_PANEL:
                    this.addFields(JSON.parse(JSON.stringify(expansionPanel)));
                    break;
                case DEPENDENT_FIELDS.EXPANSION_PANEL_DEPENDENT:
                    this.addFields(JSON.parse(JSON.stringify(expansion_panelDepend)));
                    break;
                case FIELDS.TAB:
                    this.addFields(JSON.parse(JSON.stringify(tab)));
                    break;
                case DEPENDENT_FIELDS.TAB_DEPENDENT:
                    this.addFields(JSON.parse(JSON.stringify(tabDepend)));
                    break;
            }
            // if (event.item.data === 'text' || event.item.data === 'textDepend') {
            //     this.onTextClick(event.item.data);
            // } else if (event.item.data === 'email' || event.item.data === 'emailDepend') {
            //     this.onEmailClick(event.item.data);
            // } else if (event.item.data === 'password' || event.item.data === 'passwordDepend') {
            //     this.onPasswordClick(event.item.data);
            // } else if (event.item.data === 'url' || event.item.data === 'urlDepend') {
            //     this.onUrlClick(event.item.data);
            // } else if (event.item.data === 'tel' || event.item.data === 'telDepend') {
            //     this.onTelClick(event.item.data);
            // } else if (event.item.data === 'number' || event.item.data === 'numberDepend') {
            //     this.onNumberClick(event.item.data);
            // } else if (event.item.data === 'date' || event.item.data === 'dateDepend') {
            //     this.onDateClick(event.item.data);
            // } else if (event.item.data === 'text area' || event.item.data === 'text areaDepend') {
            //     this.onTextAreaClick(event.item.data);
            // } else if (event.item.data === 'drop-down menu' || event.item.data === 'drop-down menuDepend') {
            //     this.onDropDownClick(event.item.data);
            // } else if (event.item.data === 'checkboxes' || event.item.data === 'checkboxesDepend') {
            //     this.onCheckBoxClick(event.item.data);
            // } else if (event.item.data === 'radio buttons' || event.item.data === 'radio buttonsDepend') {
            //     this.onRadioClick(event.item.data);
            // } else if (event.item.data === 'file' || event.item.data === 'fileDepend') {
            //     this.onFileClick(event.item.data);
            // } else if (event.item.data === 'divider') {
            //     this.onDividerClick();
            // } else if (event.item.data === 'stepper' || event.item.data === 'stepperDepend') {
            //     this.onStepperClick(event.item.data);
            // } else if (event.item.data === 'expansion-panel' || event.item.data === 'expansion-panelDepend') {
            //     this.onExpansionPanelClick(event.item.data);
            // } else if (event.item.data === 'tab' || event.item.data === 'tabDepend') {
            //     this.onTabClick(event.item.data);
            // }
        }
    }

    // Click listeners for fields
    // onTextClick(data:string) {
    //     if (data === 'textDepend') {
    //         this.addFields(this.textDepend);
    //     } else {
    //         this.addFields(this.text);
    //     }
    // }

    // onEmailClick(data:string) {
    //     if (data === 'emailDepend') {
    //         this.addFields(this.emailDepend);
    //     } else {
    //         this.addFields(this.email);
    //     }
    // }

    // onPasswordClick(data:string) {
    //     if (data === 'passwordDepend') {
    //         this.addFields(this.passwordDepend);
    //     } else {
    //         this.addFields(this.password);
    //     }
    // }

    // onUrlClick(data:string) {
    //     if (data === 'urlDepend') {
    //         this.addFields(this.urlDepend);
    //     } else {
    //         this.addFields(this.url);
    //     }
    // }

    // onTelClick(data:string) {
    //     if (data === 'telDepend') {
    //         this.addFields(this.telDepend);
    //     } else {
    //         this.addFields(this.tel);
    //     }
    // }

    // onNumberClick(data:string) {
    //     if (data === 'numberDepend') {
    //         this.addFields(this.numberDepend);
    //     } else {
    //         this.addFields(this.number);
    //     }
    // }

    // onDateClick(data:string) {
    //     if (data === 'dateDepend') {
    //         this.addFields(this.dateDepend);
    //     } else {
    //         this.addFields(this.date);
    //     }
    // }

    // onTextAreaClick(data:string) {
    //     if (data === 'text areaDepend') {
    //         this.addFields(this.text_areaDepend);
    //     } else {
    //         this.addFields(this.textArea);
    //     }
    // }

    // onDropDownClick(data:string) {
    //     if (data === 'drop-down menuDepend') {
    //         this.addFields(this.drop_down_menuDepend);
    //     } else {
    //         this.addFields(this.dropdown);
    //     }
    // }

    // onCheckBoxClick(data:string) {
    //     if (data === 'checkboxesDepend') {
    //         this.addFields(this.checkboxesDepend);
    //     } else {
    //         this.addFields(this.checkbox);
    //     }
    // }

    // onRadioClick(data:string) {
    //     if (data === 'radio buttonsDepend') {
    //         this.addFields(this.radio_buttonsDepend);
    //     } else {
    //         this.addFields(this.radio);
    //     }
    // }

    // onFileClick(data:string) {
    //     if (data === 'fileDepend') {
    //         this.addFields(this.fileDepend);
    //     } else {
    //         this.addFields(this.file);
    //     }
    // }

    // onDividerClick() {
    //     this.addFields(this.divider);
    // }

    // onStepperClick(data:string) {
    //     if (data === 'stepperDepend') {
    //         this.addFields(JSON.parse(JSON.stringify(this.stepperDepend)));
    //     } else {
    //         this.addFields(JSON.parse(JSON.stringify(this.stepper)));
    //     }
    // }

    // onExpansionPanelClick(data:string) {
    //     if (data === 'expansion-panelDepend') {
    //         this.addFields(JSON.parse(JSON.stringify(this.expansion_panelDepend)));
    //     } else {
    //         this.addFields(JSON.parse(JSON.stringify(this.expansionPanel)));
    //     }
    // }

    // onTabClick(data:string) {
    //     if (data === 'tabDepend') {
    //         this.addFields(JSON.parse(JSON.stringify(this.tabDepend)));
    //     } else {
    //         this.addFields(JSON.parse(JSON.stringify(this.tab)));
    //     }
    // }

    addFields(field:any) {
        this.field.steps[this.activeStep].fields.push(field);
        this.form = this.fb.group({});
        // this.field.steps.forEach((step, index) => {
        //     const formName = this.uniqueId + index.toString();
        //     this.form.addControl(formName, new FormGroup({ [formName]: this.fb.array([]) }));
        // });
        this.addControls();
        this.editor.set(this.fullFields);
    }

    addControls() {
        this.field.steps.forEach((step: { fields: any[]; }, index: { toString: () => string; }) => {
            const formName = this.uniqueId + index.toString();
            this.form.addControl(formName, new FormGroup({ [formName]: this.fb.array([]) }));
            step.fields?.forEach((f:any) => {
                if (f.type === 'checkbox') {
                    this.form.get(formName).get(formName).push(this.fb.group({}));
                } else if (f.type === 'stepper') {
                    this.form.get(formName).get(formName).push(this.fb.group({}));
                } else if (f.type === 'expansion-panel') {
                    this.form.get(formName).get(formName).push(this.fb.group({}));
                } else if (f.type === 'tab') {
                    this.form.get(formName).get(formName).push(this.fb.group({}));
                } else {
                    this.form.get(formName).get(formName).push(this.fb.control(null));
                }
            });
        });
    }

    onSelectionChange(event:any) {
        this.activeStep = event.selectedIndex;
    }

    addStep() {
        this.field.steps.push({
            label: '',
            optional: false,
            editable: true,
            fields: [],
        });
        const formName = this.uniqueId + (this.field.steps.length - 1).toString();
        this.form.addControl(formName, new FormGroup({ [formName]: this.fb.array([]) }));
        this.dropListIds.unshift(formName);
        this.addedIds.push(formName);
        this.editor.set(this.fullFields);
    }

    removeStep() {
        if (this.field.steps.length > 2) {
            this.field.steps.pop();
            const formName = this.uniqueId + (this.field.steps.length).toString();
            this.form.removeControl(formName);
            this.dropListIds.splice(this.dropListIds.indexOf(formName), 1);
            this.addedIds.splice(this.addedIds.indexOf(formName), 1);
            this.editor.set(this.fullFields);
        }
    }
}
