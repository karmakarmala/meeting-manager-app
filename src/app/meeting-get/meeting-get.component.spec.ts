import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingGetComponent } from './meeting-get.component';

describe('MeetingGetComponent', () => {
  let component: MeetingGetComponent;
  let fixture: ComponentFixture<MeetingGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
