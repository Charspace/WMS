import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsttallycheckforexportWComponent } from './lsttallycheckforexport-w.component';

describe('LsttallycheckforexportWComponent', () => {
  let component: LsttallycheckforexportWComponent;
  let fixture: ComponentFixture<LsttallycheckforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsttallycheckforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsttallycheckforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
