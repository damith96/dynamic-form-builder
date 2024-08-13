import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Subscription } from 'rxjs';
import { FieldService } from '../../../services/field.service';

@Component({
    selector: 'text-area',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
})
export class TextAreaComponent implements OnInit, OnDestroy {
    @Input() field: any = {};
    @Input() control: FormControl;
    @Input() controlsArray: any;
    @Input() id: number = 0;
    @Input() editor!: JsonEditorComponent;
    @Input() fullFields: any = {};
    @Input() fullFieldsArray: any[] = [];

    hideButton = true;
    private subscription = new Subscription();

    constructor(public fieldService: FieldService) {
        this.control = new FormControl();
    }

    ngOnInit(): void {
        this.addValueAndValidators();
        this.subscription.add(
            this.fieldService.readOnly.subscribe(result => {
                if (result.fieldName === this.field.name) {
                    this.field.readOnly = result.value;
                    this.editor.set(this.fullFields);
                }
            })
        );
        this.subscription.add(
            this.fieldService.required.subscribe(result => {
                if (result.fieldName === this.field.name) {
                    if (result.value) {
                        this.control.addValidators(Validators.required);
                        this.control.updateValueAndValidity();
                    } else {
                        this.control.removeValidators(Validators.required);
                        this.control.updateValueAndValidity();
                    }
                    this.field.validators.required = result.value;
                    this.editor.set(this.fullFields);
                }
            })
        );
        this.subscription.add(
            this.fieldService.valueChange.subscribe(result => {
                if (result.fieldName === this.field.name) {
                    this.control.setValue(result.value);
                    this.field.value = result.value;
                    this.editor.set(this.fullFields);
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    addValueAndValidators() {
        if (this.field.value) {
            this.control.setValue(this.field.value);
        }
        if (this.field.validators?.required) {
            this.control.addValidators(Validators.required);
        }
    }

    onValueChange(value: string) {
        if (this.field.value || this.field.value === '') {
            this.field.value = value;
            this.editor.set(this.fullFields);
        }
    }

    onDelete() {
        this.fullFieldsArray.splice(this.id, 1);
        this.editor.set(this.fullFields);
        this.controlsArray.removeAt(this.id);
    }
}
