import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetplanreceiveforexportComponent } from './setplanreceiveforexport.component';

describe('SetplanreceiveforexportComponent', () => {
  let component: SetplanreceiveforexportComponent;
  let fixture: ComponentFixture<SetplanreceiveforexportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetplanreceiveforexportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetplanreceiveforexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
