import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstallocationComponent } from './lstallocation.component';

describe('LstallocationComponent', () => {
  let component: LstallocationComponent;
  let fixture: ComponentFixture<LstallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
