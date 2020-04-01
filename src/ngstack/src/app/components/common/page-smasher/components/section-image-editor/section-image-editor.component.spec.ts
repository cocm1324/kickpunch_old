import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionImageEditorComponent } from './section-image-editor.component';

describe('SectionImageEditorComponent', () => {
  let component: SectionImageEditorComponent;
  let fixture: ComponentFixture<SectionImageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionImageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
