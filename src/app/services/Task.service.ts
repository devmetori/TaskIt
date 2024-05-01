import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TSort, TTask, TTaskInput, TTodoList } from '@app/common/types';
import { defaultList, defaultKpi } from '@app/common/data';
import { StoreService } from './store.service';
import { UUID } from '@app/common/utils';

@Injectable({
    providedIn: 'root',
})
export class TaskService implements OnDestroy {
    lists: TTodoList[] = [];
    selectedList: TTodoList = {} as TTodoList;
    today = new Date();
    selectedDate = new Date();
    private subscription: Subscription = new Subscription();

    constructor(private storeService: StoreService) {
        this.subscription.add(
            this.storeService.lists$.subscribe((lists) => {
                this.lists = lists;
            }),
        );
        this.subscription.add(
            this.storeService.selectedList$.subscribe((list) => {
                this.selectedList = list;
            }),
        );
    }

    get lists$() {
        return this.storeService.lists$;
    }

    get selectedList$() {
        return this.storeService.selectedList$;
    }

    addList() {
        const newList = [{ ...defaultList, id: UUID() }, ...this.lists];
        this.storeService.updateSelectedList(newList[0]);
        this.storeService.updateLists(newList);
    }

    selectList(list: TTodoList) {
        this.storeService.updateSelectedList(list);
    }

    removeList(id: string) {
        const updatedLists = this.lists.filter((l) => l.id !== id);
        if (this.selectedList.id === id) {
            this.storeService.updateSelectedList(updatedLists[0]);
        }
        this.storeService.updateLists(updatedLists);
    }
    updateListName(id: string, newValue: string) {
        const updatedLists = this.lists.map((list) => {
            if (list.id === id) {
                list.name = newValue;
                this.storeService.updateSelectedList(list);
            }
            return list;
        });
        this.storeService.updateLists(updatedLists);
    }
    updateTaskDescription(description: string, task: TTask) {
        const updatedLists = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
                list.Tasks = list.Tasks.map((t) => {
                    return t.id === task.id ? { ...t, description } : t;
                });
                this.storeService.updateSelectedList(list);
            }
            return list;
        });
        this.storeService.updateLists(updatedLists);
    }
    addNewTask(newTask: TTaskInput) {
        const task: TTask = {
            id: UUID(),
            description: newTask.description,
            dateStart: newTask.date,
            dateEnd: new Date(),
            tags: [],
            completed: false,
            priority: newTask.priority,
            priorityColor: newTask.priority === 1 ? 'green' : newTask.priority === 2 ? 'orange' : 'red',
        };

        const newState = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
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
                this.storeService.updateSelectedList(list);
            }
            return list;
        });

        this.storeService.updateLists(newState);
    }

    checkTask(id: string): void {
        const updatedLists = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
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
                this.storeService.updateSelectedList(list);
            }
            return list;
        });
        this.storeService.updateLists(updatedLists);
    }

    deleteTask(task: TTask) {
        const updatedLists = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
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
                this.storeService.updateSelectedList(list);
            }
            return list;
        });
        this.storeService.updateLists(updatedLists);
    }
    sortTasks(sortKey: TSort, asc: boolean) {
        const updatedLists = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
                list.Tasks.sort((a, b) => {
                    let comparison = 0;
                    switch (sortKey) {
                        case 'description':
                            comparison = a.description.localeCompare(b.description);
                            break;
                        case 'date':
                            comparison = +a.dateStart - +b.dateStart;
                            break;
                        case 'priority':
                            comparison = +a.priority - +a.priority;
                            break;
                    }
                    return asc ? comparison : -comparison;
                });
                list.sort = {
                    by: sortKey,
                    asc,
                };

                this.storeService.updateSelectedList(list);
            }
            return list;
        });
        this.storeService.updateLists(updatedLists);
    }

    toggleSortOrder() {
        const updatedLists = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
                this.sortTasks(list.sort.by, !list.sort.asc);
            }
            return list;
        });
        this.storeService.updateLists(updatedLists);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
