import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FramelayoutComponent } from './framelayout.component';

describe('FramelayoutComponent', () => {
  let component: FramelayoutComponent;
  let fixture: ComponentFixture<FramelayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FramelayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
