import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstuserComponent } from './lstuser.component';

describe('LstuserComponent', () => {
  let component: LstuserComponent;
  let fixture: ComponentFixture<LstuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
