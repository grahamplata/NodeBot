// Modules
import { Component } from '@angular/core';

// Services
import { BotActionsService } from '../../services/bot-actions.service';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  
})
export class ControlsComponent {


  constructor(private botService:BotActionsService) {}

  onClick(event) {
    this.botService.sendCommand(event);
    console.log(event);
  }


}
