import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LikeService } from './like.service';

describe('LikeService', () => {
  let service: LikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(LikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
