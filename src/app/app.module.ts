import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

// Http rest api call
import { HttpClientModule } from '@angular/common/http';

//Forms 
import { ReactiveFormsModule , FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MeetingAddComponent } from './meeting-add/meeting-add.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingGetComponent } from './meeting-get/meeting-get.component';
import { MeetingReportComponent } from './meeting-report/meeting-report.component';
//Service

import { MeetingService } from './meetings.service';

// Datetime
import {DlDateTimeDateModule, DlDateTimeInputModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';

// Multiselect Dropdown
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MeetingAddComponent,
    MeetingEditComponent,
    MeetingGetComponent,
    MeetingReportComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DlDateTimeDateModule, 
    DlDateTimePickerModule,
    DlDateTimeInputModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [MeetingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
