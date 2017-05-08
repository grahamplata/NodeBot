// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component'; // Main Component
import { ControlsComponent } from './components/controls/controls.component'; // Encapsulates Buttons Controls
import { FooterComponent } from './components/footer/footer.component'; // Footer 
import { NotificationsComponent } from './components/notifications/notifications.component'; // Notification Modal || Bar

// Services
import {BotActionsService} from './services/bot-actions.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    FooterComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [BotActionsService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
