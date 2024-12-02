import {  Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PrioritySelectorComponent } from '@/app/ui/base';
import { MadalFormAction } from '@/app/common/enums';
import { TTask } from '@/app/common/types';
import { ModalService } from '../modal';

@Component({
    selector: 'app-edit-task-form',
    standalone: true,
    imports: [FormsModule, PrioritySelectorComponent, CommonModule],
    templateUrl: './edit-task-form.component.html',
    styleUrl: './edit-task-form.component.scss',
})
export class EditTaskFormComponent {
    @Input() task: TTask = {} as TTask;

    constructor(private readonly modalService: ModalService) { }

    setTaskPriority(priority: number) {
        this.task = { ...this.task, priority };
    }

    deteleTask(task: TTask) {
        const newAction = { action: MadalFormAction.DELETE_TASK, data: task };
        this.modalService.NewAction(newAction);
    }

    hadleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const newTask: TTask = {
            ...this.task,
            description: this.task.description,
            dateStart: this.task.dateStart,
            dateEnd: this.task.dateEnd,
            priority: this.task.priority,
            priorityColor: this.task.priority === 1 ? 'green' : this.task.priority === 2 ? 'yellow' : 'red',
        };
        this.modalService.NewAction({ action: MadalFormAction.EDIT_TASK, data: newTask });

    }
}
