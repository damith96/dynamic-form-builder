import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { JsonEditorComponent } from 'ang-jsoneditor';
@Component({
    selector: 'form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
  @Input() fields!: any[];
  @Input() editor!: JsonEditorComponent;
  @Input() fullFields: any;
  @Input() dropList!: string[];
  @Input() controlsArray!: FormArray;

  constructor() {}
}
