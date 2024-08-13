import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { MatTooltipModule } from '@angular/material/tooltip';

// components
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FieldBuilderComponent } from './components/field-builder/field-builder.component';
import { TextBoxComponent } from './components/fieldTypes/textbox/textbox.component';
import { DropDownComponent } from './components/fieldTypes/dropdown/dropdown.component';
import { FileComponent } from './components/fieldTypes/file/file.component';
import { CheckBoxComponent } from './components/fieldTypes/checkbox/checkbox.component';
import { RadioComponent } from './components/fieldTypes/radio/radio.component';
import { NumberComponent } from './components/fieldTypes/number/number.component';
import { EmailComponent } from './components/fieldTypes/email/email.component';
import { TextAreaComponent } from './components/fieldTypes/textarea/textarea.component';
import { DateComponent } from './components/fieldTypes/date/date.component';
import { DividerComponent } from './components/fieldTypes/divider/divider.component';
import { ExpansionPanelComponent } from './components/fieldTypes/expansion-panel/expansion-panel.component';
import { StepperComponent } from './components/fieldTypes/stepper/stepper.component';
import { PasswordComponent } from './components/fieldTypes/password/password.component';
import { UrlComponent } from './components/fieldTypes/url/url.component';
import { TabComponent } from './components/fieldTypes/tab/tab.component';
import { TelComponent } from './components/fieldTypes/tel/tel.component';
import { DynamicFormBuilderComponent } from './components/dynamic-form-builder/dynamic-form-builder.component';

import { FieldService } from './services/field.service';

const materialModules = [
    DragDropModule,
    NgxDropzoneModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgJsonEditorModule,
        ...materialModules,
    ],
    declarations: [
        FormBuilderComponent,
        FieldBuilderComponent,
        TextBoxComponent,
        DropDownComponent,
        CheckBoxComponent,
        FileComponent,
        RadioComponent,
        NumberComponent,
        EmailComponent,
        TextAreaComponent,
        DateComponent,
        DividerComponent,
        ExpansionPanelComponent,
        StepperComponent,
        PasswordComponent,
        UrlComponent,
        TabComponent,
        TelComponent,
        DynamicFormBuilderComponent,
    ],
    exports: [DynamicFormBuilderComponent],
    providers: [{ provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } }, FieldService],
})
export class DynamicFormBuilderModule { }
