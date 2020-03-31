import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSmasherComponent } from './page-smasher.component';

describe('PageSmasherComponent', () => {
  let component: PageSmasherComponent;
  let fixture: ComponentFixture<PageSmasherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSmasherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSmasherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
