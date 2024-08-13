import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Subscription } from 'rxjs';
import { FieldService } from '../../../services/field.service';

@Component({
    selector: 'radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit, OnDestroy {
  @Input() field: any = {};
  @Input() control: FormControl;
  @Input() controlsArray: any;
  @Input() id: number=0;
  @Input() editor!: JsonEditorComponent;
  @Input() fullFields: any = {};
  @Input() fullFieldsArray: any[] = [];

  selectedOption = 1;
  hideButton = true;
  options = ['Required', 'ReadOnly', 'Visibility', 'ValueChange'];

  public subscription = new Subscription();

  constructor(public fieldService:FieldService) {
      this.control = new FormControl();
  }

  ngOnInit(): void {
      if (this.field.validators?.required) {
          this.control.addValidators(Validators.required);
      }

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

      if (this.field.dependentFields) {
          this.subscription.add(
              this.control.valueChanges.subscribe(value => {
                  this.field.dependentFields.forEach((fieldName:string) => {
                      switch (this.selectedOption) {
                          case 1:
                              this.fieldService.required.next({ value: true, fieldName });
                              break;
                          case 2:
                              this.fieldService.readOnly.next({ value: true, fieldName });
                              break;
                          case 3:
                              this.fieldService.visibility.next({ value: true, fieldName });
                              break;
                          case 4:
                              this.fieldService.valueChange.next({ value, fieldName });
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

  onOptionChange(value: number) {
      this.selectedOption = value;
  }

  onDelete() {
      this.fullFieldsArray.splice(this.id, 1);
      this.editor.set(this.fullFields);
      this.controlsArray.removeAt(this.id);
  }
}
