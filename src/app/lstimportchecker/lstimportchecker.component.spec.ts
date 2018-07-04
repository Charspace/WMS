import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstimportcheckerComponent } from './lstimportchecker.component';

describe('LstimportcheckerComponent', () => {
  let component: LstimportcheckerComponent;
  let fixture: ComponentFixture<LstimportcheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstimportcheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstimportcheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
