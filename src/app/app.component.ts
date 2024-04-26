import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { TaskInputComponent, ListItemComponent, TaskItemComponent, CalendarComponent } from './components';
import { TTodoList } from './common/types';
import { ListsService } from './services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        FormsModule,
        TaskInputComponent,
        TaskItemComponent,
        ListItemComponent,
        CalendarComponent,
    ],
    providers: [ListsService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
    lists: TTodoList[] = [];
    SelectedList: TTodoList = {} as TTodoList;

    private SelectedSubscription: Subscription;
    private ListsSubscription: Subscription;

    constructor(private listsService: ListsService) {
        this.ListsSubscription = this.listsService.lists$.subscribe((lists) => {
            this.lists = lists;
        });
        this.SelectedSubscription = this.listsService.selectedList$.subscribe((list) => {
            this.SelectedList = list;
        });
    }
    ngOnDestroy(): void {
        this.ListsSubscription.unsubscribe();
        this.SelectedSubscription.unsubscribe();
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
        this.listsService.addNewTask(description);
    }
    checkTask(id: string) {
        this.listsService.checkTask(id);
    }

    deleteTask(id: string) {
        this.listsService.deleteTask(id);
    }
}
