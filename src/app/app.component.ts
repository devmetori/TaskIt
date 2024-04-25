import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TaskInputComponent, ListItemComponent, TaskItemComponent } from './components';
import { TTodoList } from './common/types';
import { ListsService } from './services';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule, TaskInputComponent, TaskItemComponent, ListItemComponent],
    providers: [ListsService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    lists: TTodoList[] = [];
    SelectedList: TTodoList = {} as TTodoList;
    constructor(private listsService: ListsService) {
        this.listsService.lists$.subscribe((lists) => {
            this.lists = lists;
        });
        this.listsService.selectedList$.subscribe((list) => {
            this.SelectedList = list;
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
        this.listsService.addNewTask(description);
    }
    checkTask(id: string) {
        this.listsService.checkTask(id);
    }

    deleteTask(id: string) {
        this.listsService.deleteTask(id);
    }
}
