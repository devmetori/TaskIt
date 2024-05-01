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
} from '@/app/ui/components';
import { IBreakpoint, TTask, TTaskInput, TTodoList } from '@/app/common/types';
import { CalendarService, TaskService } from '@/app/services';
import { ModalService } from '@/app/ui/components/modal';
import { screenSize } from '@/app/common/data';

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
    ],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit, OnDestroy {
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
        this.taskService.addNewTask(task);
    }
    checkTask(id: string) {
        this.taskService.checkTask(id);
    }
    deleteTask(task: TTask) {
        this.taskService.deleteTask(task);
    }
    ngOnInit(): void {
        this.Subscription.add(
            this.taskService.lists$.subscribe((lists) => {
                console.log('Task components:', lists);
                this.lists.splice(0, this.lists.length, ...lists);
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
    openModal() {
        this.modalService.open(NewtaskFormComponent, {
            size: {
                width: '250px',
                height: '300px',
            },
        });
    }
    ngOnDestroy(): void {
        this.Subscription.unsubscribe();
    }
}
