import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { FieldService } from '../../../services/field.service';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { FIELDS } from '../../../common/enums';
import { fieldObjects } from '../../../common/constants';

@Component({
    selector: 'tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})

export class TabComponent implements OnInit, OnDestroy {
    @Input() field: any;
    @Input() form: any;
    @Input() id = 0;
    @Input() editor!: JsonEditorComponent;
    @Input() fullFields: any;
    @Input() dropList!: string[];
    @Input() controlsArray: any;
    @Input() fullFieldsArray!:any[];

    activeTab = 0;
    hideButton = true;
    uniqueId = "";
    addedIds: string[] = [];

    constructor(public fieldService: FieldService, private fb: FormBuilder) {
        this.form = new FormGroup({});
    }

    ngOnInit(): void {
        this.uniqueId = uuidv4();
        this.field.tabs.forEach((_: any, index: { toString: () => string; }) => {
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
            const formName = this.uniqueId + this.activeTab.toString();
            const array = this.form.get(formName).controls;
            moveItemInArray(array, event.previousIndex, event.currentIndex);
            this.editor.set(this.fullFields);
        } else {
            this.addFields(fieldObjects[event.item.data as FIELDS]);
        }
    }

    addFields(field: any) {
        this.field.tabs[this.activeTab].fields.push(JSON.parse(JSON.stringify(field)));
        this.form = this.fb.group({});
        this.addControls();
        this.editor.set(this.fullFields);
    }

    addControls() {
        this.field.tabs.forEach((tab: { fields: any[]; }, index: { toString: () => string; }) => {
            const formName = this.uniqueId + index.toString();
            this.form.addControl(formName, this.fb.array([]));
            tab.fields?.forEach((f: any) => {
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

    onSelectionTabChange(event: any) {
        this.activeTab = event.index;
    }

    addTab() {
        this.field.tabs.push({
            label: '',
            fields: [],
        });
        const formName = this.uniqueId + (this.field.tabs.length - 1).toString();
        this.form.addControl(formName, this.fb.array([]));
        this.dropList.unshift(formName);
        this.addedIds.push(formName);
        this.editor.set(this.fullFields);
    }

    removeTab() {
        this.field.tabs.pop();
        const formName = this.uniqueId + (this.field.tabs.length).toString();
        this.form.removeControl(formName);
        this.dropList.splice(this.dropList.indexOf(formName), 1);
        this.addedIds.splice(this.addedIds.indexOf(formName), 1);
        this.editor.set(this.fullFields);
    }
}
