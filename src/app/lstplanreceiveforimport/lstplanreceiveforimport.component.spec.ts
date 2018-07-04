import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstplanreceiveforimportComponent } from './lstplanreceiveforimport.component';

describe('LstplanreceiveforimportComponent', () => {
  let component: LstplanreceiveforimportComponent;
  let fixture: ComponentFixture<LstplanreceiveforimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstplanreceiveforimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstplanreceiveforimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
