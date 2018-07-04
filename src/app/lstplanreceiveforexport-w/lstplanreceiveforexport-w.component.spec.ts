import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstplanreceiveforexportWComponent } from './lstplanreceiveforexport-w.component';

describe('LstplanreceiveforexportWComponent', () => {
  let component: LstplanreceiveforexportWComponent;
  let fixture: ComponentFixture<LstplanreceiveforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstplanreceiveforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstplanreceiveforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
