import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBorderComponent } from './section-border.component';

describe('SectionBorderComponent', () => {
  let component: SectionBorderComponent;
  let fixture: ComponentFixture<SectionBorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
