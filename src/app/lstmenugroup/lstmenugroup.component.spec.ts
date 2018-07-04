import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LstmenugroupComponent } from './lstmenugroup.component';

describe('LstmenugroupComponent', () => {
  let component: LstmenugroupComponent;
  let fixture: ComponentFixture<LstmenugroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LstmenugroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LstmenugroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
