import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { FieldService } from '../../../services/field.service';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { FIELDS } from '../../../common/enums';
import { fieldObjects } from '../../../common/constants';
;
@Component({
    selector: 'expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnInit {
    @Input() field: any;
    @Input() form: any;
    @Input() id = 0;
    @Input() editor!: JsonEditorComponent;
    @Input() fullFields: any;
    @Input() dropList!: string[];
    @Input() controlsArray: any;
    @Input() fullFieldsArray!: any[];

    activePanel = 0;
    hideButton = true;
    uniqueId = "";
    addedIds: string[] = [];

    constructor(public fieldService:FieldService, private fb: FormBuilder) {
        this.form = new FormGroup({});
    }

    ngOnInit(): void {
        this.uniqueId = uuidv4();
        this.field.panels.forEach((_: any, index: { toString: () => string; }) => {
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
            const formName = this.uniqueId + this.activePanel.toString();
            const array = this.form.get(formName).controls;
            moveItemInArray(array, event.previousIndex, event.currentIndex);
            this.editor.set(this.fullFields);
        } else {
            this.addFields(fieldObjects[event.item.data as FIELDS]);
        }
    }

    addFields(field:any) {
        this.field.panels[this.activePanel].fields.push(JSON.parse(JSON.stringify(field)));
        this.form = this.fb.group({});
        this.addControls();
        this.editor.set(this.fullFields);
    }

    addControls() {
        this.field.panels.forEach((panel: { fields: any[]; }, index: { toString: () => string; }) => {
            const formName = this.uniqueId + index.toString();
            this.form.addControl(formName, this.fb.array([]));
            panel.fields?.forEach((f:any) => {
                if (f.type === 'checkbox') {
                    this.form.get(formName).push(this.fb.group({}));
                } else if (f.type === 'stepper') {
                    this.form.get(formName).push(this.fb.group({}));
                } else if (f.type === 'expansion-panel') {
                    this.form.get(formName).push(this.fb.group({}));
                } else if (f.type === 'tab') {
                    this.form.get(formName).push(this.fb.group({}));
                } else {
                    this.form.get(formName).push(this.fb.control(null));
                }
            });
        });
    }

    panelOpened(i:number) {
        this.activePanel = i;
    }
}
