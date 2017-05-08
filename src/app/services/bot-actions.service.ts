import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import * as io from 'socket.io-client';

@Injectable()
export class BotActionsService {
  
  private socket = io('http://localhost:8888');

  // functions 

   sendCommand(command){
    this.socket.emit('command', command);    
  }

}
