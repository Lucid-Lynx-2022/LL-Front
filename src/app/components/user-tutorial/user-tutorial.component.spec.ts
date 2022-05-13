import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTutorialComponent } from './user-tutorial.component';

describe('UserTutorialComponent', () => {
  let component: UserTutorialComponent;
  let fixture: ComponentFixture<UserTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
