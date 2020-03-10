import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../meetings.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DateButton } from 'angular-bootstrap-datetimepicker';
import * as _moment from 'moment';
import { unitOfTime } from 'moment';

let moment = _moment;

if ('default' in _moment) {
  moment = _moment['default'];
}

declare var $: any;

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.css']
})
export class MeetingEditComponent implements OnInit, AfterViewInit {
  angForm: FormGroup;
  meeting: any = {};
  MeetingID: number;
  dropdownList = [];
  selectedItems = [];
  attendeeName = [];
  dropdownSettings = {};
  attendeeList: [];
  attendeeString: string;
  disablePastDates = true;
  enteredDate: Date;
  private _isPickerOpen = false;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private ms: MeetingService,
    private fb: FormBuilder,
    private _elementRef: ElementRef) {


  }

  ngOnInit() {

    // Get meeting details to edit
    this.route.params.subscribe(params => {
      this.ms.getMeeting(params.id).subscribe(res => {
        this.MeetingID = params.id;
        this.meeting = res;

    // Get all Meeting attendees and bind to the dropdown
        let tmp = [];
        this.ms.getAttendeeList().subscribe((data: any) => {
          this.attendeeList = data;
          for (let i = 0; i < this.attendeeList.length; i++) {
            tmp.push({ id: this.attendeeList[i], name: this.attendeeList[i] });
          }
          this.dropdownList = tmp;

    // Bind the selected attendees from the meeting.Attendees
          this.attendeeName = this.meeting.meetingAttendees.split(",", 10);
          var i: number;
          for (i = 0; i < this.attendeeName.length; i++) {
            console.log("Name", this.attendeeName[i]);
            this.selectedItems.push({ id: this.attendeeName[i], name: this.attendeeName[i] });
            this.angForm.patchValue({ MeetingAttendees: this.selectedItems });
          }
        });

       this.enteredDate= new Date (this.meeting.meetingTime);
        // Drop down settings
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 5,
          allowSearchFilter: true,
          limitSelection: 10
        };

      });
    });
    // Create the form
    this.createForm();

  }

  createForm() {
    this.angForm = this.fb.group({
      MeetingSubject: ['', [Validators.required, Validators.maxLength(50)]],
      MeetingAgenda: ['', Validators.required],
      MeetingAttendees: [this.selectedItems, Validators.required],
      MeetingTime: ['', Validators.required]
    });
  }
  
  // Method to update the meeting details
  updateMeeting(MeetingSubject, MeetingAgenda) {
    this.route.params.subscribe(params => {
      var updatedAttendees = this.selectedItems.map(o => o.name).join(",");
      var updateDate= this.enteredDate.toUTCString();
      this.ms.updateMeeting(MeetingSubject, MeetingAgenda, updatedAttendees, updateDate, params.id);
      this.router.navigateByUrl('meetings');
    });
  }

  onItemSelect($item) {
    this.selectedItems.push({ id: $item.id, name: $item.name });
  }

  onItemDeselect($item) {
    console.log($item.name);
    this.selectedItems.forEach((item, index) => {
      if (item.name === $item.name)
        this.selectedItems.splice(index, 1);
    });
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  ngAfterViewInit(): void {
    const dropdownToggle = $('[data-toggle="dropdown"]', this._elementRef.nativeElement);
    dropdownToggle.parent().on('show.bs.dropdown', () => {
      this._isPickerOpen = true;
    });
    dropdownToggle.parent().on('hide.bs.dropdown', () => {
      this._isPickerOpen = false;
    });
  }

  dateInputFilter = (value: (number | null)) => {
    return this.disablePastDates
      ? value >= moment().valueOf()
      : true;
  }

  datePickerFilter = (dateButton: DateButton, viewName: string) => {
    return this.disablePastDates
      ? dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf()
      : true;
  }

  keepDropDownOpen(event: Event) {
    event.stopPropagation();
  }

  dateSelected(event) {
    if (this._isPickerOpen && event.value) {
      console.log(event.value);
      this.enteredDate= new Date (event.value);
      $('.date-dropdown').dropdown('toggle');
    }
  }

  
}