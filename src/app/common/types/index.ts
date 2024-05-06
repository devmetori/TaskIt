import { BREAKPOINTS } from '../data';

export type TPriority = 'low' | 'medium' | 'high';

export type TPriotyList = {
    id: string;
    level: number;
    label: string;
    selected: boolean;
    color: string;
};

export type TTaskInput = {
    description: string;
    date: Date;
    endDate?: Date;
    priority: number;
};

export type TTask = {
    id: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    tags: string[];
    completed: boolean;
    priority: number;
    priorityColor: string;
};

export type TSort = 'description' | 'date' | 'priority' | 'status';

export type TTodoList = {
    id: string;
    name: string;
    Tasks: TTask[];
    KPI: TKPI;
};

export type TSimpleKpi = {
    total: number;
    completed: number;
};

export type TKPI = {
    today: TSimpleKpi;
    week: TSimpleKpi;
    month: TSimpleKpi;
};
export type TKPIUpdateValue = { negative: boolean; task: TTask; list: TTodoList };

export type TSortOption = {
    value: TSort;
    label: string;
    asc: boolean;
};

export type TRandomTodoList = {
    numLists: number;
    year: number;
    month: number;
};

export type TDefaultValue = {
    lists: TTodoList[];
    selectedList: TTodoList;
};

export interface IBreakpoint {
    breakpoint: keyof typeof BREAKPOINTS;
    className: string;
}

export type TPrioritySelectorSize = 'sm' | 'md' | 'lg';
export type TPrioritySelectorDirection = 'vr' | 'hr';
