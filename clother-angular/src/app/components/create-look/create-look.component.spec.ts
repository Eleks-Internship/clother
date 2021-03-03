import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLookComponent } from './create-look.component';

describe('CreateLookComponent', () => {
  let component: CreateLookComponent;
  let fixture: ComponentFixture<CreateLookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
