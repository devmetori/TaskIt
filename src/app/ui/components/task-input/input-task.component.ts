import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
    selector: 'app-input-task',
    standalone: true,
    imports: [],
    templateUrl: './input-task.component.html',
    styleUrl: './input-task.component.scss',
})
export class TaskInputComponent {
    @Output() addTask = new EventEmitter<string>();
    hadleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);
        const description = data.get('description') as string;
        if (!description) return;
        this.addTask.emit(description);
        form.reset();
    }
}
