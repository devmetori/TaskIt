import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TTaskInput } from '@app/common/types';
import { Priorities } from '@app/common/data';

@Component({
    selector: 'app-input-task',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './input-task.component.html',
    styleUrl: './input-task.component.scss',
})
export class TaskInputComponent {
    @Output() addTask = new EventEmitter<TTaskInput>();
    priorities = Priorities();
    today = new Date().toISOString().split('T')[0];

    hadleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const inputDescription = form.querySelector('input[name="description"]') as HTMLInputElement;
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

        this.addTask.emit(newTask);
        inputDescription.value = '';
    }
}
