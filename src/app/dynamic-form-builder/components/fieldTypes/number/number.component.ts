import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Subscription } from 'rxjs';
import { FieldService } from '../../../services/field.service';

@Component({
    selector: 'number',
    templateUrl: './number.component.html',
    styleUrls: ['./number.component.scss'],
})
export class NumberComponent implements OnInit, OnDestroy {
    @Input() field:any = {};
    @Input() control:FormControl;
    @Input() controlsArray:any;
    @Input() id:number=0;
    @Input() editor!: JsonEditorComponent;
    @Input() fullFields: any = {};
    @Input() fullFieldsArray:any[] = [];

    hideButton = true;
    private subscription = new Subscription();

    constructor(public fieldService:FieldService) {
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

    getErrorMessage() {
        if (this.control.hasError('required')) {
            return this.field.errorMessages.required;
        } else if (this.control.value < this.field.validators.minValue) {
            return this.field.errorMessages.minValue;
        } else if (this.control.value > this.field.validators.maxValue) {
            return this.field.errorMessages.maxValue;
        }
    }

    addValueAndValidators() {
        if (this.field.value) {
            this.control.setValue(this.field.value);
        }
        if (this.field.validators) {
            const validators:any[] = [];
            Object.entries(this.field.validators).forEach((entry) => {
                const [key, value] = entry;
                switch (key) {
                    case 'minValue':
                        validators.push(Validators.min(<number>value));
                        break;
                    case 'maxValue':
                        validators.push(Validators.max(<number>value));
                        break;
                    case 'required':
                        if (value) {
                            validators.push(Validators.required);
                        }
                        break;
                }
            });

            this.control.addValidators(validators);
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
