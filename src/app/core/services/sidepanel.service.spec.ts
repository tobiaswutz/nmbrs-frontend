/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidepanelService } from './sidepanel.service';

describe('Service: Sidepanel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidepanelService]
    });
  });

  it('should ...', inject([SidepanelService], (service: SidepanelService) => {
    expect(service).toBeTruthy();
  }));
});
