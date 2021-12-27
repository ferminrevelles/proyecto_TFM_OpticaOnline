import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentadminComponent } from './appointmentadmin.component';

describe('AppointmentadminComponent', () => {
  let component: AppointmentadminComponent;
  let fixture: ComponentFixture<AppointmentadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
