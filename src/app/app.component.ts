import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { TaskInputComponent, ListItemComponent, TaskItemComponent, CalendarComponent, KpiComponent } from './ui';
import { CalendarService, ListsService } from './services';
import { TKPI, TTask, TTodoList, TSortOption, TSort, TTaskInput } from './common/types';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        TaskInputComponent,
        TaskItemComponent,
        ListItemComponent,
        KpiComponent,
        CalendarComponent,
    ],
    providers: [ListsService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
    lists: TTodoList[] = [];
    selectedDate: Date = new Date();
    SelectedList: TTodoList = {} as TTodoList;
    kpi: TKPI = {} as TKPI;

    private SelectedSubscription: Subscription = this.listsService.selectedList$.subscribe((list) => {
        this.SelectedList = list;
    });
    private ListsSubscription: Subscription = this.listsService.lists$.subscribe((lists) => {
        this.lists = lists;
    });
    private SelectedDateSub: Subscription = this.calendarService.selectedDate$.subscribe((date) => {
        this.selectedDate = date;
    });
    sortOptions: TSortOption[] = [
        { value: 'description', label: 'Description', asc: true },
        { value: 'dateStart', label: 'Date', asc: true },
        { value: 'priority', label: 'Priority', asc: true },
    ];
    constructor(
        private listsService: ListsService,
        private calendarService: CalendarService,
    ) {}

    addList() {
        this.listsService.addList();
    }
    selectList(list: TTodoList) {
        this.listsService.selectList(list);
    }

    removeList(id: string) {
        this.listsService.removeList(id);
    }

    addNewTask(task: TTaskInput) {
        this.listsService.addNewTask(task);
    }
    sortTasks(event: Event) {
        const target = event.target as HTMLSelectElement;
        const value = target.value as string;
        this.listsService.sortTasks(value as TSort, this.SelectedList.sort.asc);
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
    toggleSortOrder() {
        this.listsService.toggleSortOrder();
    }
    ngOnDestroy(): void {
        this.ListsSubscription.unsubscribe();
        this.SelectedSubscription.unsubscribe();
        this.SelectedDateSub.unsubscribe();
    }
}
