import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScreenSizeDirective } from '@/app/common/directives';
import { screenSize } from '@/app/common/data';
import { TTodoList } from '@/app/common/types';

@Component({
    selector: 'app-list-item',
    standalone: true,
    imports: [FormsModule, CommonModule, ScreenSizeDirective],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
    @Input() list: TTodoList = {} as TTodoList;
    @Input() selected: string = '';
    @Output() select = new EventEmitter<TTodoList>();
    @Output() remove = new EventEmitter<string>();
    @Output() newName = new EventEmitter<string>();
    screenSizes = screenSize;

    onNameChange(event: FocusEvent) {
        const target = event.target as HTMLInputElement;
        this.newName.emit(target.value);
    }
    selectList(list: TTodoList) {
        this.select.emit(list);
    }
    removeList(id: string) {
        this.remove.emit(id);
    }
}
