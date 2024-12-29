import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from '@/app/shared/ui/base';
import { TTask } from '@/app/shared/models/types';
import { UUID } from '@/app/core/utils';

@Component({
    selector: 'app-task-item',
    standalone: true,
    imports: [CommonModule, FormsModule, CheckboxComponent],
    templateUrl: './task-item.component.html',
    styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
    @Input() task: TTask = {} as TTask;
    @Input() isReadonly = false;
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
