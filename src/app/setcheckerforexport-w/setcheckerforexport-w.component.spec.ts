import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetcheckerforexportWComponent } from './setcheckerforexport-w.component';

describe('SetcheckerforexportWComponent', () => {
  let component: SetcheckerforexportWComponent;
  let fixture: ComponentFixture<SetcheckerforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetcheckerforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetcheckerforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
