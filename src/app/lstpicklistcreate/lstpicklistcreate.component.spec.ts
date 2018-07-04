import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstpicklistcreateComponent } from './lstpicklistcreate.component';

describe('LstpicklistcreateComponent', () => {
  let component: LstpicklistcreateComponent;
  let fixture: ComponentFixture<LstpicklistcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstpicklistcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstpicklistcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
