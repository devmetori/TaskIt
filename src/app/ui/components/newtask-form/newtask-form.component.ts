import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrioritySelectorComponent } from '@/app/ui/base';
import { TTask, TTaskInput } from '@/app/common/types';
import { TaskService } from '@/app/services';
import { UUID } from '@/app/common/utils';
@Component({
    selector: 'app-newtask-form',
    standalone: true,
    imports: [CommonModule, PrioritySelectorComponent, FormsModule],
    templateUrl: './newtask-form.component.html',
    styleUrl: './newtask-form.component.scss',
})
export class NewtaskFormComponent {
    @Output() OnFinish = new EventEmitter<void>();
    task: TTaskInput = {
        description: '',
        date: new Date(),
        priority: 1,
    };

    constructor(private readonly taskService: TaskService) {}

    hadleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const Newtask: TTask = {
            id: UUID(),
            description: this.task.description,
            dateStart: new Date(this.task.date),
            dateEnd: new Date(new Date(this.task.date).getTime() + Math.random() * (1000 * 60 * 60 * 24 * 7)),
            tags: [],
            completed: false,
            priority: this.task.priority,
            priorityColor: this.task.priority === 1 ? 'green' : this.task.priority === 2 ? 'orange' : 'red',
        };
        this.taskService.addNewTask(Newtask);
        this.OnFinish.emit();
    }
}
