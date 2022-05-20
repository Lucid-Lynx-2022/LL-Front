import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BymeacoffeeComponent } from './bymeacoffee.component';

describe('BymeacoffeeComponent', () => {
  let component: BymeacoffeeComponent;
  let fixture: ComponentFixture<BymeacoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BymeacoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BymeacoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
