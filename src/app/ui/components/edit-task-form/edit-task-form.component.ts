import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PrioritySelectorComponent } from '@/app/ui/base';
import { TaskService } from '@/app/services';
import { TTask } from '@/app/common/types';

@Component({
    selector: 'app-edit-task-form',
    standalone: true,
    imports: [FormsModule, PrioritySelectorComponent, CommonModule],
    templateUrl: './edit-task-form.component.html',
    styleUrl: './edit-task-form.component.scss',
})
export class EditTaskFormComponent {
    @Output() OnFinish = new EventEmitter<void>();
    @Input() task: TTask = {} as TTask;

    constructor(private readonly taskService: TaskService) {}
    deteleTask(task: TTask) {
        this.taskService.deleteTask(task);
        this.OnFinish.emit();
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

        this.taskService.updateTask(newTask);
        this.OnFinish.emit();
    }
}
