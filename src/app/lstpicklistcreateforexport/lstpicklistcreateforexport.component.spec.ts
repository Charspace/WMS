import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstpicklistcreateforexportComponent } from './lstpicklistcreateforexport.component';

describe('LstpicklistcreateforexportComponent', () => {
  let component: LstpicklistcreateforexportComponent;
  let fixture: ComponentFixture<LstpicklistcreateforexportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstpicklistcreateforexportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstpicklistcreateforexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
