import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstdeliverforexportWComponent } from './lstdeliverforexport-w.component';

describe('LstdeliverforexportWComponent', () => {
  let component: LstdeliverforexportWComponent;
  let fixture: ComponentFixture<LstdeliverforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstdeliverforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstdeliverforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
