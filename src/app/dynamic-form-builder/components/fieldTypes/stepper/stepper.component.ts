import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldService } from '../../../services/field.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { FIELDS } from '../../../common/enums';
import { fieldObjects } from '../../../common/constants';

@Component({
    selector: 'stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {
    @Input() field: any;
    @Input() form: any;
    @Input() id = 0;
    @Input() editor!: JsonEditorComponent;
    @Input() fullFields: any;
    @Input() dropList!: string[];
    @Input() fullFieldsArray!: any[];
    @Input() controlsArray: any;

    activeStep = 0;
    isLinear = false;
    hideButton = true;
    uniqueId = "";
    addedIds: string[] = [];

    constructor(private fb: FormBuilder, public fieldService:FieldService) {
        this.form = new FormGroup({});
    }

    ngOnInit(): void {
        this.uniqueId = uuidv4();
        this.field.steps.forEach((_: any, index: { toString: () => string; }) => {
            const id = this.uniqueId + index.toString();
            this.dropList.unshift(id);
            this.addedIds.push(id);
        });
        this.addControls();
    }

    ngOnDestroy(): void {
        const filteredIds = this.dropList.filter(id => !this.addedIds.includes(id));
        this.dropList.splice(0, this.dropList.length);
        this.dropList.push(...filteredIds);
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
            this.addFields(fieldObjects[event.item.data as FIELDS]);
        }
    }

    addFields(field:any) {
        this.field.steps[this.activeStep].fields.push(JSON.parse(JSON.stringify(field)));
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
        this.dropList.unshift(formName);
        this.addedIds.push(formName);
        this.editor.set(this.fullFields);
    }

    removeStep() {
        if (this.field.steps.length > 2) {
            this.field.steps.pop();
            const formName = this.uniqueId + (this.field.steps.length).toString();
            this.form.removeControl(formName);
            this.dropList.splice(this.dropList.indexOf(formName), 1);
            this.addedIds.splice(this.addedIds.indexOf(formName), 1);
            this.editor.set(this.fullFields);
        }
    }
}
