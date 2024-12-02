import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TKPI, TTask, TTodoList, TDefaultValue } from '@app/common/types';
import { defaultKpi, defaultList } from '@app/common/data';
import { CalendarService } from './calendar.service';
import { StoreService } from './store.service';
import { UUID } from '@app/common/utils';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private readonly SelectedListName: string = 'selectedList';
    private readonly ListsName: string = 'lists';

    private readonly defaultValue: TDefaultValue = this.getInitialValue();
    private _lists = new BehaviorSubject<TTodoList[]>([...this.defaultValue.lists]);
    private _selectedList = new BehaviorSubject<TTodoList>({ ...this.defaultValue.selectedList });

    get lists$() {
        return this._lists.asObservable();
    }

    get selectedList$() {
        return this._selectedList.asObservable();
    }
    constructor(
        private readonly storeService: StoreService,
        private readonly calendarService: CalendarService,
    ) {}

    private getInitialValue(): TDefaultValue {
        const lists = this.storeService.getItem<TTodoList[]>(this.ListsName) as TTodoList[];
        const selectedList = this.storeService.getItem<TTodoList>(this.SelectedListName) as TTodoList;

        if (Array.isArray(lists) && lists.length > 0) return { lists: lists, selectedList: selectedList ?? lists[0] };

        this.storeService.setItem(this.ListsName, [defaultList]);
        this.storeService.setItem(this.SelectedListName, defaultList);
        return { lists: [defaultList], selectedList: defaultList };
    }

    private updateLists(lists: TTodoList[]): void {
        this.storeService.setItem(this.ListsName, lists);
        this._lists.next([...lists]);
    }

    private updateSelectedList(selectedList: TTodoList): void {
        this.storeService.setItem(this.SelectedListName, selectedList);
        this._selectedList.next({ ...selectedList });
    }
    addList() {
        const newList = {
            id: UUID(),
            KPI: defaultKpi,
            name: 'Nueva lista',
            Tasks: [],
        } as TTodoList;
        this.updateSelectedList({ ...newList });
        this.updateLists([newList, ...this._lists.value]);
    }

    selectList(list: TTodoList) {
        this.updateSelectedList(list);
    }
    removeList(id: string) {
        const list = this._lists.value.filter((l) => l.id !== id);
        const isSelected = this._selectedList.value.id === id;
        const isListEmpty = list.length <= 0;

        isSelected && this.updateSelectedList(isListEmpty ? defaultList : list[0]);
        this.updateLists(isListEmpty ? [defaultList] : list);
    }
    updateListName(id: string, newValue: string) {
        const updatedLists = this._lists.value.map((list) => {
            if (list.id === id) {
                list.name = newValue;
                this.updateSelectedList(list);
            }
            return list;
        });
        this.updateLists(updatedLists);
    }
    addNewTask(task: TTask) {
        const newState = this._lists.value.map((list) => {
            if (list.id === this._selectedList.value?.id) {
                list.Tasks = [task, ...list.Tasks];
                list.KPI = this.updateKPIData(list.KPI, task, 'increment');
                this.updateSelectedList(list);
            }
            return list;
        });

        this.updateLists(newState);
    }
    updateTask(newTask: TTask) {
        const updatedLists = this._lists.value.map((list) => {
            if (list.id === this._selectedList.value?.id) {
                list.Tasks = list.Tasks.map((t) => (t.id === newTask.id ? newTask : t));
                this.updateSelectedList(list);
            }
            return list;
        });

        this.updateLists(updatedLists);
    }

    checkTask(task: TTask): void {
        const SelectedList = this._selectedList.value;
        const defaultValue = {
            tasks: [] as TTask[],
            KPI: defaultKpi,
        };
        const updatedLists = this._lists.value.map((list) => {
            if (list.id === SelectedList.id) {
                const data = list.Tasks.reduce((acc, t) => {
                    t.completed = t.id === task.id ? !t.completed : t.completed;
                    acc.tasks.push(t);
                    acc.KPI = this.updateKPIData(acc.KPI, t, 'increment');
                    return acc;
                }, defaultValue);

                list.Tasks = data.tasks;
                list.KPI = data.KPI;
                this.updateSelectedList(list);
            }
            return list;
        });
        this.updateLists(updatedLists);
    }

    deleteTask(task: TTask) {
        const selectdList = this._selectedList.value;
        const updatedLists = this._lists.value.map((list) => {
            if (list.id === selectdList?.id) {
                list.Tasks = list.Tasks.filter((t) => t.id !== task.id);
                list.KPI = this.updateKPIData(list.KPI, task, 'decrement');
                this.updateSelectedList({ ...list });
            }
            return list;
        });

        this.updateLists([...updatedLists]);
    }

    updateKPIData(kpi: TKPI, task: TTask, action: 'decrement' | 'increment' = 'increment') {
        const { isThisMonth, isThisWeek, isToday } = this.calendarService.isRangeDay(task.dateStart);
        const adjustment = action === 'decrement' ? -1 : 1;

        const data = {
            today: {
                total: kpi.today.total + adjustment,
                completed: kpi.today.completed + (task.completed ? adjustment : 0),
            },
            month: {
                total: kpi.month.total + adjustment,
                completed: kpi.month.completed + (task.completed ? adjustment : 0),
            },
            week: {
                total: kpi.week.total + adjustment,
                completed: kpi.week.completed + (task.completed ? adjustment : 0),
            },
        };

        if (isToday) {
            return { today: data.today, month: data.month, week: data.week };
        }
        if (isThisWeek) {
            return { ...kpi, month: data.month, week: data.week };
        }
        if (isThisMonth) {
            return { ...kpi, month: data.month };
        }

        return kpi;
    }
}
