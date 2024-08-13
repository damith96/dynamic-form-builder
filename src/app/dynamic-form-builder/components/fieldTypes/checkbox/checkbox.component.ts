import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FieldService } from '../../../services/field.service';
import { requiredMinValidator } from '../../../validators/validators';
import { JsonEditorComponent } from 'ang-jsoneditor';

@Component({
    selector: 'checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
})
export class CheckBoxComponent implements OnInit, OnDestroy {
    @Input() field:any = {};
    @Input() form:FormGroup;
    @Input() controlsArray:any;
    @Input() id:number=0;
    @Input() editor!: JsonEditorComponent;
    @Input() fullFields: any = {};
    @Input() fullFieldsArray:any[] = [];

    static minRequired: number;
    selectedOption = 1;
    // checkBoxDetails = <any>{};
    hideButton = true;
    options = ['Required', 'ReadOnly', 'Visibility', 'ValueChange'];

    public subscription = new Subscription();

    constructor(public fieldService: FieldService) {
        this.form = new FormGroup({});
    }

    ngOnInit(): void {
        if (this.field.validators?.minRequired || this.field.validators?.minRequired === 0) {
            CheckBoxComponent.minRequired = this.field.validators?.minRequired;
        }

        this.addControlsAndValidators();

        if (this.field.dependentFields) {
            this.subscription.add(
                this.form.get(this.field.label)?.valueChanges.subscribe((value:boolean) => {
                    this.field.dependentFields.forEach((fieldName:string) => {
                        switch (this.selectedOption) {
                            case 1:
                                this.fieldService.required.next({ value, fieldName });
                                break;
                            case 2:
                                this.fieldService.readOnly.next({ value, fieldName });
                                break;
                            case 3:
                                this.fieldService.visibility.next({ value, fieldName });
                                break;
                            case 4:
                                if (value) {
                                    this.fieldService.valueChange.next({ value: this.field.label, fieldName });
                                } else {
                                    this.fieldService.valueChange.next({ value: '', fieldName });
                                }
                                break;
                        }
                    });
                })
            );
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    addControlsAndValidators() {
        if (this.field.dependentFields) {
            this.form.addControl(this.field.label, new FormControl(false));
        } else {
            this.field?.options?.forEach((opt: any) => {
                this.form.addControl(opt, new FormControl(false));
            });
        }
        if (this.field?.validators?.minRequired && this.field?.validators?.minRequired !== 0) {
            //this.form.addValidators(requiredMinValidator);
            this.form.updateValueAndValidity();
        }
    }

    // onCriteriaChange(event:any, key:string) {
    //     this.checkBoxDetails[key] = event.target.value;
    // }

    onOptionChange(value: number) {
        this.selectedOption = value;
    }

    onDelete() {
        this.fullFieldsArray.splice(this.id, 1);
        this.editor.set(this.fullFields);
        this.controlsArray.removeAt(this.id);
    }
}
