import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import {
    TaskInputComponent,
    ListItemComponent,
    TaskItemComponent,
    CalendarComponent,
    KpiComponent,
} from './components';
import { CalendarService, ListsService } from './services';
import { TKPI, TTask, TTodoList } from './common/types';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        TaskInputComponent,
        TaskItemComponent,
        ListItemComponent,
        CalendarComponent,
        KpiComponent,
    ],
    providers: [ListsService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
    lists: TTodoList[] = [];
    selectedDate: Date = new Date();
    SelectedList: TTodoList = {} as TTodoList;

    private SelectedSubscription: Subscription;
    private ListsSubscription: Subscription;
    private SelectedDateSub: Subscription;
    kpi: TKPI = {} as TKPI;

    constructor(
        private listsService: ListsService,
        private calendarService: CalendarService,
    ) {
        this.ListsSubscription = this.listsService.lists$.subscribe((lists) => {
            this.lists = lists;
        });
        this.SelectedSubscription = this.listsService.selectedList$.subscribe((list) => {
            this.SelectedList = list;
        });
        this.SelectedDateSub = this.calendarService.selectedDate$.subscribe((date) => {
            this.selectedDate = date;
        });
    }

    addList() {
        this.listsService.addList();
    }
    selectList(list: TTodoList) {
        this.listsService.selectList(list);
    }

    removeList(id: string) {
        this.listsService.removeList(id);
    }

    addNewTask(description: string) {
        this.listsService.addNewTask(description, this.selectedDate);
    }
    checkTask(id: string) {
        this.listsService.checkTask(id);
    }
    isSelected(date: Date): boolean {
        return this.calendarService.isSelected(date);
    }

    deleteTask(task: TTask) {
        this.listsService.deleteTask(task);
    }
    ngOnDestroy(): void {
        this.ListsSubscription.unsubscribe();
        this.SelectedSubscription.unsubscribe();
        this.SelectedDateSub.unsubscribe();
    }
}
