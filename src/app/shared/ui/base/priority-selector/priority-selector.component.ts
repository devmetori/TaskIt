import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor, NgStyle } from '@angular/common';

import { TPrioritySelectorSize, TPrioritySelectorDirection } from '@/app/shared/models/types';
import { Priorities } from '@/app/shared/models/data';

@Component({
    selector: 'app-priority-selector',
    standalone: true,
    imports: [NgClass, NgStyle, NgFor],
    templateUrl: './priority-selector.component.html',
    styleUrl: './priority-selector.component.scss',
})
export class PrioritySelectorComponent {
    priorities = Priorities();
    @Input() selected = 1;
    @Input() size: TPrioritySelectorSize = 'sm';
    @Input() direction: TPrioritySelectorDirection = 'hr';
    @Output() onChange = new EventEmitter<number>();
    constructor() {}

    onChangePriority(level: number) {
        this.selected = level;
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
