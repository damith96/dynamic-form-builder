import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Subscription } from 'rxjs';
import { FieldService } from '../../../services/field.service';

@Component({
    selector: 'file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit, OnDestroy {
  @Input() field: any;
  @Input() control: FormControl;
  @Input() controlsArray:any;
  @Input() id:number=0;
  @Input() editor!: JsonEditorComponent;
  @Input() fullFields: any = {};
  @Input() fullFieldsArray:any[] = [];

  isHovering = true;
  imagePreview: string = '';
  files: File[] = [];
  fileSize = '';

  hideButton = true;
  private subscription = new Subscription();

  constructor(public fieldService:FieldService, private snackBar: SnackbarService) {
      this.control = new FormControl('');
  }

  ngOnInit(): void {
      this.fileSize = this.bytesToSize(this.field.validators.maxFileSizeInBytes);
      this.subscription = this.fieldService.required.subscribe((result: { fieldName: any; value: any; }) => {
          if (result.fieldName === this.field.name) {
              this.field.validators.required = result.value;
              this.editor.set(this.fullFields);
          }
      });
      if (this.field.validators.required) {
          this.control.addValidators(Validators.required);
      }
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSelect(event: any) {
      if (event.rejectedFiles.length > 0) {
          this.snackBar.open('Maximum file size is exceeded.');
      }

      if (this.files.length < this.field.validators.maxNoOfFiles) {
          this.files.push(...event.addedFiles);
      } else {
          this.snackBar.open('Maximum no of files are exceeded.');
      }

      this.control.patchValue(this.files);
      this.control.updateValueAndValidity();
  }

  onRemove(event: any) {
      this.files.splice(this.files.indexOf(event), 1);
      this.control.patchValue(this.files);
      this.control.updateValueAndValidity();
  }

  bytesToSize(bytes:any) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i:number = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  onDelete() {
      this.fullFieldsArray.splice(this.id, 1);
      this.editor.set(this.fullFields);
      this.controlsArray.removeAt(this.id);
  }
}
