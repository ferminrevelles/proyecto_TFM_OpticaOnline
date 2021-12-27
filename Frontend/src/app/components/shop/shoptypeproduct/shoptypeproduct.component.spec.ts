import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoptypeproductComponent } from './shoptypeproduct.component';

describe('ShoptypeproductComponent', () => {
  let component: ShoptypeproductComponent;
  let fixture: ComponentFixture<ShoptypeproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoptypeproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoptypeproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
