import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetdeliverforexportWComponent } from './setdeliverforexport-w.component';

describe('SetdeliverforexportWComponent', () => {
  let component: SetdeliverforexportWComponent;
  let fixture: ComponentFixture<SetdeliverforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetdeliverforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetdeliverforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
