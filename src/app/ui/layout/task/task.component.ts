import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ScreenSizeDirective } from '@/app/common/directives';
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
import { ModalService } from '@/app/ui/components/modal';
import { SortSelectorComponent } from '@/app/ui/base';
import { SortTasksPipe } from '@/app/common/pipes';
import { screenSize } from '@/app/common/data';
import { TaskService } from '@/app/services';
import { UUID } from '@/app/common/utils';
import { MadalFormAction } from '@/app/common/enums';

@Component({
    selector: 'app-task-list',
    standalone: true,
    providers: [TaskService, CalendarService],
    imports: [
        CommonModule,
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
})
export class TaskComponent implements OnDestroy, OnInit {
    sortOption: TSortOption = { value: 'date', label: 'Descripción', asc: true } as TSortOption;
    screenSizes: IBreakpoint[] = screenSize;
    lists: TTodoList[] = [];
    selectedList: TTodoList = {} as TTodoList;
    selectedDate: Date = new Date();
    private Subscription: Subscription = new Subscription();

    constructor(
        private taskService: TaskService,
        private calendarService: CalendarService,
        private modalService: ModalService,
    ) {}
    ngOnInit(): void {
        this.Subscription.add(
            this.taskService.lists$.subscribe((lists) => {
                this.lists = lists;
            }),
        );
        this.Subscription.add(
            this.taskService.lists$.subscribe((lists) => {
                this.lists = lists;
            }),
        );
        this.Subscription.add(this.taskService.selectedList$.subscribe((list) => (this.selectedList = list)));
        this.Subscription.add(this.calendarService.selectedDate$.subscribe((date) => (this.selectedDate = date)));
    }

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
        if (!newValue && this.selectedList.name === newValue) return;
        this.taskService.updateListName(this.selectedList.id, newValue);
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
        var result = this.modalService
            .open(EditTaskFormComponent, {
                props: { key: 'task', value: { ...task } },
                size: {
                    width: '350px',
                    height: '350px',
                },
            })
            .subscribe(({ action, data }) => {
                if (action === MadalFormAction.DELETE_TASK) {
                    this.taskService.deleteTask(data);
                }
                if (action === MadalFormAction.EDIT_TASK) {
                    if (task == data) return;
                    this.taskService.updateTask(data);
                }
                result.unsubscribe();
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

    ngOnDestroy(): void {
        this.Subscription.unsubscribe();
    }
}
