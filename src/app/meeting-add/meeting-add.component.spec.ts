import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAddComponent } from './meeting-add.component';

describe('MeetingAddComponent', () => {
  let component: MeetingAddComponent;
  let fixture: ComponentFixture<MeetingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
