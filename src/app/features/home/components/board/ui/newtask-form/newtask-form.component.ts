import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrioritySelectorComponent } from '@/app/shared/ui/base';
import { TTask, TTaskInput } from '@/app/shared/models/types';
import { ModalService } from '@/app/shared/ui/components';
import { MadalFormAction } from '@/app/shared/models/enums';
import { UUID } from '@/app/core/utils';
@Component({
    selector: 'app-newtask-form',
    standalone: true,
    imports: [CommonModule, PrioritySelectorComponent, FormsModule],
    templateUrl: './newtask-form.component.html',
    styleUrl: './newtask-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewtaskFormComponent {
    task: TTaskInput = {
        description: '',
        date: new Date(),
        endDate: new Date(),
        priority: 1,
    };

    constructor(private readonly modalService: ModalService) {}

    hadleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const Newtask: TTask = {
            id: UUID(),
            description: this.task.description,
            dateStart: this.task.endDate,
            dateEnd: this.task.endDate,
            tags: [],
            completed: false,
            priority: this.task.priority,
            priorityColor: this.task.priority === 1 ? 'green' : this.task.priority === 2 ? 'orange' : 'red',
        };

        this.modalService.NewAction({ action: MadalFormAction.ADD_NEW_TASK, data: Newtask });
    }
}
