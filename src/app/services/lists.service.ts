import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TTask, TTodoList } from '../common/types';
import { List, defaultList, defaultKpi } from '../common/data';
import { UUID } from '../common/utils';
import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';

@Injectable({
    providedIn: 'root',
})
export class ListsService {
    private _lists = new BehaviorSubject<TTodoList[]>(List);
    private _selectedList = new BehaviorSubject<TTodoList>(List[0]);
    readonly lists$ = this._lists.asObservable();
    readonly selectedList$ = this._selectedList.asObservable();
    today = new Date();

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

    addNewTask(description: string, selectedDate: Date) {
        const task: TTask = {
            id: UUID(),
            description: description,
            dateStart: selectedDate,
            dateEnd: new Date(),
            tags: [],
            completed: false,
            priority: 'low',
        };
        const updatedLists = this._lists.getValue().map((list) => {
            if (list.id === this._selectedList.getValue().id) {
                list.Tasks = [...list.Tasks, task];
                if (isSameMonth(task.dateStart, this.today)) {
                    list.KPI.month.total += 1;
                    if (task.completed) {
                        list.KPI.month.completed += 1;
                    }
                }
                if (isSameWeek(task.dateStart, this.today)) {
                    list.KPI.week.total += 1;
                    if (task.completed) {
                        list.KPI.week.completed += 1;
                    }
                }
                if (isSameDay(task.dateStart, this.today)) {
                    list.KPI.today.total += 1;
                    if (task.completed) {
                        list.KPI.today.completed += 1;
                    }
                }
            }
            return list;
        });
        this._lists.next(updatedLists);
    }

    checkTask_v1(id: string) {
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
    checkTask(id: string): void {
        const updatedLists = this._lists.getValue().map((list) => {
            if (list.id === this._selectedList.getValue()?.id) {
                list.Tasks = list.Tasks.map((task) => {
                    return task.id === id ? { ...task, completed: !task.completed } : task;
                });

                list.KPI = list.Tasks.reduce((acc, task) => {
                    const isToday = isSameDay(task.dateStart, this.today);
                    const isThisWeek = isSameWeek(task.dateStart, this.today);
                    const isThisMonth = isSameMonth(task.dateStart, this.today);
                    const data = {
                        today: {
                            total: acc.today.total + 1,
                            completed: acc.today.completed + (task.completed ? 1 : 0),
                        },
                        month: {
                            total: acc.month.total + 1,
                            completed: acc.month.completed + (task.completed ? 1 : 0),
                        },
                        week: {
                            total: acc.week.total + 1,
                            completed: acc.week.completed + (task.completed ? 1 : 0),
                        },
                    };

                    if (isToday) {
                        acc = { today: data.today, month: data.month, week: data.week };
                    }
                    if (isThisWeek) {
                        acc = { ...acc, month: data.month, week: data.week };
                    }
                    if (isThisMonth) {
                        acc = { ...acc, month: data.month };
                    }
                    return acc;
                }, defaultKpi);
            }
            return list;
        });
        this._lists.next(updatedLists);
    }

    deleteTask(task: TTask) {
        const updatedLists = this._lists.getValue().map((list) => {
            if (list.id === this._selectedList.getValue().id) {
                list.Tasks = list.Tasks.filter((t) => t.id !== task.id);
                if (isSameMonth(task.dateStart, this.today)) {
                    list.KPI.month.total -= 1;
                    if (task.completed) {
                        list.KPI.month.completed -= 1;
                    }
                }
                if (isSameWeek(task.dateStart, this.today)) {
                    list.KPI.week.total -= 1;
                    if (task.completed) {
                        list.KPI.week.completed -= 1;
                    }
                }
                if (isSameDay(task.dateStart, this.today)) {
                    list.KPI.today.total -= 1;
                    if (task.completed) {
                        list.KPI.today.completed -= 1;
                    }
                }
            }
            return list;
        });
        this._lists.next(updatedLists);
    }
    private countCompletedTasks = (tasks: TTask[]) => tasks.filter((task) => task.completed).length;
}
