import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCoursesComponent } from './preview-courses.component';

describe('PreviewCoursesComponent', () => {
  let component: PreviewCoursesComponent;
  let fixture: ComponentFixture<PreviewCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
