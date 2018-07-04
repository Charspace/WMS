import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsttallycheckforexportComponent } from './lsttallycheckforexport.component';

describe('LsttallycheckforexportComponent', () => {
  let component: LsttallycheckforexportComponent;
  let fixture: ComponentFixture<LsttallycheckforexportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsttallycheckforexportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsttallycheckforexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
