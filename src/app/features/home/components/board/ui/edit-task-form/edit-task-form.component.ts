import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PrioritySelectorComponent } from '@/app/shared/ui/base';
import { MadalFormAction } from '@/app/shared/models/enums';
import { ModalService } from '@/app/shared/ui/components';
import { TTask } from '@/app/shared/models/types';

@Component({
    selector: 'app-edit-task-form',
    standalone: true,
    imports: [FormsModule, PrioritySelectorComponent, CommonModule],
    templateUrl: './edit-task-form.component.html',
    styleUrl: './edit-task-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskFormComponent {
    @Input() task: TTask = {} as TTask;

    constructor(private readonly modalService: ModalService) {}

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
