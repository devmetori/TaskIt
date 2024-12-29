import { Directive, Renderer2, ElementRef, inject } from '@angular/core';

import { ResponsiveService } from '@/app/core/services';

@Directive({
    selector: '[appScreenSize]',
    standalone: true,
})
export class ScreenSizeDirective {
    private screenService = inject(ResponsiveService);
    private previosScreen: string | null = null;
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
        this.screenService.activeScreen$.subscribe((screen) => {
            if (this.previosScreen) {
                this.renderer.removeClass(this.el.nativeElement, this.previosScreen);
            }
            this.renderer.addClass(this.el.nativeElement, screen || '');
            this.previosScreen = screen;
        });
    }
}
