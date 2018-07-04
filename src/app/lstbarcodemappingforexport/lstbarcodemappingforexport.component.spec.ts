import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstbarcodemappingforexportComponent } from './lstbarcodemappingforexport.component';

describe('LstbarcodemappingforexportComponent', () => {
  let component: LstbarcodemappingforexportComponent;
  let fixture: ComponentFixture<LstbarcodemappingforexportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstbarcodemappingforexportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstbarcodemappingforexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
