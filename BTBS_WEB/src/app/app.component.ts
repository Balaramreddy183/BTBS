import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreInitService } from './config/config-service';
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sas.automation';
   initialized = false;
   constructor(private preInitService: PreInitService) {}
 
  async ngOnInit() {
    await this.preInitService.onInit();
    this.initialized = true;
  }
}