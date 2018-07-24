import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersoverviewComponent } from './usersoverview.component';

describe('UsersoverviewComponent', () => {
  let component: UsersoverviewComponent;
  let fixture: ComponentFixture<UsersoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersoverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
