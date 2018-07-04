import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstuploadexcelplanreceiveComponent } from './lstuploadexcelplanreceive.component';

describe('LstuploadexcelplanreceiveComponent', () => {
  let component: LstuploadexcelplanreceiveComponent;
  let fixture: ComponentFixture<LstuploadexcelplanreceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstuploadexcelplanreceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstuploadexcelplanreceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
