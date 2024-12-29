import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResponsiveService, RESPONSIVE_CONFIG } from '@/app/core/services';
import { BREAKPOINTS } from '@/app/shared/data';

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [RouterModule],
    providers: [
        {
            provide: RESPONSIVE_CONFIG,
            useValue: BREAKPOINTS,
        },
        ResponsiveService,
    ],
    template: ` <router-outlet /> `,
})
export class AppComponent {}
