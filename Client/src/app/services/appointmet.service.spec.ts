import { TestBed } from '@angular/core/testing';

import { AppointmetService } from './appointmet.service';

describe('AppointmetService', () => {
  let service: AppointmetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
