import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrioritySelectorComponent } from '@/app/shared/ui/base';
import { TTaskInput } from '@/app/shared/models/types';

@Component({
    selector: 'app-input-task',
    standalone: true,
    imports: [CommonModule, FormsModule, PrioritySelectorComponent],
    templateUrl: './input-task.component.html',
    styleUrl: './input-task.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskInputComponent {
    @Input() isDisabled = false;
    task: TTaskInput = {
        description: '',
        date: new Date(),
        endDate: new Date(),
        priority: 1,
    };
    @Output() addTask = new EventEmitter<TTaskInput>();

    hadleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const inputDescription = form.querySelector('input[name="description"]') as HTMLInputElement;

        this.addTask.emit(this.task);
        inputDescription.value = '';
    }
}
