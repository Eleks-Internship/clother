import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikelistComponent } from './likelist.component';

describe('LikelistComponent', () => {
  let component: LikelistComponent;
  let fixture: ComponentFixture<LikelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
