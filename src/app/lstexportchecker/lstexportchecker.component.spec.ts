import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstexportcheckerComponent } from './lstexportchecker.component';

describe('LstexportcheckerComponent', () => {
  let component: LstexportcheckerComponent;
  let fixture: ComponentFixture<LstexportcheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstexportcheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstexportcheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
