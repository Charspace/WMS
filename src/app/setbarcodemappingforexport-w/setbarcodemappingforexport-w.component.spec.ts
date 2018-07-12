import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetbarcodemappingforexportWComponent } from './setbarcodemappingforexport-w.component';

describe('SetbarcodemappingforexportWComponent', () => {
  let component: SetbarcodemappingforexportWComponent;
  let fixture: ComponentFixture<SetbarcodemappingforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetbarcodemappingforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetbarcodemappingforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
