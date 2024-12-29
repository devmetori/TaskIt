import { Injectable, Renderer2, Inject, PLATFORM_ID, signal, InjectionToken } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

export const RESPONSIVE_CONFIG = new InjectionToken<Record<string, string>>('ResponsiveConfig');

@Injectable({ providedIn: 'platform' })
export class ResponsiveService {
    private isBrowser: boolean;
    private activeScreen = signal<string | null>(null);
    public activeScreen$ = toObservable(this.activeScreen);

    constructor(
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object,
        @Inject(RESPONSIVE_CONFIG) private config: Record<string, string>,
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (!this.isBrowser) return;
        this.setupListener();
    }

    private setupListener() {
        if (!window?.matchMedia) return;

        for (const [key, query] of Object.entries(this.config)) {
            const mq = window?.matchMedia(query);
            this.SetAttribute(key, mq.matches);
            mq.addEventListener('change', (event) => this.SetAttribute(key, event.matches));
        }
    }

    private SetAttribute(newClass: string, matches: boolean) {
        if (!matches) return;
        this.renderer.setAttribute(this.document.body, 'data-screen', newClass);
        this.activeScreen.set(newClass);
    }
}
