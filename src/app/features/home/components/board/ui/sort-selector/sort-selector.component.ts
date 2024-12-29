import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';

import { TSortOption } from '@/app/shared/models/types';

@Component({
    selector: 'app-sort-selector',
    standalone: true,
    imports: [NgFor],
    templateUrl: './sort-selector.component.html',
    styleUrl: './sort-selector.component.scss',
})
export class SortSelectorComponent {
    @Output() Select = new EventEmitter<TSortOption>();
    selectOption(event: Event) {
        const target = event.target as HTMLSelectElement;
        const value = target.value as TSortOption['value'];
        this.selectedOption = this.sortOptions.find((option) => option.value === value) || this.sortOptions[0];
        this.Select.emit(this.selectedOption);
    }
    onStateValue() {
        this.selectedOption = { ...this.selectedOption, asc: !this.selectedOption.asc };
        this.Select.emit(this.selectedOption);
    }
    sortOptions: TSortOption[] = [
        { value: 'description', label: 'Descripción', asc: true },
        { value: 'date', label: 'Fecha', asc: true },
        { value: 'priority', label: 'Prioridad', asc: true },
        { value: 'status', label: 'Estado', asc: true },
    ];
    selectedOption: TSortOption = this.sortOptions[0];

    optionSelected(option: TSortOption) {
        this.selectedOption = option;
        this.Select.emit(option);
    }
}
