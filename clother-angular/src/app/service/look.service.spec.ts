import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LookService } from './look.service';

describe('LookService', () => {
  let service: LookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(LookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
