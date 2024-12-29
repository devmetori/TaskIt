import { Injectable } from '@angular/core';

import { CalendarService } from '@/app/features/home/components/calendar/service';
import { TKPI, TTask, TTodoList, TaskState } from '@/app/shared/models/types';
import { defaultKpi, defaultList } from '@/app/shared/data';
import { StoreService } from '@/app/core/services';
import { UUID } from '@/app/core/utils';
import { Store } from '@/app/core/store';

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    private readonly SelectedListName: string = 'selectedList';
    private readonly ListsName: string = 'lists';

    readonly Store = new Store<TaskState>(this.getInitialValue());

    constructor(
        private readonly storeService: StoreService,
        private readonly calendarService: CalendarService,
    ) {}

    private getInitialValue(): TaskState {
        const lists = this.storeService.getItem<TTodoList[]>(this.ListsName) as TTodoList[];
        const selectedList = this.storeService.getItem<TTodoList>(this.SelectedListName) as TTodoList;

        if (Array.isArray(lists) && lists.length > 0) return { Lists: lists, SelectedList: selectedList ?? lists[0] };

        this.storeService.setItem(this.ListsName, [defaultList]);
        this.storeService.setItem(this.SelectedListName, defaultList);
        return { Lists: [defaultList], SelectedList: defaultList };
    }

    private updateLists(lists: TTodoList[]): void {
        this.storeService.setItem(this.ListsName, lists);
        this.Store.setState({ Lists: lists });
    }

    private updateSelectedList(selectedList: TTodoList): void {
        this.storeService.setItem(this.SelectedListName, selectedList);
        this.Store.setState({ SelectedList: selectedList });
    }
    addList() {
        const newList = {
            id: UUID(),
            KPI: defaultKpi,
            name: 'Nueva lista',
            Tasks: [],
        } as TTodoList;
        const lists = this.Store.Select((state) => state.Lists);
        this.updateSelectedList({ ...newList });
        this.updateLists([newList, ...lists()]);
    }

    selectList(list: TTodoList) {
        this.updateSelectedList(list);
    }
    removeList(id: string) {
        const SelectedList = this.Store.Select((state) => state.SelectedList);
        const Lists = this.Store.Select((state) => state.Lists);

        const list = Lists().filter((l) => l.id !== id);
        const isSelected = SelectedList().id === id;
        const isListEmpty = list.length <= 0;

        if (isSelected) this.updateSelectedList(isListEmpty ? defaultList : list[0]);
        this.updateLists(isListEmpty ? [defaultList] : list);
    }
    updateListName(id: string, newValue: string) {
        const Lists = this.Store.Select((state) => state.Lists);
        const updatedLists = Lists().map((list) => {
            if (list.id === id) {
                list.name = newValue;
                this.updateSelectedList(list);
            }
            return list;
        });
        this.updateLists(updatedLists);
    }
    addNewTask(task: TTask) {
        const Lists = this.Store.Select((state) => state.Lists);
        const SelectedList = this.Store.Select((state) => state.SelectedList);

        const newState = Lists().map((list) => {
            if (list.id === SelectedList()?.id) {
                list.Tasks = [task, ...list.Tasks];
                list.KPI = this.updateKPIData(list.KPI, task, 'increment');
                this.updateSelectedList(list);
            }
            return list;
        });

        this.updateLists(newState);
    }
    updateTask(newTask: TTask) {
        const Lists = this.Store.Select((state) => state.Lists);
        const SelectedList = this.Store.Select((state) => state.SelectedList);

        const updatedLists = Lists().map((list) => {
            if (list.id === SelectedList()?.id) {
                list.Tasks = list.Tasks.map((t) => (t.id === newTask.id ? newTask : t));
                this.updateSelectedList(list);
            }
            return list;
        });

        this.updateLists(updatedLists);
    }

    checkTask(task: TTask): void {
        const Lists = this.Store.Select((state) => state.Lists);
        const SelectedList = this.Store.Select((state) => state.SelectedList);
        const defaultValue = {
            tasks: [] as TTask[],
            KPI: defaultKpi,
        };
        const updatedLists = Lists().map((list) => {
            if (list.id === SelectedList().id) {
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
        const Lists = this.Store.Select((state) => state.Lists);
        const SelectedList = this.Store.Select((state) => state.SelectedList);
        const updatedLists = Lists().map((list) => {
            if (list.id === SelectedList()?.id) {
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
