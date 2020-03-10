import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { INT_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }


  getMeetingList()
  {
    return this.http.get('https://localhost:5000/api/meeting/getmeetings')
  }

  getAttendeeList()
{
  return this.http.get('https://localhost:5000/api/attendee/getattendees')
}

getMeetingReport()
{
  return this.http.get('https://localhost:5000/api/attendee/getmeetingreport')
}
  createMeeting(MeetingSubject, MeetingAgenda, MeetingAttendees,MeetingTime)
  {
    console.log(MeetingSubject, MeetingAgenda, MeetingAttendees,MeetingTime);
    const obj = {
      MeetingSubject,
      MeetingAgenda,
      MeetingAttendees,
      MeetingTime
    };
    return this.http.post('https://localhost:5000/api/meeting/createmeeting',obj)
    .subscribe(res => console.log('Meeting Created'));
  }

  updateMeeting(MeetingSubject, MeetingAgenda, MeetingAttendees,MeetingTime,MeetingID)
  {
    const obj = {
      MeetingSubject,
      MeetingAgenda,
      MeetingAttendees,
      MeetingTime
    };

    console.log(obj);
    return this.http.put('https://localhost:5000/api/meeting/updatemeeting/' + MeetingID,obj)
    .subscribe(res=>console.log("Update complete"));
  }
  
  getMeeting(MeetingID)
  {
    console.log(MeetingID);
    return this.http.get('https://localhost:5000/api/meeting/getmeeting/' + MeetingID)
  }

}
