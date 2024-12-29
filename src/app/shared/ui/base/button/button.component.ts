import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export interface IButtonProps {
    variant: 'default' | 'outline' | 'ghost' | 'link';
    size: 'small' | 'medium' | 'large';
    IsLoading: boolean;
}

@Component({
    selector: 'button[TkButton], a[TkButton]',
    standalone: true,
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements IButtonProps {
    @Input() variant: 'default' | 'outline' | 'ghost' | 'link' = 'default';
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Input() IsLoading = false;

    @HostBinding('class.btn')
    _TkButtom = true;

    @HostBinding('class.btn--outline')
    get Outline(): boolean {
        return this.variant === 'outline';
    }
    @HostBinding('class.btn--ghost')
    get ghost(): boolean {
        return this.variant === 'ghost';
    }

    @HostBinding('class.btn--link')
    get dark(): boolean {
        return this.variant === 'link';
    }

    @HostBinding('class.btn--loading')
    get Loading(): boolean {
        return this.IsLoading;
    }

    @HostBinding('class.btn--sm')
    get small(): boolean {
        return this.size === 'small';
    }

    @HostBinding('class.btn--md')
    get medium(): boolean {
        return this.size === 'medium';
    }

    @HostBinding('class.btn--lg')
    get large(): boolean {
        return this.size === 'large';
    }

    constructor() {}
}
