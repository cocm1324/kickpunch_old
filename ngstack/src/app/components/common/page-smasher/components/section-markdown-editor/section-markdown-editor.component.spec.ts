import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMarkdownEditorComponent } from './section-markdown-editor.component';

describe('SectionMarkdownEditorComponent', () => {
  let component: SectionMarkdownEditorComponent;
  let fixture: ComponentFixture<SectionMarkdownEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionMarkdownEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMarkdownEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
