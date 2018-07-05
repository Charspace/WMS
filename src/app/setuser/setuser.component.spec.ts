import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetuserComponent } from './setuser.component';

describe('SetuserComponent', () => {
  let component: SetuserComponent;
  let fixture: ComponentFixture<SetuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
