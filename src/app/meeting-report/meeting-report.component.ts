import { Component, OnInit } from '@angular/core';
import {MeetingService} from '../meetings.service';

@Component({
  selector: 'app-meeting-report',
  templateUrl: './meeting-report.component.html',
  styleUrls: ['./meeting-report.component.css']
})
export class MeetingReportComponent implements OnInit {
 reports: any
  constructor(private ms : MeetingService) { }

  ngOnInit(){
    this.ms.getMeetingReport()
    .subscribe(data => {
      this.reports = data;
  });
}

}
