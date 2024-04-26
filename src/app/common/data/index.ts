import { TKPI, TTodoList } from '../types';
import { UUID } from '../utils';

export const List: TTodoList[] = [
    {
        id: UUID(),
        Tasks: [
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
        ],
        name: 'Work',
        SelectedDate: new Date(),
        sort: {
            by: 'dateStart',
            asc: true,
        },
        filter: {
            by: 'all',
            tags: [],
        },
        KPI: {
            today: {
                total: 2,
                completed: 0,
            },
            week: {
                total: 2,
                completed: 0,
            },
            month: {
                total: 2,
                completed: 0,
            },
        },
    },
    {
        id: UUID(),
        Tasks: [
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
        ],
        name: 'Personal',
        SelectedDate: new Date(),
        sort: {
            by: 'dateStart',
            asc: true,
        },
        filter: {
            by: 'all',
            tags: [],
        },
        KPI: {
            today: {
                total: 4,
                completed: 0,
            },
            week: {
                total: 4,
                completed: 0,
            },
            month: {
                total: 4,
                completed: 0,
            },
        },
    },
    {
        id: UUID(),
        Tasks: [
            {
                id: UUID(),
                description: 'Create new task',
                dateStart: new Date(),
                dateEnd: new Date(),
                tags: [],
                completed: false,
                priority: 'low',
            },
        ],
        name: 'Shopping',
        SelectedDate: new Date(),
        sort: {
            by: 'dateStart',
            asc: true,
        },
        filter: {
            by: 'all',
            tags: [],
        },
        KPI: {
            today: {
                total: 1,
                completed: 0,
            },
            week: {
                total: 1,
                completed: 0,
            },
            month: {
                total: 1,
                completed: 0,
            },
        },
    },
    {
        id: UUID(),
        Tasks: [],
        name: 'Home',
        SelectedDate: new Date(),
        sort: {
            by: 'dateStart',
            asc: true,
        },
        filter: {
            by: 'all',
            tags: [],
        },
        KPI: {
            today: {
                total: 0,
                completed: 0,
            },
            week: {
                total: 0,
                completed: 0,
            },
            month: {
                total: 0,
                completed: 0,
            },
        },
    },
];
export const defaultKpi: TKPI = {
    today: {
        total: 0,
        completed: 0,
    },
    week: {
        total: 0,
        completed: 0,
    },
    month: {
        total: 0,
        completed: 0,
    },
};
export const defaultList: TTodoList = {
    id: UUID(),
    name: 'New List',
    Tasks: [],
    SelectedDate: new Date(),
    sort: {
        by: 'dateStart',
        asc: true,
    },
    filter: {
        by: 'all',
        tags: [],
    },
    KPI: defaultKpi,
};
