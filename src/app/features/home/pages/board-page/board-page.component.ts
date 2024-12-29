import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';

import {
    KpiComponent,
    ListItemComponent,
    TaskInputComponent,
    TaskItemComponent,
    NewtaskFormComponent,
    EditTaskFormComponent,
} from '@/app/features/home/components';
import { TSortOption, TTask, TTaskInput, TTodoList } from '@/app/shared/models/types';
import { CalendarLayoutComponent } from '@/app/features/home/components/calendar';
import { SortSelectorComponent } from '@/app/features/home/components/board/ui';
import { CalendarService } from '@/app/features/home/components/calendar';
import { ScreenSizeDirective } from '@/app/shared/directives';
import { BoardService } from '@/app/features/home/components';
import { ModalService } from '@/app/shared/ui/components';
import { MadalFormAction } from '@/app/shared/models/enums';
import { SortTasksPipe } from '@/app/shared/pipes';
import { UUID } from '@/app/core/utils';
@Component({
    selector: 'app-board-page',
    standalone: true,
    imports: [
        DatePipe,
        NgIf,
        NgFor,
        CalendarLayoutComponent,
        KpiComponent,
        ListItemComponent,
        TaskInputComponent,
        TaskItemComponent,
        ScreenSizeDirective,
        SortTasksPipe,
        SortSelectorComponent,
    ],
    templateUrl: './board-page.component.html',
    styleUrl: './board-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ScreenSizeDirective],
})
export class BoardPageComponent {
    sortOption: TSortOption = { value: 'date', label: 'Descripción', asc: true } as TSortOption;
    selectedDay = this.calendarService.Store.Select((state) => state.SelectedDay);
    SelectedList = this.taskService.Store.Select((state) => state.SelectedList);
    Lists = this.taskService.Store.Select((state) => state.Lists);

    constructor(
        private readonly taskService: BoardService,
        private readonly calendarService: CalendarService,
        private readonly modalService: ModalService,
    ) {}

    trackById(index: number, item: TTodoList | TTask): string {
        return item.id;
    }

    addList() {
        this.taskService.addList();
    }

    removeList(id: string) {
        this.taskService.removeList(id);
    }
    selectList(list: TTodoList) {
        this.taskService.selectList(list);
    }
    updateListName(newValue: string) {
        if (!newValue && this.SelectedList().name === newValue) return;
        this.taskService.updateListName(this.SelectedList().id, newValue);
    }
    addNewTask(task: TTaskInput) {
        const Newtask: TTask = {
            id: UUID(),
            description: task.description,
            dateStart: new Date(task.date),
            dateEnd: new Date(new Date(task.date).getTime() + Math.random() * (1000 * 60 * 60 * 24 * 7)),
            tags: [],
            completed: false,
            priority: task.priority,
            priorityColor: task.priority === 1 ? 'green' : task.priority === 2 ? 'orange' : 'red',
        };
        this.taskService.addNewTask(Newtask);
    }
    editTask(task: TTask) {
        const OpenAction = this.modalService.open(EditTaskFormComponent, {
            props: { key: 'task', value: { ...task } },
            size: {
                width: '350px',
                height: '350px',
            },
        });

        const observer = OpenAction.subscribe(({ action, data }) => {
            if (action === MadalFormAction.DELETE_TASK) {
                this.taskService.deleteTask(data);
            }
            if (action === MadalFormAction.EDIT_TASK) {
                if (task == data) return;
                this.taskService.updateTask(data);
            }
            observer.unsubscribe();
        });
    }
    checkTask(task: TTask) {
        this.taskService.checkTask(task);
    }
    deleteTask(task: TTask) {
        this.taskService.deleteTask(task);
    }

    createNewTask() {
        const result = this.modalService
            .open(NewtaskFormComponent, {
                size: {
                    width: '250px',
                    height: '300px',
                },
                mQueries: ['(max-width: 576px)'],
            })
            .subscribe(({ action, data }) => {
                if (action === MadalFormAction.ADD_NEW_TASK) {
                    this.taskService.addNewTask(data);
                }

                result.unsubscribe();
            });
    }
    isSelected(date: Date): boolean {
        return this.calendarService.isSelected(date);
    }
}
