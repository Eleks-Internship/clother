import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookFormComponent } from './look-form.component';

describe('LookFormComponent', () => {
  let component: LookFormComponent;
  let fixture: ComponentFixture<LookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
