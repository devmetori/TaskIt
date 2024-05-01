import { Component } from '@angular/core';
import { TaskComponent } from '@/app/ui';

import { ScreenSizeDirective } from '@/app/common/directives';
import { screenSize } from '@/app/common/data';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [TaskComponent, ScreenSizeDirective],
    templateUrl: './app.component.html',
})
export class AppComponent {
    breakpoints = screenSize;
}
