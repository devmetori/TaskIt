import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEs, 'es-ES');

export const globalProviders = [{ provide: LOCALE_ID, useValue: 'es-ES' }];
