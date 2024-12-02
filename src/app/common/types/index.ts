import { BREAKPOINTS } from '../data';

export type TPriority = 'low' | 'medium' | 'high';

export interface TPriotyList {
    id: string;
    level: number;
    label: string;
    selected: boolean;
    color: string;
}

export interface TTaskInput {
    description: string;
    date: Date;
    endDate: Date;
    priority: number;
}

export interface TTask {
    id: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    tags: string[];
    completed: boolean;
    priority: number;
    priorityColor: string;
}

export type TSort = 'description' | 'date' | 'priority' | 'status';

export interface TTodoList {
    id: string;
    name: string;
    Tasks: TTask[];
    KPI: TKPI;
}

export interface TSimpleKpi {
    total: number;
    completed: number;
}

export interface TKPI {
    today: TSimpleKpi;
    week: TSimpleKpi;
    month: TSimpleKpi;
}
export interface TKPIUpdateValue {
    negative: boolean;
    task: TTask;
    list: TTodoList;
}

export interface TSortOption {
    value: TSort;
    label: string;
    asc: boolean;
}

export interface TRandomTodoList {
    numLists: number;
    year: number;
    month: number;
}

export interface TDefaultValue {
    lists: TTodoList[];
    selectedList: TTodoList;
}

export interface IBreakpoint {
    breakpoint: keyof typeof BREAKPOINTS;
    className: string;
}

export type TPrioritySelectorSize = 'sm' | 'md' | 'lg';
export type TPrioritySelectorDirection = 'vr' | 'hr';
