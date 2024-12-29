import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TTodoList } from '@/app/shared/models/types';

@Component({
    selector: 'app-list-item',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
    @Input() list: TTodoList = {} as TTodoList;
    @Input() selected = '';
    @Output() selectNewList = new EventEmitter<TTodoList>();
    @Output() remove = new EventEmitter<string>();
    @Output() newName = new EventEmitter<string>();

    onNameChange(event: FocusEvent) {
        const target = event.target as HTMLInputElement;
        this.newName.emit(target.value);
    }
    selectList(list: TTodoList) {
        this.selectNewList.emit(list);
    }
    removeList(id: string) {
        this.remove.emit(id);
    }
}
