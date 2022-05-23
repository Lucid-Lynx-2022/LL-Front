import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTutorialComponent } from './edit-tutorial.component';

describe('EditTutorialComponent', () => {
  let component: EditTutorialComponent;
  let fixture: ComponentFixture<EditTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
