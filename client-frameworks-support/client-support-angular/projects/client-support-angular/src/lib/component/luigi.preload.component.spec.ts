import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuigiPreloadComponent } from './luigi.preload.component';

describe('ClientSupportAngularComponent', () => {
  let component: LuigiPreloadComponent;
  let fixture: ComponentFixture<LuigiPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LuigiPreloadComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuigiPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component)
  });
});
