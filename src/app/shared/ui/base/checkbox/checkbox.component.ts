import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UUID } from '@/app/core/utils';

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
    @Input() Id: string = UUID(4);
    @Input() Text = '';
    @Input() type: 'checkbox' | 'radio' = 'checkbox';
    @Input() IsChecked = false;
    @Input() ShowLabel = false;
    @Output() OnChange = new EventEmitter<boolean>();

    changeState(state: boolean): void {
        this.IsChecked = state;
        this.OnChange.emit(state);
    }

    @HostBinding('class.prova') get isCheckbox(): boolean {
        return this.type === 'checkbox';
    }
}
