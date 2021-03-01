import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesMoreComponent } from './clothes-more.component';

describe('ClothesMoreComponent', () => {
  let component: ClothesMoreComponent;
  let fixture: ComponentFixture<ClothesMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
