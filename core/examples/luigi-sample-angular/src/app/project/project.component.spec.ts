import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
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
      .overrideComponent(ProjectComponent, {
        set: {
          providers: [
            {
              provide: ActivatedRoute,
              useValue: { params: of({ projectId: 'pr1' }) }
            }
          ]
        }
      })
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
