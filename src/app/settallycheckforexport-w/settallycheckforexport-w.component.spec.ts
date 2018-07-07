import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettallycheckforexportWComponent } from './settallycheckforexport-w.component';

describe('SettallycheckforexportWComponent', () => {
  let component: SettallycheckforexportWComponent;
  let fixture: ComponentFixture<SettallycheckforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettallycheckforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettallycheckforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
