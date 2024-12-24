import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';

import {
    CalendarComponent,
    KpiComponent,
    ListItemComponent,
    TaskInputComponent,
    TaskItemComponent,
    NewtaskFormComponent,
    EditTaskFormComponent,
} from '@/app/ui/components';
import { IBreakpoint, TSortOption, TTask, TTaskInput, TTodoList } from '@/app/common/types';
import { CalendarService } from '@/app/ui/components/calendar';
import { ScreenSizeDirective } from '@/app/common/directives';
import { ModalService } from '@/app/ui/components/modal';
import { SortSelectorComponent } from '@/app/ui/base';
import { MadalFormAction } from '@/app/common/enums';
import { SortTasksPipe } from '@/app/common/pipes';
import { screenSize } from '@/app/common/data';
import { TaskService } from '@/app/services';
import { UUID } from '@/app/common/utils';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        DatePipe,
        NgIf,
        NgFor,
        CalendarComponent,
        KpiComponent,
        ListItemComponent,
        TaskInputComponent,
        TaskItemComponent,
        ScreenSizeDirective,
        SortTasksPipe,
        SortSelectorComponent,
    ],

    templateUrl: './task.component.html',
    styleUrl: './task.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
    sortOption: TSortOption = { value: 'date', label: 'Descripción', asc: true } as TSortOption;
    selectedDay = this.calendarService.Store.Select((state) => state.SelectedDay);
    SelectedList = this.taskService.Store.Select((state) => state.SelectedList);
    Lists = this.taskService.Store.Select((state) => state.Lists);
    screenSizes: IBreakpoint[] = screenSize;

    constructor(
        private readonly taskService: TaskService,
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
