import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetallocationforexportWComponent } from './setallocationforexport-w.component';

describe('SetallocationforexportWComponent', () => {
  let component: SetallocationforexportWComponent;
  let fixture: ComponentFixture<SetallocationforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetallocationforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetallocationforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
