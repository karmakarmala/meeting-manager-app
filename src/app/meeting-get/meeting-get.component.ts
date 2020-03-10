import { Component, OnInit } from '@angular/core';
import {MeetingService} from '../meetings.service';
import Meeting from '../meeting';

@Component({
  selector: 'app-meeting-get',
  templateUrl: './meeting-get.component.html',
  styleUrls: ['./meeting-get.component.css']
})
export class MeetingGetComponent implements OnInit {

  meetings: Meeting[];
  constructor(private data: MeetingService) { }

  ngOnInit(){
      this.data
      .getMeetingList()
      .subscribe((data: Meeting[]) => {
        this.meetings = data;
    });
  }

}
