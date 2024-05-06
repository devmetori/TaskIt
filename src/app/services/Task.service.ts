import { isSameDay, isSameMonth, isSameWeek } from 'date-fns';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TKPIUpdateValue, TTask, TTodoList } from '@app/common/types';
import { defaultKpi } from '@app/common/data';
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
        const newList = { id: UUID(), KPI: defaultKpi, name: 'New List', Tasks: [] } as TTodoList;
        this.storeService.updateSelectedList({ ...newList });
        this.storeService.updateLists([newList, ...this.lists]);
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

    addNewTask(task: TTask) {
        const newState = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
                list.Tasks = [task, ...list.Tasks];
                const { isThisMonth, isThisWeek, isToday } = this.isThisDay(task.dateStart);

                const data = {
                    today: {
                        total: list.KPI.today.total + 1,
                        completed: list.KPI.today.completed + (task.completed ? 1 : 0),
                    },
                    month: {
                        total: list.KPI.month.total + 1,
                        completed: list.KPI.month.completed + (task.completed ? 1 : 0),
                    },
                    week: {
                        total: list.KPI.week.total + 1,
                        completed: list.KPI.week.completed + (task.completed ? 1 : 0),
                    },
                };

                if (isThisMonth) {
                    list = { ...list, KPI: { ...list.KPI, month: data.month } };
                }
                if (isThisWeek) {
                    list = { ...list, KPI: { ...list.KPI, week: data.week, month: data.month } };
                }

                if (isToday) {
                    list = { ...list, KPI: { ...list.KPI, today: data.today, month: data.month, week: data.week } };
                }
                this.storeService.updateSelectedList(list);
            }
            return list;
        });

        this.storeService.updateLists(newState);
    }
    updateTask(newTask: TTask) {
        const updatedLists = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
                list.Tasks = list.Tasks.map((t) => {
                    return t.id === newTask.id ? { ...newTask } : t;
                });
                this.storeService.updateSelectedList(list);
            }
            return list;
        });
        this.storeService.updateLists(updatedLists);
    }

    checkTask(task: TTask): void {
        const updatedLists = this.lists.map((list) => {
            if (list.id === this.selectedList?.id) {
                const data = list.Tasks.reduce(
                    (acc, t) => {
                        const { isThisMonth, isThisWeek, isToday } = this.isThisDay(t.dateStart);
                        if (t.id === task.id) {
                            t.completed = !t.completed;
                        }

                        acc.tasks.push(t);

                        const data = {
                            today: {
                                total: acc.KPI.today.total + 1,
                                completed: acc.KPI.today.completed + (t.completed ? 1 : 0),
                            },
                            month: {
                                total: acc.KPI.month.total + 1,
                                completed: acc.KPI.month.completed + (t.completed ? 1 : 0),
                            },
                            week: {
                                total: acc.KPI.week.total + 1,
                                completed: acc.KPI.week.completed + (t.completed ? 1 : 0),
                            },
                        };

                        if (isToday) {
                            acc.KPI = { today: data.today, month: data.month, week: data.week };
                        }
                        if (isThisWeek) {
                            acc.KPI = { ...acc.KPI, month: data.month, week: data.week };
                        }
                        if (isThisMonth) {
                            acc.KPI = { ...acc.KPI, month: data.month };
                        }
                        return acc;
                    },
                    {
                        tasks: [] as TTask[],
                        KPI: defaultKpi,
                    },
                );

                list.Tasks = data.tasks;
                list.KPI = data.KPI;
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
                const { isThisMonth, isThisWeek, isToday } = this.isThisDay(task.dateStart);

                const data = {
                    today: {
                        total: list.KPI.today.total - 1,
                        completed: list.KPI.today.completed - (task.completed ? 1 : 0),
                    },
                    month: {
                        total: list.KPI.month.total - 1,
                        completed: list.KPI.month.completed - (task.completed ? 1 : 0),
                    },
                    week: {
                        total: list.KPI.week.total - 1,
                        completed: list.KPI.week.completed - (task.completed ? 1 : 0),
                    },
                };

                if (isThisMonth) {
                    list = { ...list, KPI: { ...list.KPI, month: data.month } };
                }
                if (isThisWeek) {
                    list = { ...list, KPI: { ...list.KPI, week: data.week, month: data.month } };
                }
                if (isToday) {
                    list = { ...list, KPI: { ...list.KPI, today: data.today, month: data.month, week: data.week } };
                }
                this.storeService.updateSelectedList(list);
            }
            return list;
        });
        this.storeService.updateLists(updatedLists);
    }

    isThisDay(date: Date) {
        return {
            isToday: isSameDay(date, this.today),
            isThisWeek: isSameWeek(date, this.today),
            isThisMonth: isSameMonth(date, this.today),
        };
    }

    calculateKpi({}: TKPIUpdateValue) {}
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
