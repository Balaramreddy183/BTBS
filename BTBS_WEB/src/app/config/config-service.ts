import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiEndPoint: string | undefined;
  apiAuthEndPoint: string | undefined;
  productVersion: string | undefined; 
  secretKey:string | undefined;
  documentPathPdf:string | undefined;
  idleTimeoutDuration: number | undefined;
  timeoutWarningDuration: number | undefined;
  drdoContact1: string | undefined;
  drdoContact2: string | undefined;

}
// preInitServiceFactory.ts
export function preInitServiceFactory(): () => Promise<void> {
  return () => {
    const locationInitialized = inject(LOCATION_INITIALIZED, { optional: true }) ?? Promise.resolve();
    const preInitService = inject(PreInitService);

    return locationInitialized.then(() =>
      preInitService.onInit().then(() => void 0) // Convert boolean to void
    );
  };
}



// export function preInitServiceFactory(
//   initService: PreInitService,
//   injector: Injector
// ) {
//   return () =>
//     new Promise((resolve) =>
//       injector
//         .get(LOCATION_INITIALIZED, Promise.resolve(undefined))
//         .then(() => resolve(initService.onInit()))
//     );
// }

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  settings: Observable<Readonly<ConfigService>>;

  private settingsSource: BehaviorSubject<ConfigService> =
    new BehaviorSubject<ConfigService>(new ConfigService());

  constructor() {
    this.settings = this.settingsSource.asObservable();
  }

  setSettings(settings: Partial<ConfigService>) {
    const updatedConfig = { ...this.settingsSource.value, ...settings };
    this.settingsSource.next(updatedConfig);
  }

  getSettings(): Readonly<ConfigService> {
    return this.settingsSource.value;
  }
}
@Injectable({ providedIn: 'root' })
export class PreInitService {
  constructor(
    private httpBackend: HttpBackend,
    private appSettingsService: AppSettingsService
  ) {}
 
  async onInit(): Promise<void> {
    const http = new HttpClient(this.httpBackend);
    try {      
      const config = await http.get<ConfigService>('./assets/config/config.json').toPromise();
      if (config) {
        this.appSettingsService.setSettings(config);
      }
    } catch (error) {
      console.error('Failed to load config:', error);
    }
  }
}