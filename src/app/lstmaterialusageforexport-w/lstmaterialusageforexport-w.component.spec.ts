import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstmaterialusageforexportWComponent } from './lstmaterialusageforexport-w.component';

describe('LstmaterialusageforexportWComponent', () => {
  let component: LstmaterialusageforexportWComponent;
  let fixture: ComponentFixture<LstmaterialusageforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstmaterialusageforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstmaterialusageforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
