import { TestBed } from '@angular/core/testing';

import { ServiceCarga } from './service-carga';

describe('ServiceCarga', () => {
  let service: ServiceCarga;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCarga);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
