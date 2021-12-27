import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryshopComponent } from './summaryshop.component';

describe('SummaryshopComponent', () => {
  let component: SummaryshopComponent;
  let fixture: ComponentFixture<SummaryshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
