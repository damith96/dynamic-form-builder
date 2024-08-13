import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { FieldService } from '../../services/field.service';

@Component({
    selector: 'field-builder',
    templateUrl: './field-builder.component.html',
})
export class FieldBuilderComponent implements OnInit, OnDestroy {
  @Input() field: any;
  @Input() id:number=0;
  @Input() editor!: JsonEditorComponent;
  @Input() fullFields: any;
  @Input() dropListIds: string[] = [];
  @Input() fullFieldsArray:any[] = [];
  @Input() controlsArray:any;

  public hide = false;
  public subscription!: Subscription;

  constructor(public fieldService: FieldService) {}

  ngOnInit() {
      this.hide = this.field?.hide;
      this.subscription = this.fieldService.visibility.subscribe(result => {
          if (result?.fieldName === this.field?.name) {
              this.hide = result.value;
              this.field.hide = result.value;
              this.editor.set(this.fullFields);
              if (this.hide) {
                  this.controlsArray.get(this.id.toString()).clearValidators();
                  this.controlsArray.get(this.id.toString()).updateValueAndValidity();
              }
          }
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
