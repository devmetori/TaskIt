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

export type TSort = 'description' | 'date' | 'priority' | 'status';

export interface TSortOption {
    value: TSort;
    label: string;
    asc: boolean;
}

export type TPrioritySelectorSize = 'sm' | 'md' | 'lg';

export type TPrioritySelectorDirection = 'vr' | 'hr';

/**
 * State of the application
 * @interface CalendarState
 * @returns {CalendarState} - State of the application
 * @property {Date} CurrentMonth - Current month
 * @property {Date} SelectedDay - Selected day
 * @property {Date[]} WeekDays - Days of the week
 * @property {Date[]} Days - Days of the month
 */
export interface CalendarState {
    CurrentMonth: Date;
    SelectedDay: Date;
    WeekDays: Date[];
    Days: Date[];
}

/**
 *  State of the task
 * @interface TaskState
 * @returns {TaskState} - State of the task
 */
export interface TaskState {
    SelectedList: TTodoList;
    Lists: TTodoList[];
}
