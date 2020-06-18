import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {AppInjector} from '@MasServices/Injector.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(async (moduleRef) => {
    AppInjector.setInjector(moduleRef.injector);
  })
  .catch(err => console.error(err));
