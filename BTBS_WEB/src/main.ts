import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { PreInitService } from './app/config/config-service';
 
async function main() {
  // First, bootstrap the app to get the injector
  const appRef = await bootstrapApplication(AppComponent, appConfig);
 
  // Get the injector and manually call onInit
  const preInitService = appRef.injector.get(PreInitService);
 
  // Wait for config to load
  await preInitService.onInit();
}
 
main().catch(err => console.error(err));
