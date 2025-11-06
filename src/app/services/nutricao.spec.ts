import { TestBed } from '@angular/core/testing';

import { Nutricao } from './nutricao';

describe('Nutricao', () => {
  let service: Nutricao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nutricao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
