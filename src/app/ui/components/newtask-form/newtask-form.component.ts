import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import { Priorities } from '@/app/common/data';
import { TTaskInput } from '@/app/common/types';
import { TaskService } from '@/app/services';

@Component({
    selector: 'app-newtask-form',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './newtask-form.component.html',
    styleUrl: './newtask-form.component.scss',
})
export class NewtaskFormComponent {
    @Output() OnFinish = new EventEmitter<void>();
    priorities = Priorities();
    today = new Date().toISOString().split('T')[0];

    constructor(private readonly taskService: TaskService) {}
    hadleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);
        const description = data.get('description') as string;
        const date = data.get('date') as string;
        const priority = data.get('priority')?.toString();
        if (!description || !priority || !date) return;

        const newTask: TTaskInput = {
            description,
            date: new Date(date),
            priority: parseInt(priority.toString(), 10) as number,
        };
        this.taskService.addNewTask(newTask);
        this.OnFinish.emit();
    }
}
