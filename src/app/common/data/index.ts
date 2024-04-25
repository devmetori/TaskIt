import { TTodoList } from '../types';
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
    },
];

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
};
