import { TestBed } from '@angular/core/testing';

import { CategorySelectionService } from './category-selection.service';

describe('CategorySelectionService', () => {
  let service: CategorySelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorySelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
