import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { FieldService } from '../../../services/field.service';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { DEPENDENT_FIELDS, FIELDS } from '../../../common/enums';
// eslint-disable-next-line max-len
import { checkbox, checkboxesDepend, date, dateDepend, divider, drop_down_menuDepend, dropdown, email, emailDepend, expansionPanel, expansion_panelDepend, file, fileDepend, number, numberDepend, password, passwordDepend, radio, radio_buttonsDepend, stepper, stepperDepend, tab, tabDepend, tel, telDepend, text, textArea, textDepend, text_areaDepend, url, urlDepend } from '../../../common/constants';

@Component({
    selector: 'tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})

export class TabComponent implements OnInit, OnDestroy {
  @Input() field: any = {};
  @Input() form: any;
  @Input() id: number = 0;
  @Input() editor!: JsonEditorComponent;
  @Input() fullFields: any = {};
  @Input() dropListIds: string[] = [];
  @Input() controlsArray: any;
  @Input() fullFieldsArray:any[] = [];

  activeTab = 0;
  hideButton = true;
  uniqueId: string = "";
  addedIds: string[] = [];

  constructor(public fieldService: FieldService, private fb: FormBuilder) {
      this.form = new FormGroup({});
  }

  ngOnInit(): void {
      this.uniqueId = uuidv4();
      this.field.tabs.forEach((_: any, index: { toString: () => string; }) => {
          const id = this.uniqueId + index.toString();
          this.dropListIds.unshift(id);
          this.addedIds.push(id);
      });
      this.addControls();
  }

  ngOnDestroy(): void {
      const filteredIds = this.dropListIds.filter(id => !this.addedIds.includes(id));
      this.dropListIds.splice(0, this.dropListIds.length);
      this.dropListIds.push(...filteredIds);
  }

  onDelete() {
      this.fullFieldsArray.splice(this.id, 1);
      this.editor.set(this.fullFields);
      this.controlsArray.removeAt(this.id);
  }

  drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
          const formName = this.uniqueId + this.activeTab.toString();
          const array = this.form.get(formName).controls;
          moveItemInArray(array, event.previousIndex, event.currentIndex);
          this.editor.set(this.fullFields);
      } else {
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

  addFields(field: any) {
      this.field.tabs[this.activeTab].fields.push(field);
      this.form = this.fb.group({});
      this.addControls();
      this.editor.set(this.fullFields);
  }

  addControls() {
      this.field.tabs.forEach((tab: { fields: any[]; }, index: { toString: () => string; }) => {
          const formName = this.uniqueId + index.toString();
          this.form.addControl(formName, this.fb.array([]));
          tab.fields?.forEach((f: any) => {
              if (f.type === 'checkbox') {
                  this.form.get(formName).push(this.fb.group({}));
              } else if (f.type === 'stepper') {
                  this.form.get(formName).push(this.fb.group({}));
              } else if (f.type === 'expansion-panel') {
                  this.form.get(formName).push(this.fb.group({}));
              } else if (f.type === 'tab') {
                  this.form.get(formName).push(this.fb.group({}));
              } else {
                  this.form.get(formName).push(this.fb.control(null));
              }
          });
      });
  }

  onSelectionTabChange(event: any) {
      this.activeTab = event.index;
  }

  addTab() {
      this.field.tabs.push({
          label: '',
          fields: [],
      });
      const formName = this.uniqueId + (this.field.tabs.length - 1).toString();
      this.form.addControl(formName, this.fb.array([]));
      this.dropListIds.unshift(formName);
      this.addedIds.push(formName);
      this.editor.set(this.fullFields);
  }

  removeTab() {
      this.field.tabs.pop();
      const formName = this.uniqueId + (this.field.tabs.length).toString();
      this.form.removeControl(formName);
      this.dropListIds.splice(this.dropListIds.indexOf(formName), 1);
      this.addedIds.splice(this.addedIds.indexOf(formName), 1);
      this.editor.set(this.fullFields);
  }
}
