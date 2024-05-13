import {
    ApplicationRef,
    ComponentRef,
    EnvironmentInjector,
    Injectable,
    OnDestroy,
    Type,
    createComponent,
} from '@angular/core';
import { ModelOptions, TOnFinish } from './types';
import { ModalComponent } from './modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService implements OnDestroy {
    newModalComponent!: ComponentRef<ModalComponent>;
    options: ModelOptions | undefined;
    mediaQueries: MediaQueryList[] = [];

    constructor(
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector,
    ) {}

    ngOnDestroy(): void {
        if (this.newModalComponent) {
            this.newModalComponent.destroy();
        }
        if (this.mediaQueries.length > 0) {
            this.clearMediaQueryListeners();
        }
    }

    open<C extends TOnFinish>(vComponent: Type<C>, options?: ModelOptions) {
        const InnerComponent = vComponent as Type<C>;
        this.options = options as ModelOptions;

        const newComponent = createComponent(InnerComponent, {
            environmentInjector: this.injector,
        });

        if (this.options.props) {
            const { key, value } = this.options.props;
            newComponent.setInput(key, value);
        }

        newComponent.instance.OnFinish.subscribe(() => {
            this.close();
        });

        this.newModalComponent = createComponent(ModalComponent, {
            environmentInjector: this.injector,
            projectableNodes: [[newComponent.location.nativeElement]],
        });

        document.body.appendChild(this.newModalComponent.location.nativeElement);

        this.appRef.attachView(newComponent.hostView);
        this.appRef.attachView(this.newModalComponent.hostView);
        this.setupVisibility(options?.mQueries || ['(min-width: 0)']);
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
}
