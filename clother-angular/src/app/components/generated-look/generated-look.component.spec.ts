import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedLookComponent } from './generated-look.component';

describe('GeneratedLookComponent', () => {
  let component: GeneratedLookComponent;
  let fixture: ComponentFixture<GeneratedLookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedLookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
