import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsttallycheckComponent } from './lsttallycheck.component';

describe('LsttallycheckComponent', () => {
  let component: LsttallycheckComponent;
  let fixture: ComponentFixture<LsttallycheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsttallycheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsttallycheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
