import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TPrioritySelectorSize, TPrioritySelectorDirection } from '@/app/common/types';
import { Priorities } from '@/app/common/data';

@Component({
    selector: 'app-priority-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './priority-selector.component.html',
    styleUrl: './priority-selector.component.scss',
})
export class PrioritySelectorComponent {
    priorities = Priorities();
    @Input() selected: number = 1;
    @Input() size: TPrioritySelectorSize = 'sm';
    @Input() direction: TPrioritySelectorDirection = 'hr';
    @Output() onChange = new EventEmitter<number>();
    onChangePriority(level: number) {
        this.onChange.emit(level);
    }

    setCssClasses() {
        return {
            sm: this.size == 'sm',
            md: this.size == 'md',
            lg: this.size == 'lg',
            vr: this.direction == 'vr',
            hr: this.direction == 'hr',
        };
    }
}
