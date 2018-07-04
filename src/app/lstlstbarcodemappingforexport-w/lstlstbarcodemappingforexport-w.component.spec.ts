import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstlstbarcodemappingforexportWComponent } from './lstlstbarcodemappingforexport-w.component';

describe('LstlstbarcodemappingforexportWComponent', () => {
  let component: LstlstbarcodemappingforexportWComponent;
  let fixture: ComponentFixture<LstlstbarcodemappingforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstlstbarcodemappingforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstlstbarcodemappingforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
