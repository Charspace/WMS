import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstexportcheckerWComponent } from './lstexportchecker-w.component';

describe('LstexportcheckerWComponent', () => {
  let component: LstexportcheckerWComponent;
  let fixture: ComponentFixture<LstexportcheckerWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstexportcheckerWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstexportcheckerWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
