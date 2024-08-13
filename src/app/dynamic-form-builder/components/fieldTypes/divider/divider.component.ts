import { Component, Input } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';

@Component({
    selector: 'divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
})
export class DividerComponent {
    @Input() field:any = {};
    @Input() controlsArray:any;
    @Input() id:number=0;
    @Input() editor!: JsonEditorComponent;
    @Input() fullFields: any = {};
    @Input() fullFieldsArray:any[] = [];

    hideButton = true;

    constructor() {
    }

    onDelete() {
        this.fullFieldsArray.splice(this.id, 1);
        this.editor.set(this.fullFields);
        this.controlsArray.removeAt(this.id);
    }
}
