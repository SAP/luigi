import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholdersComponent } from './stakeholders.component';

describe('StakeholdersComponent', () => {
  let component: StakeholdersComponent;
  let fixture: ComponentFixture<StakeholdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StakeholdersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
