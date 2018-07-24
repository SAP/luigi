import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Miscellaneous2Component } from './miscellaneous2.component';

describe('Miscellaneous2Component', () => {
  let component: Miscellaneous2Component;
  let fixture: ComponentFixture<Miscellaneous2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Miscellaneous2Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Miscellaneous2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
