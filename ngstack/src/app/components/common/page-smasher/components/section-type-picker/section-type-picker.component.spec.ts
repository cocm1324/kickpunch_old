import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTypePickerComponent } from './section-type-picker.component';

describe('SectionTypePickerComponent', () => {
  let component: SectionTypePickerComponent;
  let fixture: ComponentFixture<SectionTypePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionTypePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTypePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
