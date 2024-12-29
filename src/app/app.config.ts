import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LOCALE_ID } from '@angular/core';

import { firebaseProviders } from './firebase.config';
import { RouteConfig } from './app.routes';

registerLocaleData(localeEs, 'es-ES');

export const appConfig: ApplicationConfig = {
    providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }, provideRouter(RouteConfig), ...firebaseProviders],
};
