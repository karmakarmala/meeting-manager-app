import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { MeetingAddComponent } from './meeting-add/meeting-add.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingGetComponent } from './meeting-get/meeting-get.component';
import { MeetingReportComponent } from './meeting-report/meeting-report.component';


const routes: Routes = [
  {
    path:'', 
    component:HomeComponent
  },
  {
    path:'home', 
    component:HomeComponent
  },
  {
    path:'meetings/add', 
    component:MeetingAddComponent
  },
  {
    path:'meetings/edit/:id', 
    component:MeetingEditComponent
  },
  {
    path:'meetings', 
    component:MeetingGetComponent
  },
  {
    path : 'meetings/reports',
    component : MeetingReportComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
