import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetplanreceiveforexportWComponent } from './setplanreceiveforexport-w.component';

describe('SetplanreceiveforexportWComponent', () => {
  let component: SetplanreceiveforexportWComponent;
  let fixture: ComponentFixture<SetplanreceiveforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetplanreceiveforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetplanreceiveforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
