import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstplanreceiveforexportComponent } from './lstplanreceiveforexport.component';

describe('LstplanreceiveforexportComponent', () => {
  let component: LstplanreceiveforexportComponent;
  let fixture: ComponentFixture<LstplanreceiveforexportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstplanreceiveforexportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstplanreceiveforexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
