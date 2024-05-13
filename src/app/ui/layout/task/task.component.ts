import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
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
import { TaskService } from '@/app/services';
import { ModalService } from '@/app/ui/components/modal';
import { screenSize } from '@/app/common/data';
import { SortTasksPipe } from '@/app/common/pipes';
import { UUID } from '@/app/common/utils';
import { SortSelectorComponent } from '../../base';

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
export class TaskComponent implements OnInit, OnDestroy {
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
        if (this.selectedList.name !== newValue) {
            this.taskService.updateListName(this.selectedList.id, newValue);
        }
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
        this.modalService.open(EditTaskFormComponent, {
            props: { key: 'task', value: task },
            size: {
                width: '350px',
                height: '350px',
            },
        });
    }
    checkTask(task: TTask) {
        this.taskService.checkTask(task);
    }
    deleteTask(task: TTask) {
        this.taskService.deleteTask(task);
    }

    createNewTask() {
        this.modalService.open(NewtaskFormComponent, {
            size: {
                width: '250px',
                height: '300px',
            },
            mQueries: ['(max-width: 576px)'],
        });
    }
    isSelected(date: Date): boolean {
        return this.calendarService.isSelected(date);
    }
    trackTaskById(index: number, task: TTask) {
        return task.id;
    }
    trackListById(index: number, list: TTodoList) {
        return list.id;
    }

    ngOnInit(): void {
        this.Subscription.add(
            this.taskService.lists$.subscribe((lists) => {
                this.lists = lists;
            }),
        );
        this.Subscription.add(
            this.taskService.selectedList$.subscribe((list) => {
                this.selectedList = list;
            }),
        );
        this.Subscription.add(
            this.calendarService.selectedDate$.subscribe((date) => {
                this.selectedDate = date;
            }),
        );
    }
    ngOnDestroy(): void {
        this.Subscription.unsubscribe();
    }
}
