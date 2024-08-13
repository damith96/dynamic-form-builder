import { Component, ViewChild, OnInit, Inject, Optional, HostListener, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, FormArray } from '@angular/forms';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// eslint-disable-next-line max-len
import { checkbox, checkboxesDepend, date, dateDepend, divider, drop_down_menuDepend, dropdown, email, emailDepend, expansionPanel, expansion_panelDepend, file, fileDepend, number, numberDepend, password, passwordDepend, radio, radio_buttonsDepend, stepper, stepperDepend, tab, tabDepend, tel, telDepend, text, textArea, textDepend, text_areaDepend, url, urlDepend } from '../../common/constants';
import { DEPENDENT_FIELDS, FIELDS } from '../../common/enums';

@Component({
    selector: 'dynamic-form-builder',
    templateUrl: './dynamic-form-builder.component.html',
    styleUrls: ['./dynamic-form-builder.component.scss'],
})
export class DynamicFormBuilderComponent implements OnInit, AfterViewInit {
  @ViewChild(JsonEditorComponent) editor!: JsonEditorComponent;

  options = new JsonEditorOptions();
  dropLists = ['cardBody'];
  // eslint-disable-next-line max-len
  dragData = [FIELDS.TEXT, FIELDS.EMAIL, FIELDS.PASSWORD, FIELDS.URL, FIELDS.TEL, FIELDS.NUMBER, FIELDS.DATE, FIELDS.TEXTAREA, FIELDS.DROPDOWN, FIELDS.CHECKBOXES, FIELDS.RADIO_BUTTONS, FIELDS.FILE, FIELDS.DIVIDER, FIELDS.STEPPER, FIELDS.EXPANSION_PANEL, FIELDS.TAB];
  isDependentEnable = false;
  screenWidth: number = 0;

  public form = this.fb.group({
      fields: new FormControl(''),
      controlsArray: this.fb.array([]),
  });

  public fieldsForEditor = <any>{
      fields: [],
  };

  public fieldsForForm = <any>{
      fields: [],
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
          this.fieldsForForm = this.editor.get();

          this.form = this.fb.group({
              fields: new FormControl(JSON.stringify(this.fieldsForForm.fields)),
              controlsArray: this.fb.array([]),
          });

          this.dropLists = ['cardBody'];
          this.addControls();
      }
  }

  drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
          moveItemInArray(this.controlsArray.controls, event.previousIndex, event.currentIndex);
          this.editor.set(this.fieldsForForm);
      } else {
          // switchTroughItems(event.item.data, this.addFields);
          switch (event.item.data) {
              case FIELDS.TEXT:
                  this.addFields(text);
                  break;
              case DEPENDENT_FIELDS.TEXT_DEPENDENT:
                  this.addFields(textDepend);
                  break;
              case FIELDS.EMAIL:
                  this.addFields(email);
                  break;
              case DEPENDENT_FIELDS.EMAIL_DEPENDENT:
                  this.addFields(emailDepend);
                  break;
              case FIELDS.PASSWORD:
                  this.addFields(password);
                  break;
              case DEPENDENT_FIELDS.PASSWORD_DEPENDENT:
                  this.addFields(passwordDepend);
                  break;
              case FIELDS.URL:
                  this.addFields(url);
                  break;
              case DEPENDENT_FIELDS.URL_DEPENDENT:
                  this.addFields(urlDepend);
                  break;
              case FIELDS.TEL:
                  this.addFields(tel);
                  break;
              case DEPENDENT_FIELDS.TEL_DEPENDENT:
                  this.addFields(telDepend);
                  break;
              case FIELDS.NUMBER:
                  this.addFields(number);
                  break;
              case DEPENDENT_FIELDS.NUMBER_DEPENDENT:
                  this.addFields(numberDepend);
                  break;
              case FIELDS.DATE:
                  this.addFields(date);
                  break;
              case DEPENDENT_FIELDS.DATE_DEPENDENT:
                  this.addFields(dateDepend);
                  break;
              case FIELDS.TEXTAREA:
                  this.addFields(textArea);
                  break;
              case DEPENDENT_FIELDS.TEXTAREA_DEPENDENT:
                  this.addFields(text_areaDepend);
                  break;
              case FIELDS.DROPDOWN:
                  this.addFields(dropdown);
                  break;
              case DEPENDENT_FIELDS.DROPDOWN_DEPENDENT:
                  this.addFields(drop_down_menuDepend);
                  break;
              case FIELDS.CHECKBOXES:
                  this.addFields(checkbox);
                  break;
              case DEPENDENT_FIELDS.CHECKBOXES_DEPENDENT:
                  this.addFields(checkboxesDepend);
                  break;
              case FIELDS.RADIO_BUTTONS:
                  this.addFields(radio);
                  break;
              case DEPENDENT_FIELDS.RADIO_BUTTONS_DEPENDENT:
                  this.addFields(radio_buttonsDepend);
                  break;
              case FIELDS.FILE:
                  this.addFields(file);
                  break;
              case DEPENDENT_FIELDS.FILE_DEPENDENT:
                  this.addFields(fileDepend);
                  break;
              case FIELDS.DIVIDER:
                  this.addFields(divider);
                  break;
              case FIELDS.STEPPER:
                  this.addFields(JSON.parse(JSON.stringify(stepper)));
                  break;
              case DEPENDENT_FIELDS.STEPPER_DEPENDENT:
                  this.addFields(JSON.parse(JSON.stringify(stepperDepend)));
                  break;
              case FIELDS.EXPANSION_PANEL:
                  this.addFields(JSON.parse(JSON.stringify(expansionPanel)));
                  break;
              case DEPENDENT_FIELDS.EXPANSION_PANEL_DEPENDENT:
                  this.addFields(JSON.parse(JSON.stringify(expansion_panelDepend)));
                  break;
              case FIELDS.TAB:
                  this.addFields(JSON.parse(JSON.stringify(tab)));
                  break;
              case DEPENDENT_FIELDS.TAB_DEPENDENT:
                  this.addFields(JSON.parse(JSON.stringify(tabDepend)));
                  break;
          }
      }
  }

  addFields(field:any) {
      this.dropLists = ['cardBody'];
      this.fieldsForForm.fields.push(field);
      this.form = this.fb.group({
          fields: new FormControl(JSON.stringify(this.fieldsForForm.fields)),
          controlsArray: this.fb.array([]),
      });
      this.editor.set(this.fieldsForForm);
      this.addControls();
  }

  addControls() {
      this.fieldsForForm.fields.forEach((x:any) => {
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

  get controlsArray() {
      return this.form.get('controlsArray') as FormArray;
  }

  closeDialog() {
      //this.dialogRef.close({ isSaved: false });
  }

  saveAndCloseDialog() {
      //this.dialogRef.close({ data: this.fieldsForForm, isSaved: true });
  }

  @HostListener('window:resize')
  onResize() {
      this.screenWidth = window.innerWidth;
  }
}
