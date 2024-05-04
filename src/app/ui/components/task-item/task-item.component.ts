import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TTask } from '@app/common/types';
import { UUID } from '@/app/common/utils';

@Component({
    selector: 'app-task-item',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './task-item.component.html',
    styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
    @Input() task: TTask = {} as TTask;
    @Input() isReadonly: boolean = false;
    @Output() checkTask = new EventEmitter<TTask>();
    @Output() editTask = new EventEmitter<TTask>();
    InstanceId = UUID(4);

    check(task: TTask) {
        this.checkTask.emit(task);
    }
    OpenModalEditTask(task: TTask) {
        this.editTask.emit(task);
    }
    getId(id: string) {
        return `${id}-${this.InstanceId}`;
    }
}
