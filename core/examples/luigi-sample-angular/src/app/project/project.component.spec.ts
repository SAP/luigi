import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectComponent } from './project.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { ModalComponent } from './modal/modal.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProjectComponent, CodeSnippetComponent, ModalComponent]
    })
    .overrideTemplateUsingTestingModule(CodeSnippetComponent, '')
    .overrideTemplateUsingTestingModule(ModalComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
