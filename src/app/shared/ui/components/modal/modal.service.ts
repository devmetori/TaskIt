import { ApplicationRef, ComponentRef, Injectable, OnDestroy, Type, createComponent } from '@angular/core';
import { ModelOptions, TModalActionEvent } from './types';
import { ModalComponent } from './modal.component';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ModalService implements OnDestroy {
    private OnModalAction = new Subject<TModalActionEvent>();
    newModalComponent!: ComponentRef<ModalComponent>;
    options: ModelOptions | undefined;
    mediaQueries: MediaQueryList[] = [];

    constructor(private appRef: ApplicationRef) {}

    NewAction(event: TModalActionEvent) {
        this.OnModalAction.next(event);
        this.close();
    }
    open<C>(vComponent: Type<C>, options?: ModelOptions) {
        const InnerComponent = vComponent as Type<C>;
        this.options = options as ModelOptions;

        const contentComponent = createComponent(InnerComponent, {
            environmentInjector: this.appRef.injector,
        });

        if (this.options.props) {
            const { key, value } = this.options.props;
            contentComponent.setInput(key, value);
        }

        this.newModalComponent = createComponent(ModalComponent, {
            environmentInjector: this.appRef.injector,
            projectableNodes: [[contentComponent.location.nativeElement]],
        });

        document.body.appendChild(this.newModalComponent.location.nativeElement);

        this.appRef.attachView(contentComponent.hostView);
        this.appRef.attachView(this.newModalComponent.hostView);
        this.setupVisibility(options?.mQueries || ['(min-width: 0)']);
        return this.OnModalAction.asObservable();
    }

    close() {
        if (this.newModalComponent) {
            this.newModalComponent.instance.close();
            if (this.mediaQueries.length > 0) {
                this.clearMediaQueryListeners();
            }
        }
    }

    setupVisibility(breakpoints: string[]) {
        if (breakpoints.length <= 0) {
            return;
        }
        this.clearMediaQueryListeners();

        breakpoints.forEach((bp) => {
            const mql = window.matchMedia(bp);
            mql.addEventListener('change', this.handleMediaChange);
            this.mediaQueries.push(mql);
        });

        this.evaluateMediaQueries();
    }

    handleMediaChange = () => {
        this.evaluateMediaQueries();
    };

    evaluateMediaQueries() {
        const shouldDisplay = this.mediaQueries.some((mq) => mq.matches);
        if (!shouldDisplay) {
            this.close();
        }
    }

    clearMediaQueryListeners() {
        this.mediaQueries.forEach((mq) => mq.removeEventListener('change', this.handleMediaChange));
        this.mediaQueries = [];
    }
    ngOnDestroy(): void {
        if (this.newModalComponent) {
            this.newModalComponent.destroy();
        }
        if (this.mediaQueries.length > 0) {
            this.clearMediaQueryListeners();
        }
    }
}
