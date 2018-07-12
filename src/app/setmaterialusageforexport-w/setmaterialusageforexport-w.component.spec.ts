import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetmaterialusageforexportWComponent } from './setmaterialusageforexport-w.component';

describe('SetmaterialusageforexportWComponent', () => {
  let component: SetmaterialusageforexportWComponent;
  let fixture: ComponentFixture<SetmaterialusageforexportWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetmaterialusageforexportWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetmaterialusageforexportWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
