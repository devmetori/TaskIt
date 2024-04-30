import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TTask } from '../../../common/types';

@Component({
    selector: 'app-task-item',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './task-item.component.html',
    styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
    @Input() task: TTask = {} as TTask;
    @Output() checkTask = new EventEmitter<string>();
    @Output() deleteTask = new EventEmitter<TTask>();

    check(id: string) {
        this.checkTask.emit(id);
    }
    delete(task: TTask) {
        this.deleteTask.emit(task);
    }
}
