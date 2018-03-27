import { TestBed, inject } from '@angular/core/testing';

import { CollectionRouterService } from './collection-router.service';

describe('CollectionRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionRouterService]
    });
  });

  it('should be created', inject([CollectionRouterService], (service: CollectionRouterService) => {
    expect(service).toBeTruthy();
  }));
});
