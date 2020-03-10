import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeetingService } from '../meetings.service';
import { Router } from '@angular/router';
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
  selector: 'app-meeting-add',
  templateUrl: './meeting-add.component.html',
  styleUrls: ['./meeting-add.component.css']
})
export class MeetingAddComponent implements OnInit, AfterViewInit {
  angForm: FormGroup;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  attendeeList: [];
  attendeeString: string;
  disablePastDates = true;
  enteredDate: Date;
  private _isPickerOpen = false;

  constructor(private fb: FormBuilder,
    private ms: MeetingService,
    private router: Router,
    private _elementRef: ElementRef) {

  }

  createForm() {
    this.angForm = this.fb.group({
      MeetingSubject: ['', [Validators.required, Validators.maxLength(50)]],
      MeetingAgenda: ['', Validators.required],
      MeetingAttendees: [this.selectedItems, Validators.required],
      MeetingTime: ['', Validators.required]

    });
  }

  createMeeting(MeetingSubject, MeetingAgenda) {
    this.ms.createMeeting(MeetingSubject, MeetingAgenda, this.attendeeString, this.enteredDate.toUTCString());
    this.router.navigateByUrl('meetings');
  }
  ngOnInit() {
    this.createForm();

    let tmp = [];
    this.ms.getAttendeeList().subscribe((data: any) => {
      this.attendeeList = data;
      for (let i = 0; i < this.attendeeList.length; i++) {
        tmp.push({ id: i, name: this.attendeeList[i] });
      }
      this.dropdownList = tmp;
    });

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


  }
  onItemSelect($item) {
    this.selectedItems.push($item.name);
    console.log(this.selectedItems);
    this.attendeeString = this.selectedItems.join(',')
    console.log(this.attendeeString);


  }

  onItemDeselect($item) {
    console.log($item.name);
    this.selectedItems.forEach((item, index) => {
      if (item === $item.name) this.selectedItems.splice(index, 1);
    });
    this.attendeeString = this.selectedItems.join(',')
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
      $('.date-dropdown').dropdown('toggle');
    }
  }



}
