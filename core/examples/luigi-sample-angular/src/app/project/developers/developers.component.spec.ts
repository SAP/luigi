import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersComponent } from './developers.component';

describe('DevelopersComponent', () => {
  let component: DevelopersComponent;
  let fixture: ComponentFixture<DevelopersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevelopersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
