/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BotActionsService } from './bot-actions.service';

describe('BotActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotActionsService]
    });
  });

  it('should ...', inject([BotActionsService], (service: BotActionsService) => {
    expect(service).toBeTruthy();
  }));
});
