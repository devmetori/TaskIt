import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TTask, TTodoList } from '../common/types';
import { List, defaultList } from '../common/data';
import { UUID } from '../common/utils';

@Injectable({
    providedIn: 'root',
})
export class ListsService {
    private _lists = new BehaviorSubject<TTodoList[]>(List);
    private _selectedList = new BehaviorSubject<TTodoList>(List[0]);
    readonly lists$ = this._lists.asObservable();
    readonly selectedList$ = this._selectedList.asObservable();

    addList() {
        const newList = [{ ...defaultList, id: UUID() }, ...this._lists.getValue()];
        this._lists.next(newList);
    }

    selectList(list: TTodoList) {
        this._selectedList.next(list);
    }

    removeList(id: string) {
        const updatedLists = this._lists.getValue().filter((l) => l.id !== id);
        this._lists.next(updatedLists);
    }

    addNewTask(description: string) {
        const task: TTask = {
            id: UUID(),
            description: description,
            dateStart: new Date(),
            dateEnd: new Date(),
            tags: [],
            completed: false,
            priority: 'low',
        };
        const updatedLists = this._lists.getValue().map((list) => {
            if (list.id === this._selectedList.getValue().id) {
                list.Tasks = [...list.Tasks, task];
            }
            return list;
        });
        this._lists.next(updatedLists);
    }

    checkTask(id: string) {
        const updatedLists = this._lists.getValue().map((list) => {
            if (list.id === this._selectedList.getValue().id) {
                list.Tasks = list.Tasks.map((task) =>
                    task.id === id ? { ...task, completed: !task.completed } : task,
                );
            }
            return list;
        });
        this._lists.next(updatedLists);
    }

    deleteTask(id: string) {
        const updatedLists = this._lists.getValue().map((list) => {
            if (list.id === this._selectedList.getValue().id) {
                list.Tasks = list.Tasks.filter((task) => task.id !== id);
            }
            return list;
        });
        this._lists.next(updatedLists);
    }
}
