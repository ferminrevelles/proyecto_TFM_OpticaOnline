import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmenthoursComponent } from './appointmenthours.component';

describe('AppointmenthoursComponent', () => {
  let component: AppointmenthoursComponent;
  let fixture: ComponentFixture<AppointmenthoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmenthoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmenthoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
