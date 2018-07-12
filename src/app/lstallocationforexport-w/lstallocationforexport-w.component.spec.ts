import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstallocationforexportWComponent } from './lstallocationforexport-w.component';

describe('LstallocationforexportWComponent', () => {
  let component: LstallocationforexportWComponent;
  let fixture: ComponentFixture<LstallocationforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstallocationforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstallocationforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
