import { Component, ViewChild, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, FormArray } from '@angular/forms';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fieldObjects} from '../../common/constants';
import { FIELDS } from '../../common/enums';

@Component({
    selector: 'dynamic-form-builder',
    templateUrl: './dynamic-form-builder.component.html',
    styleUrls: ['./dynamic-form-builder.component.scss'],
})
export class DynamicFormBuilderComponent implements OnInit, AfterViewInit {
    @ViewChild(JsonEditorComponent) editor!: JsonEditorComponent;

    options = new JsonEditorOptions();
    dropList = ['cardBody'];
    // eslint-disable-next-line max-len
    dragDataList = [FIELDS.TEXT, FIELDS.EMAIL, FIELDS.PASSWORD, FIELDS.URL, FIELDS.TEL, FIELDS.NUMBER, FIELDS.DATE, FIELDS.TEXTAREA, FIELDS.DROPDOWN, FIELDS.CHECKBOXES, FIELDS.RADIO_BUTTONS, FIELDS.FILE, FIELDS.DIVIDER, FIELDS.STEPPER, FIELDS.EXPANSION_PANEL, FIELDS.TAB];
    isDependentEnable = false;
    screenWidth = 0;

    form = this.fb.group({
        fields: new FormControl(''),
        controlsArray: this.fb.array([]),
    });
    editorFields = <any>{
        fields: [],
    };
    formFields = <any>{
        fields: []
    };

    constructor(
        private fb:FormBuilder,
        // private dialogRef: MatDialogRef<DialogDynamicFormBuilderComponent>,
        // @Optional() @Inject(MAT_DIALOG_DATA) public externalData: any
    ) {}

    ngOnInit() {
        this.screenWidth = window.innerWidth;
        this.options.mode = 'code';
        this.options.mainMenuBar = false;
        this.options.statusBar = false;
        this.options.onChange = () => this.onChange();
        //   this.fieldsForForm = this.externalData;
        //   this.fieldsForEditor = this.externalData;
        this.addControls();
    }

    ngAfterViewInit(): void {
        const childElement = document.querySelector('.jsoneditor');
        const parentElement = childElement?.parentElement;

        if(parentElement) parentElement.style.height = '100%';
    }

    onChange() {
        if (this.editor.isValidJson()) {
            this.formFields = this.editor.get();

            this.form = this.fb.group({
                fields: new FormControl(JSON.stringify(this.formFields.fields)),
                controlsArray: this.fb.array([]),
            });

            this.dropList = ['cardBody'];
            this.addControls();
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            moveItemInArray(this.controlsArray.controls, event.previousIndex, event.currentIndex);
            this.editor.set(this.formFields);
        } else {
            this.addFields(fieldObjects[event.item.data as FIELDS]);
        }
    }

    addFields(field:any) {
        this.dropList = ['cardBody'];
        this.formFields.fields.push(JSON.parse(JSON.stringify(field)));
        this.form = this.fb.group({
            fields: new FormControl(JSON.stringify(this.formFields.fields)),
            controlsArray: this.fb.array([]),
        });
        this.editor.set(this.formFields);
        this.addControls();
    }

    addControls() {
        this.formFields.fields.forEach((x:any) => {
            if (x.type === 'checkbox') {
                this.controlsArray.push(this.fb.group({}));
            } else if (x.type === 'stepper') {
                this.controlsArray.push(this.fb.group({}));
            } else if (x.type === 'expansion-panel') {
                this.controlsArray.push(this.fb.group({}));
            } else if (x.type === 'tab') {
                this.controlsArray.push(this.fb.group({}));
            } else {
                this.controlsArray.push(this.fb.control(null));
            }
        });
    }

    closeDialog() {
        //this.dialogRef.close({ isSaved: false });
    }

    saveAndCloseDialog() {
        //this.dialogRef.close({ data: this.fieldsForForm, isSaved: true });
    }

    get controlsArray() {
        return this.form.get('controlsArray') as FormArray;
    }

    @HostListener('window:resize')
    onResize() {
        this.screenWidth = window.innerWidth;
    }
}
