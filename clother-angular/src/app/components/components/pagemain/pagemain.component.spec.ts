import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagemainComponent } from './pagemain.component';

describe('PagemainComponent', () => {
  let component: PagemainComponent;
  let fixture: ComponentFixture<PagemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagemainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
