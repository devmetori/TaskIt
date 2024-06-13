import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';

import { routes } from './app.routes';
registerLocaleData(localeEs, 'es-ES');
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), { provide: LOCALE_ID, useValue: 'es-ES' }],
};
