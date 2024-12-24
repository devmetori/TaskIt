import { Directive, Input, Renderer2, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { IBreakpoint } from '../types';
import { BREAKPOINTS } from '../data';

@Directive({
    selector: '[appScreenSize]',
    standalone: true,
})
export class ScreenSizeDirective implements OnChanges, OnDestroy {
    @Input() appScreenSize: IBreakpoint[] = [];
    private listeners = new Map<string, () => void>();

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appScreenSize']) {
            this.updateScreenSizes();
        }
    }

    ngOnDestroy(): void {
        this.cleanupListeners();
    }

    private updateScreenSizes(): void {
        this.cleanupListeners();
        this.appScreenSize.forEach((breakpoint) => {
            if (window?.matchMedia) {
                const mql = window?.matchMedia(BREAKPOINTS[breakpoint.breakpoint]);
                const listener = () => this.applyStyles(mql, breakpoint.className);
                mql.addEventListener('change', listener);
                this.listeners.set(breakpoint.breakpoint, listener);
                this.applyStyles(mql, breakpoint.className);
            }
        });
    }

    private applyStyles(mql: MediaQueryList, className: string): void {
        if (mql.matches) {
            this.renderer.addClass(this.el.nativeElement, className);
        } else {
            this.renderer.removeClass(this.el.nativeElement, className);
        }
    }

    private cleanupListeners(): void {
        this.listeners.forEach((listener, breakpoint) => {
            const mql = window.matchMedia(BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS]);
            mql.removeEventListener('change', listener);
        });
        this.listeners.clear();
    }
}
