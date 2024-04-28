import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Priorities } from '../../../common/data';
import { TPriority, TTaskInput } from 'app/common';

@Component({
    selector: 'app-input-task',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './input-task.component.html',
    styleUrl: './input-task.component.scss',
})
export class TaskInputComponent {
    @Output() addTask = new EventEmitter<TTaskInput>();
    priorities = Priorities;
    today = new Date().toISOString().split('T')[0];

    hadleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);
        const description = data.get('description') as string;
        const date = data.get('date') as string;
        const priority = data.get('priority') as TPriority;
        if (!description || !priority || !date) return;

        const newTask: TTaskInput = {
            description,
            date: new Date(date),
            priority,
        };

        this.addTask.emit(newTask);
        (form.querySelector('input[name="description"]') as HTMLInputElement).value = '';
    }
}
