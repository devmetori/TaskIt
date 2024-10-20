import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UUID } from '@/app/common/utils';

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
    @Input() Id: string = UUID(4);
    @Input() Text: string = '';
    @Input() type: 'checkbox' | 'radio' = 'checkbox';
    @Input() IsChecked: boolean = false;
    @Input() ShowLabel: boolean = false;
    @Output() OnChange = new EventEmitter<boolean>();

    changeState(state: boolean): void {
        this.IsChecked = state;
        this.OnChange.emit(state);
    }
}
