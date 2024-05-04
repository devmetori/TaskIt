import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TSortOption } from '@/app/common/types';

@Component({
    selector: 'app-sort-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sort-selector.component.html',
    styleUrl: './sort-selector.component.scss',
})
export class SortSelectorComponent {
    selectOption($event: Event) {
        const target = $event.target as HTMLSelectElement;
        const value = target.value as TSortOption['value'];
        this.selectedOption = this.sortOptions.find((option) => option.value === value) || this.sortOptions[0];
        this.onChange.emit(this.selectedOption);
    }
    onStateValue() {
        this.selectedOption = { ...this.selectedOption, asc: !this.selectedOption.asc };
        this.onChange.emit(this.selectedOption);
    }
    @Output() onChange = new EventEmitter<TSortOption>();
    sortOptions: TSortOption[] = [
        { value: 'description', label: 'Descripcion', asc: true },
        { value: 'date', label: 'Fecha', asc: true },
        { value: 'priority', label: 'Prioridad', asc: true },
        { value: 'status', label: 'Estado', asc: true },
    ];
    selectedOption: TSortOption = this.sortOptions[0];

    optionSelected(option: TSortOption) {
        this.selectedOption = option;
        this.onChange.emit(option);
    }
}
