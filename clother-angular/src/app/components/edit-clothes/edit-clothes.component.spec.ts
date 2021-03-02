import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClothesComponent } from './edit-clothes.component';

describe('EditClothesComponent', () => {
  let component: EditClothesComponent;
  let fixture: ComponentFixture<EditClothesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClothesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
