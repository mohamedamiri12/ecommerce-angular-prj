import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {provideHotToastConfig} from '@ngxpert/hot-toast'

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withComponentInputBinding()),
    provideHotToastConfig({
      style: {margingTop: '70px'},
      stacking: 'depth',
      duration: 1000
    })
  ]
};
