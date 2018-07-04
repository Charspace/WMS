import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstbarcodemappingComponent } from './lstbarcodemapping.component';

describe('LstbarcodemappingComponent', () => {
  let component: LstbarcodemappingComponent;
  let fixture: ComponentFixture<LstbarcodemappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstbarcodemappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstbarcodemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
