import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ClothesService } from './clothes.service';

describe('ClothesService', () => {
  let service: ClothesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(ClothesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
