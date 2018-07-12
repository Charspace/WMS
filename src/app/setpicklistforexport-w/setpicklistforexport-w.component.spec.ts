import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpicklistforexportWComponent } from './setpicklistforexport-w.component';

describe('SetpicklistforexportWComponent', () => {
  let component: SetpicklistforexportWComponent;
  let fixture: ComponentFixture<SetpicklistforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetpicklistforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpicklistforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
