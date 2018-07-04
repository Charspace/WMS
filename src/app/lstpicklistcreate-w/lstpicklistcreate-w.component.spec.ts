import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstpicklistcreateWComponent } from './lstpicklistcreate-w.component';

describe('LstpicklistcreateWComponent', () => {
  let component: LstpicklistcreateWComponent;
  let fixture: ComponentFixture<LstpicklistcreateWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstpicklistcreateWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstpicklistcreateWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
