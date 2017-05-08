import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import * as io from 'socket.io-client';

@Injectable()
export class BotActionsService {
  
  // Variables
  private url = 'http://localhost:8888'; // Change this to .env variable~
  private socket;

  // functions 
   sendCommand(command){
    this.socket.emit('command', command);    
  }

}
